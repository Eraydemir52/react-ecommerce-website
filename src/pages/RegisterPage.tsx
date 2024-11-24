import React from "react";
import "../css/RegisterPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircle } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { registerPageSchema } from "../schemas/RegisterSchema";
import registerPageService from "../services/RegisterPageService";
import { UserType } from "../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const submit = async (value: any, actions: any) => {
    try {
      const payload: UserType = {
        id: String(Math.floor(Math.random() * 999999)),
        username: value.username,
        password: value.password,
        balance: 1000,
      };
      const response = await registerPageService.register(payload);
      if (response) {
        clear();
        toast.success("Kullanıcı Kaydedildi");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Kullanıcı kaydedilirken hata oluştu !");
    }
  };

  const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    //handle submit burayı tetikler
    onSubmit: submit,
    validationSchema: registerPageSchema, //schemayı(yup) entegre ettik
  });

  const clear = () => {
    resetForm();
  };

  return (
    <div className="register">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <TextField
              id="username"
              sx={{ width: "300px", marginBottom: "25px" }}
              placeholder="Kullanıcı adı"
              value={values.username}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoPersonCircle />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
              helperText={
                errors.username && (
                  <span style={{ color: "red" }}>{errors.username}</span>
                )
              }
            />
            <TextField
              id="password"
              value={values.password}
              onChange={handleChange}
              sx={{ width: "300px", marginBottom: "25px" }}
              type="password"
              placeholder="Şifre giriniz"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
              helperText={
                errors.password && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )
              }
            />
            <div>
              <Button
                type="submit"
                size="small"
                sx={{
                  textTransform: "none",
                  height: "28px",
                  marginRight: "10px",
                }}
                variant="contained"
                color="info"
              >
                Kaydol
              </Button>
              <Button
                size="small"
                onClick={clear}
                sx={{
                  textTransform: "none",
                  height: "28px",
                  backgroundColor: "#CDA735",
                }}
                variant="contained"
              >
                Temizle
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
