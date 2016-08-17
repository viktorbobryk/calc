var concreteModule = require('./../modules/concreteModule.js');
module.exports = (function(){
	var getPage = function (params){
		return   '<html>' + getPageHead() + '<body>' + 
		getPageHeader() + getMain(params) +
		 getPageFooter() +
		 '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.1/Chart.min.js"></script>' + 
		 '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>' +
		 '<script type="text/javascript" src="http://localhost:3000/scripts.js"></script>' +
		 '<body>' + 
		 '<html>';
	};
	 var getPageHead = function(){
		return '<head>' + '<title>Concrete Калькулятор складу бетону</title>' + 
		'<link rel = "stylesheet" href = "http://localhost:3000/style.css"/>' + 
		'<link rel = "stylesheet" href = "http://localhost:3000/media.css"/>' + '</head>';
	 };
	 var getPageHeader = function () {
		return '<header></header>';
	};
	 var getPageFooter = function(){
		return '<footer></footer>';
	};
	var getMain = function(params){
	addRecord(params);
		return '<main><div class="container"><h1>Калькулятор складу бетону</h1>'+
		getMessage(params) +	
		getForm() + 
		getResultTable(params) + 
		getProportionTable(params) + 
		getCost(params) + 
		'<div class="cnv"><canvas id="chart" ></canvas></div>' +
		'</div></main>';
	};
	var addRecord = function(params){
		var record = {'Марка бетону ': params.clas, 'Текучість ': params.fluidity, 'Дата': concreteModule.getDate()};
		
		  concreteModule.addRecord(record);
		}

	var getCost = function(params){
	var paramsLength = concreteModule.paramsLength(params);
	if(paramsLength === 0){
			return '';
	}
	else if(paramsLength > 0){	
		var data = getViewData(params);
		var cost = concreteModule.searchCost();
		var result = "<tr><td>Цемент</td><td>Щебінь</td><td>Пісок</td><td>Вода</td><td>Разом</td></tr>";
			for(var i = 0; i < data.length; i++){
				result += "<tr>" +	
				"<td>" + ((data[i].cement * params.quantity) * cost[0]).toFixed(2) +  "</td>" +
				"<td>" + ((data[i].stone * params.quantity) * cost[1]).toFixed(2) +  "</td>" +
				"<td>" + ((data[i].sand * params.quantity) * cost[2]).toFixed(2) +  "</td>" +
				"<td>" + ((data[i].water * params.quantity) * cost[3]).toFixed(2) +  "</td>" +
				"<td>" + (((data[i].cement * cost[0]) + (data[i].stone * cost[1]) + (data[i].sand * cost[2]) + (data[i].water * cost[3])) * params.quantity).toFixed(2)
				"</td>" +
				"</tr>";
			}
		
		return "<div>" + "<h4>Вартість, грн.</h4>" +"<table border='1'>" +  result + "</table>" + "</div>";
	}
	};
	var getResultTable = function (params) {
		var paramsLength = concreteModule.paramsLength(params);
		if(paramsLength === 0){
				return '';
		}
		else if(paramsLength > 0){
			var data = getViewData(params);
			if(!data.length){
				return [];
			}
			var result = "<tr><td>Текучість</td><td>Марка</td><td>Цемент</td><td>Щебінь</td><td>Пісок</td><td>Вода</td></tr>";
			for(var i = 0; i < data.length; i++){
				result += "<tr>" +
				"<td>" + params.fluidity + "</td>" +	
				"<td>" + data[i].clas + "</td>" +
				"<td>" + (data[i].cement * params.quantity) + "</td>" +
				"<td>" + (data[i].stone * params.quantity) + "</td>" +
				"<td>" + (data[i].sand * params.quantity) + "</td>" +
				"<td>" + (data[i].water * params.quantity) + "</td>" +
				"</tr>";
				//console.log(data[i].cement);
			}

			return "<div>" + "<h4>Кількість матеріалів, кг</h4>" + "<table border='1'>" + result + "</table>" + "</div>";
		}
	};
	var getProportionTable = function (params) {
		var paramsLength = concreteModule.paramsLength(params);
		if(paramsLength === 0){
				return '';
		}
		else if(paramsLength > 0){
			var data = getViewData(params);
			if(!data.length){
				return [];
			}
			var result = "<tr><td>Текучість</td><td>Марка</td><td>Цемент</td><td>Щебінь</td><td>Пісок</td><td>Вода</td></tr>";
			for(var i = 0; i < data.length; i++){
				result += "<tr>" +
				"<td>" + params.fluidity + "</td>" +	
				"<td>" + data[i].clas + "</td>" +
				"<td>" + (data[i].cement / data[i].cement) + "</td>" +
				"<td>" + (data[i].stone / data[i].cement).toFixed(1) + "</td>" +
				"<td>" + (data[i].sand / data[i].cement).toFixed(1) + "</td>" +
				"<td>" + (data[i].water / data[i].cement).toFixed(1) + "</td>"
				"</tr>";
			}
			return "<div>" + "<h4>Співвідношення по масі</h4>" +"<table border='1'>" + result + "</table>" + "</div>";
		}
	};
	
	var getForm = function (){
		return '<form method="GET" action="search">' +  '<input type="hidden" name="action" value="search"/>' +  '<label> Кількість бетону </label>' + '<input type="text" name="quantity" value="1"/>'  + '<br>' + '<br>' +'<label><span class="help">?  <span class="helptext">Текучість(рухомість) - здатність бетону заповнювати форми в які його заливають. Зазвичай використовують бетон текучість якого становить П1 - П2.Щоб покращити заповнення форми таким бетоном використовують вібрацію і ущільнення.Для складних форм і при неможлиивості бібрування або для подачі бетону насосом використовують П3 - П4, вартість такого бетону вища.</span></span>Текучість бетону  </label>' + getFluiditySelect(concreteModule.getAllFluidities()) + '<br>' + '<br>' +'<label><span class="help">? <span class="helptext">М100 - для заливки підбетонки(основа під фундамент) М150 - для фундаментів під легкі паркани, будинки із дерева, для гаражів і с/г приміщень. М200 - для фундаментів одно і двоповерховихбудинків із легким міжетажним перекриттям. М250/М300 - для фундаментів великих приватних будинків. М400 і вище - для будівництва висотних будинків і монолітних перекриттів.</span></span>Марка  бетону </label>' +  getClassesSelect(concreteModule.getAllClasses()) +  '<br>' + '<br>' +'<input type="submit" value="розрахувати"/>'
        '</form>'; 	   
	}
	
	var getFluiditySelect = function (fluidity) {
		var options = '';
		for (var i = 0; i < fluidity.length; ++i) {
			options += '<option value="' + fluidity[i] + '">' + fluidity[i] + '</option>';
		}
		return (options.length) ? '<select name="fluidity">' + options + '</select>' : '';
	};
	
	var getClassesSelect = function (clas){
		var options = '';
		for (var i = 0; i < clas.length; ++i) {
			options += '<option value="' + clas[i] + '">' + clas[i] + '</option>';
		}
		return (options.length) ? '<select name="clas">' + options + '</select>' : '';
	};

	var getChartData = function (params) {
		var classes = concreteModule.getAllClasses();
	    var classesStat = concreteModule.getClassesStat();
	    var labels = [];
	    var dataStat = [];
	    var backGroundColors = [];
	    for (var i = 0; i < classes.length; ++i) {
	        labels.push(classes[i]);
	        backGroundColors.push('rgba(0, 0, 255, 0.8)');
	    }
	    for (var j = 0; j < classesStat.length; ++j) {
	        dataStat.push(classesStat[j]);
	    }
	    return {
	        type: "bar",
	        data: {
	            labels: labels,
	            datasets: [
	                {
	                    label: "Популярність марок бетону",
	                    data: dataStat,
	                    backgroundColor: backGroundColors
	                }
	            ]
	        },
	        options: { 
            	responsive: true, 
            	scales: { 
            	yAxes: [ 
              	{ 
                	ticks: { 
                  	 beginAtZero:true 
                 	} 
               	} 
                ] 
            	}                   
        	} 
        };   

	};    
       
	
	var getViewData = function (params){
		if(!params){
			return concreteModule.getAll();
		}
		if (params.fluidity && params.clas && params.action == 'search'){
			return concreteModule.searchByConcreteClass(params.fluidity, params.clas);
		}
		else{
			return concreteModule.getAll;
		}
	};

	var getMessage = function (params) {
		var paramsLength = concreteModule.paramsLength(params);
		var validateParams = concreteModule.validateParams(params);
			if(paramsLength === 0){
				return '';
			}
			else if(paramsLength > 0){
	            if (!validateParams) {
	               return '<div class="message"> !!! В графі "Кількість бетону" ви ввели не число, перевірте і спробуйте ще раз</div>'; 
	            } 
	            	return '';  
	        }    	 	  	
        };
	
	return {
		getPage: getPage,
		getChartData: getChartData
	};
	
})();