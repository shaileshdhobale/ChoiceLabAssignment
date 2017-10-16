app.service('PhoneDetails', function(HTTPServiceUtils){
	var service = this;
	service.getPhoneDetails = getPhoneDetails;
	function getPhoneDetails(successCB, errorCB, url) {
		return HTTPServiceUtils.doGet(successCB, errorCB, url);
	};
});