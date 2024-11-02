import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';

const EditAdminProduct = () => {
  const { parentId, index } = useParams();
  const [product, setProduct] = useState({});
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`https://tapbrust-backend.onrender.com/editproduct/${parentId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        if (data.services && data.services[index]) {
          setService(data.services[index]);
        }
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [parentId, index]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedServices = [...product.services];
    updatedServices[index] = { ...service };

    try {
      const response = await fetch(`https://tapbrust-backend.onrender.com/productupdate/${parentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: updatedServices }),
      });
      const data = await response.json();
      if (response.ok && data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Service updated successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update the service. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the service. Please try again.',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService(prevService => ({
      ...prevService,
      [name]: value,
    }));
  };

  const defaultService = {
    types: '',
    size: '',
    Fabric: '',
    gender: '',
    ProductPrice: '',
    categories: '',
  };

  const currentService = { ...defaultService, ...service };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Update Service {parseInt(index) + 1}
        </Typography>
        <form onSubmit={handleUpdate} noValidate>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="types"
            label="Service Type"
            value={currentService.types}
            onChange={handleChange}
            autoFocus
          /> */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="size"
            label=" Size"
            value={currentService.size}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Fabric"
            label="Fabric"
            value={currentService.Fabric}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="gender"
            label="Gender"
            value={currentService.gender}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="ProductPrice"
            label="Product Price"
            value={currentService.ProductPrice}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="categories"
            label="Categories"
            value={currentService.categories}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Update Service
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditAdminProduct;
