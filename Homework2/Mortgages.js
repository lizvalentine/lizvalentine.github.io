var origPrincLoanAmt;
var princLoanAmt;
var interestRate;
var yearsIndex;
var yearsName;
var yearsCode;
var monthlyInterest
var output1;
var ourput1Tab;
var output2;
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
	makeSummaryHead();
	summaryTable(10);
	findEachMonth();
	document.getElementById("tableTitle").innerHTML = output1;
	document.getElementById("summaryTable").innerHTML = output1Tab;
	document.getElementById("schedule").innerHTML = output2;
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
	var year = 1;
	output2 = "<h4>Schedule</h4> <table class='table-striped' style='width:100%'> <tr><th>Month</th>"
			+"<th>Interest Paid</th><th>Principle Paid</th><th>Remaining Principle</th></tr>";
	for(var i = 0; i < numMonths; i++){
		interestPaid = princLoanAmt * monthlyInterest;
		princPayment = monthlyPay - interestPaid;
		princLoanAmt = princLoanAmt-princPayment;
		var tableOutput =
				"<tr id="+(i+1)+"> <td>" + (i+1) + " </td> <td> " + interestPaid.toFixed(2) + " </td> <td> " + princPayment.toFixed(2) +
				" </td> <td> " + princLoanAmt.toFixed(2) + "  </td> </tr> ";
		output2 = output2 + tableOutput;
		if((i+1) % 12 === 0){
			output2 = output2 + "<tr><td><strong>"+ year +" YEARS</strong></td></tr>";
			year++;
		}
	}
	output2 = output2 + " </table> ";
}
function summaryTable(month){
	var monthlyPay = findMonthlyPayment();
	princLoanAmt = origPrincLoanAmt;
	var totalInterestPaid = 0;
	var totalPrincPaid = 0;
	var interestPaid;
	var princPayment;
	for(var i = 0; i < month; i++){
		interestPaid = princLoanAmt * monthlyInterest;
		totalInterestPaid = totalInterestPaid + interestPaid;
		princPayment = monthlyPay - interestPaid;
		totalPrincPaid = totalPrincPaid + princPayment;
		princLoanAmt = princLoanAmt - princPayment;
	}
	output1Tab = "<tr><th>Loan Amount</th>"
				+ "<th>Interest Rate</th><th>Monthly Payment</th><th>Amt Loan Paid</th>"
				+ "<th>Amt Interest Paid</th><th>% Principle Paid</th> </tr>";
	output1Tab = output1Tab + "<tr><td>" + origPrincLoanAmt + "</td><td>" + interestRate + "</td><td>" + monthlyPay.toFixed(2)
				+ "</td><td>" + totalPrincPaid.toFixed(2) + "</td><td>" + totalInterestPaid.toFixed(2)
				+ "</td><td>" + (totalPrincPaid / origPrincLoanAmt).toFixed(2) + "</td></tr>";
}
function makeSummaryHead(){
	output1 = "<h4>Summary</h4> <label for='monthDDL'>Current Month</label> <select id='monthDDL' onchange='summaryTable(this.value)'> ";
	for(var i = 0; i < numMonths; i++){
		if(i !== 9){
			output1 = output1 + "<option value = " + (i + 1) + ">" + (i + 1) + "</option>";
		}
		else{
			output1 = output1 + "<option value = " + (i + 1) + " selected = 'selected'>" + (i + 1) + "</option>";
		}
	}	
	output1 = output1 + "</select> <br /> ";
}

