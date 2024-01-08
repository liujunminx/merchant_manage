import {Box, Container} from "@mui/material";
import {ImageOutlined} from "@mui/icons-material";

const ProductImageUpload = () => {

  return (
    <main>
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        flexDirection="column"
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
