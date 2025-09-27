import { createPermissionRule, createPermissionResourceRef, createConditionFactory, createConditionExports } from '@backstage/plugin-permission-node';
import { z } from 'zod';

const homeResourceRef = createPermissionResourceRef().with({
    pluginId: 'catalog',
    resourceType: 'catalog-list',
})
export const canEnterHomePageRule = createPermissionRule<any, {user: string }>({
    name: 'catalog.list.entity',
    description: 'Grants access to the home page',
    resourceRef: homeResourceRef,
    paramsSchema: z.object({
        user: z.string().optional(),
    }) as any,
    apply: (request, user) => {
        console.log("canEnterHomePageRule", { request, user })
        return false;
    },
    toQuery: ( params ) => {
        return {
            key: 'relations.memberof',
            values: params.user,
        }
    }
})
const { conditions, createConditionalDecision } = createConditionExports({
    resourceRef: homeResourceRef,
    rules: {
        canEnterHomePageRule,
    },
})
export const homePermissionConditions = conditions;
export const createHomeConditionalDecision = createConditionalDecision;

export const canEnterHomePage = createConditionFactory(canEnterHomePageRule)