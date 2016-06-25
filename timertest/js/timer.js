var BlindTimer = angular.module('BlindTimer', []);

BlindTimer.controller("TimerController", ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {


    $scope.companies = [
        {
            'name': 'Peter Meier',
            'paid': false,
            'staff': false,
            'table': '2',
            'seat': '3',
            'seated': false
        }
    ];





    var tourneyInfoInterval = null;
    $scope.entries = $scope.companies.length;
    $scope.staffAmount = localStorage.staffCount;
    $scope.numberRound = 1;
    $scope.tName = null;
    $scope.startingStack = null;
    $scope.staffStack = null;
    $scope.entryFee = null;
    $scope.amountR = null;
    $scope.stackR = null;
    $scope.amountA = null;
    $scope.stackA = null;
    $scope.tAddon = false;
    $scope.tRebuy = false;

    $scope.playersIn = $scope.companies.length;
    $scope.totalPrize = $scope.entryFee * $scope.entries;


    $scope.prizePool = function () {
        if ($scope.entries <= 25) {
            $scope.firstPlace = Math.round($scope.totalPrize * 0.42);
            $scope.secondPlace = Math.round($scope.totalPrize * 0.25);
            $scope.thirdPlace = Math.round($scope.totalPrize * 0.15);
            $scope.fourthPlace = "";
            $scope.fifthPlace = "";
            var roundPrizes = $scope.firstPlace + $scope.secondPlace + $scope.thirdPlace;
            if(roundPrizes != $scope.totalPrize){
                var errorRound = roundPrizes-$scope.totalPrize;
                //console.log(errorRound);
                $scope.firstPlace -= errorRound;
                $scope.roundedPrize =  roundPrizes- errorRound;
            } else {
                $scope.roundedPrize =  roundPrizes;
            }
        } else if ($scope.entries > 25 && $scope.entries <= 35) {
            $scope.firstPlace = Math.round($scope.totalPrize * 0.42);
            $scope.secondPlace = Math.round($scope.totalPrize * 0.25);
            $scope.thirdPlace = Math.round($scope.totalPrize * 0.15);
            $scope.fourthPlace = Math.round($scope.totalPrize * 0.1);
            $scope.fifthPlace = "";
            var roundPrizes = $scope.firstPlace + $scope.secondPlace + $scope.thirdPlace + $scope.fourthPlace;
            if(roundPrizes != $scope.totalPrize){
                var errorRound = roundPrizes-$scope.totalPrize;
                //console.log(errorRound);
                $scope.firstPlace -= errorRound;
                $scope.roundedPrize =  roundPrizes- errorRound;
            } else {
                $scope.roundedPrize =  roundPrizes;
            }
        } else {
            $scope.firstPlace = Math.round($scope.totalPrize * 0.42);
            $scope.secondPlace = Math.round($scope.totalPrize * 0.25);
            $scope.thirdPlace = Math.round($scope.totalPrize * 0.15);
            $scope.fourthPlace = Math.round($scope.totalPrize * 0.1);
            $scope.fifthPlace = Math.round($scope.totalPrize * 0.08);
            var roundPrizes = $scope.firstPlace + $scope.secondPlace + $scope.thirdPlace + $scope.fourthPlace + $scope.fifthPlace;
            if(roundPrizes != $scope.totalPrize){
                var errorRound = roundPrizes-$scope.totalPrize;
                //console.log(errorRound);
                $scope.firstPlace -= errorRound;
                $scope.roundedPrize =  roundPrizes- errorRound;
            } else {
                $scope.roundedPrize =  roundPrizes;
            }
        }
    };
    $scope.prizePool();

    $scope.levels = [
        {
            small: 20,
            big: 40,
            ante: 0,
            length: 1200
        },
        {
            small: 40,
            big: 80,
            ante:0,
            length: 1200
        },
        {
            small: 60,
            big: 120,
            ante: 0,
            length: 1200
        },
        {
            break: true,
            length: 480
        },
        {
            small: 100,
            big: 200,
            ante: 0,
            length: 1200
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
            $scope.currentAnte = $scope.currentLevel.ante > 0 ? $scope.currentLevel.ante : "";
            $scope.nextBB = $scope.nextLevel.big;
            $scope.nextSB = $scope.nextLevel.small;
            $scope.nextAnte = $scope.nextLevel.ante > 0 ? $scope.nextLevel.ante : "";
        } else {
            $scope.currentBB = $scope.currentLevel.big;
            $scope.currentSB = $scope.currentLevel.small;
            $scope.currentAnte = $scope.currentLevel.ante> 0 ? $scope.currentLevel.ante : "";
            $scope.nextBB = "Break";
            $scope.nextSB = "";
            $scope.nextAnte = "";
        }
    };
    $scope.updateBlinds();

    $scope.updateInfo = function () {
        if ($scope.amountA && $scope.stackA != null || "") {
            $scope.tAddon = true;
        } else {
            $scope.tAddon = false;
        }

        if ($scope.amountR && $scope.stackR != null || "") {
            $scope.tRebuy = true;
        } else {
            $scope.tRebuy = false;
        }

        $("#modal-four").ready(function() {
            jQuery("ul li").hover(function() {
                $(".transText", this).css("opacity", "0");
                $(".textbox", this).css("opacity", "1");
            });

            $("ul li").mouseleave(function () {
                $(".transText", this).css("opacity", "1");
                $(".textbox", this).css("opacity", "0");
            });
        });

        $scope.playersIn = $scope.companies.length;
        $scope.staffChips = $scope.staffAmount * $scope.staffStack;
        $scope.chipCount = ($scope.entries * $scope.startingStack) + $scope.staffChips;
        $scope.averageStack = Math.round($scope.chipCount / $scope.playersIn);
        $scope.totalPrize = $scope.entryFee * $scope.entries;
        $(document).ready(function() {
            if($scope.nextAnte||$scope.currentAnte != 0){
                $(".info-overlap").css("bottom", "20px");
            }
        });
        $scope.prizePool();
        $scope.updateBlinds();
    };
    $scope.updateInfo();
    tourneyInfoInterval = $interval($scope.updateInfo, 1000);

    $scope.staffChips = $scope.staffAmount * $scope.staffStack;
    $scope.chipCount = ($scope.entries * $scope.startingStack) + $scope.staffChips;
    $scope.averageStack = Math.round($scope.chipCount / $scope.playersIn);





   // $scope.nextBreakTime = getNextBreakTime($scope.levels, $scope.currentLevelId);
    $scope.endOfLevelTime = getEndOfLevelTime($scope.levels, $scope.currentLevelId);

    var remainer = $scope.endOfLevelTime;
    var blindtimer = null;
    var elapsedTime = 0;
    var breakTimer = $scope.nextBreakTime;
    $scope.timeRemainingInLevel = "20:00";
    $scope.breakIt = "00:00";
    $scope.elapsedTime = "00:00";
    var firstStart = false;
    var pp = false

   /* document.addEventListener('keyup', function(e) {
        if (e.keyCode == 32 && pp==false) {
            $scope.startTournament();
            $("#playBtn").hide();
            $("#pauseBtn").show();
            pp = true;
        } else if(e.keyCode == 32 && pp==true){
            $scope.pauseTournament();
            $("#pauseBtn").hide();
            $("#playBtn").show();
            pp = false;
        }
    });
*/
    $scope.startTournament = function () {
        blindtimer = $interval($scope.onTimeout, 1000);
        if(firstStart!=true){
            $scope.entries = $scope.companies.length;
            firstStart = true;
            $scope.nextBreakTime = getNextBreakTime($scope.levels, $scope.currentLevelId);
            $scope.endOfLevelTime = getEndOfLevelTime($scope.levels, $scope.currentLevelId);
            remainer = $scope.endOfLevelTime;
            breakTimer = $scope.nextBreakTime;

        }

        $scope.staffAmount = localStorage.staffCount;

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
        if (!$scope.currentLevel.break) {
            $scope.numberRound++;
        }
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
        localStorage.clear();
    };



    $scope.addRow = function () {
        $scope.companies.push({
            'name': $scope.name,
            'paid': $scope.paid,
            'staff': $scope.staff,
            'table': $scope.table,
            'seat': $scope.seat,
            'seated': $scope.seated
        });
        $scope.name = '';
        $scope.paid = false;
        $scope.staff = false;
        $scope.table = '';
        $scope.seat = '';
        $scope.seated = false;
        $scope.entries++;

    };

    $scope.addBlind = function () {

        if($scope.breakbool!=true){
            $scope.levels.push({
                'small': $scope.small,
                'big': $scope.big,
                'ante': $scope.ante,
                'length': $scope.length
            });
            $scope.small = '';
            $scope.big = '';
            $scope.ante = '';
            $scope.length = '';
        }else{
            $scope.levels.push({
                'break': $scope.break,
                'length': $scope.length
            });
            $scope.break = true;
            $scope.length = '';
        }

    };

    $scope.tableAmount = 1;
    $scope.assignSeats = function () {

        var tableSize = 0;

        if ($scope.companies.length % 6 == 0) {
            tableSize = $scope.companies.length / 6;
        } else {
            if ($scope.companies.length <= 10) {
                tableSize = 1;
            } else if ($scope.companies.length <= 20) {
                tableSize = 2;
            } else if ($scope.companies.length <= 30) {
                tableSize = 3;
            } else if ($scope.companies.length <= 40) {
                tableSize = 4;
            }

        }
        $scope.tableAmount = tableSize;
        var playerRandom = [];

        for (p = 0; p <= $scope.companies.length; p++) {

            playerRandom.push(p);
            //  console.log($scope.companies[p].seated);
            console.log(playerRandom.toString());

        }

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        shuffle($scope.companies);
        var cout = 0;

        for (var i = 1; i <= tableSize; i++) {
            for (var j = 1; j <= 10; j++) {

                $scope.companies[playerRandom[cout]].table = i;
                $scope.companies[playerRandom[cout]].seat = j;
                $scope.companies[playerRandom[cout]].seated = true;
                cout++;
                console.log("Seated " + $scope.companies[playerRandom[j]].name + "   " + $scope.companies.length);

            }
        }//Ende Sitzplatz

        //Ende Tischauslosung
    };


    $scope.clearSeats = function () {
        for (var i = 0;i<=$scope.companies.length;i++){
            $scope.companies[i].table = "";
            $scope.companies[i].seat = "";
            $scope.companies[i].seated = false;

        }


    };



    $scope.$watch('companies', function (companies) {
        $scope.count = 0;
        localStorage.playerCount = companies.length;
        localStorage.staffCount = 0;

        angular.forEach(companies, function (company) {
            if (company.staff == true) {
                $scope.count += 1;
                localStorage.staffCount = $scope.count;
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



    $scope.removeLevel = function (sb) {
        var index = -1;
        var comArr = eval($scope.levels);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].small === sb) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.levels.splice(index, 1);
    };

    $scope.rebuyPlayer = function (name){
        $scope.entries++;
        $scope.updateInfo();
    }

    $scope.reStaffPlayer = function (name){
        $scope.entries++;
        $scope.staffAmount++;
        $scope.updateInfo();
    }

}]);

window.onbeforeunload = function() {
    return "Das aktuelle Turnier wird dadurch gelöscht. Wirklich neu laden?";
};

