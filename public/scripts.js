$(function () {
    window.concrete = (function () {
        var initialize = function () {
           $.ajax('/chart').done(addChart);
        };
        
       var addChart = function (data) {
            var ctx = document.getElementById("chart");
            var myChart = new Chart(ctx, data);
        };     
       
        
        initialize();
        
    })();
});
