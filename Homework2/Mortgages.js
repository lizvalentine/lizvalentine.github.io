var origPrincLoanAmt;
var princLoanAmt;
var interestRate;
var yearsIndex;
var yearsName;
var yearsCode;
var monthlyInterest
var output = "";
var numMonths;
function getData(){
	origPrincLoanAmt = document.getElementById("princLoanAmtTB").value;
	princLoanAmt = origPrincLoanAmt;
	interestRate = document.getElementById("interestRateTB").value;
	yearsIndex = document.getElementById("yearsDDL").selectedIndex;
	yearsCode = document.getElementById("yearsDDL").options[yearsIndex].value;
	monthlyInterest = interestRate / 12;
	numMonths = yearsCode * 12;
}
function calculate(){
	var monthlyPay = findMonthlyPayment();
	var interestPaid = princLoanAmt * monthlyInterest;
	var princPayment = monthlyPay - interestPaid;
	princLoanAmt = princLoanAmt-princPayment;
	summaryTable();
	findEachMonth();
	document.getElementById("outputDiv").innerHTML = output;
}
function findMonthlyPayment(){
	getData();
	var monthlyPay = princLoanAmt * (monthlyInterest / (1 - Math.pow((1+monthlyInterest), -numMonths)));
	return monthlyPay;
}
function findEachMonth(){
	var monthlyPay = findMonthlyPayment();
	princLoanAmt = origPrincLoanAmt;
	var interestPaid;
	var princPayment;
	output = output + "<h4>Schedule</h4> <table class='table-striped' style='width:100%'> <tr><th>Month</th>"
			+"<th>Interest Paid</th><th>Principle Paid</th><th>Remaining Principle</th></tr>";
	for(var i = 0; i < numMonths; i++){
		interestPaid = princLoanAmt * monthlyInterest;
		princPayment = monthlyPay - interestPaid;
		princLoanAmt = princLoanAmt-princPayment;
		var conOutput =
				"<tr id="+(i+1)+"> <td>" + (i+1) + " </td> <td> " + interestPaid.toFixed(2) + " </td> <td> " + princPayment.toFixed(2) +
				" </td> <td> " + princLoanAmt.toFixed(2) + "  </td> </tr> ";
		output = output + conOutput;
	}
	output = output + " </table> ";
}
function summaryTable(){
	var monthlyPay = findMonthlyPayment();
	princLoanAmt = origPrincLoanAmt;
	var totalInterestPaid = 0;
	var totalPrincPaid = 0;
	var month = 1;
	var interestPaid;
	var princPayment;
	for(var i = 0; i < month; i++){
		interestPaid = princLoanAmt * monthlyInterest;
		totalInterestPaid = totalInterestPaid + interestPaid;
		princPayment = monthlyPay - interestPaid;
		totalPrincPaid = totalPrincPaid + princPayment;
		princLoanAmt = princLoanAmt - princPayment;
	}
	output = output + "<h4>Summary</h4> <label for='monthDDL'>Month on</label> <select id='monthDDL'> "
				+ "<option value = 1 selected = 'selected'>1</option>";
	for(var i = 1; i < numMonths; i++){
		output= output + "<option value = " + (i + 1) + ">" + (i + 1) + "</option>";
	}	
	output = output + "</select> <br /> ";
	output = output + "<table class='table-striped' style='width:100%'> <tr><th>Loan Amount</th>"
				+ "<th>Interest Rate</th><th>Monthly Payment</th><th>Amt Loan Paid</th>"
				+ "<th>Amt Interest Paid</th><th>% Principle Paid</th> </tr>";
	output = output + "<tr><td>" + origPrincLoanAmt + "</td><td>" + interestRate + "</td><td>" + monthlyPay.toFixed(2)
				+ "</td><td>" + totalPrincPaid.toFixed(2) + "</td><td>" + totalInterestPaid.toFixed(2) + "</td><td>" + (totalPrincPaid / origPrincLoanAmt).toFixed(2) + "</td></tr>";
	output = output + "</table><br/>";
}
