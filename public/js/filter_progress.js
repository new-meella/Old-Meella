const order1 = {
    number : 1,
    orderNumber : "202202150871354",
    orderStatus : "Completed",
    customer : "0123456789",
    lastUpdate : "7 Feb 2022 6:00",
    total : 15.00 + " THB",
    payment : "paid"
}

const order2 = {
    number : 2,
    orderNumber : "202202160890351",
    orderStatus : "In Progress",
    customer : "0123456789",
    lastUpdate : "8 Feb 2022 12:00",
    total : 30.00 + " THB",
    payment : "paid"
}

const order3 = {
    number : 3,
    orderNumber : "202203150871794",
    orderStatus : "Completed",
    customer : "0123456789",
    lastUpdate : "15 Feb 2022 6:00",
    total : 150.00 + " THB",
    payment : "not paid"
}

const order4 = {
    number : 4,
    orderNumber : "202207160891650",
    orderStatus : "Cancelled",
    customer : "0123456789",
    lastUpdate : "16 Feb 2022 12:00",
    total : 50.00 + " THB",
    payment : "paid"
}

makeTable=(a)=>{
    if (a.length == 0) {
        document.getElementById("billTable").style.visibility="hidden";
        return;
    }
    document.getElementById("billTable").style.visibility="visible";    
    for (let i = 0;i < a.length;i++) {
        document.querySelector(".number_data").innerHTML += a[i].number+"<p>"+(i == a.length? "<br>":"");
        document.querySelector(".order_number_data").innerHTML += a[i].orderNumber+"<p>"+(i == a.length-1? "<br>":"");
        document.querySelector(".order_status_data").innerHTML += a[i].orderStatus+"<p>"+(i == a.length-1? "<br>":"");
        document.querySelector(".customer_data").innerHTML += a[i].customer+"<p>"+(i == a.length-1? "<br>":"");
        document.querySelector(".last_update_data").innerHTML += a[i].lastUpdate+"<p>"+(i == a.length-1? "<br>":"");
        document.querySelector(".total_field_data").innerHTML += a[i].total+"<p>"+(i == a.length-1? "<br>":"");
        document.querySelector(".payment_field_data").innerHTML += a[i].payment+"<p>"+(i == a.length-1? "<br>":"");
    }
    document.querySelector(".number_data").innerHTML += "<p>"
}

makeEmpty=()=>{
    document.querySelector(".number_data").innerHTML = "";
    document.querySelector(".order_number_data").innerHTML = "";
    document.querySelector(".order_status_data").innerHTML = "";
    document.querySelector(".customer_data").innerHTML = "";
    document.querySelector(".last_update_data").innerHTML = "";
    document.querySelector(".total_field_data").innerHTML = "";
    document.querySelector(".payment_field_data").innerHTML = "";
}

function openFilter() {
    document.getElementById("filterDropDown").style.display="flex";
    for (let i = tempInProgress;i > 0;i--) {
        inProgressButton();
    }
    for (let i = tempCompleted;i > 0;i--) {
        completedButton();
    }
    for (let i = tempCancelled;i > 0;i--) {
        cancelledButton();
    }
}

var tempInProgress = 0;
var tempCompleted = 0;
var tempCancelled = 0;

var inProgress = 0;
function inProgressButton() {
    if (inProgress == 1) {
        document.getElementById("inProgress").style.background="#FFFFFF";
        document.getElementById("inProgress").style.border="3px solid #F9B609";
        document.getElementById("inProgressText").style.top="10px";
        tempInProgress++;
        return inProgress = 0;
    }
    else {
        document.getElementById("inProgress").style.background="#F4D06F";
        document.getElementById("inProgress").style.border="1px solid #F4D06F";
        document.getElementById("inProgressText").style.top="12px";
        tempInProgress++;
        return inProgress = 1;
    }
}

var completed = 0;
function completedButton() {
    if (completed == 1) {
        document.getElementById("completed").style.background="#FFFFFF";
        document.getElementById("completed").style.border="3px solid #F9B609";
        document.getElementById("completedText").style.top="10px";
        tempCompleted++;
        return completed = 0;
    }
    else {
        document.getElementById("completed").style.background="#F4D06F";
        document.getElementById("completed").style.border="1px solid #F4D06F";
        document.getElementById("completedText").style.top="12px";
        tempCompleted++;
        return completed = 1;
    }
}
  
