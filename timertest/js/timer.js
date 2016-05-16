var BlindTimer = angular.module('BlindTimer', []);

BlindTimer.controller("TimerController", ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {

    /*
     Timer-Level Controller
     */
    $scope.updateBlinds = function () {
        if (!$scope.nextlevel.break) {
            $scope.currentBB = $scope.currentLevel.big;
            $scope.currentSB = $scope.currentLevel.small;
            $scope.currentAnte = $scope.currentLevel.ante;
            $scope.nextBB = $scope.nextLevel.big;
            $scope.nextSB = $scope.nextLevel.small;
            $scope.nextAnte = $scope.nextLevel.ante
        } else {
            $scope.currentBB = $scope.currentLevel.big;
            $scope.currentSB = $scope.currentLevel.small;
            $scope.currentAnte = $scope.currentLevel.ante;
            $scope.nextBB = "Break";
            $scope.nextSB = "";
            $scope.nextAnte = "";

        }
    };


    var tourneyInfoInterval = null;
    $scope.playersIn = localStorage.playerCount;
    $scope.staffAmount = localStorage.staffCount;
    $scope.startingStack = 6000;
    $scope.staffStack = 2000;
    $scope.entryFee = 110;

    $scope.totalPrize = $scope.entryFee * $scope.playersIn;

    $scope.prizePool = function () {
        if ($scope.playersIn <= 25) {
            $scope.firstPlace = "1st Place: " + $scope.totalPrize * 0.5 + "€";
            $scope.secondPlace = "2nd Place: " + $scope.totalPrize * 0.3 + "€";
            $scope.thirdPlace = "3rd Place: " + $scope.totalPrize * 0.2 + "€";
            $scope.fourthPlace = "";
            $scope.fifthPlace = "";
        } else if ($scope.playersIn > 25 && $scope.playersIn <= 35) {
            $scope.firstPlace = "1st Place: " + $scope.totalPrize * 0.4 + "€";
            $scope.secondPlace = "2nd Place: " + $scope.totalPrize * 0.3 + "€";
            $scope.thirdPlace = "3rd Place: " + $scope.totalPrize * 0.2 + "€";
            $scope.fourthPlace = "4th Place: " + $scope.totalPrize * 0.1 + "€";
            $scope.fifthPlace = "";
        } else {
            $scope.firstPlace = "1st Place: " + $scope.totalPrize * 0.42 + "€";
            $scope.secondPlace = "2nd Place: " + $scope.totalPrize * 0.25 + "€";
            $scope.thirdPlace = "3rd Place: " + $scope.totalPrize * 0.15 + "€";
            $scope.fourthPlace = "4th Place: " + $scope.totalPrize * 0.1 + "€";
            $scope.fifthPlace = "5th Place: " + $scope.totalPrize * 0.08 + "€";
        }
    };
    $scope.prizePool();

    $scope.updateInfo = function () {
        if ($scope.playersIn != localStorage.playerCount || $scope.staffAmount != localStorage.staffCount) {
            $scope.playersIn = localStorage.playerCount;
            $scope.staffAmount = localStorage.staffCount;
            $scope.staffChips = $scope.staffAmount * $scope.staffStack;
            $scope.chipCount = ($scope.playersIn * $scope.startingStack) + $scope.staffChips;
            $scope.averageStack = Math.round($scope.chipCount / $scope.playersIn);
            $scope.totalPrize = $scope.entryFee * $scope.playersIn;
            $scope.prizePool();
        }
    };
    $scope.updateInfo();
    tourneyInfoInterval = $interval($scope.updateInfo, 1000);

    $scope.chipCount = $scope.playersIn * $scope.startingStack;
    $scope.averageStack = $scope.chipCount / $scope.playersIn;


    $scope.levels = [
        {
            small: 10,
            big: 20,
            ante: 0,
            length: 1200
        },
        {
            small: 25,
            big: 50,
            ante: 0,
            length: 1800
        },
        {
            small: 50,
            big: 100,
            ante: 0,
            length: 3
        },
        {
            small: 100,
            big: 200,
            ante: 10,
            length: 2
        },
        {
            break: true,
            length: 3
        },
        {
            small: 100,
            big: 200,
            ante: 10,
            length: 10
        },
        {
            break: true,
            length: 300
        }
    ];

    $scope.currentLevelId = JSON.tryParse(localStorage.currentLevelId) || 0;

    $scope.currentLevel = $scope.levels[$scope.currentLevelId];
    $scope.nextLevel = $scope.levels[$scope.currentLevelId + 1];

    $scope.updateBlinds = function () {
        if (!$scope.nextLevel.break) {
            $scope.currentBB = $scope.currentLevel.big;
            $scope.currentSB = $scope.currentLevel.small;
            $scope.currentAnte = $scope.currentLevel.ante > 0 ? " / " + $scope.currentLevel.ante : "";
            $scope.nextBB = $scope.nextLevel.big;
            $scope.nextSB = $scope.nextLevel.small;
            $scope.nextAnte = $scope.nextLevel.ante > 0 ? " / " + $scope.nextLevel.ante : "";
        } else {
            $scope.currentBB = $scope.currentLevel.big;
            $scope.currentSB = $scope.currentLevel.small;
            $scope.currentAnte = $scope.currentLevel.ante;
            $scope.nextBB = "Break";
            $scope.nextSB = "";
            $scope.nextAnte = "";

        }
    };
    $scope.updateBlinds();
    $scope.nextBreakTime = getNextBreakTime($scope.levels, $scope.currentLevelId);
    $scope.endOfLevelTime = getEndOfLevelTime($scope.levels, $scope.currentLevelId);

    var remainer = $scope.endOfLevelTime;
    var blindtimer = null;
    var elapsedTime = 0;
    var breakTimer = $scope.nextBreakTime;
    $scope.timeRemainingInLevel = "20:00";
    $scope.breakIt = "00:00";
    $scope.elapsedTime = "00:00";


    $scope.startTournament = function () {
        blindtimer = $interval($scope.onTimeout, 1000);
    };

    $scope.onTimeout = function () {

        if (remainer == 0) {
            $scope.currentLevelId++;
            $scope.currentLevel = $scope.levels[$scope.currentLevelId];
            $scope.nextLevel = $scope.levels[$scope.currentLevelId + 1];
            $scope.$broadcast('levelComplete');
            return;
        }
        if ($scope.currentLevel.break) {

            $scope.nextBreakTime = getNextBreakTime($scope.levels, $scope.currentLevelId + 1);
            breakTimer = $scope.nextBreakTime;
        } else {
            breakTimer--;
        }
        elapsedTime++;
        remainer--;
        $scope.breakIt = getTime(breakTimer);
        $scope.elapsedTime = getTime(elapsedTime);
        $scope.timeRemainingInLevel = getTime(remainer);

    };

    $scope.$on('levelComplete', function (event) {
        $scope.endOfLevelTime = getEndOfLevelTime($scope.levels, $scope.currentLevelId);
        remainer = $scope.endOfLevelTime;
        $scope.updateBlinds();
        $scope.onTimeout();
    });


    /*
     Pausieren und Resetten
     */

    $scope.pauseTournament = function () {
        $interval.cancel(blindtimer);
    };

    $scope.resetTournament = function () {
        document.location.reload();
    };

}]);



BlindTimer.controller("CompanyCtrl", function ($scope) {
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
        }
    ];

    $scope.addRow = function () {
        $scope.companies.push({
            'name': $scope.name,
            'paid': $scope.paid,
            'staff': $scope.staff,
            'seat': $scope.seat,
            'out': $scope.out
        });
        $scope.name = '';
        $scope.paid = false;
        $scope.staff = false;
        $scope.table = '';
        $scope.seat = '';
        $scope.out = '';

    };

    $scope.assignSeats = function () {
        $scope.companies[1].seat = 25;
    };

    $scope.$watch('companies', function (companies) {
        $scope.count = 0;
        $scope.paidcount = 0;
        localStorage.paidCount = 0;
        localStorage.playerCount = companies.length;
        localStorage.staffCount = 0;

        angular.forEach(companies, function (company) {
            if (company.staff == true) {
                $scope.count += 1;
                localStorage.staffCount = $scope.count;
            }
            if (company.paid == true) {
                $scope.paidcount += 1;
                localStorage.paidCount = $scope.paidcount;
            }
        })
    }, true);


    $scope.removeRow = function (name) {
        var index = -1;
        var comArr = eval($scope.companies);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.companies.splice(index, 1);
    };
});

