'use client'
import {
  Box,
  Button,
  Container,
  FormControl, FormHelperText,
  FormLabel, Grid, InputLabel, MenuItem,
  OutlinedInput, Select,
  Step,
  StepLabel,
  Stepper,
  TextField
} from "@mui/material";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {Controller, Form, SubmitHandler, useForm} from "react-hook-form";
import {findAllLeafs} from "@/service/product";
import {compileNonPath} from "next/dist/shared/lib/router/utils/prepare-destination";
import {useRouter} from "next/navigation";

export default function Page() {

  const steps = ['Basic Info & Pricing', 'Inventory,Attributes & Images', 'Settings,Preview & Confirm']
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [categoryLeafs, setCategoryLeafs] = useState<Array<any>>([]);
  const {control, handleSubmit, formState: {errors, isValid}, trigger} = useForm({
    defaultValues: {
      id: null,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      status: ""
    },

    mode: "onBlur"
  })

  useEffect(() => {
    return () => {
      getCategoryLeafs().then(r => {})
    };
  }, []);

  const handleNextStep = async (e: React.MouseEvent<HTMLButtonElement>, step: number) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      setActiveStep(step+1)
    }
  }

  const getCategoryLeafs = async () => {
    const response: any = await findAllLeafs()
    if (response) {
      setCategoryLeafs(response)
    }
  }

  const stepOne = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Box
          style={{width: "80%"}}
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
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
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
            <Grid item xs={4}>
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) =>
                  <TextField
                    select
                    {...field}
                    fullWidth
                    size="small"
                    margin="normal"
                    error={!!errors.categoryId}
                    helperText={errors.categoryId?.message}
                  >
                    {categoryLeafs.map((item, index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)}
                  </TextField>
                }
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
            <Grid item xs={10}>
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
            <Grid item xs={10}>
              <Controller
                control={control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) =>
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    type="text"
                    multiline
                    rows={3}
                    fullWidth
                    margin="normal"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }

  const stepTwo = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Box
          style={{width: "80%"}}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={2}>
              <InputLabel>Stock:</InputLabel>
            </Grid>
            <Grid item>
              <Controller
                name="stock"
                control={control}
                rules={{
                  required: "Stock is required",
                  min: {
                    value: 1,
                    message: "Stock must be at least"
                  }
                }}
                render={({field}) =>
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    type="number"
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={2}>
              <InputLabel>Price:</InputLabel>
            </Grid>
            <Grid item>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Price is required",
                  min: {
                    value: 1,
                    message: "Price must be at least"
                  }
                }}
                render={({ field }) =>
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    type="number"
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={2}>
              <InputLabel>Product Attributes:</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <TextField
                name="productAttributes"
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
              <InputLabel>Product Specifications:</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <TextField
                name="productSpecifications"
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
        </Box>
      </Box>
    )
  }

  const stepThree = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Box
          style={{width: "80%"}}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={2}>
              <InputLabel>Shipping Cost:</InputLabel>
            </Grid>
            <Grid item>
              <TextField
                name="shippingCost"
                variant="outlined"
                size="small"
                margin="normal"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={2}>
              <InputLabel>Product Status:</InputLabel>
            </Grid>
            <Grid item>
              <Controller
                name="status"
                control={control}
                rules={{required: "Product Status is required"}}
                render={({field}) =>
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={2}>
              <InputLabel>Product Recommendations:</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <TextField
                name="productRecommendations"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }

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
      <Form
        headers={{
          'Content-Type': 'application/json',
        }}
        action="/api/product/save"
        method="post"
        control={control}
        onSuccess={() => {
          router.push("/home/good")
        }}
        onError={() => {
          alert("Failed")
        }}
        validateStatus={(status) => status === 200}
      >
        {activeStep === 0 &&
          stepOne()
        }
        {activeStep === 1 &&
          stepTwo()
        }
        {activeStep === 2 &&
          stepThree()
        }
        <Box
          display="flex"
          alignItems="center"
          justifyContent={activeStep===0? "center": "space-between"}
          sx={{ margin: "0 10%" }}
        >
          {activeStep !== 0 &&
            <Button
              variant="outlined"
              onClick={() => setActiveStep(activeStep-1)}
            >
              Back
            </Button>
          }
          {activeStep === steps.length-1 &&
            <Button
              variant="outlined"
            >
              Preview
            </Button>
          }
          {activeStep === steps.length-1 ?
            <Button
              variant="contained"
              type="submit"
            >
              Finish
            </Button> :
            <Button
              variant="contained"
              onClick={(e) => handleNextStep(e, activeStep)}
            >
              Next
            </Button>
          }
        </Box>
      </Form>
    </Box>
  )
}
