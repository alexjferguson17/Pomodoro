(function() {
  function MainCtrl($interval) {
    TIMER = 1500;
    

	 	var vm = this;
    vm.count = 0;

    vm.timer = TIMER;
    vm.break = 300;
    vm.state = "paused";

    var zebra, lion;

    this.startTimer = function(){
      if(vm.count == 4){
          vm.count = 0
      }

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

        vm.count += 1;  

        
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
        if(vm.count == 3) {
          vm.break = 1800;
        }
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
