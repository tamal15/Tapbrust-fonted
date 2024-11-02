import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import axios from "axios";
import "./AdminAllProductUpload.css";

const image_hosting_key = "9f07225b8047e319723efcc4d4f9ca73";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AdminAllProductUpload = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Handle a single image upload
      if (data.img && data.img[0]) {
        const imageFile = new FormData();
        imageFile.append("image", data.img[0]);

        // Upload the image to the image hosting API
        const res = await axios.post(image_hosting_api, imageFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Check for a successful response and assign the image URL
        if (res && res.data && res.data.data && res.data.data.display_url) {
          data.img = res.data.data.display_url;
        } else {
          throw new Error("Unexpected response format from image hosting API");
        }
      } else {
        data.img = ""; // Set img to an empty string if no image is uploaded
      }

      // Add additional fields to the data object
      data.adminEmail = user.email;
      data.likes = [];
      data.services = [];

      // Post the data to the backend
      const response = await fetch("https://tapbrust-backend.onrender.com/postadminProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.insertedId) {
        alert("Added successfully");
        reset(); // Reset the form if the product is added successfully
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <div
              className="login-form text-center"
              style={{ background: "#113350", borderRadius: "20px" }}
            >
              <h2 className="mb-5 text-white">Add Your Admin Products</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Single image input field */}
                <input
                  type="file"
                  {...register("img", { required: true })}
                  style={{
                    fontWeight: "600",
                    color: "#0E1621",
                    background: "white",
                    padding: "5px",
                  }}
                  className="w-75 mb-3"
                />
                <input
                  type="text"
                  {...register("types", { required: true })}
                  placeholder="types"
                  style={{ fontWeight: "600", color: "#0E1621" }}
                  className="w-75 mb-3"
                />
                <br />

                <div className="paterns">
                  <button className="submit-all" type="submit">
                    Submit
                  </button>
                  <div className="paterns"></div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminAllProductUpload;
