angularnodeApp.controller('RegisterCtrl', ['$scope'  ,
		function($scope) {
		 		
 	$scope.formData = {}; // inputs to authenicate
	$scope.formMeta = {}; 

	$scope.register = function()
	{
      alert("register: " +  JSON.stringify($scope.formData));
	}		
		
 	
	}]); // RegisterCtrl	