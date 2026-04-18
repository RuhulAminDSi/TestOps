/**
 * AIQA Sandbox Orchestrator
 * 
 * Main entry point for sandbox execution
 * Uses worker_threads for isolation
 * Handles communication with Spring Boot
 */

const { Worker } = require('worker_threads');
const path = require('path');
const fs = require('fs');
let validateSyntax;
let checkSecurity;
let sanitizeScript;

try {
    const validatorModule = require('./lib/validator');
    validateSyntax = validatorModule.validateSyntax;
} catch (e) {
    console.error('[Sandbox] Failed to load validator:', e.message);
    validateSyntax = (script) => ({ valid: true, errors: [] });
}

try {
    const securityModule = require('./lib/security');
    checkSecurity = securityModule.checkSecurity;
    sanitizeScript = securityModule.sanitizeScript;
} catch (e) {
    console.error('[Sandbox] Failed to load security module:', e.message);
    checkSecurity = (script) => ({ safe: true, errors: [] });
    sanitizeScript = (script) => script;
}

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    workerPath: path.join(__dirname, 'sandbox-worker.js'),
    timeout: parseInt(process.env.EXECUTION_TIMEOUT) || 30000,
    maxRetries: parseInt(process.env.MAX_RETRIES) || 0,
    screenshotDir: process.env.SCREENSHOT_DIR || path.join(__dirname, '../screenshots')
};

// Ensure screenshot directory exists
if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
}

// ============================================
// MAIN EXECUTION FUNCTION
// ============================================
async function executeSandbox(script, options = {}) {
    const {
        browser = 'chromium',
        headless = true,
        timeout = CONFIG.timeout
    } = options;
    
    // Initialize response
    let response = {
        status: 'SYNTAX_ERROR',
        logs: [],
        error: null,
        screenshots: [],
        video: null,
        executionTime: 0
    };
    
    const startTime = Date.now();
    
    try {
        // Step 1: Syntax validation
        console.log('[Sandbox] Validating syntax...');
        const syntaxResult = validateSyntax(script);
        
        if (!syntaxResult.valid) {
            response.status = 'SYNTAX_ERROR';
            response.error = {
                message: syntaxResult.errors[0].message,
                line: syntaxResult.errors[0].line,
                column: syntaxResult.errors[0].column,
                errors: syntaxResult.errors
            };
            response.logs.push({
                type: 'error',
                message: `Syntax error: ${syntaxResult.errors[0].message}`,
                timestamp: new Date().toISOString()
            });
            return response;
        }
        
        // Step 2: Security check
        console.log('[Sandbox] Checking security...');
        const securityResult = checkSecurity(script);
        
        if (!securityResult.safe) {
            response.status = 'FAIL';
            response.error = {
                message: securityResult.errors[0].message,
                line: securityResult.errors[0].line,
                errors: securityResult.errors
            };
            response.logs.push({
                type: 'error',
                message: `Security violation: ${securityResult.errors[0].message}`,
                timestamp: new Date().toISOString()
            });
            return response;
        }
        
        // Step 3: Sanitize script
        script = sanitizeScript(script);
        
        // Step 4: Execute in worker thread
        console.log('[Sandbox] Executing in worker thread...');
        response = await executeInWorker(script, { browser, headless, timeout });
        
        return response;
        
    } catch (error) {
        response.status = 'FAIL';
        response.error = {
            message: error.message,
            stack: error.stack
        };
        response.logs.push({
            type: 'error',
            message: `Execution error: ${error.message}`,
            timestamp: new Date().toISOString()
        });
        
        return response;
    }
}

// ============================================
// WORKER THREAD EXECUTION
// ============================================
function executeInWorker(script, options) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(CONFIG.workerPath, {
            workerData: {
                script,
                browser: options.browser,
                headless: options.headless,
                timeout: options.timeout,
                screenshotDir: CONFIG.screenshotDir
            }
        });
        
        let timeoutHandle;
        
        // Set timeout
        if (options.timeout) {
            timeoutHandle = setTimeout(() => {
                worker.terminate();
                resolve({
                    status: 'TIMEOUT',
                    logs: [{
                        type: 'error',
                        message: `Execution timed out after ${options.timeout}ms`,
                        timestamp: new Date().toISOString()
                    }],
                    error: { message: 'Execution timed out' },
                    screenshots: [],
                    video: null,
                    executionTime: options.timeout
                });
            }, options.timeout);
        }
        
        worker.on('message', (result) => {
            if (timeoutHandle) clearTimeout(timeoutHandle);
            resolve(result);
        });
        
        worker.on('error', (error) => {
            if (timeoutHandle) clearTimeout(timeoutHandle);
            const execTime = typeof startTime !== 'undefined' ? Date.now() - startTime : 0;
            resolve({
                status: 'FAIL',
                logs: [{
                    type: 'error',
                    message: `Worker error: ${error.message}`,
                    timestamp: new Date().toISOString()
                }],
                error: { message: error.message, stack: error.stack },
                screenshots: [],
                video: null,
                executionTime: execTime
            });
        });
        
        worker.on('exit', (code) => {
            if (timeoutHandle) clearTimeout(timeoutHandle);
            if (code !== 0 && code !== null) {
                console.log('[Sandbox] Worker exited with code:', code);
            }
        });
    });
}

// ============================================
// CLI HANDLER
// ============================================
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.error('Usage: node sandbox.js <script|script-file> [options]');
        console.error('Options: --browser=chromium --headless=true --timeout=30000');
        process.exit(1);
    }
    
    let script = args[0];
    const options = {
        browser: 'chromium',
        headless: true,
        timeout: 30000
    };
    
    // Parse options
    args.slice(1).forEach(arg => {
        if (arg.startsWith('--browser=')) options.browser = arg.split('=')[1];
        if (arg.startsWith('--headless=')) options.headless = arg.split('=')[1] === 'true';
        if (arg.startsWith('--timeout=')) options.timeout = parseInt(arg.split('=')[1]);
    });
    
    // Check if first argument is a file path
    if (fs.existsSync(script)) {
        console.log('[Sandbox] Loading script from file:', script);
        script = fs.readFileSync(script, 'utf-8');
    }
    
    executeSandbox(script, options).then(result => {
        console.log('=== AIQA_RESPONSE_START ===');
        console.log(JSON.stringify(result, null, 2));
        console.log('=== AIQA_RESPONSE_END ===');
        process.exit(result.status === 'PASS' ? 0 : 1);
    }).catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { executeSandbox };
