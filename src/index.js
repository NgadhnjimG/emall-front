import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";
import "./assets/css/customStyle.css";
import "./assets/css/pe-icon-7-stroke.css";
import AdminLayout from "layouts/Admin.jsx";
import EmployeeLayout from "layouts/Employee.jsx";
import Login from "views/Login";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
// import Login
//small change

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/employee" render={props => <EmployeeLayout {...props} />} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
