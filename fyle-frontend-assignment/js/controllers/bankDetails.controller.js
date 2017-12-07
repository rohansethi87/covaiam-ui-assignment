app.controller('bankDetailsController',function($scope,showBankInfoService){

var vm = this;
$scope.vm = vm;

vm.selectedValue;

vm.init  = function(){
    vm.bankCities = [                               //list for defining the options in the dropdown
        {
            id: 0,
            city: 'Bangalore',
            cityID: 'BANGALORE'
        },
        {
            id: 1,
            city: 'Delhi',
            cityID: 'DELHI'
        },
        {
            id: 2,
            city: 'Mumbai',
            cityID: 'MUMBAI'
        },
        {
            id: 3,
            city: 'Chennai',
            cityID: 'CHENNAI'
        },
        {
            id: 4,
            city: 'Pune',
            cityID: 'PUNE'
        }]

    vm.selectedValue = vm.bankCities[0].cityID;     //default value of the dropdown
    vm.onCityChange();                              //getting the result to display in table for default value
} 

vm.onCityChange = function(){                       // called every time when dropdown value change 
    vm.getBankDetails = showBankInfoService.getBankBranches(vm.selectedValue).success(function(res){
        console.log('success',res);
        vm.bankInfo = res;
    }).error(function(res){
        console.log('error',res);                   //error handling 
    })
}

})