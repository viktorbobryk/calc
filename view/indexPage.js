var concreteModule = require('./../modules/concreteModule.js');

module.exports = (function(){
	var getPage = function (params){
	//console.log('getPage - ' + params);
		return '<html>' + getPageHead() + '<body>' + getPageHeader() + getMain(params) + getPageFooter() + '<body>' + '<html>';
	};
	 var getPageHead = function(){
		return '<head>' + '<title>Concrete Calculator</title>' + '<link rel = "stylesheet" href = "http://localhost:3000/style.css"/>' + '</head>';
	 };
	 var getPageHeader = function () {
		return '<header></header>';
	};
	 var getPageFooter = function(){
		return '<footer></footer>';
	};
	var getMain = function(params){
	//console.log('getMain - ' + params.clas);
		return '<main><h1>Calculator</h1>' + getForm() + getResultTable(params) + getCost(params) +'</main>';
	};
	var getCost = function(params){
	var data = getViewData(params);
	var cost = concreteModule.searchCost();
	var result = "<tr><td>Cement</td><td>Stone</td><td>Sand</td><td>Water</td></tr>";
	for(var i = 0; i < data.length; i++){
		result += "<tr>" +	
		"<td>" + ((data[i].cement * params.quantity) * cost[0]).toFixed(2) + " grn" + "</td>" +
		"<td>" + ((data[i].stone * params.quantity) * cost[1]).toFixed(2) + " grn" + "</td>" +
		"<td>" + ((data[i].sand * params.quantity) * cost[2]).toFixed(2) + " grn" + "</td>" +
		"<td>" + ((data[i].water * params.quantity) * cost[3]).toFixed(2) + " grn" + "</td>" +
		"</tr>";
	}
	//console.log('cost - ' + cost);
	return "<table border='1'>" + result + "</table>"
	};
	var getResultTable = function (params) {
	//console.log('params - ' + params.clas);
	//console.log('getResultTable - ' + params.clas);
		var data = getViewData(params);
		//console.log('var data - ' + data);
		if(!data.length){
			return 'nothing found';
		}
		var result = "<tr><td>Fluidity</td><td>Clas</td><td>Cement</td><td>Stone</td><td>Sand</td><td>Water</td><td>Proportion c/st/sa/w</td></tr>";
		for(var i = 0; i < data.length; i++){
			result += "<tr>" +
			"<td>" + params.fluidity + "</td>" +	
			"<td>" + data[i].clas + "</td>" +
			"<td>" + (data[i].cement * params.quantity) + "</td>" +
			"<td>" + (data[i].stone * params.quantity) + "</td>" +
			"<td>" + (data[i].sand * params.quantity) + "</td>" +
			"<td>" + (data[i].water * params.quantity) + "</td>" +
			"<td>" + (data[i].cement / data[i].cement) + 
			" / " + (data[i].stone / data[i].cement).toFixed(1) + 
			" / " + (data[i].sand / data[i].cement).toFixed(1) + 
			" / " + (data[i].water / data[i].cement).toFixed(1) + "</td>"
			"</tr>";
		}
		//console.log('getResultTable - ' + data[0]);
		return "<table border='1'>" + result + "</table>"
	};
	var getForm = function (){
		return '<form method="GET" action="search">' +  '<input type="hidden" name="action" value="search"/>' +  '<label>Enter quantity of concrete</label>' + '<input type="text" name="quantity" value="1"/>'  + '<br>' + '<br>' +'<label>Select fluidity of concrete</label>' + getFluiditySelect(concreteModule.getAllFluidities()) + '<br>' + '<br>' +'<label>Select class of concrete</label>' +  getClassesSelect(concreteModule.getAllClasses()) +  '<br>' + '<br>' +'<input type="submit" value="розрахувати"/>'
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
			return concreteModule.getAll();
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