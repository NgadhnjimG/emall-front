// eslint-disable
import CustomLabel from 'components/CustomLabel/CustomLabel.jsx';
import CustomInput from 'components/CustomInput/CustomInput';
import React, { Component } from 'react';
import { FormGroup, Form, InputGroup } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import Dropdown from 'react-bootstrap/lib/Dropdown.js'
import MenuItem from 'react-bootstrap/lib/MenuItem';

class CustomForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            loginData: {},
            PaymentSelected: "",
            formClassName: ""
        };
    }
    isLabelNeeded = (text) => {
        if (text == "") return false;
        return true;
    }

    componentDidMount() {
        if (this.props.formclass != null || this.props.formclass != undefined) {
            this.setState({
                formClassName: this.props.formclass
            })
        }
    }
    componentDidUpdate() {
        if (this.state.data.length == this.props.data.length) { return }
        else
            this.setState({
                data: this.props.data
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.loginData);
    }

    handleInputChange = (name, value) => {
        this.setState({
            loginData: {
                ...this.state.loginData,
                [name]: value
            }
        })
    }

    handleDropdownChange = (e, options) => {
        this.setState({
            PaymentSelected: options.text
        })
    }

    doNothing = () => { }

    moneychange = (ammount, name) => {
        this.props.moneychange(ammount, name)
    }

    selectedPaymentType = (e, payment) => {
        this.props.payment(payment)
    }




    render() {
        console.log(this.state.data)
        return (
            <div className="inherit-all">

                <Form
                    onSubmit={this.handleSubmit}
                    className={`flex vertical-flex flex-space-around inherit-all text-center ` + this.state.formClassName}>

                    {this.state.data.map((inputGroup, index) => {
                        return (
                            <FormGroup key={index} className="flex align-center justify-content-end">
                                {this.isLabelNeeded(inputGroup.label.text) ?
                                    <CustomLabel data={inputGroup.label} />
                                    :
                                    ""
                                }
                                {inputGroup.type == 'dropdown' ?
                                    <Dropdown id="dropdown-1">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {this.state.PaymentSelected == "" ? inputGroup.text : this.state.PaymentSelected}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {inputGroup.options.map((options, key) => {
                                                return (
                                                    <MenuItem
                                                        key={`dropdown-opt-` + options.optionId}
                                                        onClick={e => this.handleDropdownChange(e, options)}
                                                        onSelect={e => this.selectedPaymentType(e, options.text)}
                                                    >
                                                        {options.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :

                                    < CustomInput
                                        handleFocus={this.doNothing}
                                        handleInput={this.handleInputChange}
                                        data={inputGroup}
                                        moneychange={this.moneychange}
                                        value={inputGroup.inputName == "total-price" ? inputGroup.value : undefined}
                                    />
                                }
                            </FormGroup>
                        );
                    })
                    }
                </Form>

            </div >
        );
    }

}

export default CustomForm;