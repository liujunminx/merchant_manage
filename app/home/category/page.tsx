'use client'
import {
  Button,
  Container,
  createTheme, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TextField, ThemeProvider
} from "@mui/material";
import Search from "@/app/component/Search";
import {FC, useEffect, useState} from "react";
import {listCategoryTree} from "@/service/product";
import React from "react"
import {Add, Delete, Edit, KeyboardArrowDown, KeyboardArrowRight} from "@mui/icons-material";
import {NoneOutlinedIconButton} from "@/app/component/NoneOutlinedIconButton";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
})

export default function Page() {

  const [treeData, setTreeData] = useState([])
  const [expandedRows, setExpandedRows] = useState<{[key: number]: boolean}>({});
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    getTreeData()
  }, [])

  const getTreeData = async () => {
    const data: any = await listCategoryTree()
    setTreeData(data)
  }

  const toggleRow = (id: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }))
  }

  const handleSearch = (searchText: string) => {
    console.log("Search Text: ", searchText)
  }

  const renderTree = (nodes: any) => (
    nodes.map((node: any) => (
      <React.Fragment key={node.id}>
        <TableRow>
          <TableCell>
            {Array.isArray(node.children) && node.children.length > 0 && (
              <NoneOutlinedIconButton
                aria-label="expand"
                size="small"
                onClick={() => toggleRow(node.id)}>
                {expandedRows[node.id] ? (
                  <KeyboardArrowDown />
                ) : (
                  <KeyboardArrowRight />
                )}
              </NoneOutlinedIconButton>
            )}
            {node.name}
          </TableCell>
          <TableCell>{node.status}</TableCell>
          <TableCell>
            <Button startIcon={<Edit />} variant="contained" sx={{borderRadius: "10px"}}>Edit</Button>
            <NoneOutlinedIconButton>
              <Delete />
            </NoneOutlinedIconButton>
          </TableCell>
        </TableRow>
        {expandedRows[node.id] && Array.isArray(node.children) && node.children.length > 0 && (
          <TableRow>
            <TableCell colSpan={3}>
              <Table>
                <TableBody>
                  {renderTree(node.children)}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    ))
  )

  return (
      <main className="m-4">
        <ThemeProvider theme={theme}>
          <div className="pl-4 flex">
            <Search onSearch={handleSearch} />
            <Button variant="contained" startIcon={<Add />} sx={{ml: 1, borderRadius: "10px"}} onClick={() => setOpen(true)}>Add Category</Button>
          </div>
          <div className="mt-6">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderTree(treeData)}
              </TableBody>
            </Table>
          </div>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                id="name"
                label="name"
                fullWidth
                variant="standard"
                onChange={(e:any) => setOpen(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button>Save</Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </main>
  )
}

