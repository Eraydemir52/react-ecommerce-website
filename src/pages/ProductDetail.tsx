import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { filterProducts, setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import { ProductType } from "../types/types";
import { Button } from "@mui/material";
import { addProductToBasket } from "../redux/basketSlice";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState<ProductType | null>();
  const getProductsById = async (productId: number) => {
    try {
      dispatch(setLoading(true));
      const product: ProductType = await productService.getProductsById(
        productId
      );
      setProduct(product);
    } catch (error) {
      toast.error("Ürün getirlirken hata oluştu:" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handlebasket = () => {
    if (product) {
      const payload: ProductType = {
        ...product,
        count: count,
      };
      dispatch(addProductToBasket(payload));
      toast.success("Ürün Sepete Eklendi");
    }
  };

  useEffect(() => {
    getProductsById(Number(productId));
  }, []);

  return (
    <Container maxWidth="lg">
      {product && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginTop: "60px",
            }}
          >
            <div>
              <img src={product.image} width={250} height={400} />
            </div>
            <div style={{ marginLeft: "60px", marginTop: "60px" }}>
              <div
                style={{
                  fontFamily: "arial",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {product.title}
              </div>
              <div
                style={{
                  fontFamily: "arial",
                  fontSize: "16px",
                  marginTop: "25px",
                  height: "100px",
                }}
              >
                {product.description}
              </div>
              <div
                style={{
                  fontFamily: "arial",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {product.price} ₺
              </div>
              <div style={{ marginTop: "20px" }}>
                <span
                  onClick={() => setCount(count + 1)}
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  +
                </span>
                <span style={{ fontSize: "30px", fontFamily: "arial" }}>
                  {count}
                </span>
                <span
                  onClick={() => setCount(count - 1)}
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  -
                </span>
              </div>

              <div>
                <Button
                  onClick={handlebasket}
                  color="info"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none", marginTop: "20px" }}
                >
                  Sepete Ekle
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default ProductDetail;
