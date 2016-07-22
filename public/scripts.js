$(function (){
	window.concreteApp = (function () {

		var initialize = function () {
			$.ajax('/chart').done(myChart);
		}
		var addChart = function(params){
		var ctx = document.getElementById("c-chart");
            var myChart = new Chart(ctx, params);
	};

	})
});