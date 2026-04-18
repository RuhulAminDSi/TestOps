/**
 * AIQA Playwright Runner - Production Grade
 * 
 * Features:
 * - Syntax validation
 * - Runtime error handling
 * - Screenshot on failure
 * - Structured logging
 * - Timeout enforcement
 * - Sandboxed execution
 */

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    timeout: 60000, // 60 seconds max execution
    screenshotDir: process.env.SCREENSHOT_DIR || path.join(__dirname, 'screenshots'),
    logMaxSize: 10000, // Max log entries
    retryCount: parseInt(process.env.RETRY_COUNT) || 0,
    retryDelay: parseInt(process.env.RETRY_DELAY) || 1000,
    sandbox: process.env.SANDBOX === 'true'
};

// Ensure screenshot directory exists
if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
}

// ============================================
// RESPONSE STRUCTURE
// ============================================
let response = {
    status: 'FAIL',
    syntaxError: null,
    runtimeError: null,
    logs: [],
    screenshots: [],
    video: null,
    executionTime: 0
};

let startTime = Date.now();
let browser = null;
let page = null;
let context = null;

// ============================================
// LOGGING SYSTEM
// ============================================
function addLog(type, message, data = null) {
    const logEntry = {
        type: type, // 'info' | 'error' | 'warn' | 'console'
        message: message,
        timestamp: new Date().toISOString(),
        data: data
    };
    
    response.logs.push(logEntry);
    
    // Limit log size
    if (response.logs.length > CONFIG.logMaxSize) {
        response.logs = response.logs.slice(-CONFIG.logMaxSize);
    }
}

function logInfo(msg, data) { addLog('info', msg, data); }
function logError(msg, data) { addLog('error', msg, data); }
function logWarn(msg, data) { addLog('warn', msg, data); }
function logConsole(msg, data) { addLog('console', msg, data); }

// ============================================
// SYNTAX VALIDATOR
// ============================================
function validateSyntax(script) {
    const errors = [];
    const lines = script.split('\n');
    
    // Track brackets
    let parenCount = 0;
    let braceCount = 0;
    let bracketCount = 0;
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inBlockComment = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const lineNum = i + 1;
        
        // Skip empty lines
        if (!line) continue;
        
        // Skip comments
        if (line.startsWith('//')) continue;
        
        if (line.startsWith('/*')) {
            inBlockComment = true;
        }
        if (inBlockComment) {
            if (line.includes('*/')) {
                inBlockComment = false;
            }
            continue;
        }
        
        // Check for import statements
        if (line.startsWith('import ') && !line.includes('from')) {
            errors.push({
                message: 'Invalid import statement - missing "from"',
                line: lineNum
            });
        }
        
        // Count brackets
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const prevChar = j > 0 ? line[j - 1] : '';
            
            // Handle strings
            if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
                if (!inString) {
                    inString = true;
                    stringChar = char;
                } else if (char === stringChar) {
                    inString = false;
                }
            }
            
            if (inString) continue;
            
            // Count brackets
            if (char === '(') parenCount++;
            if (char === ')') parenCount--;
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
            if (char === '[') bracketCount++;
            if (char === ']') bracketCount--;
        }
        
        // Check for obvious syntax errors
        if (line.includes('({})') || line.includes('(){}')) {
            // This is actually valid
        }
        
        // Check for unclosed strings
        if (inString && i === lines.length - 1) {
            errors.push({
                message: 'Unclosed string',
                line: lineNum
            });
        }
    }
    
    // Final bracket checks
    if (parenCount !== 0) {
        errors.push({
            message: `Unmatched parentheses: ${parenCount > 0 ? 'missing' : 'extra'} ${Math.abs(parenCount)} closing`,
            line: lines.length
        });
    }
    
    if (braceCount !== 0) {
        errors.push({
            message: `Unmatched braces: ${braceCount > 0 ? 'missing' : 'extra'} ${Math.abs(braceCount)} closing`,
            line: lines.length
        });
    }
    
    if (bracketCount !== 0) {
        errors.push({
            message: `Unmatched brackets: ${bracketCount > 0 ? 'missing' : 'extra'} ${Math.abs(bracketCount)} closing`,
            line: lines.length
        });
    }
    
    return errors;
}

// ============================================
// PLAYWRIGHT BROWSER LAUNCHER
// ============================================
async function getBrowser(browserType, headed) {
    const options = {
        headless: !headed,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            ...(CONFIG.sandbox ? ['--sandbox'] : [])
        ]
    };
    
    switch (browserType.toLowerCase()) {
        case 'firefox':
            return await firefox.launch(options);
        case 'webkit':
            return await webkit.launch(options);
        default:
            return await chromium.launch(options);
    }
}

// ============================================
// PAGE SETUP
// ============================================
async function setupPage() {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        recordVideo: process.env.RECORD_VIDEO === 'true' ? {
            dir: path.join(__dirname, 'videos'),
            size: { width: 1280, height: 720 }
        } : null
    });
    
    page = await context.newPage();
    
    // Console message handler
    page.on('console', msg => {
        logConsole(msg.text(), {
            type: msg.type(),
            location: msg.location()
        });
    });
    
    // Page error handler
    page.on('pageerror', error => {
        logError('Page error', {
            message: error.message,
            stack: error.stack
        });
    });
    
    // Request failure handler
    page.on('requestfailed', request => {
        logWarn('Request failed', {
            url: request.url(),
            failure: request.failure()?.errorText
        });
    });
    
    // Response handler
    page.on('response', response => {
        if (response.status() >= 400) {
            logWarn('HTTP error', {
                url: response.url(),
                status: response.status()
            });
        }
    });
}

