import * as qs from 'querystring';
const axios = require('axios');

class ProductService {

    tokenData = JSON.parse(localStorage.getItem('token'));

    path = "http://localhost:8080/api/product";

    getProductList = () => {

        this.headers = {
            Authorization: `Bearer ${this.tokenData.token}`
        }
        return axios({
            method: 'get',
            url: this.path,
            headers: { 'Authorization': this.headers.Authorization }
        });
    }
}

export default ProductService;