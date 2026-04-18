/**
 * AIQA Sandbox Runner - Worker Thread
 * 
 * Runs in isolated worker thread for security and stability
 * Communicates via parentPort message passing
 */

const { parentPort, workerData } = require('worker_threads');
const { chromium, firefox, webkit } = require('playwright');
const { expect: playwrightExpect } = require('@playwright/test');

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    timeout: workerData?.timeout || 30000,
    screenshotDir: workerData?.screenshotDir || './screenshots',
    headless: workerData?.headless !== false,
    browserType: workerData?.browser || 'chromium'
};

let response = {
    status: 'FAIL',
    logs: [],
    error: null,
    screenshots: [],
    video: null,
    executionTime: 0
};

let startTime = Date.now();
let browser = null;
let page = null;
let context = null;

// ============================================
// LOGGING
// ============================================
function addLog(type, message) {
    response.logs.push({
        type: type,
        message: message,
        timestamp: new Date().toISOString()
    });
}

function logInfo(msg) { addLog('info', msg); }
function logError(msg) { addLog('error', msg); }
function logConsole(msg) { addLog('console', msg); }

// ============================================
// BROWSER LAUNCHER
// ============================================
async function launchBrowser() {
    const options = {
        headless: CONFIG.headless,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security'
        ]
    };
    
    switch (CONFIG.browserType.toLowerCase()) {
        case 'firefox': return await firefox.launch(options);
        case 'webkit': return await webkit.launch(options);
        default: return await chromium.launch(options);
    }
}

// ============================================
// PAGE SETUP
// ============================================
async function setupPage() {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true
    });
    
    page = await context.newPage();
    
    page.on('console', msg => logConsole(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', err => logError(`Page error: ${err.message}`));
    page.on('requestfailed', req => logError(`Request failed: ${req.url()} - ${req.failure()?.errorText}`));
}

// ============================================
// SCRIPT EXECUTION
// ============================================
async function executeScript(script) {
    // Remove test wrapper if present
    let cleanScript = extractTestBody(script);
    
    if (!cleanScript.trim()) {
        throw new Error('No executable code found');
    }
    
    // Create function with page, expect (from @playwright/test), and the script
    const fn = new Function('page', 'expect', 'console', `
        return (async () => {
            await new Promise(r => setTimeout(r, 500));
            ${cleanScript}
        })();
    `);
    
    await fn(page, playwrightExpect, console);
}

function extractTestBody(script) {
    // Remove all import statements first
    let cleaned = script
        .replace(/^import\s+.*from\s+['"][^'"]+['"];?\s*$/gm, '')
        .replace(/^import\s+.*;?\s*$/gm, '')
        .trim();
    
    // Match test function with body
    // Pattern: test('name', async ({ page }) => { ... });
    const testPattern = /test\s*\(\s*['"][^'"]+['"]\s*,\s*async\s*\(\s*\{[^}]*\}\s*\)\s*=>\s*\{/;
    const match = cleaned.match(testPattern);
    
    if (match) {
        const startIndex = match.index + match[0].length;
        // Find the matching closing brace
        let braceCount = 1;
        let endIndex = startIndex;
        
        for (let i = startIndex; i < cleaned.length; i++) {
            if (cleaned[i] === '{') braceCount++;
            if (cleaned[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                    endIndex = i;
                    break;
                }
            }
        }
        
        let body = cleaned.substring(startIndex, endIndex).trim();
        return body;
    }
    
    // If no test wrapper, return cleaned script
    return cleaned;
}

// ============================================
// SCREENSHOT
// ============================================
async function takeScreenshot(name = 'failure') {
    try {
        const path = `${CONFIG.screenshotDir}/${name}_${Date.now()}.png`;
        await page.screenshot({ path, fullPage: true });
        response.screenshots.push(path);
    } catch (e) {
        logError(`Screenshot failed: ${e.message}`);
    }
}

// ============================================
// MAIN EXECUTION
// ============================================
async function main() {
    const { script } = workerData;
    
    try {
        logInfo('Starting sandbox execution...');
        
        if (!script || !script.trim()) {
            throw new Error('Script is empty');
        }
        
        browser = await launchBrowser();
        logInfo(`Browser launched: ${CONFIG.browserType}`);
        
        await setupPage();
        logInfo('Page created');
        
        await executeScript(script);
        
        response.status = 'PASS';
        logInfo('Execution completed successfully');
        
    } catch (error) {
        response.status = 'FAIL';
        response.error = {
            message: error.message,
            stack: error.stack,
            line: extractLineFromStack(error.stack)
        };
        logError(`Execution failed: ${error.message}`);
        
        if (page) await takeScreenshot('failure');
        
    } finally {
        try {
            if (page) await page.close();
            if (context) await context.close();
            if (browser) await browser.close();
        } catch (e) {}
        
        response.executionTime = Date.now() - startTime;
        
        parentPort.postMessage(response);
    }
}

function extractLineFromStack(stack) {
    if (!stack) return null;
    const match = stack.match(/<anonymous>:(\d+):/);
    return match ? parseInt(match[1]) : null;
}

// Start
main().catch(err => {
    response.status = 'FAIL';
    response.error = { message: err.message, stack: err.stack };
    response.executionTime = Date.now() - startTime;
    try {
        parentPort.postMessage(response);
    } catch (e) {
        console.log('=== AIQA_RESPONSE_START ===');
        console.log(JSON.stringify(response));
        console.log('=== AIQA_RESPONSE_END ===');
    }
});
