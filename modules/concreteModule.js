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
	var getAll = function(){
		return data;
	};
	var searchByConcreteClass = function (fluidity, clas){
		var result = [];
		for(var i = 0; i < data.length;i++){
			if(data[i].fluidity === fluidity){
				for(var j = 0; j < data[i].classes; j++){
					if(data[i].classes[j].clas === clas){
						result.push(data[i].classes[j]);
					}
				};
			}
			
		}
		console.log('hello ' + data[0].classes[1].clas);
		
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
	//console.log(data);
	return {
		searchByConcreteClass: searchByConcreteClass,
		getAllFluidities: getAllFluidities,
		getAllClasses: getAllClasses,
		getAll: getAll
	};
})();