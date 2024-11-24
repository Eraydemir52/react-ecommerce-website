import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import categoryService from "../services/CategoryService";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import { ProductType } from "../types/types";

function Category() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>();
  const getAllCategories = async () => {
    try {
      dispatch(setLoading(true));
      const categories: string[] = await categoryService.getAllCategories();
      setCategories(categories);
      console.log(categories);
    } catch (error) {
      toast.error("Kategori lisesi oluşturuken hata oluştu:" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleCategory = async (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryName: string
  ) => {
    try {
      dispatch(setLoading(true));
      if (e.target.checked) {
        //checked true ise categoryiye göre getir
        const products: ProductType[] =
          await categoryService.getProductByCategorName(categoryName);
        dispatch(setProducts(products));
      } else {
        //değilse tüm ürünleri getir
        const products: ProductType[] = await productService.getAllProducts();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("Kategoriler alınırken hata oluştu:" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div style={{ marginTop: "60px ", marginLeft: "20px" }}>
      <FormGroup>
        {categories &&
          categories.map((category: string, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCategory(e, category)
                  }
                  sx={{ fontSize: "12px" }}
                />
              }
              label={category}
            />
          ))}
      </FormGroup>
    </div>
  );
}

export default Category;
