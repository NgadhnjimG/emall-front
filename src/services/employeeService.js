import { getJWT } from "../services/tokenService";
const axios = require("axios");

class EmployeeService {
  path = "http://localhost:8080";

  login = (userData) => {
    return axios.post(this.path + "/authenticate", userData);
  };

  createInvoice = (data) => {
    this.headers = {
      Authorization: `Bearer ${getJWT().token}`,
    };
    var user = getUserId();
    return axios({
      method: "post",
      url: this.path + "/api/employee/" + user.userID + "/generate/invoice",
      headers: { Authorization: this.headers.Authorization },
      data: data,
      validateStatus: (status) => {
        console.log(status); // I'm always returning true, you may want to do it depending on the status received
      },
    });
  };
}

export default EmployeeService;

export const getUserId = () => {
  var userID = JSON.parse(localStorage.getItem("userID"));
  return userID;
};
