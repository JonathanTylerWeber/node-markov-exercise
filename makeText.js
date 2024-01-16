const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function readFile(path) {
    try {
        const data = await fs.promises.readFile(path, 'utf8');
        return data;
    } catch (error) {
        console.error(`Error reading file '${path}':`, error.message);
        process.exit(1);
    }
}

async function readUrl(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching URL '${url}':`, error.message);
        process.exit(1);
    }
}

async function main() {
    if (process.argv.length !== 4) {
        console.error('Usage: node makeText.js [file|url] [path]');
        process.exit(1);
    }

    const sourceType = process.argv[2];
    const sourcePath = process.argv[3];

    let text;

    if (sourceType === 'file') {
        text = await readFile(sourcePath);
    } else if (sourceType === 'url') {
        text = await readUrl(sourcePath);
    } else {
        console.error('Invalid source type. Use "file" or "url".');
        process.exit(1);
    }

    const mm = new MarkovMachine(text);
    const generatedText = mm.makeText();
    console.log(generatedText);
}

main();