var cancelled = 0;
function cancelledButton() {
    if (cancelled == 1) {
        document.getElementById("cancelled").style.background="#FFFFFF";
        document.getElementById("cancelled").style.border="3px solid #F9B609";
        document.getElementById("cancelledText").style.top="10px";
        tempCancelled++;
        return cancelled = 0;
    }
    else {
        document.getElementById("cancelled").style.background="#F4D06F";
        document.getElementById("cancelled").style.border="1px solid #F4D06F";
        document.getElementById("cancelledText").style.top="12px";
        tempCancelled++;
        return cancelled = 1;
    }
}

var user = [order1,order2,order3,order4];
makeTable(user);
applyFilterButton=()=>{
    tempInProgress = 0;
    tempCompleted = 0;
    tempCancelled = 0;
    var result = [];
    makeEmpty();
    if (inProgress == 0 && completed == 0 && cancelled == 0) {
        makeTable(user);
        filterDropDown.classList.remove("active");
        return;
    }
    for (let i = 0;i < user.length;i++) {
        if (inProgress == 1) {
            if (user[i].orderStatus == "In Progress") {
                result.push(user[i]);
            }
        }
        if (completed == 1) {
            if (user[i].orderStatus == "Completed") {
                result.push(user[i]);
            }
        }
        if (cancelled == 1) {
            if (user[i].orderStatus == "Cancelled") {
                result.push(user[i]);
            }
        }
    }
    makeTable(result);
    filterDropDown.classList.remove("active");
}

cancelFilterButton=()=>{
    for (let i = tempInProgress;i > 0;i--) {
        inProgressButton();
    }
    for (let i = tempCompleted;i > 0;i--) {
        completedButton();
    }
    for (let i = tempCancelled;i > 0;i--) {
        cancelledButton();
    }
    filterDropDown.classList.remove("active");
}

searchID=()=>{
    var result = [];
    makeEmpty();
    if(document.querySelector(".search_box").value == "") {
        makeTable(user);
        return;
    }
    for (let i = 0;i < user.length;i++) {
        if (user[i].orderNumber == document.querySelector(".search_box").value) {
            result.push(user[i]);
        }
    }
    makeTable(result);
}

getStartDate=()=>{
    var date1 = document.querySelector(".date1_box").value;
    var dateArray1 = date1.split("-");
    for (let i = 0;i < dateArray1.length;i++) {
        dateArray1[i] = parseInt(dateArray1[i]);
    }
    return dateArray1;
}

getEndDate=()=>{
    var date2 = document.querySelector(".date2_box").value;
    var dateArray2 = date2.split("-");
    for (let i = 0;i < dateArray2.length;i++) {
        dateArray2[i] = parseInt(dateArray2[i]);
    }
    return dateArray2;
}


var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
isAfterBeginDate=(a)=>{
    var date1 = a.split(" ", 3);
    date1[1] = month.findIndex((element) => element == date1[1])+1;
    for (let i = 0;i < date1.length;i++) {
        date1[i] = parseInt(date1[i]);
    }
    var dateArray1 = getStartDate();
    if (date1[2] < dateArray1[0]) {    
        return false;
    }
    else if (date1[2] == dateArray1[0]) {   
        if (date1[1] < dateArray1[1]) {
            return false;
        }
        else if (date1[1] == dateArray1[1]) {
            if (date1[0] < dateArray1[2]) {
                return false;
            }
        }
    }
    return true;    
}

isBeforeEndDate=(a)=>{
    var date2 = a.split(" ", 3);
    date2[1] = month.findIndex((element) => element == date2[1])+1;
    for (let i = 0;i < date2.length;i++) {
        date2[i] = parseInt(date2[i]);
    }
    var dateArray2 = getEndDate();
    if (date2[2] > dateArray2[0]) {    
        return false;
    }
    else if (date2[2] == dateArray2[0]) {   
        if (date2[1] > dateArray2[1]) {
            return false;
        }
        else if (date2[1] == dateArray2[1]) {
            if (date2[0] > dateArray2[2]) {
                return false;
            }
        }
    }
    return true;    
}

applyDate=()=>{
    makeEmpty();
    var dateValue1 = document.querySelector(".date1_box").value;
    var dateValue2 = document.querySelector(".date2_box").value;
    if (dateValue1 == "" && dateValue2 == "") {
        makeTable(user);
        return;
    }
    var result = [];
    for (let i = 0;i < user.length;i++) {
        if (!isAfterBeginDate(user[i].lastUpdate) || !isBeforeEndDate(user[i].lastUpdate)) {
            continue;
        }
        result.push(user[i]);
    }
    makeTable(result);
}