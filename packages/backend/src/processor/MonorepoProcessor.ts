import {
  CatalogProcessor,
  CatalogProcessorCache,
  CatalogProcessorEmit,
  processingResult,
} from '@backstage/plugin-catalog-node';
import { LocationSpec } from '@backstage/plugin-catalog-common';
import { Entity, getCompoundEntityRef, CompoundEntityRef, parseEntityRef } from '@backstage/catalog-model';

export class MonorepoProcessor implements CatalogProcessor {
  getProcessorName(): string {
    return MonorepoProcessor.name;
  }
  async postProcessEntity(
    entity: Entity,
    location: LocationSpec,
    emit: CatalogProcessorEmit,
    cache: CatalogProcessorCache,
  ): Promise<Entity> {
    if (entity.kind !== 'Component' || !entity.metadata?.repositoryId) {
      return entity;
    }
    const selfEntity = getCompoundEntityRef(entity);
    this.emitMonorepoRelation((entity as any).metadata?.siblings, selfEntity, emit);
    return entity;
  }

  private emitMonorepoRelation(targets: string[] | string | undefined,source: CompoundEntityRef, emit: CatalogProcessorEmit) {
    if(!targets) return;
    const normalizedTargets = Array.isArray(targets) ? targets.flat() : [targets]
    for (const target of normalizedTargets) {
      const targetRef = parseEntityRef(target, {
        defaultKind: 'Component',
        defaultNamespace: source.namespace ?? 'default',
      });
      emit(
      processingResult.relation({
        source,
        type: 'siblingOf',
        target: {
          kind: 'Component',
          namespace: targetRef.namespace,
          name: targetRef.name,
        },
      }),
    );
    emit(
      processingResult.relation({
        source: {
         kind: 'Component',
          namespace: targetRef.namespace ?? 'default',
          name: targetRef.name,
        },
        type: 'hasSibling',
        target: source,
      }),
    );
    }
  }
}
