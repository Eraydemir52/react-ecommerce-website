import "../css/RegisterPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircle } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { registerPageSchema } from "../schemas/RegisterSchema";
import "../css/LoginPage.css";
import loginPageService from "../services/LoginPageService";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { UserType } from "../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface CheckUserType {
  result: boolean;
  currentUser: UserType | null;
}

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //values değerler action validasyonlar
  const checkUser = (
    userList: UserType[],
    username: string,
    password: string
  ): CheckUserType => {
    const response: CheckUserType = { result: false, currentUser: null };
    userList.forEach((user: UserType) => {
      if (user.username == username && user.password == password) {
        response.result = true;
        response.currentUser = user;
      }
    });
    return response;
  };
  const submit = async (values: any, action: any) => {
    try {
      dispatch(setLoading(true));
      const response: UserType[] = await loginPageService.login();
      if (response) {
        const checkUserResponse: CheckUserType = checkUser(
          response,
          values.username,
          values.password
        );
        if (checkUserResponse.result && checkUserResponse.currentUser) {
          //kullanıcı adı ve şifre doğru
          dispatch(setCurrentUser(checkUserResponse.currentUser));
          localStorage.setItem(
            "currentUser",
            JSON.stringify(checkUserResponse.currentUser)
          );
          navigate("/");
        } else {
          //yanlış
          toast.error("Kullanıcı adı veya şifre hatalı");
        }
      }
    } catch (error) {
      toast.error("Giriş yapılırken hata oluştu:" + error);
    } finally {
      dispatch(setLoading(false));
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
    <div className="login">
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
                Giriş Yap
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

export default LoginPage;
