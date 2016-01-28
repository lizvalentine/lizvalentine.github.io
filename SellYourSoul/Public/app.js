

(function(){
	var app = angular.module('SellYourSoul', ['firebase']);
	
	app.controller('ListingController', function($scope, $firebaseObject){
		this.words = "testing 123";
		this.listing = "";
		var ref = new Firebase("https://sellyoursoul.firebaseio.com/");		
		$scope.profile = $firebaseObject(ref);
		console.log($scope.profile);
		this.listing = $scope.profile;
	});
})();
//var currentlyLoggedIn = [];


