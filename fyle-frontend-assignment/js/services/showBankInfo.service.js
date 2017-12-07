app.service('showBankInfoService',function($http){      //injecting http service for making rest calls

const _apiUrl = "https://app.fyle.in/api"; 

    this.getBankBranches=function (city) { 
            return($http({
            method: "get",
            url: _apiUrl+"/bank_branches",
            params: {
                'city': city ,
                'offset' : 0,
                'limit' : 50
            }        
        }))
    }

});