var concreteModule = require('./../modules/concreteModule.js');

module.exports = (function(){
	var getPage = function (params){
	//console.log('getPage' + params);
		return '<html>' + getPageHead() + '<body>' + getPageHeader() + getMain(params) + getPageFooter() + '<body>' + '<html>';
	};
	 var getPageHead = function(){
		return '<head>' + '<title>Concrete Calculator</title>' + '<link rel = "stylesheet" href = "http://localhost:3000/public/style.css"/>' + '</head>';
	 };
	 var getPageHeader = function () {
		return '<header></header>';
	};
	 var getPageFooter = function(){
		return '<footer></footer>';
	};
	var getMain = function(params){
	//console.log('getMain - 'params);
		return '<main><h1>Calculator</h1>' + getForm() + getResultTable(params) + '</main>';
	};
	
	var getResultTable = function (params) {
	//console.log('getResultTable - ' + params);
		var data = getViewData(params);
		//console.log('var data - ' + data);
		if(!data.length){
			return 'nothing found';
		}
		var result = "<tr><td>Clas</td><td>Cement</td><td>Stone</td><td>Sand</td><td>Water</td></tr>";
		for(var i = 0; i < data.length; i++){
			result += "tr" + 
			"<td>" + data.clas + "</td>" +
			"<td>" + data.cement + "</td>" +
			"<td>" + data.stone + "</td>" +
			"<td>" + data.sand + "</td>" +
			"<td>" + data .water + "/td" +
			"/tr";
		}
		return "<table border='1'>" + result + "</table>"
	};
	var getForm = function (){
		return '<form method="GET" action="search">' +  '<input type="hidden" name="action" value="search"/>' +  '<label>Enter quantity of concrete</label>' + '<input type="text" name="quantity"/>'  + '<br>' + '<br>' +'<label>Select fluidity of concrete</label>' + getFluiditySelect(allFluidities) + '<br>' + '<br>' +'<label>Select class of concrete</label>' +  getClassesSelect(allClasses) +  '<br>' + '<br>' +'<input type="submit" value="розрахувати"/>'
        '</form>'; 	   
	}
	
	var getFluiditySelect = function (fluidity) {
		var options = '';
		for (var i = 0; i < fluidity.length; ++i) {
			options += '<option value="' + fluidity[i] + '">' + '</option>';
		}
		return (options.length) ? '<select name="fluidity">' + options + '</select>' : '';
	};
	var allFluidities = concreteModule.getAllFluidities();
	//console.log('allFluidities - ' + allFluidities);
	
	var getClassesSelect = function (clas){
		var options = '';
		for (var i = 0; i < clas.length; ++i) {
			options += '<option value="' + clas[i] + '">' + '</option>';
		}
		return (options.length) ? '<select name="clas">' + options + '</select>' : '';
	};
	var allClasses = concreteModule.getAllClasses();
	//console.log('allClasses -' + allClasses);
	//console.log(getForm());
	var getViewData = function (params){
	//console.log('getViewData - ' + params);
		if (params.fluidity && params.clas && params.action === 'search'){
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