import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import Logo from "../../assets/img/logo.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthService } from '../../apis/auth'

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const disabledButton = !username || !password;

  const navigate = useNavigate();

  const onLogin = async () => {
    const body = {
      userName: username,
      password: password
    }
    const data = await AuthService.Login(body);

    if(data?.response?.token){
      toast(data?.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "success",
          });
      localStorage.setItem("token", data?.response?.token);
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
    else {
      toast(data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div>
        <div className="h-80 w-80">
          <img src={Logo} alt="logo" />
        </div>
        <div className="flex flex-col gap-8 w-full">
          <TextField
            required
            value={username}
            id="outlined-required"
            label="Tài khoản"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ fontWeight: "bold" }}
            disabled={disabledButton}
            onClick={onLogin}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
