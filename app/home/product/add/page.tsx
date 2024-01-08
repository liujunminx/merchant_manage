'use client'
import {render} from "react-dom";
import {Box, Button, Container, OutlinedInput, TextField} from "@mui/material";
import {Label} from "@mui/icons-material";
import Image from "next/image";
import {AddProductContainer, AddProductLabel, ProductTitleLabel} from "@/app/home/product/add/styles";
import ProductImageUpload from "@/app/component/ProductImageUpload";

export default function Page() {

  return (
    <main className="m-4">
      <ProductTitleLabel>Add Product</ProductTitleLabel>
      <Box display="flex">
        <Container sx={{width: "70%"}}>
          <AddProductContainer>
            <AddProductLabel>Basic Information</AddProductLabel>
            <TextField
              variant="outlined"
              label="Product Name"
              margin="normal"
              fullWidth
            />
            <TextField
              variant="outlined"
              label="Description"
              type="text"
              margin="normal"
              rows={4}
              fullWidth
              multiline
            />
          </AddProductContainer>
          <AddProductContainer>
            <AddProductLabel>Stock & Pricing</AddProductLabel>
            <Box display="flex">
              <TextField
                variant="outlined"
                label="Stock"
                fullWidth
              />
              <TextField
                sx={{marginLeft: 5}}
                variant="outlined"
                label="Price"
                type="number"
                fullWidth
              />
            </Box>
          </AddProductContainer>
        </Container>
        <Container sx={{width: "30%"}}>
          <AddProductContainer>
            <AddProductLabel>Product Image</AddProductLabel>
            <ProductImageUpload />
          </AddProductContainer>
          <AddProductContainer>
            <AddProductLabel>Visibility</AddProductLabel>
          </AddProductContainer>
        </Container>
      </Box>
      <div>
        <Button>Cancel</Button>
        <Button variant="contained">Add Product</Button>
      </div>
    </main>
  )
}
