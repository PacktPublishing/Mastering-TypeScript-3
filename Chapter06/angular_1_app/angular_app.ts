var phonecatApp = angular.module('phonecatApp', []);

interface IScope {
    phones : IPhone[];
}
interface IPhone {
    name: string;
    snippet: string;
}

class PhoneListController {
    myScope: IScope;
    constructor($scope: any, $http: ng.IHttpService, Phone : any) {
        this.myScope = $scope;
        this.myScope.phones = Phone.query();
        $scope.orderProp = 'age';
        _.bindAll(this, 'GetPhonesSuccess');
    }
    GetPhonesSuccess(data: IPhone []) {
        this.myScope.phones = data;
    }
}

var phonecatServices = 
    angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone',
    [
        '$resource', ($resource: any) => {
            return $resource('phones/:phoneId.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                        phoneId: 'phones'
                    },
                    isArray: true
                }
            });
        }
    ]
);

