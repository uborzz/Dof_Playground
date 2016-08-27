angular.module('myApp')
    .directive('genTimetable', function () {
    return {
      restrict: 'A',
      templateUrl: 'gen-timetable.tpl.html',
      scope: {
        slots: '='
      },

      link: function (scope, element, attributes) {
        var _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        var _selection = {
          state: false,
          day: [0, 0, 0, 0, 0, 0, 0],
          hour: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };

        scope.getColor = function(value){
          if(value >= 1 && value < 3)
            {return 'range1';}
          else if (value >= 3 && value < 5)
            {return 'range2';}
          else if (value >= 5 && value < 7)
            {return 'range3';}
          else if (value >= 7 && value < 9)
            {return 'range4';}
          else if (value >= 9)
            {return 'range5';}
          else{
            return '';
          }
        };

        function _loop(begin, end, step) {
          var array = [];

          for (var i = begin; i <= end; i += step) {
            array.push(i);
          }

          return array;
        }

        scope.greaterThan = function(n){
              n=n+12
              if (n>=24){return n-24}
              else {return n}
            }

        function _init() {
          scope.loop = _loop;
          scope.days = _days;
        }

        _init();
      }
    };
});
