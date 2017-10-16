app.controller('createFormController', ['$scope', '$http', function($scope, $http) {
    $scope.isText = false;
    $scope.isButton = false;
    $scope.isPreview = false;    
    $scope.formTemplate = [];
    $scope.formData = {};
    $scope.dynamicFormData = {};
    
    $scope.addFormElement = function() {
        if($scope.isText) {
            $scope.formTemplate.push({"type": "text", "label": $scope.textLabel, "model": $scope.textId})
            $scope.isText = false;
        } else if($scope.isButton) {
            $scope.formTemplate.push({"type": "button", "label": $scope.buttonLabel, "model": "saveData"});
            $scope.isButton = false;
        }
        $scope.textLabel = "";
        $scope.textId = "";
        $scope.buttonLabel = "";
        alert("Form Element Added Successfully.")
        console.log($scope.formTemplate);
    }

    $scope.formPreview = function() {
        $scope.isText = false;
        $scope.isPreview = true;
        console.log($scope.formTemplate);
    }

    $scope.processForm = function() {
        console.log($scope.formTemplate);
    }

    $scope.saveForm = function() {
        $scope.dynamicFormData.formName = $scope.formName;
        $scope.dynamicFormData.formTemplate = $scope.formTemplate
        $http({
            method: 'POST',
            url: '/add/new/form',
            data: $scope.dynamicFormData
        }).then(function successCallback(response) {
            alert("Form saved successfully.")
        }, function errorCallback(response) {
            console.log("Error")
        });
    }
}]);