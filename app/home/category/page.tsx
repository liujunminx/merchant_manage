'use client'
import {Container} from "@mui/material";
import Search from "@/app/component/Search";
import Filter from "@/app/component/Filter";

export default function Page() {

  const handleSearch = (searchText: string) => {
    console.log("Search Text: ", searchText)
  }

  return (
      <main className="m-4">
        <div className="pl-4 flex">
          <Filter />
          <Search onSearch={handleSearch} />
        </div>
      </main>
  )
}
