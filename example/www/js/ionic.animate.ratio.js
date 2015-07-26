angular.module('ionic.animate.ratio', [])

.directive('animateRatio', function($timeout, $ionicSideMenuDelegate) {

  return {
    restrict: 'A',
    scope: {
      animateRatio: '=',
    },
    link: function (scope, element, attr) {

      $timeout(function () {
        scope.$watch(function () {
          return $ionicSideMenuDelegate.getOpenRatio();
        },
        function (ratio) {
          scope.animateRatio(element[0], ratio);
        });
      });
    }
  }

})

.controller('SideMenuCtrl', function($scope, $timeout, $stateParams, $ionicSideMenuDelegate) {

  /*!
   * Expects number from 0.0 -> 1.0
   * Returns absolute value
   *
   * @param {Number}
   * @return {Number}
   */
  var transitionIn = function(ratio) {
    return Math.abs(ratio);
  }

  /*!
   * Expects number from 0.0 to 1.0
   * Returns absolute value in reverse 1.0 -> 0.0
   *
   * @param {Number}
   * @return {Number}
   */
  // 1.0 to 0.0
  var transitionOut = function(ratio) {
    return (1- Math.abs(ratio));
  }

  /*!
   * Expects number from 0.0 to 1.0
   * Returns absolute value from number to number
   * Ex. 10 -> 20 or 20 -> 10
   *
   * @param {Number}
   * @param {Number}
   * @param {Number}
   * @return {Number}
   */
  // from min to max
  var transitionFromTo = function(ratio, from, to) {
    return from - (Math.abs(ratio) * (from - to));
  }

  $scope.fadeIn = function(element, ratio) {
    element.style.transform = element.style.webkitTransform = 'scale(' + transitionIn(ratio) + ')';
    element.style.opacity = transitionIn(ratio);
  }

  $scope.slideUp = function(element, ratio) {
    element.style.transform = element.style.webkitTransform = 'translateY(' + transitionFromTo(ratio, 100, 0) + '%' + ')';
  }


});