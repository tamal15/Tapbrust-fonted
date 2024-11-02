import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography } from "@mui/material";
import Swal from 'sweetalert2';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch('https://tapbrust-backend.onrender.com/adminShowproduct')
      .then((res) => res.json())
      .then((data) => setProducts(data.allQuestions))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = async (parentId, index) => {
    try {
      const response = await fetch(`https://tapbrust-backend.onrender.com/productdelete/${parentId}/${index}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.deletedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Service deleted successfully',
        });

        // Update state to reflect deletion
        setProducts(prevProducts => 
          prevProducts.map(product => {
            if (product._id === parentId) {
              return {
                ...product,
                services: product.services.filter((_, i) => i !== parseInt(index))
              };
            }
            return product;
          }).filter(product => product.services.length > 0) // Remove products with empty services array
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: data.message || 'Failed to delete the service. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the service. Please try again.',
      });
      console.error('Error deleting service:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ mt: 6 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              {/* <TableCell>Type</TableCell> */}
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Fabric</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(single =>
              single?.services?.map((service, index) => (
                <TableRow key={`${single._id}-${index}`}>
                  <TableCell>
                    <img
                      src={service?.img}
                      alt={service?.categories}
                      style={{ width: 100, height: 100, borderRadius: '10px' }}
                    />
                  </TableCell>
                  {/* <TableCell>{service?.types}</TableCell> */}
                  <TableCell>{service?.ProductPrice}</TableCell>
                  <TableCell>{service?.categories}</TableCell>
                  <TableCell>{service?.Fabric}</TableCell>
                  <TableCell>{service?.gender}</TableCell>
                  <TableCell>{service?.size}</TableCell>
                  <TableCell style={{}}>
                    <NavLink to={`/dashboard/updateadminproducts/${single?._id}/${index}`}>
                      <Button  color="primary" sx={{ mr: 1 }}>
                      <InfoIcon  />
                      </Button>
                    </NavLink>
                    <Button
                    
                      color="error"
                      onClick={() => handleDelete(single?._id, index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={products.reduce((acc, single) => acc + (single.services?.length || 0), 0)} // Count total services
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AdminProducts;
