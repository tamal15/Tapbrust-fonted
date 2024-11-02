import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from "@mui/material";
import ReactPaginate from 'react-paginate';
import useAuth from '../../../../Hooks/useAuth';
import Header from '../../../../Shared/Header/Header';
import Footer from '../../../../Shared/Footer/Footer';
import { CartContext } from '../../../../Context/CartContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminAllProductShow = () => {
    const [cart, setCart] = useContext(CartContext);
    const { user } = useAuth();
    const userData = { email: user.email, name: user.displayName };
    const [model, setModel] = useState([]);
    const [filteredModel, setFilteredModel] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const size = 15;
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const fetchData = () => {
        fetch(`https://tapbrust-backend.onrender.com/adminShowproduct?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
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
        const filteredData = model.filter(single => single.types === type);
        setFilteredModel(filteredData);
    };

    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd._id === product._id);
        let newCart = [];
        if (exists) {
            exists.quantity += 1;
            newCart = cart.map(pd => pd._id === product._id ? exists : pd);
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        localStorage.setItem("productCart", JSON.stringify(newCart));
        setCart(newCart);
        Swal.fire('Success Product!');
    };

    const handleLike = (id) => {
        fetch(`https://tapbrust-backend.onrender.com/adminlike/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => {
            if (res.status === 200) {
                fetchData();
            }
        }).catch(err => console.log(err));
    };

    const handleUnLike = (id) => {
        fetch(`https://tapbrust-backend.onrender.com/adminunlike/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => {
            if (res.status === 200) {
                fetchData();
            }
        }).catch(err => console.log(err));
    };

    const handleOnChange = (e) => {
        const values = e.target.value.toLowerCase();
        setSearchValue(values);
    
        // Filter products by checking if any of the services' categories match the search value
        const newValue = model.filter((product) =>
            product.services?.some(service => 
                service.categories?.toLowerCase().includes(values)
            )
        );
    
        if (newValue.length === 0) {
            Swal.fire('Warning', 'Not Found Your Result', 'warning');
        }
    
        setFilteredModel(newValue);
    };
    

    const getCategoryCount = (services = []) => {
        const categoryCount = services.reduce((acc, service) => {
            acc[service.categories] = (acc[service.categories] || 0) + 1;
            return acc;
        }, {});
        return categoryCount;
    };

    const placeholder = 'Search by  Categories Name example-- threepices';

    return (
        <div>
            <Header />
            <div className="container text-black mt-5 mb-5">
                <div className="row">
                    {/* <SearchBar handleOnChange={handleOnChange} placeholder={placeholder} /> */}
                </div>
                <div className="row g-4">
                    <div style={{textAlign:"left",boxShadow: "0px 14px 22px rgb(42 135 158 / 50%)",padding:"25px 25px",marginTop:"88px"}} className="col-12 col-md-3 ">
                        <div  className="question-sidebar ms-2">
                            <h2>Types</h2>
                            {model?.map((single, index) => (
                                <div key={index}>
                                    <p
                                        style={{ cursor: 'pointer',fontSize:"30px",fontWeight:"700", color: selectedType === single.types ? 'blue' : 'black',marginTop:"25px" }}
                                        onClick={() => handleTypeClicks(single.types)}
                                    >
                                        {single?.types.slice(
                                0,
                                12
                              )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-9">
                        <Grid container spacing={2} sx={{ mt: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {filteredModel.map((single) => {
                                const categoryCount = getCategoryCount(single.services);
                                return Object.entries(categoryCount).map(([category, count]) => (
                                    <Grid sx={{ py: 3 }} key={`${single._id}-${category}`} item xs={4} sm={4} md={4}>
                                        <Paper
                                            sx={{
                                                p: 1,
                                                margin: "auto",
                                                maxWidth: 500,
                                                flexGrow: 1,
                                                boxShadow: "0px 14px 22px rgb(42 135 158 / 50%)"
                                            }}
                                        >
                                            <Grid  container spacing={2} columns={{ xs: 4, sm: 8, md: 4 }}>
                                                <Grid style={{}} item xs={2} sm={4} md={8} pl={2} my={3}>
                                                    <Box style={{ textAlign: "center",marginTop:"-16px",marginBottom:"-20px" }}>
                                                        <h4 variant="body" style={{ fontWeight: 700 }}>
                                                            {category} ({count})
                                                        </h4>
                                                        <Box style={{ marginTop: "10px", marginBottom: "10px" }}>
                                                            <button
                                                                style={{ background: "#113350", color: "white", padding: "5px 10px", borderRadius: "10px" }}
                                                                onClick={() => handleTypeClick(category)}
                                                            >
                                                                View Products
                                                            </button>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ));
                            })}
                        </Grid>
                    </div>

                    <div className="d-flex mt-5">
                        <div className='mx-auto'>
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={1}
                                pageCount={pageCount}
                                onPageChange={handlePageChange}
                                containerClassName='pagination'
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousClassName='page-link'
                                nextClassName='page-link'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                activeClassName='active'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminAllProductShow;
