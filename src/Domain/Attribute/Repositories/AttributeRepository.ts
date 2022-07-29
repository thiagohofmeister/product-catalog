import { IRepository } from '../../../Core/Models/Interfaces/IRepository'
import { Attribute } from '../Models/Attribute'

export interface AttributeRepository extends IRepository<Attribute> {
  findAllByIds(ids: string[]): Promise<Attribute[]>
}
