var _ = require('lodash');
var concreteTest = require('./concreteModule.js');

_.each(concreteTest, function (test) {
    test();    
});