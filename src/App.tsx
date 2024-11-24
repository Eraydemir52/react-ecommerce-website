import { useEffect, useState } from "react";
import "./App.css";
import RouterConfig from "./config/RouterConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import productService from "./services/ProductService";
import { ProductType, UserType } from "./types/types";
import { setCurrentUser, setProducts } from "./redux/appSlice";
import { setBasket } from "./redux/basketSlice";
import BasketDetail from "./components/BasketDetail";

function App() {
  const { currentUser } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    const products: ProductType[] = await productService.getAllProducts();
    dispatch(setProducts(products));
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    const currentUserString: string | null =
      localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, []);

  useEffect(() => {
    const basketString = localStorage.getItem("basket");
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[];
      dispatch(setBasket(basket));
    }
  });
  return (
    <div>
      {currentUser && <Navbar />}

      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: "13px" }} />
      <Spinner />
      <BasketDetail />
    </div>
  );
}

export default App;
