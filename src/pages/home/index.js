import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.jpg";
import { Button } from "@mui/material";
import { BiLogOutCircle } from "react-icons/bi";

const Home = () => {
  const menu = [
    {
      to: "/news",
      name: "Tin tức",
    },
  ];
  const navigate = useNavigate();
  const [locationSelected, setLocationSelected] = useState(menu[0]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(locationSelected?.to);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [locationSelected]);

  return (
    <div className="h-full min-h-screen flex flex-row w-screen">
      <div className="flex w-[300px] bg-gradient-to-br from-red-500 to-blue-500 items-center flex-col">
        <Button
          className="mt-10 gap-2 hover:text-yellow-500 hover:scale-110 hover:cursor-pointer bg-red-500 hover:border-yellow-500"
          style={{ fontWeight: "bold", marginTop: "20px" }}
          startIcon={<BiLogOutCircle />}
          color="secondary"
          variant="contained"
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>

        <div className="h-40 w-40 mt-10">
          <img src={Logo} alt="logo" />
        </div>
        <div className="flex w-full items-center justify-center">
          {menu?.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`${
                locationSelected?.to === item.to && "bg-blue-500"
              } w-full item-center justify-center text-center py-2 font-bold text-white`}
              onClick={() => setLocationSelected(item)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      {/* show children screen */}
      <Outlet />
    </div>
  );
};

export default Home;
