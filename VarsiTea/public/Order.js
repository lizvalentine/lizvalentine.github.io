$(document).ready(function() {
	var myFirebaseRef = new Firebase("https://varsitea.firebaseio.com/");
	var orderItems;
	var orderItemsStr = "";
	myFirebaseRef.once("value", function(snapshot) {
		var output = "";
		orderItems = [];
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.key() !== "Orders"){
				output = output + "<option value='" + childSnapshot.key() + "'> " + childSnapshot.key() + "</option>";
			}
		});
		$(output).appendTo('#CategoryDLL');
		
		output = "";
		snapshot.child("Bombers").forEach(function(childSnapshot) {
			output = output + "<option value='" + childSnapshot.key()+"'> <strong>" + childSnapshot.key() + "</strong>: "+ childSnapshot.val() +"</option>";
		});
		$(output).appendTo('#MenuItemDLL');
	});
	
	$("#CategoryDLL").change(function() {
		var $sandwichType = $("#MenuItemDLL");
		var item = $(this).val();
		myFirebaseRef.once("value", function(snapshot) {
			console.log("inside function");
			console.log(snapshot.child(item).key());
			output = snapshot.child(item).key();
			snapshot.child(item).forEach(function(childSnapshot) {
				if(childSnapshot.key() !== "Users"){
					output = output + "<option value='" + childSnapshot.key() + "'> " + childSnapshot.key() + ": " + childSnapshot.val() + "</option>";
				}
			});
			$sandwichType.empty();
			$sandwichType.append(output);
		});
		
	});
	
	$("#addItem").click(function() {
		output = '<div class="col-xs-6 col-sm-4 col-lg-3"><strong>'+$("#MenuItemDLL").val() + "</strong><br/>";
		var item = {};
		item.SandwichType= $("#MenuItemDLL").val();
		if($("#specialInstructions").val() !== ""){
			output = output + $("#specialInstructions").val() + "<br/></div>";
			item.instructions=$("#specialInstructions").val();
		}
		else{
			output = output + "No special instructions<br/></div>";
			item.instructions="No special instructions";
		}
		
		$("#displayOrder").append(output);
		$("#specialInstructions").val("");
		orderItems.push(item);
	});
	$("#submitOrder").click(function() {
		output = '<h3>Thank you for your order!<br/> <small>We will call you when your order is ready for pickup (about 15 min)</small></h3>';
		$("#displayOrder").empty();
		$("#displayOrder").append( output);
		
		myFirebaseRef.child("Orders").push({Name: $("#name").val(), Phone: $("#phoneNumber").val(), orderItems});
		$("#specialInstructions").val("");
		$("#name").val("");
		$("#phoneNumber").val("");
	});
});