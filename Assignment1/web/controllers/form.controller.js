app.controller('formController', ['$scope', '$http', function($scope, $http) {
  $scope.formData = {};   // JavaScript needs an object to put our form's models into.
  $scope.getAllForms = function() {
    $http({
      method: 'GET',
      url: '/all/forms'
    }).then(function successCallback(response) {
        $scope.formTemplate = response.data.data.formData;
    }, function errorCallback(response) {
        console.log("Error")
    });
  }

  $scope.getAllForms();
  $scope.processForm = function () {
      /* Handle the form submission... */
      $scope.formData;
  };

  $scope.toChangeFormName = function (item) {
    $scope.selectedForm = item.formName;
    $scope.selectedObj = {};
      for(var i = 0; i < $scope.formTemplate.length;i++){
        if($scope.formTemplate[i].formName == $scope.selectedForm)
            $scope.selectedObj = $scope.formTemplate[i];
      }
  }
}]);