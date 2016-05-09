var BlindTimer = angular.module('BlindTimer', ['ngRoute']);

BlindTimer.controller("TimerController", ['$scope', '$timeout', '$interval', function($scope, $timeout,$interval) {

    $scope.levels = [
        {
            small: 10,
            big: 20,
            ante: 0,
            length: 3
        },
        {
            small: 25,
            big: 50,
            ante: 0,
            length: 2
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
            length: 10
        },
        {
            break: true,
            length: 300
        }
    ];

    $scope.currentLevelId = JSON.tryParse(localStorage.currentLevelId) || 0;
    $scope.currentLevel = $scope.levels[$scope.currentLevelId];
    $scope.nextBreakTime = getNextBreakTime($scope.levels, $scope.currentLevelId);

    $scope.endOfLevelTime = getEndOfLevelTime($scope.levels, $scope.currentLevelId);

    var remainer = $scope.endOfLevelTime;
    var blindtimer = null;
    var elapsedTime = 0;

    $scope.startTournament = function() {
        var time = Math.floor(new Date().getTime() / 1000);
        blindtimer = $interval($scope.onTimeout, 1000);

    };

    $scope.onTimeout = function() {

        if(remainer == 0) {
            $scope.currentLevelId++;
            $scope.currentLevel = $scope.levels[$scope.currentLevelId];
            $scope.$broadcast('timer-stopped');
            return;
        }
        elapsedTime++;
        remainer--;
        $scope.elapsedTime = getTime(elapsedTime);
        $scope.timeRemainingInLevel = getTime(remainer);
        $scope.timeUntilNextBreak = getTime($scope.nextBreakTime - elapsedTime);
       // blindtimer = $timeout($scope.onTimeout, 1000);
    };

    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event) {
            $scope.endOfLevelTime = getEndOfLevelTime($scope.levels, $scope.currentLevelId);
            remainer = $scope.endOfLevelTime;
            //blindtimer = $timeout($scope.onTimeout, 1000);
        $scope.onTimeout();
    });


$scope.pauseTournament = function() {

        $interval.cancel(blindtimer);
    };

    $scope.resetTournament = function () {
        localStorage.clear();
        document.location.reload();
    };







}]);