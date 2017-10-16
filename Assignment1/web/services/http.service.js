app.service('HTTPServiceUtils', function($http){

	var httpService = this;
	httpService.doGet = doGet;
	// httpService.doPost = doPost;
	// httpService.doPut = doPut;
	// httpService.doDelete = doDelete;

	function successHandler(response, successCB, errorCB){
		var data = response.data;
		if(data && response.status =='200') {
			successCB(data, response.headers);
		} else {
			errorHandler(data, errorCB);
		}
	};

	function errorHandler(response, errorCB){
		try {
			if(response && response.status == '404') {
				errorCB(response.data);
			} else {
				if(response & response.data)
					errorCB(response.data);
			}
	    }
	    catch(e){
	    	var message = (response&&response.message)?response.message:'Internal error occurred.';
	    	if(angular.isFunction(errorCB)){
				errorCB(message);
	    	}
	    }
	};

	function doGet(successCB, errorCB, url){
		return $http
			.get(url)
			.then(function(response){
				successHandler(response, successCB, errorCB);
			}, function(response){
				errorHandler(response, errorCB);
		});
	};
});