(function() {
  function MainCtrl($interval) {
    TIMER = 5;

	 	var vm = this;

    vm.timer = TIMER;
    vm.break = 2;
    vm.state = "paused";

    var zebra, lion;

    this.startTimer = function(){
      console.log('Click Works');
      vm.state = "going"
      zebra = $interval(countDown, 1000);
    }

    this.startBreak = function(){
      lion =  $interval(breakCountdown, 1000);
    }

    function countDown () {
      console.log("Interval was called")
      if(vm.timer == 0){
        vm.state = "breaktime"
        $interval.cancel(zebra)
        vm.timer = TIMER;
      }else{
        vm.timer --;
      }
      
    }

    function breakCountdown () {
      if(vm.break == 0) {
        vm.state = "paused"
        $interval.cancel(lion)
        vm.break = 2;
      }else {
        vm.break --;
      }
    }

    vm.reset = function() {
      vm.timer = TIMER;
      $interval.cancel(zebra);
      vm.state = "paused";
   }   
  }
  angular
      .module('blocPom')
      .controller('MainCtrl', ['$interval', MainCtrl]);
})();
