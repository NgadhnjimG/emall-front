import CustomInput from 'components/CustomInput/CustomInput';
import CustomLabel from 'components/CustomLabel/CustomLabel';
import CustomTable from 'components/CustomTable/CustomTable';
import React, { Component } from 'react';

class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
    }

    InputGroup = [
        {
            label: {
                text: "Invoice ID:",//if empty the label wont show (it is defined in custom form)
                class: ""
            },
            inputClass: "",
            type: "text",
            placeholder: "",
            text: "",
            disabled: true,
            inputName: "",
        }, {
            label: {
                text: "Total price:",//if empty the label wont show (it is defined in custom form)
                class: ""
            },
            inputClass: "text-right",
            type: "text",
            placeholder: "",
            disabled: true,
            inputName: "total-price",
            value: 0,
            euroReq: true,
            valuteInsideInput: true
        }, {
            label: {
                text: "Employee:",//if empty the label wont show (it is defined in custom form)
                class: ""
            },
            inputClass: "",
            type: "text",
            placeholder: "",
            disabled: true,
            inputName: "",
        }, {
            label: {
                text: "Date",//if empty the label wont show (it is defined in custom form)
                class: ""
            },
            inputClass: "",
            type: "text",
            placeholder: "",
            disabled: true,
            inputName: "date",
            value: ""
        },
    ]

    nothing = () => { }

    class = "flex flex-grow-1 align-center ";
    render() {
        return (
            <div>
                <div className="flex align-center m-2-perc ">
                    <div className="flex flex-grow-1 align-center ">
                        <CustomLabel data={this.InputGroup[0].label} />
                        < CustomInput
                            handleFocus={this.doNothing}
                            handleInput={this.doNothing}
                            data={this.InputGroup[0]}
                            moneychange={this.doNothing}
                        />
                    </div>
                    <div className='flex flex-grow-1 align-center justify-content-end'>
                        <CustomLabel data={this.InputGroup[1].label} />
                        < CustomInput
                            handleFocus={this.doNothing}
                            handleInput={this.doNothing}
                            data={this.InputGroup[1]}
                            moneychange={this.doNothing}
                        />
                    </div>

                </div>
                <div className='flex flex-grow-1 align-center m-2-perc '>
                    <div className="flex flex-grow-1 align-center ">
                        <CustomLabel data={this.InputGroup[2].label} />
                        < CustomInput
                            handleFocus={this.doNothing}
                            handleInput={this.doNothing}
                            data={this.InputGroup[2]}
                            moneychange={this.doNothing}
                        />
                    </div>
                    <div className='flex flex-grow-1 align-center justify-content-end'>
                        <CustomLabel data={this.InputGroup[3].label} />
                        < CustomInput
                            handleFocus={this.doNothing}
                            handleInput={this.doNothing}
                            data={this.InputGroup[3]}
                            moneychange={this.doNothing}
                        />
                    </div>

                    <div>
                        <CustomTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceDetails;