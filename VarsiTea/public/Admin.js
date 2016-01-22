$(document).ready(function() {
	var myFirebaseRef = new Firebase("https://varsitea.firebaseio.com/");
	myFirebaseRef.once("value", function(snapshot) {
		var output = "";
		snapshot.child("Orders").forEach(function(childSnapshot) {
			output = output + "<div class='col-xs-6 col-sm-4 col-lg-3'><div class = 'outline' id ='" + childSnapshot.key() + "'>";
			output = output +"<span id='close' onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); removeFromDatabase(this.parentNode.id); return false;'>x</span>";
			childSnapshot.forEach(function(secondChildSnapshot){
				if(secondChildSnapshot.key() !=='orderItems'){
					output = output +"<em><strong>"+ secondChildSnapshot.key()+"</strong></em>: "+secondChildSnapshot.val() + "<br/>";
				}
				else{
					secondChildSnapshot.forEach(function(thirdChildSnapshot){
						thirdChildSnapshot.forEach(function(fourthChildSnapshot){
							if(fourthChildSnapshot.key()==="SandwichType"){
								output = output + "<strong>" + fourthChildSnapshot.val() + "</strong>: ";
							}
							else{
								output = output + fourthChildSnapshot.val() + "<br/>";
							}
						});
					});
				}
			});
			output = output + '</div></div>';
		});
		$(output).appendTo('#displayOrders');
	});
});
function removeFromDatabase(itemID){
	var myFirebaseRef = new Firebase("https://varsitea.firebaseio.com/");
	myFirebaseRef.child("Orders").child(itemID).remove();
};