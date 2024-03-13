import {GridColDef} from "@mui/x-data-grid";

interface Product {
  id: number | null,
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId: number | null,
  status: string
}
 const ProductListCols: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 120,
    editable: false
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 120,
    editable: true
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 120,
    editable: true
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 120,
    editable: true
  },
  {
    field: 'stock',
    headerName: 'Stock',
    width: 120,
    editable: true,
  }
]

export type {
  Product
}

export {
  ProductListCols
}