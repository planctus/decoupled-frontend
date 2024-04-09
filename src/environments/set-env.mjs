import { writeFile } from 'fs';
import { config } from 'dotenv';

const setEnv = async () => {
  // Load environment variables from .env file
  config({ path: 'src/environments/.env' });

  // Define environment configuration objects
  const envConfigFile = `export const environment = {
  production: false,
  enableDevToolRedux: true,
  graphqlUri: 'https://digit-ewpp-ext-decoupled-backend.acc.fpfis.tech.ec.europa.eu/api/graphql',
  basicAuthUsername: '${process.env.BASIC_AUTH_USERNAME}',
  basicAuthPassword: '${process.env.BASIC_AUTH_PASSWORD}',
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
