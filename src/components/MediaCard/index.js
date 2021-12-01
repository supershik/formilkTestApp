import React, {useEffect, useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  TextField,
  Checkbox
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateProducts} from "../../actions";

export default function MediaCard(props) {
  const dispatch = useDispatch();
  const {productImage, product, productImageIndex} = props;
  const products = useSelector((state) => state.product?.products);
  const contentSlots = useSelector((state) => state.product?.contentSlots);
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [slots, setSlots] = useState(contentSlots)

  const mappedErrorMessage =
    productImage.hasError &&
    productImage.msg?.validationMessages.map(
      (data) => productImage.validationMessages
    );

  useEffect(() => {
    const findSlot = contentSlots.find(p => p.id === productImage.slot)
    setSelectedSlot(findSlot)
  }, [productImage])

  useEffect(() => {
    let newSlots = []
    contentSlots.map(contentSlot => {
      const findIndex = product.productImages.findIndex(p => p.slot === contentSlot.id)
      if (findIndex < 0) {
        newSlots.push(contentSlot)
      }
    })
    setSlots(newSlots)

  }, [product])

  const updateTotalProducts = (images) => {
    const newProduct = {
      ...product,
      productImages: images
    }

    const findIndex = products.findIndex(p => p.productCode === product.productCode)
    if (findIndex < 0)
      return

    let newProducts = [...products]
    newProducts[findIndex] = newProduct

    dispatch(updateProducts(newProducts))
  }

  const onChangeContentSlot = (value) => {
    let productImages = [...product.productImages]
    productImages[productImageIndex] = {
      ...productImage,
      slot: value?.id ?? "",
      checked: value?.id ? productImage.checked : false
    }
    updateTotalProducts(productImages)
  };

  const handleChange = (event) => {
    let productImages = [...product.productImages]
    productImages[productImageIndex] = {
      ...productImage,
      checked: event.target.checked
    }

    updateTotalProducts(productImages)
  }

  return (
    <Card
      style={{
        border: productImage.hasError ? "1px solid red" : "unset"
      }}
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
        {
          productImage.hasError &&
          mappedErrorMessage.map((msg, idx) => (
            <Box key={idx + msg} marginTop={idx === 0 ? 2 : 1}>
              <Typography color="secondary">{msg}</Typography>
            </Box>
          ))
        }
        <Autocomplete
          fullWidth
          size="small"
          options={slots}
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
          value={selectedSlot}
        />

        <Checkbox
          disabled={productImage.slot === ""}
          checked={productImage.checked}
          onChange={handleChange}
          inputProps={{'aria-label': 'controlled'}}
          color='primary'
        />
      </CardContent>
    </Card>
  );
}
