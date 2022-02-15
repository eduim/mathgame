

  //main function
  $(document).ready(function(){
    
    //create random number
    var randomNumber = function(max){
        number =  Math.round(Math.random() * (max-1));
        return number
      }; 
      
      
      //get operators from checkforms
      var check = function(){
        var checks = $('.form-check-input');
        operators = [];
        checks.each(function(node) {
          if($(this).prop('checked')){
            operators.push($(this).val());
          }
        });
        return operators;
      }
      
      //select random operator from checklist
      var randomOperator = function(operators){
        return operators[randomNumber(operators.length)];
      }
      
      
      //create numbers for operation
      var mathgame = function(operators,limit,ope){
      
        
        //generate 2 random numbers
        number1 = randomNumber(limit);
        number2 = randomNumber(limit);
        
        //return result of string
        function evil(fn) {
          return new Function('return ' + fn)();
        }
        result = evil(number2+ope+number1)
        
        while (result < 0 || result < 1 || result%1 !=0) {
          number1 = randomNumber(limit);
          number2 = randomNumber(limit);
          result = evil(number2+ope+number1)
        }
        return [number1, number2, result]
      }
    //Number limit
    $(document).on("change",'#customRange',function(){
      $('#rangeLimit').text(' '+this.value)
      max = ($('#customRange').val());
      randomNumber(max);
    })
    
    //add the operators to array
    operators = check()
  
    //add the operators to array when change the click selection
    $('.form-check-input').on("change", function () {
      operators = check()
     
    });
  
    //selection max number
    max = ($('#customRange').val());
    //create operation
    var operation = function(){
      ope = randomOperator(operators);
      numbers = mathgame(operators,max,ope)
      //extract numbers
        n1 = numbers[0];
      n2 = numbers[1];
      r = numbers[2];
      console.log(numbers)
    }
  
    //first operation
    operation();
  
    //show numbers
    $('#operationDisplay').text(n2+ope+n1);
    
    //update timer
    var updateTimeLeft = function (amount) {
      timeLeft += amount;
      $('#secondsLeft').text(timeLeft);
    }
    
    //timer
    var timeLeft = 9;
  
    // Define global interval variable at the top
    var interval;
    var answers =[];
    var count = 0;
    
    //Start game
    var startGame = function () {
      if (!interval) {
        interval = setInterval(function () {
          updateTimeLeft(-1);
          if (timeLeft === 0) {
            clearInterval(interval);
            interval = undefined;
            timeLeft = 9;
            answers.push(count);
            console.log(answers);
            count = 0;
            $('#currentScore').val('');
            $('#highestScore').text(Math.max(...answers));
          }
        }, 1000);  
      }
    }
    
    //Start game
    $('#numberInput').on("change", function () {
      startGame();
        input = Number(($('#numberInput').val()));    
        if(input == r){
          //repeat opeartion
          operation();
          $('#operationDisplay').text(n2+ope+n1);
          $('#numberInput').val('');
          //add time 
          updateTimeLeft(+1);
          count++
          $('#currentScore').text(count);
        }
    });
  });
    