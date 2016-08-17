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

	var getClassesStat = function () {
		var result = [];
		var M100 = 0;
		var M150 = 0;
		var M200 = 0;
		var M250 = 0;
		var M300 = 0;
		var M350 = 0;
		var M400 = 0;
		var M450 = 0;
		var M500 = 0;
		var M550 = 0;
		var M600 = 0;
		for(var i = 0; i < history.length; i++){
		  if(history[i]["Марка бетону "] === "M100"){
		  	M100++;
		  }
		 else if(history[i]["Марка бетону "] === "M150"){
		  	M150++;
		  }
		  else if(history[i]["Марка бетону "] === "M200"){
		  	M200++;
		  }
		  else if(history[i]["Марка бетону "] === "M250"){
		  	M250++;
		  }
		  else if(history[i]["Марка бетону "] === "M300"){
		  	M300++;
		  }
		  else if(history[i]["Марка бетону "] === "M350"){
		  	M350++;
		  }
		  else if(history[i]["Марка бетону "] === "M400"){
		  	M400++;
		  }
		  else if(history[i]["Марка бетону "] === "M450"){
		  	M450++;
		  }
		  else if(history[i]["Марка бетону "] === "M500"){
		  	M500++;
		  }
		  else if(history[i]["Марка бетону "] === "M550"){
		  	M550++;
		  }
		  else if(history[i]["Марка бетону "] === "M600"){
		  	M600++;
		  }
    	}

    	result.push(M100);
    	result.push(M150);
    	result.push(M200);
    	result.push(M250);
    	result.push(M300);
    	result.push(M350);
    	result.push(M400);
    	result.push(M450);
    	result.push(M500);
    	result.push(M550);
    	result.push(M600);
      
		return result;
	};
	var data = getDataFromFile(dbFilePath);
	var cost = getDataFromFile(costPath);
	var history = getDataFromFile(historyPath);
	
	return {
		searchCost: searchCost,
		searchByConcreteClass: searchByConcreteClass,
		getAllFluidities: getAllFluidities,
		getAllClasses: getAllClasses,
		getAll: getAll,
		getClassesStat: getClassesStat,
		getDate: getDate,
		addRecord: addRecord,
		validateParams: validateParams,
		paramsLength: paramsLength

	};
})();