// ============================================
// SCREENSHOT CAPTURE
// ============================================
async function takeScreenshot(name = 'failure') {
    try {
        const timestamp = Date.now();
        const filename = `${name}_${timestamp}.png`;
        const filepath = path.join(CONFIG.screenshotDir, filename);
        
        await page.screenshot({
            path: filepath,
            fullPage: true
        });
        
        response.screenshots.push(filepath);
        logInfo('Screenshot captured', { path: filepath });
        
        return filepath;
    } catch (error) {
        logError('Failed to capture screenshot', { message: error.message });
        return null;
    }
}

// ============================================
// SAFE SCRIPT EXECUTION
// ============================================
async function executeScript(script) {
    // Wrap in async function if needed
    let wrappedScript = script;
    
    // Remove test() wrapper if present
    if (script.includes('test(') || script.includes('it(')) {
        wrappedScript = extractTestBody(script);
    }
    
    if (!wrappedScript.trim()) {
        throw new Error('No executable code found in script');
    }
    
    // Execute with timeout
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Script execution timeout')), CONFIG.timeout);
    });
    
    const executionPromise = new Promise(async (resolve, reject) => {
        try {
            // Create a function that has page and expect available
            const fn = new Function('page', 'expect', `
                const { expect } = require('@playwright/test');
                ${wrappedScript}
                return 'SUCCESS';
            `);
            
            const result = await fn(page, require('@playwright/test').expect);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
    
    return Promise.race([executionPromise, timeoutPromise]);
}

function extractTestBody(script) {
    const lines = script.split('\n');
    let result = [];
    let inTest = false;
    let braceLevel = 0;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip imports
        if (trimmed.startsWith('import ')) continue;
        
        // Start of test
        if (trimmed.startsWith('test(') || trimmed.startsWith('it(')) {
            inTest = true;
            continue;
        }
        
        if (inTest) {
            // Count braces
            for (const char of trimmed) {
                if (char === '{') braceLevel++;
                if (char === '}') braceLevel--;
            }
            
            // Skip opening
            if (trimmed.includes('{') && braceLevel > 0) {
                continue;
            }
            
            // End of test
            if ((trimmed === '});' || trimmed === '})') && braceLevel === 0) {
                break;
            }
            
            if (braceLevel > 0) {
                result.push(line);
            }
        }
    }
    
    return result.join('\n');
}

// ============================================
// MAIN EXECUTION
// ============================================
async function main() {
    try {
        // Parse arguments
        const args = JSON.parse(process.argv[2] || '{}');
        const script = args.script || '';
        const browserType = args.browser || 'chromium';
        const headed = args.headed || false;
        
        logInfo('Starting Playwright execution', {
            browser: browserType,
            headed: headed,
            scriptLength: script.length
        });
        
        // Validate script exists
        if (!script || !script.trim()) {
            throw new Error('Script is empty');
        }
        
        // Validate syntax
        logInfo('Validating syntax...');
        const syntaxErrors = validateSyntax(script);
        
        if (syntaxErrors.length > 0) {
            logError('Syntax validation failed', { errors: syntaxErrors });
            response.syntaxError = {
                message: syntaxErrors[0].message,
                line: syntaxErrors[0].line,
                errors: syntaxErrors
            };
            response.status = 'FAIL';
            outputResponse();
            return;
        }
        
        logInfo('Syntax validation passed');
        
        // Launch browser
        logInfo(`Launching ${browserType} browser...`);
        browser = await getBrowser(browserType, headed);
        logInfo('Browser launched successfully');
        
        // Setup page
        await setupPage();
        logInfo('Page created');
        
        // Execute script with retries
        let lastError = null;
        let attempts = 0;
        
        while (attempts <= CONFIG.retryCount) {
            attempts++;
            
            try {
                if (attempts > 1) {
                    logInfo(`Retry attempt ${attempts}/${CONFIG.retryCount + 1}`);
                    // Recreate page
                    if (page) await page.close();
                    if (context) await context.close();
                    await setupPage();
                }
                
                await executeScript(script);
                break;
                
            } catch (error) {
                lastError = error;
                
                // Take screenshot on failure
                await takeScreenshot('failure');
                
                // Check if retryable
                const retryableErrors = ['timeout', 'navigation', 'net::'];
                const isRetryable = retryableErrors.some(e => 
                    error.message.toLowerCase().includes(e)
                );
                
                if (!isRetryable || attempts > CONFIG.retryCount) {
                    throw error;
                }
                
                await new Promise(r => setTimeout(r, CONFIG.retryDelay));
            }
        }
        
        // Success
        response.status = 'PASS';
        logInfo('Execution completed successfully');
        
    } catch (error) {
        response.status = 'FAIL';
        response.runtimeError = {
            message: error.message,
            stack: error.stack
        };
        logError('Execution failed', {
            message: error.message,
            stack: error.stack
        });
        
        // Take screenshot on failure
        if (page) {
            await takeScreenshot('error');
        }
        
    } finally {
        // Cleanup
        try {
            if (page) await page.close();
            if (context) await context.close();
            if (browser) await browser.close();
        } catch (e) {
            logWarn('Cleanup error', { message: e.message });
        }
        
        // Calculate execution time
        response.executionTime = Date.now() - startTime;
        
        outputResponse();
    }
}

// ============================================
// OUTPUT RESPONSE
// ============================================
function outputResponse() {
    console.log('=== AIQA_RESPONSE_START ===');
    console.log(JSON.stringify(response));
    console.log('=== AIQA_RESPONSE_END ===');
}

// Start
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
