import React, { Component } from 'react';
import { tokenExists } from "../services/tokenService";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { invoiceThArray } from "../variables/CashierVariables.jsx"
import { MdEuroSymbol, MdFindReplace } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import EmployeeService from "../services/employeeService";
import InvoiceService from "../services/InvoiceService";
import { setJWT } from "../services/tokenService";
import toFixedIfNecessary from "../services/NumberRegulator.js";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BsCaretDown } from 'react-icons/bs';
import { isForOfStatement } from 'typescript';
import CustomInput from "../components/CustomInput/CustomInput";
import { ToastContainer, toast } from 'react-toastify';

class CancelledInvoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceList: [],
            sortingData: {
                ascIcon: true,
                sortingType: "InvoiceID"
            }
        }
    }
    employeeService = new EmployeeService();
    invoiceService = new InvoiceService();

    componentDidMount() {
        this.tokenCheck();
        this.getInvoices();
    }
    tokenCheck = () => {
        if (!tokenExists()) {
            this.props.history.push("/login");
            return;
        }
    }

    getInvoices = () => {
        this.invoiceService.getAllCancelledInvoices().then(res => {
            this.sortAndSave(res.data.data, "InvoiceID", true)
            setJWT(res.data.token)
        }).catch(err => {
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

    sortAndSave = (list, type, first = false) => {
        // "InvoiceID", "Date", "Time", "Price", "Payment Type", "Card Ammount Payment", "Cash Ammount Payment", "Change", "Details", "Delete"
        var caretUp = true;
        var inverse = false;
        if (this.state.sortingData.sortingType == type && !first) {
            caretUp = !this.state.sortingData.ascIcon;
            inverse = true;
        }
        if (inverse && !first && !caretUp) {
            if (type == 'InvoiceID')
                list.sort((a, b) => b.invoiceID - a.invoiceID)
            else if (type == 'Date')
                list.sort((a, b) => b.date - a.date)
            else if (type == 'Time')
                list.sort((a, b) => b.time - a.time)
            else if (type == 'Price')
                list.sort((a, b) => b.totalPrice - a.totalPrice)
            else if (type == 'Payment Type')
                list.sort((a, b) => b.paymentType - a.paymentType)
            else if (type == 'Card Ammount Payment')
                list.sort((a, b) => b.cardMoneyGiven - a.cardMoneyGiven)
            else if (type == 'Cash Ammount Payment')
                list.sort((a, b) => b.cashMoneyGiven - a.cashMoneyGiven)
            else if (type == 'Change')
                list.sort((a, b) => b.change - a.change)
        }
        else {
            if (type == 'InvoiceID')
                list.sort((a, b) => a.invoiceID - b.invoiceID)
            else if (type == 'Date')
                list.sort((a, b) => a.date - b.date)
            else if (type == 'Time')
                list.sort((a, b) => a.time - b.time)
            else if (type == 'Price')
                list.sort((a, b) => a.totalPrice - b.totalPrice)
            else if (type == 'Payment Type')
                list.sort((a, b) => a.paymentType - b.paymentType)
            else if (type == 'Card Ammount Payment')
                list.sort((a, b) => a.cardMoneyGiven - b.cardMoneyGiven)
            else if (type == 'Cash Ammount Payment')
                list.sort((a, b) => a.cashMoneyGiven - b.cashMoneyGiven)
            else if (type == 'Change')
                list.sort((a, b) => a.change - b.change)
        }


        this.setState({
            invoiceList: list,
            sortingData: {
                ascIcon: caretUp,
                sortingType: type
            }
        })
    }

    getDate = (date) => {
        if (date == "" || date == undefined) return;

        var finalDate = date.split("T")[0];
        return finalDate;
    }

    getTime = (date) => {
        if (date == "" || date == undefined) return;

        var finaltime = date.split("T")[1].split(".")[0];
        return finaltime;
    }

    selectedDate = (date) => {
        this.invoiceService.getInvoicesByDate(date).then(res => {
            this.sortAndSave(res.data.data, "InvoiceID", true)
            setJWT(res.data.token)
        }).catch(err => {
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

    restoreInvoice = (e, invoiceID) => {
        e.preventDefault();
        this.invoiceService.restoreInvoice(invoiceID).then(res => {
            this.removeInvoiceFromStateAfterRestoring(invoiceID)
            toast.success(res.data.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(res.data.data)
        }).catch(err => {
            toast.warn('Cannot cancel invoice,, please refresh page', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    removeInvoiceFromStateAfterRestoring = (invoiceID) => {
        var temp = this.state.invoiceList.filter(invoice => {
            if (invoice.invoiceID != invoiceID)
                return invoice;
        })

        this.setState({
            invoiceList: temp
        })
    }


    render() {
        const input = {
            label: {
                text: "",//if empty the label wont show (it is defined in custom form)
                class: "mr-5-px"
            },
            inputClass: "",
            type: "date",
            placeholder: "",
            text: "Select date...",
            disabled: false,
            inputName: "invoice-date"
        }
        return (
            <div className="p-10 bg-white">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="flex flex-space-between align-center">
                    <h3>List of invoices</h3>
                    <div className="flex flex-space-around align-center ">
                        <h5 className="m-0">Select invoice date:</h5>
                        <CustomInput selectedDate={this.selectedDate} data={input} />
                    </div>
                </div>

                <div className="invoice-list-container">
                    <Table id="main-table" className="flex vertical-flex" striped hover>
                        <thead className="flex">
                            <tr className="flex inherit-all flex-grow-1">
                                {invoiceThArray.map((prop, key) => {

                                    return <th onClick={key < 8 ? e => this.sortAndSave(this.state.invoiceList, prop) : undefined}
                                        className={`flex-grow-1 flex-no-shrink flex-basis-10-perc vertical-text-center flex align-center  ${key > 4 && key < 7 ? "text-right" : ""} ${key == 7 ? "flex-center" : ""} `
                                        }
                                        key={key} >
                                        <span>{prop}</span>
                                        {this.state.sortingData.sortingType == prop ? this.state.sortingData.ascIcon ? <AiFillCaretUp className="ml-3-perc" /> : <AiFillCaretDown
                                            className="ml-3-perc" /> : ""}
                                    </th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.invoiceList.length > 0 ?
                                this.state.invoiceList.map((prop, key) => {
                                    return (
                                        <tr key={key} className="flex inherit-all">
                                            <td
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center"
                                                key={key + 'atr' + 1}>
                                                {prop.invoiceID}
                                            </td>
                                            <td
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center"
                                                key={key + 'atr' + 2}>
                                                {this.getDate(prop.date)}
                                            </td>
                                            <td
                                                key={key + 'atr' + 3}
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center" >
                                                {this.getTime(prop.date)}
                                            </td>
                                            <td
                                                key={key + 'atr' + 4}
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center" >
                                                <span>{toFixedIfNecessary(prop.totalPrice, 2)}</span>
                                                <MdEuroSymbol />

                                            </td>
                                            <td
                                                key={key + 'atr' + 5}
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center flex-center" >
                                                {prop.paymentType}

                                            </td>
                                            <td
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center justify-content-end"
                                                key={key + 'atr' + 6}>

                                                <span>{toFixedIfNecessary(prop.cardMoneyGiven, 2)}</span>
                                                <MdEuroSymbol />
                                            </td>
                                            <td
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center justify-content-end"
                                                key={key + 'atr' + 7}>

                                                <span>{toFixedIfNecessary(prop.cashMoneyGiven, 2)}</span>
                                                <MdEuroSymbol />
                                            </td>
                                            <td
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1 flex align-center justify-content-end"
                                                key={key + 'atr' + 8}>

                                                <span>{toFixedIfNecessary(prop.change, 2)}</span>
                                                <MdEuroSymbol />
                                            </td>
                                            <td
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1"
                                                key={key + 'atr' + 9}>

                                                <Button className="bg-gray details-invoice white no-border" > Details </Button>
                                            </td>
                                            <td
                                                className="flex-no-shrink flex-basis-10-perc flex-grow-1"
                                                key={key + 'atr' + 10}>

                                                <Button className="bg-green restore-invoice white no-border" onClick={e => this.restoreInvoice(e, prop.invoiceID)} >Restore </Button>
                                            </td>
                                        </tr>
                                    );
                                })

                                :
                                <tr key="empty-row" className="flex inherit-all">
                                    <td key="empty-td-1" className="flex-grow-1"> No invoices available</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

export default CancelledInvoices;