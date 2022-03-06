import { getJWT } from "../services/tokenService";
import { getUserId } from "../services/employeeService";
const axios = require('axios');

class InvoiceService {
    path = "http://localhost:8080";
    getAllInvoices = () => {
        this.headers = {
            Authorization: `Bearer ${getJWT().token}`
        }
        return axios.get(this.path + "/api/invoice/" + getUserId().userID + "/get/all", { headers: this.headers });
    }

    getInvoicesByDate = (date) => {
        this.headers = {
            Authorization: `Bearer ${getJWT().token}`
        }
        return axios.get(this.path + "/api/invoice/" + getUserId().userID + "/get/by/" + date, { headers: this.headers });
    }

    cancelInvoice = (invoiceID) => {
        this.headers = {
            Authorization: `Bearer ${getJWT().token}`
        }
        return axios.put(this.path + "/api/invoice", { invoiceID: invoiceID }, { headers: this.headers });
    }

    restoreInvoice = (invoiceID) => {
        this.headers = {
            Authorization: `Bearer ${getJWT().token}`
        }
        return axios.put(this.path + "/api/invoice/restore", { invoiceID: invoiceID }, { headers: this.headers });
    }

    getAllCancelledInvoices = () => {
        this.headers = {
            Authorization: `Bearer ${getJWT().token}`
        }
        return axios.get(this.path + "/api/invoice/" + getUserId().userID + "/get/all/cancelled", { headers: this.headers });
    }
}

export default InvoiceService;