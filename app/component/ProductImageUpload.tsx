import {Box, Container} from "@mui/material";
import {ImageOutlined} from "@mui/icons-material";
import {ChangeEvent, useRef} from "react";

const ProductImageUpload = () => {

  const fileInputRef = useRef<HTMLInputElement>(null)


  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleInputOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      console.log('file', file)
    }
  }

  return (
    <main>
      <input
        type="file"
        ref={fileInputRef}
        style={{display: "none"}}
        onChange={handleInputOnchange}
      />
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        flexDirection="column"
        onClick={handleFileUpload}
        sx={{ border: "2px dashed #ccc", padding: 2, height: "300px", marginTop: 2, borderRadius: 5}}>
        <ImageOutlined sx={{color: "#ccc", fontSize: "40px"}} />
        <span>Upload your product image.</span>
        <span style={{color: "#ccc"}}>Only PNG, JPG format allowed.</span>
        <span style={{color: "#ccc"}}>500x500 pixels are recommended.</span>
      </Box>
    </main>
  )
}

export default ProductImageUpload
