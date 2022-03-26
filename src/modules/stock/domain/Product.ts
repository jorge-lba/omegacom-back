import { Entity } from "@core/domain/Entity"

class Product extends Entity<ProductProps> {
  static create(props: CreateProductProps, id?: string){
    return new Product({
      ...props,
      composition: props.composition || [],
      createdAt: new Date(),
      updatedAt: new Date()
    }, id)
  }

  addItemInComposition(itemId: string, quantity: number) {
    this._props.composition.push({
      itemId,
      quantity
    })
  }
}

interface ProductProps {
  name: string
  composition: Composition[]
  createdAt: Date
  updatedAt: Date
}

interface CreateProductProps {
  name: string
  composition?: Composition[]
}

interface Composition {
  itemId: string,
  quantity: number
}


export { Product, CreateProductProps }