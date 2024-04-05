import { EuiEnvConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
    production: false,
    enableDevToolRedux: true,
    graphqlUri: 'http://localhost:8080/web/api/graphql',
    envDynamicConfig: {
        uri: 'assets/env-json-config.json',
        deepMerge: true,
        merge: ['modules'],
    },
};
