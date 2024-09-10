const express = require('express');
const app = express();
const PORT = 3000;

// Body parser
app.use(express.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static('public'));

// get request to serve order form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/order.html');
});

// POST request to handle form submission
app.post('/submit', (req, res) => {
  const { 
    item1, item2, item3, item4, item5, item6, 
    item1_qty, item2_qty, item3_qty, item4_qty, item5_qty, item6_qty,
    item1_price, item2_price, item3_price, item4_price, item5_price, item6_price
  } = req.body;

  // Validate and convert quantities and prices to numbers (handle potential errors)
  let item1Total = 0;
  let item2Total = 0;
  let item3Total = 0;
  let item4Total = 0;
  let item5Total = 0;
  let item6Total = 0;
  try {
    // Handle blank input boxes (no conversion to number)
    const parsedItem1Qty = item1_qty === '' ? null : parseFloat(item1_qty);
    const parsedItem2Qty = item2_qty === '' ? null : parseFloat(item2_qty);
    const parsedItem3Qty = item3_qty === '' ? null : parseFloat(item3_qty);
    const parsedItem4Qty = item4_qty === '' ? null : parseFloat(item4_qty);
    const parsedItem5Qty = item5_qty === '' ? null : parseFloat(item5_qty);
    const parsedItem6Qty = item6_qty === '' ? null : parseFloat(item6_qty);
    
    const parsedItem1Price = parseFloat(item1_price);
    const parsedItem2Price = parseFloat(item2_price);
    const parsedItem3Price = parseFloat(item3_price);
    const parsedItem4Price = parseFloat(item4_price);
    const parsedItem5Price = parseFloat(item5_price);
    const parsedItem6Price = parseFloat(item6_price);

    // Validate quantities (if not null)
    if (parsedItem1Qty !== null) {
      if (parsedItem1Qty < 0 || parsedItem1Qty > 10) {
        console.error("Invalid quantity for item 1:", item1_qty);
        parsedItem1Qty = null; // Set to null to exclude from calculation
      }
    }

    if (parsedItem2Qty !== null) {
      if (parsedItem2Qty < 0 || parsedItem2Qty > 10) {
        console.error("Invalid quantity for item 2:", item2_qty);
        parsedItem2Qty = null;
      }
    }

    if (parsedItem3Qty !== null) {
      if (parsedItem3Qty < 0 || parsedItem3Qty > 10) {
        console.error("Invalid quantity for item 3:", item3_qty);
        parsedItem3Qty = null;
      }
    }

    if (parsedItem4Qty !== null) {
      if (parsedItem4Qty < 0 || parsedItem4Qty > 10) {
        console.error("Invalid quantity for item 4:", item4_qty);
        parsedItem4Qty = null;
      }
    }

    if (parsedItem5Qty !== null) {
      if (parsedItem5Qty < 0 || parsedItem5Qty > 10) {
        console.error("Invalid quantity for item 5:", item5_qty);
        parsedItem5Qty = null;
      }
    }

    if (parsedItem6Qty !== null) {
      if (parsedItem6Qty < 0 || parsedItem6Qty > 10) {
        console.error("Invalid quantity for item 6:", item6_qty);
        parsedItem6Qty = null;
      }
    }

    // Calculate totals only for valid quantities
    item1Total = parsedItem1Qty !== null ? parsedItem1Qty * parsedItem1Price : 0;
    item2Total = parsedItem2Qty !== null ? parsedItem2Qty * parsedItem2Price : 0;
    item3Total = parsedItem3Qty !== null ? parsedItem3Qty * parsedItem3Price : 0;
    item4Total = parsedItem4Qty !== null ? parsedItem4Qty * parsedItem4Price : 0;
    item5Total = parsedItem5Qty !== null ? parsedItem5Qty * parsedItem5Price : 0;
    item6Total = parsedItem6Qty !== null ? parsedItem6Qty * parsedItem6Price : 0;

  } catch (error) {
    console.error("Error parsing quantities or prices:", error);
  }

  const total = item1Total + item2Total + item3Total + item4Total + item5Total + item6Total;

  // Send response with formatted total or error message (if applicable)
  if (isNaN(total)) {
    res.send("Error: Invalid quantities or prices submitted.");
  } else {
    res.send(`Today's Total: $${total.toFixed(2)}`);  // Format total to 2 decimal places
  }
});

//server listening
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});