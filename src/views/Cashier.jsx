import React, { Component } from 'react';
import { setJWT, tokenExists } from "../services/tokenService.js";

import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { thArray, miniThArray } from "../variables/CashierVariables.jsx"
import { MdEuroSymbol } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import ProductService from "../services/ProductService.js";
import EmployeeService from "../services/employeeService";
import CustomModal from "../components/CustomModal/CustomModal";
import toFixedIfNecessary from "../services/NumberRegulator";
import CustomMiniTable from "../components/CustomMiniTable/CustomMiniTable.jsx";

import { ToastContainer, toast } from 'react-toastify';
class Cashier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            invoice: {
                scannedProducts: []
            },
            productsAfterSearch: [],
            printInvoiceButtonDisabled: true,
            resetInvoiceButtonDisabled: true,
            modalShow: false,
            toogleTest: false,
            inputFocused: false
        }
    }


    productService = new ProductService();

    componentDidMount = () => {
        if (!tokenExists()) {
            this.props.history.push("/login");
            return;
        }

        this.getProductList();
        this.defineGlobalEsc();

        this.setClicked();
    }

    setClicked = () => {
        // var els=document.querySelectorAll("*");
        // for(let i=0;i<els.length;i++){

        // }
    }

    defineGlobalEsc = () => {
        window.addEventListener('keyup', function (event) {
            if (event.key === 'Escape') {

                document.getElementsByName('search')[0].blur();
                document.getElementById('all-products-table').classList.add('hidden');
                document.getElementById('main-table').classList.remove('opacity-30');
            }
        })
    }
    getProductList = () => {
        this.productService.getProductList()
            .then(res => {
                // localStorage.removeItem('token');
                localStorage.setItem('token', JSON.stringify({
                    token: res.data.token
                }))
                this.setState({
                    allProducts: res.data.data,
                    productsAfterSearch: res.data.data
                })
            })
            .catch(err => {
                toast.warn('Cannot get product list, please refresh page', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    inputFocus = (e, focused) => {
        if (focused) {
            this.setState({ toogleTest: true, inputFocused: true })
            document.getElementById('all-products-table').classList.toggle('hidden');
            document.getElementById('main-table').classList.toggle('opacity-30');
        } else {
            this.setState({ toogleTest: false, inputFocused: false })
            document.getElementById('all-products-table').classList.add('hidden');
            document.getElementById('main-table').classList.remove('opacity-30');
        }
    }

    productClicked = (e, code) => {
        var tempProduct = this.state.allProducts.find(prod => prod.productCode == code);
        var scannedProd = this.state.invoice.scannedProducts.find(prod => prod.product.productCode == code);
        var productToBeAdded = scannedProd;
        if (scannedProd == undefined) {
            productToBeAdded = {
                product: tempProduct,
                quantity: 1
            }
            this.setState({
                invoice: {
                    ...this.state.invoice,
                    scannedProducts: [
                        ...this.state.invoice.scannedProducts,
                        productToBeAdded
                    ],
                },

                printInvoiceButtonDisabled: false,
                resetInvoiceButtonDisabled: false
            })
        }
        else {
            var tempArray = this.state.invoice.scannedProducts.filter(prod => {
                if (prod.product.productCode == productToBeAdded.product.productCode) {
                    prod.quantity = prod.quantity + 1;
                    return prod;
                }
                else {
                    return prod;
                }
            });
            this.setState({
                invoice: {
                    ...this.state.invoice,
                    scannedProducts: tempArray
                }
            })

        }
    }
    handleSearchInput = (name, value) => {
        var temp = this.state.allProducts.filter(prod => {
            if (prod.productCode == value || prod.productName.match(value))
                return prod;
        })
        this.setState({
            productsAfterSearch: temp
        })
    }

    handleEscapeChar = (e) => {
        this.inputFocus(e, false);
    }

    getTotalPrice = () => {
        var totalPrice = 0;
        var i = 0;
        while (i < this.state.invoice.scannedProducts.length) {
            var prod = this.state.invoice.scannedProducts[i++];
            totalPrice += prod.product.productPrice * prod.quantity
        }
        totalPrice = toFixedIfNecessary(totalPrice, 2);
        return totalPrice;
    }


    quantityChange = (e, value, product) => {
        var doNotSetState = false;
        var tempArray = this.state.invoice.scannedProducts.filter(element => {
            if (element.product.productCode == product.product.productCode) {
                if (value < 0 && element.quantity == 1) {
                    this.removeProductFromScanned(element);
                    doNotSetState = true;
                    return;
                }
                element.quantity = element.quantity + value;
                return element;
            }
            return element;
        })
        if (doNotSetState)
            return;
        this.setState({
            scannedProd: tempArray
        })
    }

    removeProductFromScanned = (product) => {
        var tempArray = this.state.invoice.scannedProducts.filter(element => {
            if (element.product.productCode == product.product.productCode) {
                return;
            }
            return element;
        })

        this.setState({
            invoice: {
                ...this.state.invoice,
                scannedProducts: tempArray,
            },
            printInvoiceButtonDisabled: true,
            resetInvoiceButtonDisabled: true
        })
    }

    resetInvoice = (e) => {
        this.setState({
            invoice: {
                scannedProducts: [],
            },
            printInvoiceButtonDisabled: true,
            resetInvoiceButtonDisabled: true

        })
    }

    employeeService = new EmployeeService();

    showModal = (e) => {
        if (this.state.invoice.scannedProducts.length == 0) return;
        this.setState({
            modalShow: true
        })

    }

    printInvoice = (paymentDetails) => {
        if (this.state.invoice.scannedProducts.length == 0) return;
        var temp = paymentDetails;
        temp = {
            ...temp,
            scannedProducts: this.state.invoice.scannedProducts
        }
        this.employeeService.createInvoice(temp).then(res => {
            setJWT(res.data.token)
            this.setState({
                modalShow: false
            })
        }).catch(err => {
            if (err.response.data.token == null || err.response.data.token == undefined) return;
            else {
                setJWT(err.response.data.token)
                toast.success('Invoice registered successfully', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                this.setState({
                    modalShow: false
                })
                this.resetInvoice();
            }
        })
    }

    hideModal = () => {
        this.setState({
            modalShow: false
        })
    }

    changeToggle = (e) => {
        this.setState({
            toogleTest: true
        })
        this.inputFocus(e, 1);
    }

    inputData = {
        inputClass: "p-0 no-border border-bottom radius-0 inherit-all",
        type: "text",
        placeholder: "search for product here...",
        disabled: false,
        inputName: "search"
    }

    miniTableToggleVisibility = (e, data) => {
        // this.inputFocus(e, false)
        if (this.state.toogleTest && !this.state.inputFocused) {
            this.inputFocus(e, false)
        }
        else {
            this.setState({
                inputFocused: false
            })
        }

    }
    render() {
        return (

            <div className="w-95 relative left-2 bg-white p-10 mt-2-vh mb-2-vh flex vertical-flex">
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
                {this.state.modalShow ?
                    <CustomModal
                        show={this.state.modalShow}
                        onHide={this.hideModal}
                        totalprice={this.getTotalPrice()}
                        onSubmit={this.printInvoice}
                        formclass=" flex-end" /> : ""}

                <div>
                    <div className="flex flex-space-between ">
                        <div className="flex align-center">
                            <h5 className="m-0">Search product:</h5>
                            <CustomInput
                                handleInput={this.handleSearchInput}
                                autoComp={false}
                                handleFocus={this.inputFocus}
                                data={this.inputData}
                                handleEscape={this.handleEscapeChar}
                                onClick={e => this.changeToggle(e)}

                            />
                        </div>

                        <Button
                            variant="danger"
                            className="reset-btn bg-red white no-border"
                            onClick={e => this.resetInvoice(e)}
                            disabled={this.state.resetInvoiceButtonDisabled}>Reset</Button>
                    </div>

                    <div id="all-products-table" className="absolute w-50 hidden z-index-front">
                        <CustomMiniTable eventTypes="click" toggleVisibility={this.miniTableToggleVisibility} miniThArray={miniThArray} productsAfterSearch={this.state.productsAfterSearch.length == 0 ? "" : this.state.productsAfterSearch} productClicked={this.productClicked} key={Math.floor(Math.random() * 101)} />

                    </div>
                </div>

                <Table id="main-table" className="flex vertical-flex" striped hover>
                    <thead className="flex">
                        <tr className="flex inherit-all flex-grow-1">
                            {thArray.map((prop, key) => {

                                return <th
                                    className={`flex-grow-1 
                                    ${key == 4 || key == 3 ? "flex-basis-5-perc " : ""} 
                                    ${key == 4 ? "text-right" : "flex-basis-30-perc"}
                                    ${key == 3 ? "text-center" : ""}
                                    ${key == 2 ? "text-right pr-10-perc" : ""}
                                    `}
                                    key={key}>
                                    {prop}
                                </th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.invoice.scannedProducts.length > 0 ?
                            this.state.invoice.scannedProducts.map((prop, key) => {
                                return (
                                    <tr key={key} className="flex inherit-all">
                                        <td
                                            className="flex-basis-30-perc flex-grow-1"
                                            key={key + 'atr' + 1}>
                                            {prop.product.productCode}
                                        </td>
                                        <td
                                            className="flex-basis-30-perc flex-grow-1"
                                            key={key + 'atr' + 2}>
                                            {prop.product.productName}
                                        </td>
                                        <td
                                            key={key + 'atr' + 3}
                                            className="flex-basis-30-perc flex flex-grow-1 justify-content-end align-center pr-10-perc" >
                                            <span>{prop.product.productPrice}</span>
                                            <MdEuroSymbol />
                                        </td>
                                        <td
                                            key={key}
                                            className="flex-basis-5-perc flex flex-grow-1  align-center " >
                                            <AiOutlineMinusCircle
                                                onClick={e => this.quantityChange(e, -1, prop)}
                                                className="clickable"
                                            />
                                            <span className="m-lr-auto">{prop.quantity}</span>
                                            <AiOutlinePlusCircle
                                                onClick={e => this.quantityChange(e, 1, prop)}
                                                className="clickable"
                                            />
                                        </td>
                                        <td
                                            className="flex-basis-5-perc flex align-center justify-content-end  flex-grow-1 text-right flex-end"
                                            key={key + 'atr' + 5}>
                                            <span>{prop.product.productPrice * prop.quantity}</span>
                                            <MdEuroSymbol />
                                        </td>
                                    </tr>
                                );
                            })

                            :
                            <tr key="empty-row" className="flex inherit-all">
                                <td key="empty-td-1" className="flex-basis-30-perc flex-grow-1"></td>
                                <td key="empty-td-2" className="flex-basis-30-perc flex-grow-1"></td>
                                <td key="empty-td-3" className="flex-basis-30-perc flex-grow-1"></td>
                                <td key="empty-td-4" className="flex-basis-30-perc flex-grow-1"></td>
                                <td key="empty-td-5" className="flex-basis-30-perc flex-grow-1"></td>
                            </tr>
                        }
                    </tbody>
                </Table>
                <h3 className="align-self -end flex align-center">Total: <span className="pl-5-px">{this.getTotalPrice()}</span><MdEuroSymbol /></h3>
                <Button
                    onClick={e => this.showModal(e)}
                    variant="success"
                    disabled={this.state.printInvoiceButtonDisabled}
                    className="success-btn w-10 align-self-end bg-green white"> Print Invoice
                </Button>
            </div>
        );

    }
}

export default Cashier;