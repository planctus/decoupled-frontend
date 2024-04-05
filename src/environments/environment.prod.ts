import { EuiEnvConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
    production: true,
    enableDevToolRedux: false,
    graphqlUri: 'https://digit-ewpp-ext-decoupled-backend.acc.fpfis.tech.ec.europa.eu/api/graphql',
    envDynamicConfig: {
        uri: 'assets/env-json-config.json',
        deepMerge: true,
        merge: ['modules'],
    },
};
