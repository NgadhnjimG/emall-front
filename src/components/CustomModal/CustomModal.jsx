import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import CustomForm from '../CustomForm/CustomForm';

function CustomModal(props) {

    const [totalPrice, setTotalPrice] = useState(props.totalprice)
    const [payButton, setPayButton] = useState(true);
    const [dropdownSelected, setDropdownSelected] = useState(0);

    var InputGroup = [
        {
            label: {
                text: "Select payment type:",//if empty the label wont show (it is defined in custom form)
                class: "mr-5-px"
            },
            inputClass: "",
            type: "dropdown",
            placeholder: "",
            text: "Select...",
            options: [
                {
                    text: "Cash",
                    optionId: 1
                },
                {
                    text: "Card",
                    optionId: 2
                }
            ],
            disabled: false,
            inputName: "",
            selected: -1
        }, {
            label: {
                text: "Total price",//if empty the label wont show (it is defined in custom form)
                class: ""
            },
            inputClass: "text-right",
            type: "number",
            placeholder: "",
            disabled: true,
            inputName: "total-price",
            value: totalPrice,
            euroReq: true
        }, {
            label: {
                text: "Ammount given",//if empty the label wont show (it is defined in custom form)
                class: ""
            },
            inputClass: "text-right",
            type: "number",
            placeholder: "type given ammount here...",
            disabled: false,
            inputName: "given-ammount",
            euroReq: true,
            value: 0
        }, {
            label: {
                text: "Change",//if empty the label wont show (it is defined in custom form)
                class: ""
            },
            inputClass: "text-right",
            type: "number",
            placeholder: "change is shown here...",
            disabled: true,
            inputName: "change",
            euroReq: true,
            value: totalPrice * -1
        },
    ]
    const [input, setInput] = useState(InputGroup);
    const [shouldRefresh, setShoulRefresh] = useState(true);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        var temp = input;
        if (shouldRefresh) {
            temp = input.filter(input => {
                if (input.inputName == 'total-price') {
                    input.value = totalPrice
                    return input
                }
                else
                    return input;
            })
            setShoulRefresh(false)
            setInput(temp)
        }

    });

    const toFixedIfNecessary = (value, dp) => {
        return +parseFloat(value).toFixed(dp);
    }
    const moneyChangeCalculation = (ammount, name) => {
        var priorTyped = 0;
        var index = 0;
        var toLookFor = name == "card-given-ammount" ? "given-ammount" : "card-given-ammount";

        while (index < input.length) {
            if (input[index].inputName == toLookFor && input[index].value != 0) {
                priorTyped = input[index].value
            }
            index++;
        }
        var change = 0;
        var setOpositePaymentDefault = true;

        if (priorTyped + ammount > totalPrice || dropdownSelected != 1) {

            change = props.totalprice - ammount - priorTyped;
            change = toFixedIfNecessary(change, 2) * -1;
            setOpositePaymentDefault = false;
        }

        var temp = input.filter(input => {
            if (input.inputName == 'change') {
                input.value = change;
                return input
            }
            else if (input.inputName == name) {
                input.value = ammount
                return input
            }
            else if (setOpositePaymentDefault && input.inputName == toLookFor) {
                var tempVal = toFixedIfNecessary(totalPrice - ammount, 2)
                input.value = tempVal;
                return input;
            }
            else
                return input;
        })
        if (change >= 0) {
            setPayButton(false)
        }

        setInput(temp)
    }

    const getValueForInput = (inputName) => {
        for (var el of input) {
            if (el.inputName == inputName && el.value != undefined) {
                return (Number(el.value) / 100) * 100;
            }
        }
        return 0;
    }

    const onPaymentSubmit = () => {
        var payment = {
            cashMoneyGiven: 0,
            cardMoneyGiven: 0,
            paymentTypes: []
        }

        payment.cashMoneyGiven = getValueForInput("given-ammount")
        payment.cardMoneyGiven = getValueForInput("card-given-ammount");

        if (payment.cardMoneyGiven > 0 && payment.cashMoneyGiven > 0) {
            payment.paymentTypes = ["cash", "card"]
        }
        else if (payment.cardMoneyGiven > 0) {
            payment.paymentTypes = ["card"]
        }
        else {
            payment.paymentTypes = ["cash"]
        }
        // console.log(payment)
        props.onSubmit(payment);
    }

    // private List<ProductMock> scannedProduct;
    // private ProductMock[] scannedProducts;
    // private double cashMoneyGiven;
    // private double cardMoneyGiven;
    // private String[] paymentTypes;

    const addCardInput = (selected) => {
        var shoudAddNewCardInput = false;
        setDropdownSelected(selected);
        var temp = input.filter(input => {
            if (input.inputName == 'dropdown') {
                input.selected = selected;
                return input
            }
            else return input;
        })

        if (temp.length == 4) shoudAddNewCardInput = true;

        if (selected == 1 && shoudAddNewCardInput) {

            var arrayWithCard = createNewInputArray(temp);

            setInput(arrayWithCard);
        }
        else if (selected == 0 && checkIfCardInputExists()) {
            removeCardInput();
        }
    }

    const createNewInputArray = (temp) => {
        var arrayWithCard = [];
        var firstPart = temp.slice(0, 1);

        var secondPart = {
            label: {
                text: "Card ammount given",
                class: ""
            },
            inputClass: "text-right",
            type: "number",
            placeholder: "type card ammount...",
            disabled: false,
            inputName: "card-given-ammount",
            euroReq: true,
            value: 0
        }
        var thirdPart = temp.slice(1, 4);

        var index = 0;
        while (index < firstPart.length) {
            arrayWithCard.push(firstPart[index])
            index++
        }
        arrayWithCard.push(secondPart)

        index = 0;
        while (index < thirdPart.length) {
            arrayWithCard.push(thirdPart[index])
            index++
        }
        return arrayWithCard;
    }

    const checkIfCardInputExists = () => {
        for (var i = 0; i < input.length; i++) {
            if (input[i].inputName == '') {

                return true
            }
        }
        return false;
    }

    const removeCardInput = () => {
        var tempArray = input.filter(input => {
            if (input.inputName != "card-given-ammount") {
                return input;
            }
        })
        setInput(tempArray);
    }

    const paymentSelected = (type) => {
        if (type == 'Card') {
            addCardInput(1)
        }
        else if (type == 'Cash') {
            addCardInput(0)
        }
    }

    const nothing = () => { }


    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Invoice
        </Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-60 left-20">
                <CustomForm handleSubmit={nothing()} payment={paymentSelected} formclass={props.formclass} data={input} moneychange={moneyChangeCalculation} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button className="success-btn w-10 align-self-end bg-green white" disabled={payButton} onClick={onPaymentSubmit}>Pay</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default CustomModal;