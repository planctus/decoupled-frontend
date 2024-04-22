import { writeFile } from 'fs';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(process.env);
const setEnv = async () => {
  // Load environment variables from .env file
  const envPath = resolve(__dirname, '../../.env');
  config({ path: envPath });

  // Define environment configuration objects
  const envConfigFile = `export const environment = {
  production: false,
  enableDevToolRedux: true,
  graphqlUri: '${process.env.GRAPHQL_ENDPOINT}',
  basicAuthUsername: '${process.env.BASIC_AUTH_USERNAME}',
  basicAuthPassword: '${process.env.BASIC_AUTH_PASSWORD}',
  baseUrl: '${process.env.BASIC_URL_DEV}',
  envDynamicConfig: {
    uri: 'assets/env-json-config.json',
    deepMerge: true,
    merge: ['modules'],
  },
};`;

  const envConfigFileProd = `export const environment = {
  production: true,
  enableDevToolRedux: true,
  graphqlUri: 'https://digit-ewpp-ext-decoupled-backend.acc.fpfis.tech.ec.europa.eu/api/graphql',
  basicAuthUsername: '${process.env.BASIC_AUTH_USERNAME}',
  basicAuthPassword: '${process.env.BASIC_AUTH_PASSWORD}',
  baseUrl: '${process.env.BASIC_URL_PROD}',
  envDynamicConfig: {
    uri: 'assets/env-json-config.json',
    deepMerge: true,
    merge: ['modules'],
  },
};`;

  try {
    // Write environment.ts file
    await writeFileAsync('./src/environments/environment.ts', envConfigFile);
    console.log(`Angular environment.ts file generated correctly`);

    // Write environment.prod.ts file
    await writeFileAsync('./src/environments/environment.prod.ts', envConfigFileProd);
    console.log(`Angular environment.prod.ts file generated correctly`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Helper function to promisify writeFile
const writeFileAsync = (filePath, data) => {
  return new Promise((resolve, reject) => {
    writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

setEnv();
