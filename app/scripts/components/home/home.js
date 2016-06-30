
'use strict';

angular.module('candescent.analyzer').controller('HomeController',
    function(HL7Parse) {
        var vm = this;
        var fs = require('fs');
        var dir = 'app/hl7/orm';
        var filesInDir = fs.readdirSync(dir);

        vm.map = {};
        vm.results = [];

        for(var id in filesInDir){
            var filename = filesInDir[id];
            if(filename != '.DS_Store'){
                var data = fs.readFileSync('app/hl7/orm' + '/' + filename).toString();
                //console.log(data);
                vm.results.push(HL7Parse.parseMessage(data));

            }
        }
        console.log(vm.results);
});