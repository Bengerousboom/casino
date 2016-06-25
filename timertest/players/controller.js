
var helloApp = angular.module("helloApp", []);
helloApp.controller("CompanyCtrl", function($scope) {
    $scope.companies = [
        {
            'name': 'Peter Meier',
            'paid': false,
            'staff': false,
            'table': '1',
            'seat': '3',
            'out': '22:00'
        },
        {
            'name': 'Aeter Deier',
            'paid': true,
            'staff': true,
            'table': '1',
            'seat': '3',
            'out': '22:00'
        },
        {
            'name': 'Deter Ceier',
            'paid': false,
            'staff': true,
            'table': '1',
            'seat': '3',
            'out': '22:00'
        },
        {
            'name': 'Beter Aeier',
            'paid': true,
            'staff': true,
            'table': '1',
            'seat': '3',
            'out': '22:00'
        },
    ];

    $scope.addRow = function () {
        $scope.companies.push({'name': $scope.name, 'paid': $scope.paid, 'staff': $scope.staff, 'seat': $scope.seat, 'out': $scope.out});
        $scope.name = '';
        $scope.paid = false;
        $scope.staff = false;
        $scope.table = '';
        $scope.seat = '';
        $scope.out = '';

    };

    $scope.assignSeats = function(){
        $scope.companies[1].seat = 25;
    };

    $scope.$watch('companies', function(companies){
        $scope.count = 0;
        $scope.paidcount = 0;
        localStorage.paidCount = 0;
        localStorage.playerCount = companies.length;
        localStorage.staffCount = 0;

        angular.forEach(companies, function(company){
            if(company.staff==true){
                $scope.count += 1;
                 localStorage.staffCount = $scope.count;
            }
            if(company.paid==true){
                $scope.paidcount += 1;
                localStorage.paidCount = $scope.paidcount;
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

