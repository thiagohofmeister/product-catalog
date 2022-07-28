import { ProductSaveImageDto } from './ProductSaveImageDto'
import { ProductSaveVariationDto } from './ProductSaveVariationDto'

export interface ProductSaveDto {
  title?: string
  description?: string
  active?: boolean
  category?: {
    id: string
  }
  brand?: {
    id: string
  }
  id?: string
  images?: ProductSaveImageDto[]
  variations?: ({ sku: string } & ProductSaveVariationDto)[]
}