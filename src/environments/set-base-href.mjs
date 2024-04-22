import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { environment as devEnvironment } from './environment.mjs';
import { environment as prodEnvironment } from './environment.prod.mjs';

const env = process.argv[2];

const environment = env === 'dev' ? devEnvironment : prodEnvironment;

// Get the directory name of the current ESM file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const indexHtmlPath = '../../dist/browser/index.html';

// Resolve the absolute path to index.html
const resolvedIndexPath = path.resolve(__dirname, indexHtmlPath);

console.log('Resolved Index HTML Path:', resolvedIndexPath);

try {
    // Check if the file exists
    if (fs.existsSync(resolvedIndexPath)) {
        let indexHtml = fs.readFileSync(resolvedIndexPath, 'utf-8');
		const baseHref = environment.baseUrl ? environment.baseUrl : '/';
        indexHtml = indexHtml.replace('<base href="/">', `<base href="${baseHref}">`);

        fs.writeFileSync(resolvedIndexPath, indexHtml, 'utf-8');

        console.log(`Base href set to: ${baseHref}`);
    } else {
        console.error(`Error: File '${resolvedIndexPath}' does not exist.`);
    }
} catch (err) {
    console.error(`Error reading or writing file: ${err}`);
}
