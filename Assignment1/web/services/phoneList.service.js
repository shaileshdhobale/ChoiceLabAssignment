app.service('PhoneList', function(HTTPServiceUtils){
	var service = this;
	service.getPhoneList = getPhoneList;
	function getPhoneList(successCB, errorCB, url) {
		return HTTPServiceUtils.doGet(successCB, errorCB, url);
	};
});