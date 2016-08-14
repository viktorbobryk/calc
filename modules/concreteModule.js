var fs = require('fs');
var logger = require('./../services/logger.js');
module.exports = (function () {
	var dbFilePath = './data/data.json';
	var costPath = './data/cost.json';
	var historyPath = './data/history.json';
	var getDataFromFile = function (path){
		try{
		var result = fs.readFileSync(path, 'utf8');
		return JSON.parse(result);
		} 
		catch(e) {
			logger.logError('Can not read from file "./data/data.json"');
			return [];
		}
	};
	var getAll = function(){
		return data;
	};


	var addRecord = function(record){
		history = getDataFromFile(historyPath);

		history.push(record);
		           
            try {
                fs.writeFileSync(
                    historyPath, 
                    JSON.stringify(history), 
                    { flag: 'w+' }
                );   
               
            } catch(e) {
                logger.logError('Failed saving data to file, data: ' + 
                        JSON.stringify(record));
                return false;
            }
            
            return true;
	}

	 var validateParams = function (params) {
            
            return (
                    (params.quantity && params.quantity.match(/[0-9]$/))
                    
                );
        };

    var paramsLength = function(params){
		var count = 0;
    	for(var i in params){
        if(params.hasOwnProperty(i))
            count++;
    	}
    	return count;
	}
	    
	var getDate = function (){
		var formattedDate = '';
		var date = new Date();
		 formattedDate += date.getFullYear() + "-";
            formattedDate += date.getMonth() + 1 + "-";
            formattedDate += date.getDate() + " ";
            formattedDate += date.getHours() + ":";
            formattedDate += date.getMinutes() + ":";
            formattedDate += date.getSeconds();
            return formattedDate;
        };
	
	var searchByConcreteClass = function (fluidity, clas){
		var result = [];
		for(var i = 0; i < data.length;i++){
			if(data[i].fluidity === fluidity){
				for(var j = 0; j < data[i].classes.length; j++){
					if(data[i].classes[j].clas === clas){
						result.push(data[i].classes[j]);
					}
				};
			}
			
		}
		return result;
		
	};
	
	var searchCost = function(){
		var result = [];
		for(key in cost){
			if(cost.hasOwnProperty(key)){
				 result.push(cost[key]);
			}
		}
		return result;
	};
	
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
	var cost = getDataFromFile(costPath);
	
	return {
		searchCost: searchCost,
		searchByConcreteClass: searchByConcreteClass,
		getAllFluidities: getAllFluidities,
		getAllClasses: getAllClasses,
		getAll: getAll,
		getDate: getDate,
		addRecord: addRecord,
		validateParams: validateParams,
		paramsLength: paramsLength

	};
})();