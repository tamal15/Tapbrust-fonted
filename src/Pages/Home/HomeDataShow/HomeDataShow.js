import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  Skeleton,
} from "@mui/material";
import ReactPaginate from "react-paginate";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import useAuth from "../../../Hooks/useAuth";
import PaidIcon from "@mui/icons-material/Paid"; 
import './HomeDataShow.css'
import { FcLike } from "react-icons/fc";
const HomeDataShow = () => {
  const [cart, setCart] = useContext(CartContext);
  const { user } = useAuth();
  console.log(user)
  const userData = { email: user.email, name: user.displayName };
  const [model, setModel] = useState([]);
  const [filteredModel, setFilteredModel] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const size = 15;
  const [searchValue, setSearchValue] = useState("");
  const [selectedSize, setSelectedSize] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [incomePrice, setIncomePrice] = useState(0);
  const [shippingOption, setShippingOption] = useState(""); // State for shipping option
  const [shippingCost, setShippingCost] = useState(0);
  const [openCheckModal, setOpenCheckModal] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`https://tapbrust-backend.onrender.com/adminShowproduct?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data.allQuestions);
        setFilteredModel(data.allQuestions);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const handlePageChange = (data) => {
    setPage(data.selected);
  };

  const handleTypeClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleTypeClicks = (type) => {
    setSelectedType(type);
    const filteredData = model.filter((single) => single.types === type);
    setFilteredModel(filteredData);
  };

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
        pd.productimg === product.productimg &&
        pd.selectedSize === selectedSize
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
        selectedSize
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

    const newValue = model.filter((product) =>
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

  const handleSeeMore = (type) => {
    navigate(`/partcategories/${type}`);
  };
  const placeholder = "Search by Sharee Categories Name";

  const handleLikeProducts = (product) => {
    const likedProductData = {
      categories: product.categories,
      size: product.size,
      img: product.img,
      description: product.description,
      ProductPrice: product.ProductPrice,
      userEmail: user.email // Assuming the user is logged in and the email is available
    };
  
    // Send the product data to the backend using POST
    fetch("https://tapbrust-backend.onrender.com/addLikedProductdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likedProductData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire("Success", "Product liked successfully!", "success");
      })
      .catch((error) => {
        console.error("Error liking product:", error);
        Swal.fire("Error", "Failed to like product", "error");
      });
  };


  const [zoom, setZoom] = useState({
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
  });

  // Handle mouse move for zoom effect (optional)
  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;

    setZoom({
      backgroundPositionX: `${x}%`,
      backgroundPositionY: `${y}%`,
    });
  };
  
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enables autoplay
    autoplaySpeed: 3000, // Time in ms for each slide (3 seconds)
  };

  return (
    <div>
      <div className="container text-black mt-5 mb-5">
        <div className="row">
          {/* <SearchBar
            handleOnChange={handleOnChange}
            placeholder={placeholder}
          /> */}
        </div>
        <div className="row">
          <div className="col-12 ">
            {Object.entries(groupedByType).map(([type, products]) => (
              <div key={type}>
                 <div style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  backgroundColor: 'rgb(42 135 158 / 10%)', // Set your desired background color
  padding: '3px', // Optional: Add padding for better spacing
  borderRadius: '5px', // Optional: Add border radius for rounded corners
  boxShadow: "0px 10px 22px rgb(42 135 158 / 50%)" // Optional: Add shadow for a subtle effect
}}>
  <h3 style={{ 
    marginTop: "20px", 
    color: "black", 
    textAlign: "left" ,
    padding:"2px",
    fontWeight:"700"
  }}>
    {type}
  </h3>
  <Button 
    variant="contained" 
    onClick={() => handleSeeMore(type)}
    style={{ marginLeft: 'auto',textAlign: "right",padding: '8px 16px',marginRight:"50px",background:"#113350" }} // Push button to the right
  >
    See More
  </Button>
</div>

<Grid container spacing={{xs:1, sm:1,md:2}} sx={{ mt: 2 }} columns={{ xs: 8, sm: 8, md: 12 }}>
      {loading ? (
        Array.from(new Array(12)).map((_, index) => ( // Adjust the number as needed
          <Grid item xs={4} sm={4} md={3} key={index}>
            <Skeleton variant="rectangular" width="100%" height={180} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem', marginTop: '10px' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: '10px' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: '10px' }} />
          </Grid>
        ))
      ) : (
        products.map((product) => {
          const categoryCount = product.services.reduce((acc, service) => {
            acc[service.categories] = (acc[service.categories] || 0) + 1;
            return acc;
          }, {});

          return product.services.map((service) => (
            <Grid sx={{ py: 3, marginTop: "3px" }} key={`${product._id}-${service.categories}`} item xs={4} sm={4} md={3}>
              <Paper sx={{
                p: 1,
                margin: "auto",
                maxWidth: 400,
                flexGrow: 1,
                boxShadow: "0px 10px 22px rgb(42 135 158 / 50%)",
              }}>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 4 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className="photo">
                      <div className="photoShops">
                        <img src={service.img} alt={service.categories} />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={4} sm={4} md={8} pl={2} my={3}>
                    <Box sx={{ textAlign: "left", marginTop: {xs:"-29px",md:"-25px"} }}>
                      <h5 style={{ fontWeight: "700" }}>
                        {service.categories}
                      </h5>
                      <Box style={{ fontWeight: "700" }}>
                        {user && user.email ? (
                          <Typography variant="body">
                            Price: {service.ProductPrice}
                          </Typography>
                        ) : null // Hides the price if the user is not logged in or has not received the email
                        }
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <div style={{ marginTop: "-30px" }}>
                      <Button
                        sx={{ mt: {xs:0,md:1}, mb: {xs:1,md:2} }}
                        onClick={() => handleOpenModal(service)}
                        variant="outlined"
                      >
                        Add Cart
                      </Button>
                      <Button
                        sx={{mt: { xs: 0, md: 1 }, mb: {xs:0,md:2}, marginLeft: "5px", background: "#113350" }}
                        onClick={() => handleOpenCheckModal(service)}
                        variant="contained"
                      >
                        Details
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ));
        })
      )}
    </Grid>
              </div>
            ))}
          </div>
        </div>
        {/* <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        /> */}
      </div>

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

              <Box>
      {/* Display the currently selected size */}
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Selected Size: {selectedSize || 'None'}
      </Typography>

      {/* Only render sizes if selectedProduct is available */}
      {selectedProduct && (
        <Box>
          {/* Split sizes and trim spaces directly in JSX */}
          {selectedProduct.size && 
            selectedProduct.size.split(',').map(size => size.trim()).map((size, index) => (
              <Button 
                key={index}
                variant="outlined" 
                onClick={() => setSelectedSize(size)} // Set selected size
                sx={{ margin: '0 5px' }}
              >
                {size.toUpperCase()} {/* Display size in uppercase */}
              </Button>
            ))}
        </Box>
      )}
    </Box>
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
      width: "90vw", // 90% of the viewport width
      height: {
        xs: "65vh", // 70% of viewport height on extra small screens (mobile)
        sm: "75vh", // 80% on small screens (tablets)
        md: "80vh", // 85% on medium screens (desktops)
        lg: "85vh", // 90% on larger screens
      },
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      overflowY: "auto", // Allow scrolling if content overflows
    }}
  >
    {selectedProduct && (
      <>
        {/* Copy Button in the upper-right corner */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            right: 16, // Positioning at the top-right corner
          }}
          onClick={() => {
            const productDetails = `
              Product Name: ${selectedProduct.types}\n
              Price: TK. ${selectedProduct.ProductPrice}\n
              Category: ${selectedProduct.categories}\n
              Size: ${selectedProduct.size || "N/A"}\n
              Additional Info: ${selectedProduct.Fabric || "N/A"}
              Additional Info: ${selectedProduct.description || "N/A"}
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

        <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, flexDirection: { xs: 'column', md: 'row' },marginTop:"20px"}}>
      <Box>
      <Box style={{ width: '300px', margin: 'auto' }}>
      {/* Slider for multiple images */}
      <Box style={{ width: '300px', margin: 'auto' }}>
      {/* Slider for multiple images */}
      <Slider {...sliderSettings}>
        {selectedProduct?.multipleimg?.map((imgUrl, index) => (
          <Box
            key={index}
            onMouseMove={handleMouseMove}
            style={{
              height: '230px',
              width: '300px',
              marginTop: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={imgUrl}
              alt={`Product ${index}`}
              style={{
                height: '230px',
              width: '300px',
                objectFit: 'cover',
                transition: 'transform 0.2s ease',
                transform: `scale(${zoom.scale || 1})`, // Optional zoom effect
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
    </Box>
      </Box>

      <Box style={{marginLeft:"10px"}}>
        {/* <Typography id="check-product-details-modal" variant="h6" component="h2">
          Types: {selectedProduct.types}
        </Typography> */}
        <Box style={{ fontWeight: '700' }}>
          {user && user.email ? (
            <Typography variant="body">Price: {selectedProduct.ProductPrice}</Typography>
          ) : null}
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          Category: {selectedProduct.categories}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          Size: {selectedProduct.size}
        </Typography>
        {/* <Typography variant="body1" sx={{ fontWeight: 700 }}>
          Fabric: {selectedProduct.Fabric}
        </Typography> */}
        <Typography
        variant="body1"
        sx={{
          fontWeight: 700,
          whiteSpace: 'pre-line',
          lineHeight: 1,
        }}
      >
        Description: {selectedProduct.description}
      </Typography>

        <Box sx={{display:"flex",gap:1}}>
        <Button
        variant="contained"
        sx={{ mt: 2, background: "#113350" }}>
        <FcLike
          onClick={() => handleLikeProducts(selectedProduct)} // Like handler
          style={{ cursor: "pointer",fontSize:"20px" , color:"white"}} // Make it look clickable
        />
        </Button>
        <br/>


        {/* Close Button */}
        <Button
          variant="contained"
          sx={{ mt: 2, background: "#113350" }}
          onClick={handleCloseCheckModal}
        >
          Close
        </Button>
        </Box>
      </Box>
    </Box>
        

         {/* Like Button */}
        
      </>
    )}
  </Box>
</Modal>



    </div>
  );
};

export default HomeDataShow;
