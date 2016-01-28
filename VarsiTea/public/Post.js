$(document).ready(function() {
	var myFirebaseRef = new Firebase("https://sellyoursoul.firebaseio.com/");
	var activeEmail = "evalentine@carthage.edu";
	var userID;
	//finds userID based off of email
	myFirebaseRef.once("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.child("user").val() === activeEmail){
				userID = childSnapshot.key()
			}
		});
	});
	//adds stuff to database
	$("#id of submit button goes here").click(function() {
		myFirebaseRef.child(userID).child("Items").push({Title: $("#title").val(), Details: $("#details").val(), Photo: "photodata"});
	});
});