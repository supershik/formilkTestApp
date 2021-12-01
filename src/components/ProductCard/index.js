import React, {useEffect} from "react";
import MediaCard from "../MediaCard";
import {Box, Grid, Button} from "@material-ui/core";
import {useFormik, FormikProvider} from "formik";
import ProductInputs from "../ProductInputs";
import {productSchema} from "../../schema";

export default function ProductCard(props) {
  const {product, categories} = props;

  const formik = useFormik({
    initialValues: {
      productCode: product.productCode || "",
      productName: product.productName || "",
      productCategory: product.productCategory || null,
      productExisting: product.productExisting,
      productImages: product.productImages || []
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: (values) => {
      const selectedImages = values.productImages.filter(p => p.checked === true)
      console.log("Selected images: \n")
      if (selectedImages.length < 1) {
        console.log("No results")
      } else {
        console.log(selectedImages);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <ProductInputs formik={formik} categories={categories}/>
          <br/>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Grid component="div" container spacing={2}>
            <Grid component="div" item xl={10} lg={10} md={12} sm={12} xs={12}>
              <Grid component="div" container spacing={2}>
                {formik.values.productImages.map((productImage, index) => (
                  <Grid
                    key={index}
                    component="div"
                    item
                    xl={2}
                    lg={2}
                    md={2}
                    sm={12}
                    xs={12}
                  >
                    <MediaCard
                      productImage={productImage}
                      product={product}
                      productImageIndex={index}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormikProvider>
  );
}
