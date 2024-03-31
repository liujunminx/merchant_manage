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
import {deleteCategory, listCategoryTree, saveCategory, searchTree} from "@/service/product";
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

  const [treeData, setTreeData] = useState<any>([])
  const [expandedRows, setExpandedRows] = useState<{[key: number]: boolean}>({})
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>('')
  const [openSelectCategory, setOpenSelectCategory] = useState<boolean>(false)
  const [parentCategoryId, setParentCategoryId] = useState<number>(0)
  const [parentCategoryName, setParentCategoryName] = useState<string>("ROOT")
  const [id, setId] = useState<any>('')

  useEffect(() => {
    getTreeData()
  }, [])

  const getTreeData = () => {
    listCategoryTree().then((result: Array<any>) => {
      setTreeData(result)
    })
  }

  const toggleRow = (id: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }))
  }

  const handleSearch = async (searchText: string) => {
    console.log("Search Text: ", searchText)
    const data: any = await searchTree(searchText)
    if (data) {
      setTreeData(data)
    }
  }

  const openEditDialog = (node: any) => {
    setId(node.id)
    setCategoryName(node.name)
    setParentCategoryId(node.parentId)
    const parentCategory: any = treeData.find((e:any) => e.id === node.parentId)
    if (parentCategory) {
      setParentCategoryName(parentCategory.name)
    }
    setOpenEdit(true)
  }

  const renderTree = (nodes: any, offset: number) => (
    nodes.map((node: any) => (
      <React.Fragment key={node.id}>
        <TableRow>
          <TableCell sx={{paddingLeft: offset}}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Box width="30px">
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
              </Box>
              {node.name}
            </Box>
          </TableCell>
          <TableCell>{node.status}</TableCell>
          <TableCell>
            <Button startIcon={<Edit />} variant="contained" sx={{borderRadius: "10px"}} onClick={() => openEditDialog(node)}>Edit</Button>
            <NoneOutlinedIconButton onClick={() => deleteOne(node.id)}>
              <Delete />
            </NoneOutlinedIconButton>
          </TableCell>
        </TableRow>
        {expandedRows[node.id] && Array.isArray(node.children) && node.children.length > 0 && (
            renderTree(node.children, offset+2)
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
    const target = event.target as HTMLElement;
    setParentCategoryId(Number(nodeId));
    setParentCategoryName(target.textContent || "");
  }

  const unSelectCategory = () => {
    resetCategory()
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
      resetCategory()
    }
  }

  const confirmEdit = async () => {
    const payload = {
      parentId: parentCategoryId,
      name: categoryName,
      id,
    }
    const response = await saveCategory(payload)
    if (response) {
      await getTreeData()
      setOpenEdit(false)
      resetCategory()
    }
  }

  const resetCategory = () => {
    setId('')
    setParentCategoryId(0)
    setParentCategoryName("ROOT")
  }

  const deleteOne = async (id: number) => {
    const response = await deleteCategory(id)
    if (response) {
      await getTreeData()
    }
  }

  const cancelAdd = () => {
    setOpen(false)
    resetCategory()
  }

  const cancelEdit = () => {
    setOpenEdit(false)
    resetCategory()
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
                {renderTree(treeData, 0)}
              </TableBody>
            </Table>
          </div>

          <Dialog open={open} onClose={() => cancelAdd()}>
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
              <Button onClick={() => cancelAdd()}>Cancel</Button>
              <Button onClick={() => confirmAdd()}>Confirm</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openSelectCategory} onClose={() => unSelectCategory()}>
            <DialogContent>
              <TreeView
                defaultExpandIcon={<ChevronRight />}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpanded={[`${parentCategoryId}`]}
                defaultSelected={`${parentCategoryId}`}
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

          <Dialog open={openEdit} onClose={() => cancelEdit()}>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
              <form>
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
                      value={categoryName}
                      onChange={(e:any) => setCategoryName(e.target.value)}
                    />
                  </div>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => cancelEdit()}>Cancel</Button>
              <Button onClick={() => confirmEdit()}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </main>
  )
}

