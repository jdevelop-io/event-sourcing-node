import {
  Category,
  CategoryId,
  CategoryName,
  CategoryReadRepositoryInterface,
  CategoryWriteRepositoryInterface,
} from '@/product'
import { EventStoreInterface, Undefinable } from '@/shared'

export class InMemoryCategoryRepository implements CategoryReadRepositoryInterface, CategoryWriteRepositoryInterface {
  private readonly _categoriesById = new Map<string, Category>()
  private readonly _categoriesByName = new Map<string, Category>()

  public constructor(private readonly eventStore: EventStoreInterface) {}

  public async nextId(): Promise<CategoryId> {
    return CategoryId.of(String(this._categoriesById.size + 1))
  }

  public async create(category: Category): Promise<void> {
    this._categoriesById.set(category.id.unwrap(), category)
    this._categoriesByName.set(category.name.unwrap(), category)

    const events = category.pullEvents()
    this.eventStore.create(Category.name, category.id.unwrap(), events)
  }

  public async findById(id: CategoryId): Promise<Undefinable<Category>> {
    return this._categoriesById.get(id.unwrap())
  }

  public async findByName(name: CategoryName): Promise<Undefinable<Category>> {
    return this._categoriesByName.get(name.unwrap())
  }
}
