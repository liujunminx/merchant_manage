'use client'
import {render} from "react-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel, Grid, InputLabel,
  OutlinedInput,
  Step,
  StepLabel,
  Stepper,
  TextField
} from "@mui/material";
import {Label} from "@mui/icons-material";
import Image from "next/image";
import {AddProductContainer, AddProductLabel, ProductTitleLabel} from "@/app/home/product/add/styles";
import ProductImageUpload from "@/app/component/ProductImageUpload";
import {useState} from "react";

export default function Page() {

  const steps = ['Basic Info & Pricing', 'Inventory,Attributes & Images', 'Settings,Preview & Confirm']

  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <Box
      sx={{padding: 4}}
    >
      <Stepper
        activeStep={activeStep}
      >
        {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        )}
      </Stepper>
      {activeStep===0 &&
        <Box>
          <form
            style={{width: "60%", marginLeft: "120px"}}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={2}>
                <InputLabel>Name:</InputLabel>
              </Grid>
              <Grid item>
                <TextField
                  name="name"
                  variant="outlined"
                  size="small"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              >
              <Grid item xs={2}>
                <InputLabel>Category:</InputLabel>
              </Grid>
              <Grid item>
                <TextField
                  name="category"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              >
              <Grid item xs={2}>
                <InputLabel>Brief:</InputLabel>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="brief"
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="normal"
                  />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={2}>
                <InputLabel>Description:</InputLabel>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="description"
                  variant="outlined"
                  size="small"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
          </form>
          <Container>
            <Button
              variant="contained"
              onClick={() => setActiveStep(activeStep+1)}
              >
              Next
            </Button>
          </Container>
        </Box>
      }
    </Box>
  )
}
