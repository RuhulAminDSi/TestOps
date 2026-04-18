/**
 * Syntax Validator
 * Uses Acorn parser for JavaScript syntax validation
 */

const acorn = require('acorn');

const parseOptions = {
    ecmaVersion: 2022,
    sourceType: 'module',
    allowAwaitOutsideFunction: true,
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true
};

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
        
        if (!line || line.startsWith('//')) continue;
        
        if (line.startsWith('/*')) inBlockComment = true;
        if (inBlockComment) {
            if (line.includes('*/')) inBlockComment = false;
            continue;
        }
        
        // Count characters
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const prevChar = j > 0 ? line[j - 1] : '';
            
            if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
                if (!inString) {
                    inString = true;
                    stringChar = char;
                } else if (char === stringChar) {
                    inString = false;
                }
            }
            
            if (inString) continue;
            
            if (char === '(') parenCount++;
            if (char === ')') parenCount--;
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
            if (char === '[') bracketCount++;
            if (char === ']') bracketCount--;
        }
    }
    
    // Check for bracket mismatches
    if (parenCount !== 0) {
        errors.push({
            message: parenCount > 0 ? 'Missing closing parenthesis' : 'Extra closing parenthesis',
            line: lines.length,
            column: 0
        });
    }
    
    if (braceCount !== 0) {
        errors.push({
            message: braceCount > 0 ? 'Missing closing brace' : 'Extra closing brace',
            line: lines.length,
            column: 0
        });
    }
    
    if (bracketCount !== 0) {
        errors.push({
            message: bracketCount > 0 ? 'Missing closing bracket' : 'Extra closing bracket',
            line: lines.length,
            column: 0
        });
    }
    
    // Parse with Acorn for deeper validation
    if (errors.length === 0) {
        try {
            acorn.parse(script, parseOptions);
        } catch (e) {
            errors.push({
                message: e.message.split('\n')[0],
                line: e.loc?.line || 1,
                column: e.loc?.column || 0
            });
        }
    }
    
    // Check for meaningful code (not just random identifiers)
    if (errors.length === 0) {
        const hasPlaywrightCode = 
            script.includes('page.') || 
            script.includes('expect(') ||
            script.includes('locator(') ||
            script.includes('getBy') ||
            script.includes('goto(') ||
            script.includes('click(') ||
            script.includes('fill(');
        
        if (!hasPlaywrightCode) {
            // Check if it's just random words without any code
            const justWords = /^[a-zA-Z_\$][a-zA-Z0-9_\$]*(\s+[a-zA-Z_\$][a-zA-Z0-9_\$]*)*$/;
            if (justWords.test(script.trim())) {
                errors.push({
                    message: 'No valid Playwright code detected. Script must contain page.*, expect*, or locator* methods.',
                    line: 1,
                    column: 0
                });
            }
        }
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports = { validateSyntax };
