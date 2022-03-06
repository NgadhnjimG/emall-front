const thArray = ["Product Code", "Product Name", "Price", "Quantity", "Total"];
const tdArray = [
    ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
    ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
    ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
    ["4", "Philip Chaney", "$38,735", "Korea, South", "Overland Park"],
    ["5", "Doris Greene", "$63,542", "Malawi", "Feldkirchen in Kärnten"],
    ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
];

const invoiceThArray = ["InvoiceID", "Date", "Time", "Price", "Payment Type", "Card Ammount Payment", "Cash Ammount Payment", "Change", "Details", "Delete"];

const miniThArray = ["Product Code", "Product Name", "Price"];
module.exports = {
    thArray,
    tdArray,
    miniThArray,
    invoiceThArray
}