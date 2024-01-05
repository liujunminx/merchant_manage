'use client'
import Search from "@/app/component/Search";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";
import {useRouter} from "next/navigation";

export default function Page() {

  const router = useRouter()

  const handleSearch = async (keyword: string) => {

  }

  return (
      <main className="m-4">
        <div className="pl-4 flex">
          <Search onSearch={handleSearch} />
          <Button variant="contained" startIcon={<Add />} sx={{ml: 1, borderRadius: "10px"}} onClick={() => router.push("/home/product/add")}>Add Product</Button>
        </div>
        <div className="mt-6">

        </div>
      </main>
  )
}
