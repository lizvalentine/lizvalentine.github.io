$(document).ready(function() {
	var myFirebaseRef = new Firebase("https://sellyoursoul.firebaseio.com/");
	var activeEmail = "arico@carthage.edu";
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
	$("#btn-post").click(function() {
		myFirebaseRef.child("-K8zfCm-H8ALeq9rmD-x?").child("Items").push({Title: $("#listing").val(), description: $("#description").val(), Price: $("#price").val(), photo: $("#myImg").attr('src')});
		setTimeout(window.location.assign("listings.html"), 50);
	});
});