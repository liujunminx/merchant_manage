'use client'
import {IconButton, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import React, {ChangeEvent} from "react";
import { Search as SearchIcon } from "@mui/icons-material"

interface SearchProps {
  onSearch: (searchText: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value)
    }
  }

  return (
      <OutlinedInput
        onChange={handleSearch}
        sx={{ borderRadius: "15px", height: "40px" }}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
  )
}

export default Search
