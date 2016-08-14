var fs = require('fs');
module.exports = (function () {
    var path = './logs/app.log';
    
    var logError = function (message) {
        var date = new Date();
        var errorText = date + ' | ERROR | ' + message + "\r\n";        
        try {
         fs.writeFileSync(path, errorText, {
                flag: 'a+'
            });   
        } catch (e) {
            console.log('Cannot write to file');
            console.log(e);
        }        
    };
    
    return {
        logError: logError
    };
})();
