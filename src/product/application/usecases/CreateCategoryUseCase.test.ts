import {
  Category,
  CategoryCreatedEvent,
  CategoryFactory,
  CreateCategoryRequest,
  CreateCategoryUseCase,
  InMemoryCategoryRepository,
  InMemoryUserAdminAuthorization,
} from '@/product'
import { InMemoryEventStore } from '@/shared'

describe('CreateCategoryUseCase', () => {
  let userAdminAuthorization: InMemoryUserAdminAuthorization
  let eventStore: InMemoryEventStore
  let categoryRepository: InMemoryCategoryRepository
  let categoryFactory: CategoryFactory
  let useCase: CreateCategoryUseCase

  beforeEach(async () => {
    userAdminAuthorization = new InMemoryUserAdminAuthorization({ admin: true })
    eventStore = new InMemoryEventStore()
    categoryRepository = new InMemoryCategoryRepository(eventStore)
    categoryFactory = new CategoryFactory(categoryRepository)
    useCase = new CreateCategoryUseCase(userAdminAuthorization, categoryRepository)

    const existingCategory = await categoryFactory.create({ name: 'Existing category' })
    await categoryRepository.create(existingCategory)
  })

  describe('User', () => {
    it('must be admin', async () => {
      // override default behavior
      userAdminAuthorization = new InMemoryUserAdminAuthorization({ admin: false })
      useCase = new CreateCategoryUseCase(userAdminAuthorization, categoryRepository)

      const request: CreateCategoryRequest = { name: 'Category' }

      await expect(useCase.execute(request)).rejects.toThrow('Unauthorized')
    })
  })

  describe('Category name', () => {
    it('should not be empty', async () => {
      const request: CreateCategoryRequest = { name: '' }

      await expect(useCase.execute(request)).rejects.toThrow('Category name must not be empty')
    })

    it('should be trimmed', async () => {
      const request: CreateCategoryRequest = { name: '  Category  ' }

      const categoryId = await useCase.execute(request)

      const existingCategory = await categoryRepository.findById(categoryId)
      expect(existingCategory).toBeInstanceOf(Category)
      expect(existingCategory!.name.unwrap()).toBe('Category')
    })

    it('should be unique', async () => {
      const request: CreateCategoryRequest = { name: 'Existing category' }

      await expect(useCase.execute(request)).rejects.toThrow('Category already exists')
    })
  })

  describe('Products', () => {
    it('should be empty', async () => {
      const request: CreateCategoryRequest = { name: 'Category' }

      const categoryId = await useCase.execute(request)

      const existingCategory = await categoryRepository.findById(categoryId)
      expect(existingCategory).toBeInstanceOf(Category)
      expect(existingCategory!.products).toHaveLength(0)
    })
  })

  it('should be created', async () => {
    const request: CreateCategoryRequest = { name: 'Category' }

    const categoryId = await useCase.execute(request)

    const events = eventStore.getEvents(Category.name, categoryId.unwrap())
    expect(events).toHaveLength(1)
    const event = events[0]
    expect(event).toBeInstanceOf(CategoryCreatedEvent)
    expect((event as CategoryCreatedEvent).name.unwrap()).toBe('Category')

    const existingCategory = await categoryRepository.findById(categoryId)
    expect(existingCategory).toBeInstanceOf(Category)
    expect(existingCategory!.id.unwrap()).toBe(categoryId.unwrap())
    expect(existingCategory!.name.unwrap()).toBe('Category')
    expect(existingCategory!.products).toHaveLength(0)
  })
})
