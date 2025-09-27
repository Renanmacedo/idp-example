import { CatalogIndexPage } from '@backstage/plugin-catalog';
import type {  ResourcePermission} from '@backstage/plugin-permission-common'
import { usePermission } from '@backstage/plugin-permission-react';
const permission: ResourcePermission = {
  name: 'catalog.list.entity',
  attributes: {
    action: 'update',
  },
  type: 'resource',
  resourceType: 'catalog-list',
};

export const CatalogPage = () => {
    const { allowed, loading } = usePermission({ permission: permission, resourceRef: 'component:default/example-frontend' })
    console.log("permission catalog", { allowed, loading })

    return <CatalogIndexPage />
}