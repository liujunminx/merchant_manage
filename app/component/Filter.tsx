import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Filter = () => {

  return (
      <div>
        <InputLabel id="search-filter" sx={{height: "40px", lineHeight: "inherit"}}>Filter</InputLabel>
        <Select
          label="Filter"
          autoWidth
          labelId="search-filter"
          sx={{ height: "40px"}}
        >
          <MenuItem value={0}>One</MenuItem>
          <MenuItem value={1}>Two</MenuItem>
          <MenuItem value={2}>Three</MenuItem>
        </Select>
      </div>
  )
}


export default Filter
