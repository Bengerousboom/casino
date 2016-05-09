
var helloApp = angular.module("helloApp", []);
helloApp.controller("CompanyCtrl", function($scope) {
    $scope.companies = [
        {
            'name': 'Peter Meier',
            'paid': false,
            'staff': false,
            'seat': '1-3',
            'out': '22:00'
        },
        {
            'name': 'Aeter Deier',
            'paid': true,
            'staff': true,
            'seat': '2-5',
            'out': '22:00'
        },
        {
            'name': 'Deter Ceier',
            'paid': false,
            'staff': true,
            'seat': '2-4',
            'out': '22:00'
        },
        {
            'name': 'Beter Aeier',
            'paid': true,
            'staff': true,
            'seat': '1-2',
            'out': '22:00'
        },
    ];

    $scope.addRow = function () {
        $scope.companies.push({'name': $scope.name, 'paid': $scope.paid, 'staff': $scope.staff, 'seat': $scope.seat, 'out': $scope.out});
        $scope.name = '';
        $scope.paid = false;
        $scope.staff = false;
        $scope.seat = '';
        $scope.out = '';
    };

    $scope.$watch('companies', function(companies){
        $scope.count = 0;
        $scope.paidcount = 0;
        angular.forEach(companies, function(company){
            if(company.staff==true){
                $scope.count += 1;
            }
            if(company.paid==true){
                $scope.paidcount += 1;
            }
        })
    }, true);


    $scope.removeRow = function(name){
        var index = -1;
        var comArr = eval( $scope.companies );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.companies.splice( index, 1 );
    };
});

