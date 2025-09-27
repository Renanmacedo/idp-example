import { createBackendModule } from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha'
import { MonorepoProcessor } from '../processor';

export const catalogModule = createBackendModule({
    pluginId: 'catalog',
    moduleId: 'catalog-module',
    register(env) {
        env.registerInit({
            deps: {
                catalog: catalogProcessingExtensionPoint
            },
            async init({ catalog }) {
                catalog.addProcessor(new MonorepoProcessor())
            }
        })
    },
});
