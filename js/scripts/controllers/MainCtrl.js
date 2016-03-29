(function() {
  function MainCtrl($interval, $firebaseArray) {
    TIMER = 10;
    
    var mySound = new buzz.sound( "/sounds/ding.mp3", {
      preload: true
    });

	 	var vm = this;
    vm.count = 0;

    vm.timer = TIMER;
    vm.break = 5;
    vm.state = "paused";

    var zebra, lion;

    this.startTimer = function(){
      if(vm.count === 4){
          vm.count = 0;
      }

      vm.state = "going";
      zebra = $interval(countDown, 1000);
    };

    this.startBreak = function(){
      lion =  $interval(breakCountdown, 1000);
    };

    function countDown () {
      if(vm.timer == 0){
        vm.state = "breaktime";

        vm.count += 1;  

        mySound.play();

        $interval.cancel(zebra);
        vm.timer = TIMER;
      }else{
        vm.timer --;
      }
      
    }

    function breakCountdown () {
      if(vm.break === 0) {
        vm.state = "paused";
        $interval.cancel(lion);
        vm.break = 2;
        mySound.play();
        if(vm.count === 3) {
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
    };

    vm.doSomething = function(){
      vm.tasks.$add({name: vm.newTask, createdAt: Date.now()})

    };  
  

    var firebaseRef = new Firebase('https://brilliant-torch-5995.firebaseio.com/');
    window.foo = vm.tasks = $firebaseArray(firebaseRef);

  }

  angular
      .module('blocPom')
      .controller('MainCtrl', ['$interval', '$firebaseArray', MainCtrl]);
})();
