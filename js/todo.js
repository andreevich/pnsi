angular.module('todoApp', [])
  .controller('TodoController', ['$scope', '$http', function($scope,$http) {
	$scope.pre="0";
    $scope.todos = [];
	var date = new Date();
	$scope.P={}
	
	$scope.ARR = [];
	
	$scope.todoText=null
	$scope.P.V_BAN_PER_BGN = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	$scope.P.P_SIGN_NO = 4;
	
	$scope.result={text:"",err:false}
    $scope.raschKZ="";
	$scope.myValue=true;
	
    $scope.sendAll = function(){
		arr=[];
		angular.forEach($scope.todos, function(todo) {
			arr.push(todo.text);
		});
		console.log(arr)
		
		
		$http.post('http://localhost:3000/scope', $scope.ARR)
		  .success(function(data, status, headers, config) {
			console.log(data)
			$scope.pre = data
		  })
		  .error(function(data, status, headers, config) {
			console.log(data)
			$scope.pre = data;
		});
		
	}
	
	$scope.addTodo = function() {
	 if ($scope.P.todoText!==null){
	  if ($scope.P.todoText.length!=8){
		$scope.result.text="Неверная длина"	
		$scope.result.err=true;	
	  }
	  else {
		if ($scope.kz()){
		  
			$scope.ARR.push({
				RESON    		: $scope.P.RESON,  			
				MANAG_NO 		: $scope.P.MANAG_NO, 		
				P_SIGN_NO		: $scope.P.P_SIGN_NO,		
				MANAG_NO_1		: $scope.P.MANAG_NO_1,
				STA_NO_1		: $scope.P.STA_NO_1,
				V_BAN_PER_BGN 	: $scope.P.V_BAN_PER_BGN,
				V_BAN_PER_END 	: $scope.P.V_BAN_PER_END,
				V_KIND_NO		: $scope.P.V_KIND_NO,
				V_TYPE_NO		: $scope.P.V_TYPE_NO,
				OWN_NO 			: $scope.P.OWN_NO,	
				CARGO			: $scope.P.CARGO,
				STA_NO 			: $scope.P.STA_NO,
				CARGO_GS		: $scope.P.CARGO_GS,	
				LIST_NO			: $scope.P.LIST_NO,	
				COMP_L_BGN 		: $scope.P.COMP_L_BGN,
				COMP_L_END 		: $scope.P.COMP_L_END,
				PR3STR			: $scope.P.PR3STR, 	
				ROAD_NO			: $scope.P.ROAD_NO,	
				todoText		: $scope.P.todoText
			})
		
			$scope.P.todoText = '';
			$scope.result.text="вагон добавлен"	
			$scope.result.err=false;	
			}
		else{
			$scope.result.text="Неверный контрольный знак: "+$scope.P.todoText[7]+" ("+$scope.raschKZ+")"
			$scope.result.err=true;
		}
	  }
    }
	else{
		$scope.result.text="Неверная длина"	
		$scope.result.err=true;
	}
	};
	
	$scope.fil59 = function(){
		$scope.P.RESON="Д";
		$scope.P.MANAG_NO=21;
		$scope.P.P_SIGN_NO=4;
		$scope.P.MANAG_NO_1=20;
		$scope.P.STA_NO_1 =154209;
		$scope.P.LIST_NO='059';
		$scope.P.COMP_L_BGN='2012-06-20';
		$scope.P.COMP_L_END='2030-06-20';
	}
	$scope.switch = function(a){
		console.log(a)
		if (a=='o'){
			$scope.myValue=true;
			$scope.myValue2=false;
		}
		if (a=='n'){
			$scope.myValue2=true;
			$scope.myValue=false;
		}
	}
	
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 1 : 0;
      });
      return count;
    };
	$scope.deleteItem = function(index){
		 $scope.ARR.splice(index, 1);
	}
	$scope.kz = function(){
		flag = false;
		var summ=0;
		for (i=0;i<7;i++){
			if (i==0 || i==2 || i==4 || i==6){
				temp = $scope.P.todoText[i]*2;
				if (temp>=10){
					summ+=Math.floor(temp/10)+(temp/10-Math.floor(temp/10))*10;
				}
				else
					summ+=temp*1;
			}
			else{
				temp = $scope.P.todoText[i]*1;
				summ+=temp;
			}
		}
		tt = (Math.floor(summ/10)+1)*10-summ
		if (tt==10) tt=0
		$scope.raschKZ = tt;
		if (tt!=$scope.P.todoText[7])
			flag=false
		else
			flag=true;
		console.log(summ,tt,$scope.P.todoText[7])
		return flag;
	}
    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.ARR = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
  }]);