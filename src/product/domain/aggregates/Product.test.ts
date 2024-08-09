import { Product } from '@/product'

describe('Product', () => {
  it('should be instantiated', () => {
    const product = new Product()
    expect(product).toBeInstanceOf(Product)
  })
})
