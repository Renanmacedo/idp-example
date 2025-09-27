import { createPermission } from "@backstage/plugin-permission-common";


export const homePermission = createPermission({
   name: 'catalog.list.entity',
   attributes: {
      action: 'update',
   },
   resourceType: 'catalog-list'
})

export const permissions = [homePermission];