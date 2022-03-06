import React, { Component } from "react";
import CustomForm from "../components/CustomForm/CustomForm.jsx";
import EmployeeService from "../services/employeeService.js";
import { withRouter } from "react-router-dom";
import { setJWT } from "../services/tokenService";

import { ToastContainer, toast } from "react-toastify";

class Login extends Component {
  InputGroup = [
    {
      label: {
        text: "Username:",
        class: "",
      },
      inputClass: "",
      type: "text",
      placeholder: "type username here...",
      disabled: false,
      inputName: "username",
      value: undefined,
    },
    {
      label: {
        text: "Password:",
        class: "",
      },
      inputClass: "",
      type: "password",
      placeholder: "type password here...",
      disabled: false,
      inputName: "password",
      value: undefined,
    },
    {
      label: {
        text: "",
        class: "",
      },
      inputClass: "",
      type: "submit",
      placeholder: "",
      disabled: false,
      value: "Login",
      inputName: "login",
    },
  ];

  employeeService = new EmployeeService();

  onsubmit = (data) => {
    if (data.username && data.password) {
      this.employeeService
        .login(data)
        .then((res) => {
          localStorage.setItem(
            "userID",
            JSON.stringify({
              userID: res.data.userID,
            })
          );
          setJWT(res.data.token);
          this.sendToCashierPage();
        })
        .catch((err) => {
          toast.error("Not authorized", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.warn("Please fill username and password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  sendToCashierPage = () => {
    this.props.history.push({
      pathname: "/employee/cashier",
    });
  };

  render() {
    return (
      <div className="login-page ">
        <div className="opacity-login"></div>
        <div className="flex login-box vertical-flex w-30 vh-40  box-center-horizontal relative top-30-vh">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <h2 className="text-center  p-0">Login</h2>
          <CustomForm
            handleSubmit={(e) => this.onsubmit(e)}
            formclass="align-center"
            data={this.InputGroup}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
