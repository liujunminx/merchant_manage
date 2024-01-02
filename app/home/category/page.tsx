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
import {deleteCategory, listCategoryTree, saveCategory} from "@/service/product";
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
  const [parentCategoryName, setParentCategoryName] = useState("ROOT");

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
            <NoneOutlinedIconButton onClick={() => deleteOne(node.id)}>
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
      <TreeItem key={node.id} nodeId={node.id} label={node.name}>
        {Array.isArray(node.children) && node.children.length > 0 && renderTreeView(node.children)}
      </TreeItem>
    ))
  )

  const handleSelectNode = (event: React.SyntheticEvent, nodeId: string) => {
    setParentCategoryId(Number(nodeId))
    setParentCategoryName(event.target.textContent)
  }

  const unSelectCategory = () => {
    setParentCategoryId(0)
    setOpenSelectCategory(false)
  }

  const confirmAdd = async () => {
    const payload = {
      parentId: parentCategoryId,
      name: categoryName
    }
    const response = await saveCategory(payload)
    if (response) {
      await getTreeData()
      setOpen(false)
    }
  }

  const deleteOne = async (id: number) => {
    const response = await deleteCategory(id)
    if (response) {
      await getTreeData()
    }
  }

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
                      value={parentCategoryName}
                      variant="outlined"
                    />
                    <Button
                      sx={{marginLeft: 2}}
                      fullWidth
                      size="small"
                      onClick={() => setOpenSelectCategory(true)}
                      variant="contained"
                    >
                      Select Category
                    </Button>
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
                      onChange={(e:any) => setCategoryName(e.target.value)}
                    />
                  </div>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => confirmAdd()}>Save</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openSelectCategory} onClose={() => unSelectCategory()}>
            <DialogContent>
              <TreeView
                defaultExpandIcon={<ChevronRight />}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpanded={["0"]}
                defaultSelected={"0"}
                onNodeSelect={handleSelectNode}
              >
                <TreeItem
                  nodeId="0"
                  label="ROOT"
                >
                  {renderTreeView(treeData)}
                </TreeItem>
              </TreeView>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => unSelectCategory()}>Cancel</Button>
              <Button onClick={() => setOpenSelectCategory(false)}>Save</Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </main>
  )
}

