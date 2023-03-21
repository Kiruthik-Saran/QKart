import { AddShoppingCartOutlined } from "@mui/icons-material";

import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  // console.log(product);
  //console.log(handleAddToCart);

  return (
    <Card className="card">
      <CardMedia component="img" image={product.image}></CardMedia>
      {/* //<img src={} alt={product.name} />
        </CardMedia> */}
      <CardContent>
        <Typography color="text.primary" variant="h5">
          {product.name}
        </Typography>
        <Typography color="text.secondary" variant="h6">
          ${product.cost}
        </Typography>
        <Rating
         // name="size-small"
          value={product.rating}
          //size="small"
          readOnly
        />
        <br />
        <CardActions className="card-actions">
          <Button
            fullWidth
            name="add to cart"
            onClick={() =>{
              handleAddToCart(product._id)
            }}
            className="card-button"
            variant="contained"
            startIcon={<AddShoppingCartOutlined />}
           
          >
            {/* <IconButton style={{ color: 'white' }} aria-label="add to shopping cart"> */}
            {/* </IconButton> */}
            ADD TO CART
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
