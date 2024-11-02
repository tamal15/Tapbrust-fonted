import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PaidIcon from "@mui/icons-material/Paid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PublishIcon from "@mui/icons-material/Publish";
import { useForm } from "react-hook-form";
import { CartContext } from "../../../Context/CartContext";
import Header from "../../../Shared/Header/Header";
import Footer from "../../../Shared/Footer/Footer";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState({});
  const [cart, setCart] = useContext(CartContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const { id } = useParams();
  const [number, setNumber] = useState(1);
  const [review, setReview] = useState([]);
  const [ProductPrices, setPrice] = useState(0);
  const [incomePrice, setIncomePrice] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    fetch(`https://tapbrust-backend.onrender.com/product/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  useEffect(() => {
    fetch("https://tapbrust-backend.onrender.com/review")
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);

  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    fetch("https://tapbrust-backend.onrender.com/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert('Review submitted successfully');
          reset();
        }
      });
  };

  const handleAddToCart = (book) => {
    const exists = cart.find((pd) => pd._id === book._id);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd._id !== book._id);
      exists.quantity = exists.quantity + 1;
      exists.ProductPrices = ProductPrices; // Update the price in the cart
      exists.totalIncome = incomePrice; // Update total income in the cart
      newCart = [...rest, exists];
    } else {
      book.quantity = 1;
      book.ProductPrices = ProductPrices; // Set the price when adding to cart
      book.totalIncome = incomePrice; // Set total income when adding to cart
      newCart = [...cart, book];
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(() => newCart);
    alert("success", "Success", "Added to Cart Successfully");
  };

  useEffect(() => {
    if (book?.ProductPrice) {
      setPrice(book.ProductPrice);
    }
  }, [book]);

  useEffect(() => {
    setIncomePrice(ProductPrices - book.ProductPrice);
  }, [book.ProductPrice, ProductPrices]);

  const handlePrice = (e) => {
    const updatedPrice = parseFloat(e.target.value);
    setPrice(updatedPrice);
    setIncomePrice(updatedPrice - book.ProductPrice);
  };

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ textAlign: "center", my: 5 }}>
          <Typography variant="h4" style={{ fontWeight: "600" }}>
            Product Name : {book?.productName}
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "600" }}>
            Product Price : TK.{book?.ProductPrice}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={10}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={4} md={6} sx={{ mb: 5 }}>
                <div className="photo">
                  <div className="photoShops">
                    <CardMedia
                      sx={{ width: "100%", height: "90%" }}
                      component="img"
                      alt="complex"
                      src={book?.img}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <Paper
                  sx={{
                    p: 2,
                  }}
                >
                  <Box>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <BorderColorIcon color="primary" />
                      <Typography variant="body1" style={{ marginLeft: "10px", fontWeight: "600" }}>
                        ProductName : {book?.productName}
                      </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <PublishIcon color="primary" />
                      <Typography variant="body1" style={{ marginLeft: "10px", fontWeight: "600", textAlign: "left" }}>
                        Description : {book?.description}
                      </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <DateRangeIcon color="primary" />
                      <Typography variant="body1" style={{ marginLeft: "10px", fontWeight: "600", textAlign: "left" }}>
                        Categories : {book?.categories}
                      </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <AppRegistrationIcon color="primary" />
                      <Typography variant="body1" style={{ marginLeft: "10px", fontWeight: "600", textAlign: "left" }}>
                        Sizing : {book?.sizing}
                      </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <PublishIcon color="primary" />
                      <Typography variant="body1" style={{ marginLeft: "10px", fontWeight: "600", textAlign: "left" }}>
                        Warranty : {book?.warranty}
                      </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <PaidIcon color="primary" />
                      <Typography variant="body1" style={{ marginLeft: "10px", fontWeight: "600", textAlign: "left" }}>
                        Price ৳ {ProductPrices}
                      </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <PaidIcon color="primary" />
                      <Typography variant="body1" style={{ marginLeft: "10px", fontWeight: "600", textAlign: "left" }}>
                        Total Income ৳ {incomePrice}
                      </Typography>
                    </span>
                    <br />
                    <h2>Sale Price</h2>
                    <input
                      onChange={handlePrice}
                      value={ProductPrices}
                      style={{ fontWeight: "600", color: "#0E1621" }}
                      className='w-75 mb-3'
                      placeholder='Product Price'
                    />
                    <Box sx={{ textAlign: "center" }}>
                      <Button
                        onClick={() => handleAddToCart(book)}
                        size="small"
                      >
                        Add To Cart
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <hr />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default ProductDetails;
