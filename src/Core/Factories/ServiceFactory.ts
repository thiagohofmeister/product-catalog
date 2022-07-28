import { EntityManager } from 'typeorm'

import { TransactionalService } from '../../Core/Services/TransactionalService'
import { AttributeValidator } from '../../Domain/Attribute/AttributeValidator'
import { AttributeCreateService } from '../../Domain/Attribute/Services/AttributeCreateService'
import { AttributeGetListService } from '../../Domain/Attribute/Services/AttributeGetListService'
import { AttributeGetOneByIdService } from '../../Domain/Attribute/Services/AttributeGetOneByIdService'
import { AttributeSaveService } from '../../Domain/Attribute/Services/AttributeSaveService'
import { AttributeUpdateService } from '../../Domain/Attribute/Services/AttributeUpdateService'
import { BrandValidator } from '../../Domain/Brand/BrandValidator'
import { BrandCreateService } from '../../Domain/Brand/Services/BrandCreateService'
import { BrandGetListService } from '../../Domain/Brand/Services/BrandGetListService'
import { BrandGetOneByIdService } from '../../Domain/Brand/Services/BrandGetOneByIdService'
import { BrandSaveService } from '../../Domain/Brand/Services/BrandSaveService'
import { BrandUpdateService } from '../../Domain/Brand/Services/BrandUpdateService'
import { CategoryValidator } from '../../Domain/Category/CategoryValidator'
import { CategoryCreateService } from '../../Domain/Category/Services/CategoryCreateService'
import { CategoryGetOneByIdService } from '../../Domain/Category/Services/CategoryGetOneByIdService'
import { CategoryGetTreeService } from '../../Domain/Category/Services/CategoryGetTreeService'
import { CategorySaveService } from '../../Domain/Category/Services/CategorySaveService'
import { CategoryUpdateService } from '../../Domain/Category/Services/CategoryUpdateService'
import { ProductValidator } from '../../Domain/Product/ProductValidator'
import { ProductCreateService } from '../../Domain/Product/Services/ProductCreateService'
import { ProductDeleteUnusedImagesService } from '../../Domain/Product/Services/ProductDeleteUnUsedImagesService'
import { ProductDeleteVariationService } from '../../Domain/Product/Services/ProductDeleteVariationService'
import { ProductGetListService } from '../../Domain/Product/Services/ProductGetListService'
import { ProductGetOneByIdService } from '../../Domain/Product/Services/ProductGetOneByIdService'
import { ProductSaveService } from '../../Domain/Product/Services/ProductSaveService'
import { ProductSaveVariationService } from '../../Domain/Product/Services/ProductSaveVariationService'
import { ProductUpdateService } from '../../Domain/Product/Services/ProductUpdateService'
import { QueueFactory } from './QueueFactory,'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly queueFactory: QueueFactory
  ) {}

  public buildProductGetListService(manager?: EntityManager) {
    return new ProductGetListService(
      this.repositoryFactory.buildProductRepository(manager)
    )
  }

  public buildProductGetOneByIdService(manager?: EntityManager) {
    return new ProductGetOneByIdService(
      this.repositoryFactory.buildProductRepository(manager)
    )
  }

  public buildProductSaveService(manager?: EntityManager) {
    return new ProductSaveService(
      this.repositoryFactory.buildCategoryRepository(manager),
      this.repositoryFactory.buildBrandRepository(manager),
      this.repositoryFactory.buildProductRepository(manager),
      this.buildProductSaveVariationService(manager),
      this.buildProductDeleteVariationService(manager),
      this.buildProductDeleteUnUsedImagesService(manager)
    )
  }

  public buildProductUpdateService(manager?: EntityManager) {
    return new ProductUpdateService(
      this.buildProductGetOneByIdService(manager),
      new ProductValidator(),
      this.buildProductSaveService(manager)
    )
  }

  public buildProductCreateService(manager?: EntityManager) {
    return new ProductCreateService(
      this.repositoryFactory.buildProductRepository(manager),
      new ProductValidator(),
      this.buildProductSaveService(manager)
    )
  }

  public buildBrandCreateService(manager?: EntityManager) {
    return new BrandCreateService(
      this.buildBrandSaveService(manager),
      new BrandValidator()
    )
  }

  public buildBrandUpdateService(manager?: EntityManager) {
    return new BrandUpdateService(
      this.buildBrandSaveService(manager),
      this.buildBrandGetOneByIdService(manager),
      new BrandValidator()
    )
  }

  public buildBrandSaveService(manager?: EntityManager) {
    return new BrandSaveService(
      this.repositoryFactory.buildBrandRepository(manager)
    )
  }

  public buildBrandGetListService(manager?: EntityManager) {
    return new BrandGetListService(
      this.repositoryFactory.buildBrandRepository(manager)
    )
  }

  public buildBrandGetOneByIdService(manager?: EntityManager) {
    return new BrandGetOneByIdService(
      this.repositoryFactory.buildBrandRepository(manager)
    )
  }

  public buildAttributeCreateService(manager?: EntityManager) {
    return new AttributeCreateService(
      this.buildAttributeSaveService(manager),
      new AttributeValidator()
    )
  }

  public buildAttributeUpdateService(manager?: EntityManager) {
    return new AttributeUpdateService(
      this.buildAttributeSaveService(manager),
      this.buildAttributeGetOneByIdService(manager),
      new AttributeValidator()
    )
  }

  public buildAttributeSaveService(manager?: EntityManager) {
    return new AttributeSaveService(
      this.repositoryFactory.buildAttributeRepository(manager)
    )
  }

  public buildAttributeGetListService(manager?: EntityManager) {
    return new AttributeGetListService(
      this.repositoryFactory.buildAttributeRepository(manager)
    )
  }

  public buildAttributeGetOneByIdService(manager?: EntityManager) {
    return new AttributeGetOneByIdService(
      this.repositoryFactory.buildAttributeRepository(manager)
    )
  }

  public buildCategoryCreateService(manager?: EntityManager) {
    return new CategoryCreateService(
      this.buildCategorySaveService(manager),
      new CategoryValidator()
    )
  }

  public buildCategoryUpdateService(manager?: EntityManager) {
    return new CategoryUpdateService(
      this.buildCategorySaveService(manager),
      this.buildCategoryGetOneByIdService(manager),
      new CategoryValidator()
    )
  }

  public buildCategorySaveService(manager?: EntityManager) {
    return new CategorySaveService(
      this.repositoryFactory.buildCategoryRepository(manager),
      this.queueFactory.buildCategoryQueue()
    )
  }

  public buildCategoryGetTreeService(manager?: EntityManager) {
    return new CategoryGetTreeService(
      this.repositoryFactory.buildCategoryRepository(manager),
      this.repositoryFactory.buildCategoryTreeCacheRepository(
        this.repositoryFactory.getRedisClient()
      )
    )
  }

  public buildCategoryGetOneByIdService(manager?: EntityManager) {
    return new CategoryGetOneByIdService(
      this.repositoryFactory.buildCategoryRepository(manager)
    )
  }

  public buildProductSaveVariationService(manager?: EntityManager) {
    return new ProductSaveVariationService(
      this.repositoryFactory.buildVariationRepository(manager)
    )
  }

  public buildProductDeleteUnUsedImagesService(manager?: EntityManager) {
    return new ProductDeleteUnusedImagesService(
      this.repositoryFactory.buildImageRepository(manager)
    )
  }

  public buildProductDeleteVariationService(manager?: EntityManager) {
    return new ProductDeleteVariationService(
      this.repositoryFactory.buildVariationRepository(manager)
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
