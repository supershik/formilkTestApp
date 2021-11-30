import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  TextField,
  IconButton
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { useFormik, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateContentSlots } from "../../actions";

export default function MediaCard(props) {
  const dispatch = useDispatch();
  // const { productImage } = props;
  const products = useSelector((state) => state.product?.products);
  const contentSlots = useSelector((state) => state.product?.contentSlots);
  const [productImage, setProductImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState("1");

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  // const mappedErrorMessage =
  //   productImage.hasError &&
  //   productImage.msg?.validationMessages.map(
  //     (data) => productImage.validationMessages
  //   );

  const onChangeContentSlot = (value) => {
    let newContentSlots = [];
    contentSlots.map((item) => {
      if (item.id === value.id) {
        newContentSlots.push({
          ...item,
          checked: true
        });
        let findProduct = null;
        products.map((category) => {
          if (!findProduct) {
            findProduct = category?.productImages.find(
              (product) => product.slot === value.id
            );
            if (findProduct) {
              setProductImage(findProduct);
            }
          }
        });

        setProductImage(findProduct ?? null);
      } else {
        newContentSlots.push(item);
      }
    });

    setSelectedValue(value);
    dispatch(updateContentSlots(newContentSlots));
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Card
        // style={{
        //   border: productImage.hasError ? "1px solid red" : "unset"
        // }}
        >
          <CardContent>
            <CardMedia
              component="img"
              height="140"
              image={
                productImage?.imageFile
                  ? URL.createObjectURL(productImage?.imageFile)
                  : productImage?.imageUrl
              }
            />
            <p>{productImage?.imageFileName}</p>
            {/* {productImage.hasError &&
              mappedErrorMessage.map((msg, idx) => (
                <Box key={idx + msg} marginTop={idx === 0 ? 2 : 1}>
                  <Typography color="secondary">{msg}</Typography>
                </Box>
              ))} */}
            <Autocomplete
              fullWidth
              size="small"
              options={contentSlots}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Content Slots"
                  variant="outlined"
                  fullWidth
                />
              )}
              getOptionLabel={(option) => option.name || ""}
              onChange={(_, value) => onChangeContentSlot(value)}
              id={selectedValue}
            />
            <IconButton>
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          </CardContent>
        </Card>
      </form>
    </FormikProvider>
  );
}
