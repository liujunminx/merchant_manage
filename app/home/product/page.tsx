'use client'
import Search from "@/app/component/Search";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {listProduct} from "@/service/product";
import {Product, ProductListCols} from "@/app/home/product/consts";
import PageResponse from "@/app/consts/api";
import {DataGrid} from "@mui/x-data-grid";

export default function Page() {

  const router = useRouter()
  const [productData, setProductData] = useState<Array<Product>>([])

  const handleSearch = async (keyword: string) => {

  }

  useEffect( () => {
    getProductData()
  }, [])

  const getProductData = () => {
    listProduct()
      .then((response: PageResponse) => {
        setProductData(response.content)
      })
  }

  return (
      <main className="m-4">
        <div className="pl-4 flex">
          <Search onSearch={handleSearch} />
          <Button variant="contained" startIcon={<Add />} sx={{ml: 1, borderRadius: "10px"}} onClick={() => router.push("/home/product/add")}>Add Product</Button>
        </div>
        <div className="mt-6">
            <DataGrid
                columns={ProductListCols}
                rows={productData}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
      </main>
  )
}
