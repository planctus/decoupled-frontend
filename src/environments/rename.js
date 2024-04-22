const fs = require('fs');

const sourceFile = 'src/environments/environment.js';
const targetFile = 'src/environments/environment.mjs';
const sourceProdFile = 'src/environments/environment.prod.js';
const targetProdFile = 'src/environments/environment.prod.mjs';

fs.renameSync(sourceFile, targetFile, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`File renamed successfully: ${sourceFile} -> ${targetFile}`);
  }
});

fs.renameSync(sourceProdFile, targetProdFile, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`File renamed successfully: ${sourceProdFile} -> ${targetProdFile}`);
  }
});
