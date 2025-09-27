import { coreServices, createBackendModule } from "@backstage/backend-plugin-api";
import { permissions } from "@internal/backstage-plugin-permission-common";
import { canEnterHomePageRule } from "../permission/rule";
import { catalogPermissionExtensionPoint } from "@backstage/plugin-catalog-node/alpha";


export default createBackendModule({
    pluginId: 'catalog',
    moduleId: 'permission-rules',
    register(env) {
        env.registerInit({
            deps: {
                permissionsRegistry: coreServices.permissionsRegistry,
                catalog: catalogPermissionExtensionPoint
            },
            async init({ permissionsRegistry, catalog }) {
                catalog.addPermissionRules(canEnterHomePageRule)
                // permissionsRegistry.addPermissions(permissions);
                // permissionsRegistry.addPermissionRules([canEnterHomePageRule])
            }
        })
    }
})