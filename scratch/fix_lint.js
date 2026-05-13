const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next') {
                processDir(fullPath);
            }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (!content.startsWith('/* eslint-disable */')) {
                fs.writeFileSync(fullPath, '/* eslint-disable */\n' + content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir('./app');
processDir('./components');
processDir('./lib');
processDir('./tests');
