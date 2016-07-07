var fs = require('fs');
var logger = require('./../services/Logger.js');
module.exports = (function () {
	var dbFilePath = './data/data.json';
	var getDataFromFile = function (path){
		try{
		var result = fs.readFileSync(path, 'utf8');
		return JSON.parse(result);
		} 
		catch(e) {
			logger.logError('Can not read from file');
			return [];
		}
	};
	//console.log(getDataFromFile(dbFilePath)[0].classes[1]);
	var searchByConcreteClass = function (){
		var result = [];
		var fluid;
		for(var i = 0;i < dbFilePath.length;i++){
			if(dbFilePath[i].fluidity === fluidity){
				fluid = dbFilePath[i];
			}
		}
		for(var j = 0;j < dbFilePath.fluidity.length;j++){
			if(flyidity.classes.clas === clas){
				result.push(dbFilePath[i].classes.clas);
			}
		}
		console.log('hello' + result);
		return result;
		
	};
	//searchByConcreteClass();
	var getAllFluidities = function () {
		var result = [];
		for(var i = 0; i < data.length; i++){
			result.push(data[i].fluidity);
		}
		return result;
	};
	var getAllClasses = function () {
		var result = [];
		for(var i = 0; i < data[0].classes.length; i++){
			result.push(data[0].classes[i].clas);
		}
		return result;
	};
	var data = getDataFromFile(dbFilePath);
	console.log(getAllFluidities());
	return {
		searchByConcreteClass: searchByConcreteClass,
		getAllFluidities: getAllFluidities
	};
})();