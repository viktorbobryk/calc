var concreteModule = require('./../modules/concreteModule.js');

module.exports = (function(){
	var getPage = function (params){
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
	var getMain = function(){
		return '<main><h1>Calculator</h1>' + getSearchForm() + 'getRecordForm()' + '</main>';
	};
	var getSearchForm = function (){
		return '<form method="GET" action="search">' +  '<input type="hidden" name="action" value="search"/>' + 
                       '<label>Select fluidity of concrete</label>' + 
                       getFluiditySelect(concreteModule.getAllFluidities()) +
		       '<label>Enter quantity of concrete</label>' + 
                       '<input type="text" name="quantity"/>' + 
                       '<input type="submit"/>' + 
                       '</form>'; 
	}
	var getFluiditySelect = function (fluidity) {
		var options = '';
		for (var i = 0; i < fluidity.length; ++i) {
			options += '<option value="' + fluidity[i] + '">' + '</option>';
		}
		console.log(fluidity[i]);
		return (options.length) ? '<select name="fluidity">' + options + '</select>' : '';
	};
	return {
		getPage: getPage
	};
	
})();