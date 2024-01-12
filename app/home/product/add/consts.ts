interface Product {
  id: number | null;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number | null
}

export default Product
