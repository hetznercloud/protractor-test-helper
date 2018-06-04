/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
// Usage: node tools/readmegenerator.js

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Config
const tempPath = 'temp-docs';
const docMarker = '## Functions';
interface DocConfig {
    file: string;
    headline: string;
}
const docFiles: DocConfig[] = [
    { file: 'actions', headline: 'Actions' },
    { file: 'waits', headline: 'Waits' },
    { file: 'helper', headline: 'Helper' },
    { file: 'window', headline: 'Window' },
    { file: 'utils', headline: 'Utils' },
];

function getDocPath(docFile: string): string {
    return `modules/_${docFile}_.md`;
}

async function fileToString(filePath: string): Promise<string> {
    const data = await readFile(filePath);
    return data.toString();
}
async function getFunctionDeclarationOfFile(filename: string): Promise<string> {
    let doc = await fileToString(`./${tempPath}/${filename}`);
    // search the start of part we need + extra linebreak
    const indexOfMarker =
        doc.search(new RegExp(`.*\n${docMarker}`)) + docMarker.length + 1;
    doc = doc.substr(indexOfMarker);
    return doc;
}

async function generateTsDocs(outPath: string): Promise<void> {
    const { error, stdout, stderr } = await exec(
        `yarn typedoc --out ./${outPath} ./lib --target ES5 --module commonjs --theme markdown --exclude index`
    );

    if (error) {
        console.error(`err ${stderr} after`);
        throw new Error('Could not generate docs');
    }
}

async function generateDoc(docConfig: DocConfig): Promise<string> {
    let doc: string = await getFunctionDeclarationOfFile(
        getDocPath(docConfig.file)
    );
    return `## ${docConfig.headline} ${doc}`;
}

async function generateDocs(docsConfig: DocConfig[]): Promise<string> {
    const docs: string[] = await Promise.all(
        docFiles.map(async (docConfig: DocConfig): Promise<string> => {
            return await generateDoc(docConfig);
        })
    );

    let doc: string = docs.join('');
    doc = doc.replace(/^(#+)/gm, '$1#');
    doc = doc.replace(/\*Defined in \[.*\)\*\n\n/gm, '');
    return `
<a id="api"></a>
## API
${doc}
`;
}

async function generateReadme(docs: string): Promise<string> {
    const readme: string = await fileToString('_docs/README.base.md');

    return `${readme}${docs}`;
}

async function cleanUp(): Promise<void> {
    return await exec(`rm -rf ${tempPath}`);
}
async function main(): Promise<void> {
    console.log('Start updating readme');
    console.log('Generate TsDoc');
    await generateTsDocs(tempPath);
    console.log('TsDocs generated');

    console.log('Generate Docs');
    console.log('Docs generated');
    const doc: string = await generateDocs(docFiles);
    const readme: string = await generateReadme(doc);
    await writeFile('README.md', readme);
    await cleanUp();
    console.log('README.md was updated');
}

main().catch(e => console.error(e));
