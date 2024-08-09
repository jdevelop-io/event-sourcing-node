import { CategoryCreatedEvent, CategoryId, CategoryName, Product } from '@/product'
import { Aggregate } from '@/shared'

export class Category extends Aggregate {
  private _id?: CategoryId
  private _name?: CategoryName
  private _products: Product[] = []

  public get id(): CategoryId {
    return this._id!
  }

  public get name(): CategoryName {
    return this._name!
  }

  public get products(): Product[] {
    return this._products
  }

  public static create(id: CategoryId, name: CategoryName): Category {
    const category = new Category()
    category.record(new CategoryCreatedEvent(id, name))

    return category
  }

  protected applyCategoryCreatedEvent(event: CategoryCreatedEvent): void {
    this._id = event.aggregateId
    this._name = event.name
  }
}
