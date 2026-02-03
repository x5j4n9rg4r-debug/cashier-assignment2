// Prices (RM) for each menu item
var menu = [
  { price: 2.00, priceField: "nasi_price",  qtyField: "nasi_qty",  subField: "nasi_sub_total"  }, // Nasi Lemak
  { price: 1.50, priceField: "roti_price",  qtyField: "roti_qty",  subField: "roti_sub_total"  }, // Roti Canai
  { price: 1.30, priceField: "drinks_price",qtyField: "drinks_qty",subField: "drinks_sub_total"}, // Cold Drinks
  { price: 3.00, priceField: "mee_price",   qtyField: "mee_qty",   subField: "mee_sub_total"   }, // Mee Goreng (NEW)
  { price: 1.80, priceField: "teh_price",   qtyField: "teh_qty",   subField: "teh_sub_total"   }  // Teh Tarik (NEW)
];

function init() {
  var customer = prompt("Please enter the customer's name");
  if (customer == null || customer === "") customer = "valued guest";

  document.getElementById("username").innerHTML =
    "Welcome " + customer + " to<br/>D'licious Food Stall";

  // Set prices, clear qty, reset sub totals
  for (var i = 0; i < menu.length; i++) {
    document.frmCashier[menu[i].priceField].value = menu[i].price.toFixed(2);
    document.frmCashier[menu[i].qtyField].value = "";
    document.frmCashier[menu[i].subField].value = (0).toFixed(2);
  }

  total();

  // Focus first quantity field
  document.frmCashier[menu[0].qtyField].focus();
  if (document.frmCashier[menu[0].qtyField].select) {
    document.frmCashier[menu[0].qtyField].select();
  }
}

// Check if the number has decimal part (we want whole number qty)
function isAfloat(num) {
  var int_num = num - Math.floor(num);
  return int_num !== 0;
}

// Calculate sub total for a menu item based on index (0..menu.length-1)
function calcItem(index) {
  var qty = parseFloat(document.frmCashier[menu[index].qtyField].value);

  // validate input: must be a whole number and >= 0
  if (isNaN(qty) || qty < 0 || isAfloat(qty)) {
    alert("Error: Wrong user input. Please enter a whole number quantity (0, 1, 2, ...).");
    document.frmCashier[menu[index].qtyField].value = "";
    document.frmCashier[menu[index].qtyField].focus();
    return;
  }

  var sub = menu[index].price * qty;
  document.frmCashier[menu[index].subField].value = sub.toFixed(2);

  total();

  // Move focus to next item
  if (index + 1 < menu.length) {
    document.frmCashier[menu[index + 1].qtyField].focus();
    if (document.frmCashier[menu[index + 1].qtyField].select) {
      document.frmCashier[menu[index + 1].qtyField].select();
    }
  } else {
    document.frmCashier.reset.focus();
  }
}

// Sum all sub totals and display grand total
function total() {
  var grand_total = 0;

  for (var i = 0; i < menu.length; i++) {
    var sub = parseFloat(document.frmCashier[menu[i].subField].value);
    if (!isNaN(sub)) grand_total += sub;
  }

  document.frmCashier.g_total.value = "RM " + grand_total.toFixed(2);
}
