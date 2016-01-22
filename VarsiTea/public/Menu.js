$(document).ready(function() {

//the Firebase constructor we are calling here is from the script we included above
//it has the smarts to connect to firebase's servers and maintain a connection

//get a reference to our firebase using the unique url (using the root)
var myFirebaseRef = new Firebase("https://varsitea.firebaseio.com/");
//ask for a one-time read of the root of the firebase
//when the data is received in the browser the callback will get it in a 'snapshot'
myFirebaseRef.once("value", function(snapshot) {
	//Paninis
	var output = "<h2>Paninis</h2><p>";
	snapshot.child("Paninis").forEach(function(childSnapshot) {
		output = output + "<strong>" + childSnapshot.key() + "</strong><br/> " + childSnapshot.val() + "<br/>";
	});
	output = output + "</p>";
	$(output).appendTo('#paninis');
	
	//Flatbreads
	output = "<h2>Flatbreads</h2><p>";
	snapshot.child("Flatbreads").forEach(function(childSnapshot) {
		output = output + "<strong>" + childSnapshot.key() + "</strong><br/> " + childSnapshot.val() + "<br/>";
	});
	output = output + "</p>";
	$(output).appendTo('#flatbread');
	
	//Bombers
	var output = "<h2>Bombers</h2><p>";
	snapshot.child("Bombers").forEach(function(childSnapshot) {
		output = output + "<strong>" + childSnapshot.key() + "</strong><br/> " + childSnapshot.val() + "<br/>";
	});
	output = output + "</p>";
	$(output).appendTo('#bombers');
	
	//Salads
	var output = "<h2>Salads</h2><p>";
	snapshot.child("Salads").forEach(function(childSnapshot) {
		output = output + "<strong>" + childSnapshot.key() + "</strong><br/> " + childSnapshot.val() + "<br/>";
	});
	output = output + "<strong><em>Add Chicken or Pork $2</em></strong></p>";
	$(output).appendTo('#salads');
	
	//Mac n Cheese
	var output = "<h2>Mac n Cheese</h2><p>";
	snapshot.child("Mac n Cheese").forEach(function(childSnapshot) {
		output = output + "<strong>" + childSnapshot.key() + "</strong> " + childSnapshot.val() + "<br/>";
	});
	output = output + "</p>";
	$(output).appendTo('#MacNCheese');
	
	//Sides
	var output = "<h2>Sides</h2><p>";
	snapshot.child("Sides").forEach(function(childSnapshot) {
		output = output + "<strong>" + childSnapshot.key() + "</strong> " + childSnapshot.val() + "<br/>";
	});
	output = output + "</p>";
	$(output).appendTo('#sides');
	
	//Pick two
	output = "<h2>Pick Two</h2><p><em>1/2 Flatbread or Panini with a Cup of Soup, Mac & Cheese or Side Salad</em> 7.5<br/></p>";
	$(output).appendTo('#pick2');
});
});