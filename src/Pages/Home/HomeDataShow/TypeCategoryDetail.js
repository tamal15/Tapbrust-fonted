import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Button, RadioGroup, FormControlLabel, Radio,Modal } from '@mui/material';
import { CartContext } from '../../../Context/CartContext';
import Swal from "sweetalert2";
import PaidIcon from "@mui/icons-material/Paid"; 
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';


const TypeCategoryDetail = () => {
  const { type } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [cart, setCart] = useContext(CartContext);


  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [incomePrice, setIncomePrice] = useState(0);
  const [shippingOption, setShippingOption] = useState(""); // State for shipping option
  const [shippingCost, setShippingCost] = useState(0);
  const [openCheckModal, setOpenCheckModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredModel, setFilteredModel] = useState([]);



  useEffect(() => {
    fetch(`https://tapbrust-backend.onrender.com/categories/${type}`)
      .then((response) => response.json())
      .then((data) => setCategoryData(data))
      .catch((error) => console.error('Error fetching category data:', error));
  }, [type]);

  useEffect(() => {
    if (selectedProduct) {
      setProductPrice(selectedProduct.ProductPrice || 0);
      setQuantity(1); // Reset quantity when product changes
      setIncomePrice(
        (selectedProduct.ProductPrice || 0) -
          (selectedProduct.ProductPrice || 0)
      );
    }
  }, [selectedProduct]);

  const handleShippingChange = (e) => {
    const option = e.target.value;
    setShippingOption(option);

    // Set shipping cost based on the selected option
    const cost = option === "Dhaka Onsite" ? 60 : 120;
    setShippingCost(cost);

    // Save the option and cost to local storage
    localStorage.setItem("shippingOption", JSON.stringify({ option, cost }));
  };

  const handlePriceChange = (e) => {
    const updatedPrice = parseFloat(e.target.value);
    if (!isNaN(updatedPrice)) {
      setProductPrice(updatedPrice);
      setIncomePrice(updatedPrice - (selectedProduct?.ProductPrice || 0));
    }
  };

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("productCart")) || [];
    const existingProductIndex = storedCart.findIndex(
      (pd) =>
        pd.types === product.types &&
        pd.ProductPrice === product.ProductPrice &&
        pd.productimg === product.productimg
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
      const updatedProduct = { ...storedCart[existingProductIndex] };
      updatedProduct.quantity += quantity; // Increment quantity
      updatedProduct.ProductPrices = productPrice; // Update price
      updatedProduct.totalIncome = incomePrice * updatedProduct.quantity; // Update total income
      updatedProduct.shippingOption = shippingOption;
      updatedProduct.shippingCost = shippingCost;
      updatedCart = [
        ...storedCart.slice(0, existingProductIndex),
        updatedProduct,
        ...storedCart.slice(existingProductIndex + 1),
      ];
    } else {
      const newProduct = {
        ...product,
        quantity,
        ProductPrices: productPrice,
        totalIncome: incomePrice * quantity,
        shippingOption,
        shippingCost,
      };
      updatedCart = [...storedCart, newProduct];
    }

    localStorage.setItem("productCart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    Swal.fire("Success", "Product added to cart!", "success");
    handleCloseModal(); // Close modal after adding to cart
  };

  const handleOnChange = (e) => {
    const values = e.target.value.toLowerCase();
    setSearchValue(values);

    const newValue = categoryData.filter((product) =>
      product.services?.some((service) =>
        service.categories?.toLowerCase().includes(values)
      )
    );

    if (newValue.length === 0) {
      Swal.fire("Warning", "Not Found Your Result", "warning");
    }

    setFilteredModel(newValue);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setProductPrice(product.ProductPrice || 0); // Initialize the price field
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleOpenCheckModal = (product) => {
    setSelectedProduct(product);
    setOpenCheckModal(true);
  };

  const handleCloseCheckModal = () => {
    setOpenCheckModal(false);
    setSelectedProduct(null);
  };

  const handleIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1)); // Ensure quantity doesn't go below 1
  };

  useEffect(() => {
    if (selectedProduct) {
      setIncomePrice(productPrice - (selectedProduct?.ProductPrice || 0));
    }
  }, [productPrice]);

  const groupedByType = filteredModel.reduce((acc, product) => {
    acc[product.types] = acc[product.types] || [];
    acc[product.types].push(product);
    return acc;
  }, {});


  return (
   <div>
    <Header/>

    <div className="container">
      <Typography variant="h4" style={{fontWeight:"700" ,marginTop:"20px",marginBottom:"60px"}} component="h1" gutterBottom>
      <span style={{ color: 'primaryColor' }}>  {type} Types</span>

      </Typography>
      <Grid container spacing={2}>
        {categoryData.map((service) => (
          <Grid
            key={`${service._id}-${service.categories}`}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <Paper
              sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0px 10px 22px rgb(42 135 158 / 50%)',
              }}
            >
              <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <div className="photo">
                    <div className="photoShops">
                      <img
                        src={service.img}
                        alt={service.categories}
                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} pl={2} my={3}>
                  <Box style={{ textAlign: 'left',marginTop:"-23px" }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Name: {service.categories}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Price: {service.ProductPrice}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box style={{marginTop:"-23px"}}>
                    <Button
                      sx={{ mt: 1, mb: 2 }}
                      onClick={() => handleOpenModal(service)}
                      variant="outlined"
                    >
                      Details
                    </Button>
                    <Button
                      sx={{ mt: 1, mb: 2, ml: 1 }}
                      onClick={() => handleOpenCheckModal(service)}
                      variant="contained"
                    >
                      Check
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
       {/* Details Modal */}
       <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="product-details-modal"
        aria-describedby="product-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedProduct && (
            <>
              <Typography
                id="product-details-modal"
                variant="h6"
                component="h2"
              >
                {selectedProduct.types}
              </Typography>
              <span style={{ display: "flex", alignItems: "center" }}>
                <PaidIcon color="primary" />
                <Typography
                  variant="body1"
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Price ৳ {productPrice * quantity + shippingCost}
                </Typography>
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <PaidIcon color="primary" />
                <Typography
                  variant="body1"
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Total Income ৳ {incomePrice * quantity}
                </Typography>
              </span>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Button
                  onClick={handleIncrementQuantity}
                  className="remove-design mt-2"
                >
                  +
                </Button>
                <Typography
                  variant="body1"
                  style={{
                    marginLeft: "10px",
                    marginTop: "15px",
                    fontWeight: "700",
                  }}
                >
                  {quantity}
                </Typography>
                <Button
                  onClick={handleDecrementQuantity}
                  className="remove-design mt-2 ms-2"
                >
                  -
                </Button>
              </div>

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Select Shipping Option</Typography>
                <RadioGroup
                  value={shippingOption}
                  onChange={handleShippingChange}
                >
                  <FormControlLabel
                    value="Dhaka Onsite"
                    control={<Radio />}
                    label="Dhaka Onsite (60 Taka)"
                  />
                  <FormControlLabel
                    value="Dhaka Outside"
                    control={<Radio />}
                    label="Dhaka Outside (120 Taka)"
                  />
                </RadioGroup>
              </Box>

              <h4 sx={{ mt: 2 }}>Sale Price</h4>
              <input
                onChange={handlePriceChange}
                value={productPrice || ""}
                style={{ fontWeight: "600", color: "#0E1621" }}
                className="w-75"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter sale price"
              />
              <br />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Check Modal */}
      <Modal
        open={openCheckModal}
        onClose={handleCloseCheckModal}
        aria-labelledby="check-product-details-modal"
        aria-describedby="check-product-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedProduct && (
            <>
              <Typography
                id="check-product-details-modal"
                variant="h6"
                component="h2"
              >
                {selectedProduct.types}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Price: TK. {selectedProduct.ProductPrice}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Category: {selectedProduct.categories}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Size: {selectedProduct.size}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Additional Info: {selectedProduct.additionalInfo}
              </Typography>

              {/* Copy Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 1 }}
                onClick={() => {
                  const productDetails = `
                            Product Name: ${selectedProduct.types}\n
                            Price: TK. ${selectedProduct.ProductPrice}\n
                            Category: ${selectedProduct.categories}\n
                            Size: ${selectedProduct.size || "N/A"}\n
                            Additional Info: ${
                              selectedProduct.additionalInfo || "N/A"
                            }
                        `;
                  navigator.clipboard
                    .writeText(productDetails)
                    .then(() => {
                      Swal.fire(
                        "Copied!",
                        "Product details have been copied to clipboard!",
                        "success"
                      );
                    })
                    .catch((err) => {
                      Swal.fire(
                        "Error",
                        "Failed to copy product details!",
                        "error"
                      );
                      console.error("Failed to copy: ", err);
                    });
                }}
              >
                Copy
              </Button>

              {/* Close Button */}
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleCloseCheckModal}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>

    <Footer/>
   </div>
  );
};

export default TypeCategoryDetail;
