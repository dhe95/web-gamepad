var gamepad = angular.module('gamepad', [])

.controller('gamepadController', [
  '$scope', '$http', 
  function($scope) {
    var socket = io.connect();
    $scope.gamepadIndex = 0;

    $scope.sendGamepadData = function(data) {
      socket.emit('gamepad', { data: data },
          function processResponse(response) {
            console.log(response);
          });
    };

    $scope.startSend = function() {
      var gamepads = navigator.getGamepads();
      for(var i = 0; i < gamepads.length; i++) {
        if(gamepads[i] !== undefined) { // takes the first valid gamepad
          $scope.gamepadIndex = i;
          break;
        }
      }
      setInterval(function() { 
        var gamepads = navigator.getGamepads();
        $scope.sendGamepadData(JSON.stringify(gamepads[$scope.gamepadIndex]));
      }, 100);
    };
  }
]);


