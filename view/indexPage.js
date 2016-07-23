var concreteModule = require('./../modules/concreteModule.js');
module.exports = (function(){
	var getPage = function (params){
	//console.log('getPage - ' + params);
		return   '<html>' + getPageHead() + '<body>' + 
		getPageHeader() + getMain(params) + 
		 getPageFooter() +
		 '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.min.js"></script>' + 
		 '<body>' + 
		 '<html>';
	};
	 var getPageHead = function(){
		return '<head>' + '<title>Concrete Калькулятор складу бетону</title>' + '<link rel = "stylesheet" href = "http://localhost:3000/style.css"/>' + '<link rel = "stylesheet" href = "http://localhost:3000/media.css"/>' +'</head>';
	 };
	 var getPageHeader = function () {
		return '<header></header>';
	};
	 var getPageFooter = function(){
		return '<footer></footer>';
	};
	var getMain = function(params){
	//console.log('getMain - ' + params.clas);
	addRecord(params);
		return '<main><div class="container"><h1>Калькулятор складу бетону</h1>'+
		 getForm() + 
		 getResultTable(params) + 
		 getProportionTable(params) + 
		 getCost(params) + 
		 '</div><canvas id="c-chart" width="600" height="400"></canvas>' + 
		 
		 '</main>';
	};
	var addRecord = function(params){
		var record = {'Марка бетону ': params.clas, 'Текучість ': params.fluidity, 'Дата': concreteModule.getDate()};
		
		console.log(record);
		  concreteModule.addRecord(record);
		}

	var getCost = function(params){
	var data = getViewData(params);
	var cost = concreteModule.searchCost();
	var result = "<tr><td>Цемент</td><td>Щебінь</td><td>Пісок</td><td>Вода</td></tr>";
	for(var i = 0; i < data.length; i++){
		result += "<tr>" +	
		"<td>" + ((data[i].cement * params.quantity) * cost[0]).toFixed(2) +  "</td>" +
		"<td>" + ((data[i].stone * params.quantity) * cost[1]).toFixed(2) +  "</td>" +
		"<td>" + ((data[i].sand * params.quantity) * cost[2]).toFixed(2) +  "</td>" +
		"<td>" + ((data[i].water * params.quantity) * cost[3]).toFixed(2) +  "</td>" +
		"</tr>";
	}
	//console.log('cost - ' + cost);
	return "<div>" + "<h4>Вартість, грн.</h4>" + "<table border='1'>" + result + "</table>" + "</div>";
	};
	var getResultTable = function (params) {
	//console.log('params - ' + params.clas);
	//console.log('getResultTable - ' + params.clas);
		var data = getViewData(params);
		//console.log('var data - ' + data);
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
		}
		//console.log('getResultTable - ' + data[0]);
		return "<div>" + "<h4>Кількість матеріалів, кг</h4>" + "<table border='1'>" + result + "</table>" + "</div>";
	};
	var getProportionTable = function (params) {
	//console.log('params - ' + params.clas);
	//console.log('getResultTable - ' + params.clas);
		var data = getViewData(params);
		//console.log('var data - ' + data.length);
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
		//console.log('getResultTable - ' + data[0]);
		return "<div>" + "<h4>Співвідношення по масі</h4>" +"<table border='1'>" + result + "</table>" + "</div>";
	};
	
	var getForm = function (){
		return '<form method="GET" action="search">' +  '<input type="hidden" name="action" value="search"/>' +  '<label> Кількість бетону </label>' + '<input type="text" name="quantity" value="1"/>'  + '<br>' + '<br>' +'<label><span class="help">?  <span class="helptext">Текучість(рухомість) - здатність бетону заповнювати форми в які його заливають. Зазвичай використовують бетон текучість якого становить П1 - П2.Щоб покращити заповнення форми таким бетоном використовують вібрацію і ущільнення.Для складних форм і при неможлиивості бібрування або для подачі бетону насосом використовують П3 - П4, вартість такого бетону вища.</span></span>Текучість бетону  </label>' + getFluiditySelect(concreteModule.getAllFluidities()) + '<br>' + '<br>' +'<label><span class="help">? <span class="helptext">М100 - для заливки підбетонки(основа під фундамент) М150 - для фундаментів під легкі паркани, будинки із дерева, для гаражів і с/г приміщень. М200 - для фундаментів одно і двоповерховихбудинків із легким міжетажним перекриттям. М250/М300 - для фундаментів великих приватних будинків. М400 і вище - для будівництва висотних будинків і монолітних перекриттів.</span></span>Марка  бетону </label>' +  getClassesSelect(concreteModule.getAllClasses()) +  '<br>' + '<br>' +'<input type="submit" value="розрахувати"/>'
        '</form>'; 	   
	}
	
	var getFluiditySelect = function (fluidity) {
		var options = '';
		for (var i = 0; i < fluidity.length; ++i) {
		//console.log(fluidity[i]);
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
	
	var getViewData = function (params){
	//console.log('getViewData - ' + params.fluidity);
		if(!params){
			return concreteModule.getAll() + "fff";
		}
		if (params.fluidity && params.clas && params.action == 'search'){
			return concreteModule.searchByConcreteClass(params.fluidity, params.clas);
		}
		else{
			return concreteModule.getAll;
		}
	};
	//console.log('hello + ' + getViewData());
	
	
	
	return {
		getPage: getPage
	};
	
})();