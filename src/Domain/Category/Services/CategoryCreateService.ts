import { CategoryValidator } from '../CategoryValidator'
import { CategoryCreateDto } from '../Dto/CategoryCreateDto'
import { Category } from '../Models/Category'
import { CategorySaveService } from './CategorySaveService'

export class CategoryCreateService {
  constructor(
    private readonly categorySaveService: CategorySaveService,
    private readonly categoryValidator: CategoryValidator
  ) {}

  public async execute(
    storeId: string,
    data: CategoryCreateDto
  ): Promise<Category> {
    await this.categoryValidator.categoryCreatePayloadValidate(data)

    return this.categorySaveService.execute(storeId, data)
  }
}
