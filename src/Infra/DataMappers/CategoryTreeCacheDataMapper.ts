import { CategoryTree } from '../../Category/Models/CategoryTree'
import { EntityDataMapperContract } from '../../Core/DataMappers/Contracts/EntityDataMapperContract'

export class CategoryTreeCacheDataMapper extends EntityDataMapperContract<
  CategoryTree[],
  any[]
> {
  toDomainEntity(entities: any[]): CategoryTree[] {
    return entities.map(entity => {
      const categoryTree = new CategoryTree(entity.id, entity.label, entity.urn)

      if (!!entity.children?.length) {
        categoryTree.setChildren(this.toDomainEntity(entity.children))
      }

      return categoryTree
    })
  }

  toDaoEntity(entities: CategoryTree[]): any[] {
    return entities.map(domain => {
      return {
        id: domain.getId(),
        label: domain.getLabel(),
        urn: domain.getUrn()
        // children: this.toDaoEntity(domain.getChildren())
      }
    })
  }
}
