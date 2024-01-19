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
import {useEffect, useRef, useState} from "react";
import {Controller, Form, SubmitHandler, useForm} from "react-hook-form";
import {findAllLeafs} from "@/service/product";

export default function Page() {

  const steps = ['Basic Info & Pricing', 'Inventory,Attributes & Images', 'Settings,Preview & Confirm']
  const [activeStep, setActiveStep] = useState<number>(0)
  const [categoryLeafs, setCategoryLeafs] = useState<Array<any>>([]);
  const {control, handleSubmit, formState: {errors, isValid}, trigger} = useForm({
    defaultValues: {
      id: null,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: null
    },
    mode: "all"
  })

  useEffect(() => {
    return () => {
      getCategoryLeafs().then(r => {})
    };
  }, []);

  const onSubmit = async (data: any) => {
    console.log(isValid)
    if (isValid) {
      console.log(data)
    } else {
      console.log(errors)
    }
  }

  const handleNextStep = async (step: number) => {
    await trigger()
    if (isValid) {
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
                    {categoryLeafs.map((item, index) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
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
                rules={{ required: "Stock is required" }}
                render={({field}) =>
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    type="number"
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
              <InputLabel>price:</InputLabel>
            </Grid>
            <Grid item>
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required "}}
                render={({ field }) =>
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    type="number"
                    margin="normal"
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
              <TextField
                name="productStatus"
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
      <form
        onSubmit={handleSubmit(onSubmit)}
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
              // onClick={() => setActiveStep(activeStep+1)}
              onClick={() => handleNextStep(activeStep)}
            >
              Next
            </Button>
          }
        </Box>
      </form>
    </Box>
  )
}
