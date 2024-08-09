import { Category, CategoryId, CategoryName } from '@/product'
import { Undefinable } from '@/shared'

export interface CategoryReadRepositoryInterface {
  findById(id: CategoryId): Promise<Undefinable<Category>>
}

export interface CategoryWriteRepositoryInterface {
  nextId(): Promise<CategoryId>
  findByName(name: CategoryName): Promise<Undefinable<Category>>
  create(category: Category): Promise<void>
}
