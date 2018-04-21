angularnodeApp.controller('LoginCtrl', ['$scope'  ,
	function($scope) {
		 		
 	$scope.formData = {}; // inputs to authenicate
	$scope.formMeta = {}; // other data for the form but not sent to the server

	$scope.login = function()
	{
		// authenticate the user/password
		/*
			nrzLightify({
						type: options.type || 'info',   //   info  || warning  ||  danger  || success
						text: "real application, authenicate acrosss network/cloud"
	 
					}, options.ms || 3000);		
					
		
		*/			
		$scope.formMeta.dataLoading = true;
		
		alert("login: " +  JSON.stringify($scope.formData));
		//Real App: asynchronous authentication call  
		$scope.formMeta.dataLoading = false; // after promise return
	}					
}]); // LoginCtrl	