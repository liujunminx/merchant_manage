'use client'
import {
  Box,
  Button,
  Container,
  createTheme, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid,
  IconButton, InputAdornment, InputLabel,
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
import {Add, ChevronRight, Delete, Edit, ExpandMore, KeyboardArrowDown, KeyboardArrowRight} from "@mui/icons-material";
import {NoneOutlinedIconButton} from "@/app/component/NoneOutlinedIconButton";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {Search as SearchIcon} from "@mui/icons-material"

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
})

export default function Page() {

  const [treeData, setTreeData] = useState([])
  const [expandedRows, setExpandedRows] = useState<{[key: number]: boolean}>({})
  const [open, setOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [openSelectCategory, setOpenSelectCategory] = useState<boolean>(false)
  const [parentCategoryId, setParentCategoryId] = useState<number>(0)

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

  const handleDoubleClick = (parentId: number) => {
    setOpenSelectCategory(false)
    setParentCategoryId(parentId)
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

  const renderTreeView = (nodes: any) => (
    nodes.map((node: any) => (
      <TreeItem onDoubleClick={() => handleDoubleClick(node.id)} key={node.id} nodeId={node.id} label={node.name}>
        {Array.isArray(node.children) && node.children.length > 0 && renderTreeView(node.children)}
      </TreeItem>
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
              <form>
                <FormControl fullWidth>
                  <Box display="flex" alignItems="baseline">
                    <label style={{minWidth: "150px", marginBottom: "5px"}}>Parent Category:</label>
                    <TextField
                      autoFocus
                      margin="normal"
                      id="parentId"
                      fullWidth
                      size="small"
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                    <Button fullWidth size="medium" variant="outlined">Select Category</Button>
                  </Box>
                </FormControl>
                <FormControl fullWidth>
                  <div className="flex items-center">
                    <label style={{minWidth: "150px", marginBottom: "5px"}}>Name:</label>
                    <TextField
                      autoFocus
                      margin="normal"
                      id="name"
                      fullWidth
                      size="small"
                      variant="outlined"
                      onChange={(e:any) => setOpen(e.target.value)}
                    />
                  </div>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button>Save</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openSelectCategory} onClose={() => setOpenSelectCategory(false)}>
            <DialogContent>
              <TreeView
                defaultExpandIcon={<ChevronRight />}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpanded={["0"]}
              >
                <TreeItem
                  nodeId="0"
                  label="ROOT"
                  onDoubleClick={() => handleDoubleClick(0)}
                >
                  {renderTreeView(treeData)}
                </TreeItem>
              </TreeView>
            </DialogContent>
          </Dialog>
        </ThemeProvider>
      </main>
  )
}

