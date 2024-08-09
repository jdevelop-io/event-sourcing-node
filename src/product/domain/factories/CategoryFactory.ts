import { Category, CategoryName, CategoryWriteRepositoryInterface } from '@/product'

interface CreateParameters {
  name: string
}

export class CategoryFactory {
  public constructor(private readonly categoryRepository: CategoryWriteRepositoryInterface) {}

  public async create(parameters: CreateParameters): Promise<Category> {
    const id = await this.categoryRepository.nextId()
    const name = CategoryName.of(parameters.name)

    return Category.create(id, name)
  }
}
