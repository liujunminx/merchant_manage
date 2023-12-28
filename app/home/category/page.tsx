'use client'
import {Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Search from "@/app/component/Search";
import Filter from "@/app/component/Filter";
import {FC, useEffect, useState} from "react";
import {listCategoryTree} from "@/service/product";
import React from "react"
import {KeyboardArrowDown, KeyboardArrowRight} from "@mui/icons-material";
import styled from "@emotion/styled";
import {NoneOutlinedIconButton} from "@/app/component/NoneOutlinedIconButton";


export default function Page() {

  const [treeData, setTreeData] = useState([])
  const [expandedRows, setExpandedRows] = useState<{[key: number]: boolean}>({});

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

        </TableRow>
        {expandedRows[node.id] && Array.isArray(node.children) && node.children.length > 0 && (
          <TableRow>
            <TableCell colSpan={2}>
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
        <div className="pl-4 flex">
          <Search onSearch={handleSearch} />
        </div>
        <div className="mt-6">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTree(treeData)}
            </TableBody>
          </Table>
        </div>
      </main>
  )
}

