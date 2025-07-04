import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setLoginType }) => {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const Login = () => {
    if (UserName === "" || UserName == null) {
      alert("Please Enter User Name");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        UserName: UserName,
        Password: Password,
      };
      axios.post(MyApiUrl + "AdminLogin", obj).then((response) => {
        if (response.data === false) {
          alert("Failed To Login, Please Enter Valid Credentials...!");
        } else {
          localStorage.setItem("LoginType", "Admin");
          setLoginType("Admin");
          navigate("/AdminDashboard");
        }
      });
    }
  };
  return (
    <react-fragment>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">Admin Login</h1>
              <div className="nav-bread-crumb">
                <a href="/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="book-your-consulting rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="appoinment-area-main appoinment-page bg_image">
                    <h2 className="title mb--40">Login Here</h2>
                    <form action="#">
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="text"
                          id="text"
                          placeholder="User Name"
                          value={UserName}
                          onChange={(event) => {
                            setUserName(event.target.value);
                          }}
                        />
                      </div>
                      <div className="input-half-wrapper datepicker-wrapper">
                        <input
                          type="Password"
                          id="password"
                          placeholder="Password"
                          value={Password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </div>
                      <a style={{cursor:"pointer"}} onClick={Login} class="rts-btn btn-primary">
                        Login{" "}
                        <img
                          src="assets/images/banner/icons/arrow--up-right.svg"
                          alt=""
                        />
                      </a>
                    </form>
                  </div>
                </div>
                <div
                  className="col-lg-6"
                  style={{
                    border: "1px solid #dbdbdb",
                    borderRadius: "5px",
                    alignContent: "center",
                  }}
                >
                  <h4 style={{ textAlign: "center" }}>
                    Please login here with a valid login credentials.
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </react-fragment>
  );
};

export default AdminLogin;
