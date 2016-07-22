var concreteModule = require('./../modules/concreteModule.js');
module.exports = (function () {
	var getChartData = function (params) {
		var data = getViewData(params);
		//console.log("data - " + data);
		var counter = 0;
		var labels = [];
		var dataStat = [];
		var backGroundColor = [];
		if(!data.length){
			return [];
		}
		for(var i in data){
			//console.log("key - " + name + " value - " + data[i]);
			var value = data[i];
			for(var j in value){
				counter ++;
				//console.log("key - " + j + " value - " + value[j]);
				if(counter > 1){
					labels.push(j);
					dataStat.push(value[j]) ;
					backGroundColor.push('rgba(255, 255, 0, 0.8)');
					console.log(counter);
				}
			}
		}
		console.log("labels - " + labels);
		console.log("dataStat - " + dataStat);

		return {
			type: "bar",
			data: {
				labels: labels,
				datasets: [
					{

						label: "Datasheet 1",
						data: dataStat,
						backGroundColor: backGroundColor
					}
				]
			},
			options: {
				resposive: false
			}
		};
	};
})();