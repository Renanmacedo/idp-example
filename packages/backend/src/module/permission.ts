import { createBackendModule } from "@backstage/backend-plugin-api";
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha'
import { PermissionPolicy, PolicyQuery } from "@backstage/plugin-permission-node";
import { AuthorizeResult, isPermission, PolicyDecision } from "@backstage/plugin-permission-common";
import {  homePermission } from "@internal/backstage-plugin-permission-common";
import { canEnterHomePage, createHomeConditionalDecision } from "../permission/rule";


class ExemplePermissionPolicy implements PermissionPolicy {
  async handle(request: PolicyQuery, user?: any): Promise<PolicyDecision> {

    if(isPermission(request.permission, homePermission)) {
        return createHomeConditionalDecision(request.permission, canEnterHomePage({ user: user?.info.userEntityRef ?? '' }));
    }
    return { result: AuthorizeResult.ALLOW }
  }
}
export default createBackendModule({
  pluginId: 'permission',
  moduleId: 'permission-policy',
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint},
      async init({ policy }) {
        policy.setPolicy(new ExemplePermissionPolicy());
      }
    });
  }
});