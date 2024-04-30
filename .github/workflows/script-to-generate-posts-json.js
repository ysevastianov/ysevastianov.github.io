const fs = require('fs');
const path = require('path');

const postsDirectory = './posts';
const outputFile = './posts/posts.json';

fs.readdir(postsDirectory, (err, files) => {
    if (err) {
        console.log('Error reading directory:', err);
        return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));
    fs.writeFileSync(outputFile, JSON.stringify(htmlFiles), 'utf8');
});
