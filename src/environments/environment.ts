export const environment = {
  production: false,
  debug: true,
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8080/',

    // Realm
    realm: 'in_job',

    // clients
    clients: {
      injobFront: {
        clientId: 'injob-front',
      },
    },
  },

  API_URL: 'http://localhost:8081/back/api',
};
