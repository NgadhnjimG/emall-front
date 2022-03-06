import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import CustomModal from "components/CustomModal/CustomModal";

class CustomMiniTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            miniThArray: props.miniThArray,
            productsAfterSearch: props.productsAfterSearch,
            visible: false
        }
    }

    handleClickOutside = evt => {
        this.visibilityToggle(evt);
    };

    productClicked = (e, data) => {
        this.props.productClicked(e, data);
    }

    visibilityToggle = (evt) => {
        this.props.toggleVisibility(evt, !this.state.visible);
    }

    render() {
        return (
            <Table key={this.props.key} hover className="border bg-cyan">
                <thead>
                    <tr>
                        {this.state.miniThArray.map((prop, key) => {

                            return <th className="black" key={key}>{prop}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.state.productsAfterSearch != null && this.state.productsAfterSearch != "" ?
                        this.state.productsAfterSearch.map((prop, key) => {
                            return (
                                <tr
                                    onClick={(e) => this.productClicked(e, prop.productCode)}
                                    className="clickable"
                                    key={key}>
                                    <td
                                        className="thin-td"
                                        key={key + 'small-table-atr' + 1}>
                                        {prop.productCode}
                                    </td>
                                    <td
                                        className="thin-td"
                                        key={key + 'small-table-atr' + 2}>
                                        {prop.productName}
                                    </td>
                                    <td
                                        className="thin-td"
                                        key={key + 'small-table-atr' + 3}>
                                        {prop.productPrice}
                                    </td>
                                </tr>
                            );
                        })

                        :
                        <tr key="empty-row">
                            <td key="empty-td-1">-</td>
                            <td key="empty-td-2">-</td>
                            <td key="empty-td-3">-</td>
                            <td key="empty-td-4">-</td>
                            <td key="empty-td-5">-</td>
                        </tr>
                    }
                </tbody>
            </Table>
        );
    }
};

export default onClickOutside(CustomMiniTable);