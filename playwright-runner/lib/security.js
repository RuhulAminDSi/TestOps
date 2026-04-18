/**
 * Security Filter Layer
 * 
 * Blocks dangerous operations in user scripts
 * Provides safe execution environment
 */

const DANGEROUS_PATTERNS = [
    // File system
    { pattern: /require\s*\(\s*['"]fs['"]/g, message: 'fs module is blocked' },
    { pattern: /import\s+.*\s+from\s+['"]fs['"]/g, message: 'fs module is blocked' },
    { pattern: /require\s*\(\s*['"]fs-extra['"]/g, message: 'fs-extra module is blocked' },
    { pattern: /require\s*\(\s*['"]path['"]/g, message: 'path module is blocked' },
    
    // Child process
    { pattern: /require\s*\(\s*['"]child_process['"]/g, message: 'child_process is blocked' },
    { pattern: /import\s+.*\s+from\s+['"]child_process['"]/g, message: 'child_process is blocked' },
    { pattern: /\.exec\s*\(/g, message: 'child_process.exec is blocked' },
    { pattern: /\.spawn\s*\(/g, message: 'child_process.spawn is blocked' },
    { pattern: /\.execSync\s*\(/g, message: 'child_process.execSync is blocked' },
    
    // Process control
    { pattern: /process\.exit/g, message: 'process.exit is blocked' },
    { pattern: /process\.kill/g, message: 'process.kill is blocked' },
    { pattern: /process\.cwd/g, message: 'process.cwd is blocked' },
    { pattern: /process\.env/g, message: 'process.env access is blocked' },
    
    // Eval-like
    { pattern: /\beval\s*\(/g, message: 'eval is blocked' },
    { pattern: /\bFunction\s*\(/g, message: 'Function constructor is blocked' },
    { pattern: /\bsetImmediate\s*\(/g, message: 'setImmediate is blocked' },
    { pattern: /\bsetTimeout\s*\(\s*function/g, message: 'setTimeout with function is blocked' },
    { pattern: /\bsetInterval\s*\(\s*function/g, message: 'setInterval with function is blocked' },
    
    // Network / OS
    { pattern: /require\s*\(\s*['"]net['"]/g, message: 'net module is blocked' },
    { pattern: /require\s*\(\s*['"]http['"]/g, message: 'http module is blocked' },
    { pattern: /require\s*\(\s*['"]https['"]/g, message: 'https module is blocked' },
    { pattern: /require\s*\(\s*['"]tls['"]/g, message: 'tls module is blocked' },
    { pattern: /require\s*\(\s*['"]dgram['"]/g, message: 'dgram module is blocked' },
    { pattern: /require\s*\(\s*['"]dns['"]/g, message: 'dns module is blocked' },
    { pattern: /require\s*\(\s*['"]os['"]/g, message: 'os module is blocked' },
    { pattern: /require\s*\(\s*['"]cluster['"]/g, message: 'cluster module is blocked' },
    
    // Crypto
    { pattern: /require\s*\(\s*['"]crypto['"]/g, message: 'crypto module is blocked' },
    { pattern: /require\s*\(\s*['"]tls['"]/g, message: 'tls module is blocked' },
    
    // Worker threads
    { pattern: /require\s*\(\s*['"]worker_threads['"]/g, message: 'worker_threads is blocked' },
    { pattern: /import\s+.*\s+from\s+['"]worker_threads['"]/g, message: 'worker_threads is blocked' },
    
    // VM
    { pattern: /require\s*\(\s*['"]vm['"]/g, message: 'vm module is blocked' },
    { pattern: /\bnew\s+vm\.Script/g, message: 'vm.Script is blocked' },
    
    // Readline
    { pattern: /require\s*\(\s*['"]readline['"]/g, message: 'readline module is blocked' },
    
    // Zlib
    { pattern: /require\s*\(\s*['"]zlib['"]/g, message: 'zlib module is blocked' },
    
    // Buffer manipulation
    { pattern: /new\s+Buffer\s*\(/g, message: 'Buffer is deprecated, use Buffer.from' },
    
    // Dangerous globals
    { pattern: /__dirname/g, message: '__dirname is blocked' },
    { pattern: /__filename/g, message: '__filename is blocked' },
    { pattern: /global\s*\./g, message: 'global scope access is blocked' },
    { pattern: /globalThis\s*\./g, message: 'globalThis scope access is blocked' },
    
    // Require arbitrary modules
    { pattern: /require\s*\(\s*['"][a-zA-Z0-9_\-]+['"]/g, message: 'arbitrary require is blocked' },
    
    // File operations via Playwright
    { pattern: /page\.on\s*\(\s*['"]filechooser/g, message: 'filechooser handler may be blocked' },
];

function checkSecurity(script) {
    const errors = [];
    const lines = script.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const lineNum = i + 1;
        
        if (!line || line.startsWith('//')) continue;
        if (line.startsWith('/*') || line.startsWith('*')) continue;
        
        for (const check of DANGEROUS_PATTERNS) {
            const match = line.match(check.pattern);
            if (match) {
                errors.push({
                    message: check.message,
                    line: lineNum,
                    column: line.indexOf(match[0]),
                    pattern: check.pattern.source
                });
            }
        }
    }
    
    return {
        safe: errors.length === 0,
        errors
    };
}

// Transform script to block dangerous operations
function sanitizeScript(script) {
    let sanitized = script;
    
    // Remove dangerous patterns (replace with safe versions)
    sanitized = sanitized.replace(/\bprocess\.exit\s*\([^)]*\)/g, '// process.exit blocked');
    sanitized = sanitized.replace(/\bprocess\.kill\s*\([^)]*\)/g, '// process.kill blocked');
    sanitized = sanitized.replace(/\bprocess\.cwd\s*\(\s*\)/g, '"/"');
    sanitized = sanitized.replace(/\bprocess\.env\s*/g, '({}) // process.env blocked');
    
    return sanitized;
}

module.exports = { checkSecurity, sanitizeScript, DANGEROUS_PATTERNS };
