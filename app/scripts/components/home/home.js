
'use strict';

angular.module('candescent.analyzer').controller('HomeController',
    function(HL7Parse) {
        var vm = this;
        vm.dir = 'app/hl7/orm';
        var fs = require('fs');
        var filesInDir = fs.readdirSync(vm.dir);

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