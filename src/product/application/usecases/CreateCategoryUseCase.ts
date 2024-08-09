import {
  Category,
  CategoryAlreadyExistsError,
  CategoryId,
  CategoryName,
  CategoryWriteRepositoryInterface,
  UnauthorizedError,
  UserAdminAuthorizationInterface,
} from '@/product'

export interface CreateCategoryRequest {
  name: string
}

export class CreateCategoryUseCase {
  constructor(
    private readonly userAdminAuthorization: UserAdminAuthorizationInterface,
    private readonly categoryRepository: CategoryWriteRepositoryInterface
  ) {}

  public async execute(request: CreateCategoryRequest): Promise<CategoryId> {
    await this.ensureUserIsAdmin()

    const name = CategoryName.of(request.name)
    await this.ensureNameIsUnique(name)

    const id = await this.categoryRepository.nextId()
    const category = Category.create(id, name)
    await this.categoryRepository.create(category)

    return id
  }

  private async ensureUserIsAdmin(): Promise<void> {
    const isAdmin = await this.userAdminAuthorization.check()

    if (!isAdmin) {
      throw new UnauthorizedError()
    }
  }

  private async ensureNameIsUnique(name: CategoryName): Promise<void> {
    const existingCategory = await this.categoryRepository.findByName(name)

    if (existingCategory) {
      throw new CategoryAlreadyExistsError()
    }
  }
}
