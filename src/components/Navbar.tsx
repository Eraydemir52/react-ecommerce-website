import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MagaraIcon from "../images/magara.png";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  setCurrentUser,
  setDrawer,
  setLoading,
  setProducts,
} from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import { ProductType } from "../types/types";
import { FaShoppingBasket } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { RootState } from "../redux/store";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);
  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser(null));
    navigate("/login");
    toast.success("Çıkış Yapıldı");
  };
  const handeleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value) {
        //filtreleme
        dispatch(filterProducts(e.target.value));
      } else {
        //search boş ise
        const products: ProductType[] = await productService.getAllProducts();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("Filtreleme yaparken hata oluştu:" + error);
    }
  };
  const openDrawer = () => {
    dispatch(setDrawer(true));
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#454242" }}>
      <Toolbar>
        <IconButton
          onClick={() => navigate("/")}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img src={MagaraIcon} width={60} height={60} />
        </IconButton>

        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          mağarayol
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="searchInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handeleFilter(e)
            }
            placeholder="bir şey ara..."
            sx={{ width: "300px", marginBottom: "25px", marginRight: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
              style: {
                color: "lightgrey",
                borderBottom: "1px solid lightgrey",
              },
            }}
            variant="standard"
          />
          <Badge
            badgeContent={basket.length}
            color="warning"
            style={{ margin: "0px 6px", cursor: "pointer" }}
            onClick={openDrawer}
          >
            <FaShoppingBasket size={18} style={{ cursor: "pointer" }} />
          </Badge>
          <Button
            onClick={logout}
            sx={{ textTransform: "none", color: "lightgrey" }}
            color="inherit"
          >
            Çıkış Yap
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
