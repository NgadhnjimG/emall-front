import React, { useState, useEffect } from 'react';
import { Table, Button } from "react-bootstrap"
import { MdEuroSymbol } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

function CustomTable(props) {
    const [thArray, setThArray] = useState(props.thArray);
    const [invoice, setinvoice] = useState(props.invoice);

    return (
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
                {invoice.scannedProducts.length > 0 ?
                    invoice.scannedProducts.map((prop, key) => {
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
    )
}

export default CustomTable;