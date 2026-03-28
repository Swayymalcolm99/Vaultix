const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.next' || file.startsWith('.')) continue;
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, callback);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            callback(filepath);
        }
    }
}

let modified = 0;
walk('./', (filepath) => {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;

    content = content.replace(/['"]([./]+)ui\/Select['"]/g, "'$1ui/BasicSelect'");
    content = content.replace(/['"]@\/components\/Providers['"]/g, "'@/components/layout/Providers'");
    content = content.replace(/['"]@\/components\/ui\/Select['"]/g, "'@/components/ui/BasicSelect'");

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        modified++;
        console.log(`Fixed in: ${filepath}`);
    }
});
console.log(`Done. Modified ${modified} files.`);
