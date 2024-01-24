interface Product {
  id: number | null,
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId: number | null,
  status: string
}

export default Product
