/** Services */
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

/** Environments */

/**
 * KEYCLOAK initializer
 * Author yguenounou<br/>
 * Version NBA 1.0<br/>
 * Copyright oodrive 2022-2023
 */
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clients.injobFront.clientId,
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            //   This is an action we specified on keycloak load
            //   We have two options : 'login-required'|'check-sso'
            //   If is set to 'login-required' this means your browser will do a full redirect to the Keycloak server and back to your application.
            //   If is set to  'check-sso'  instead this action will be performed in a hidden iframe, so your application resources only need to be loaded and parsed once by the browser.
            //   Then you will need to add the silentCheckSsoRedirectUri and create a html file   silent-check-sso.html with this content
            // <html>
            //    <body>
            //         <script>
            //           parent.postMessage(location.href, location.origin);
            //         </script>
            //      </body>
            // </html>
            onLoad: 'login-required',
            checkLoginIframe: true,
          },
        });
        resolve(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}
