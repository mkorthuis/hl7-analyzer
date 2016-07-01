'use strict';

angular.module('candescent.analyzer').controller('HomeController',
   function ($scope, HL7Parse) {
      var vm = this;
      var fs = require('fs');
      var dir = 'app/hl7/orm';
      var filesInDir;

      vm.dir = dir;
      vm.map = {};
      vm.results = [];
      vm.stats = [];

      $scope.$watch('vm.dir', load);

      function load() {
         filesInDir = fs.readdirSync(vm.dir);
         vm.results = [];
         for (var id in filesInDir) {
            var filename = filesInDir[id];
            if (filename != '.DS_Store') {
               var data = fs.readFileSync(vm.dir + '/' + filename).toString();
               //console.log(dir + '/' + filename);
               console.log(HL7Parse.parseMessage(data));
               vm.results.push(HL7Parse.parseMessage(data));
            }
         }

         for (var id in vm.results) {
            var hl7 = vm.results[id];
            for (var segmentId in hl7) {
               console.log(segmentId);
               var segment = hl7[segmentId];
               if (segmentId == 'MSH') {
                  for (var field in segment) {
                     //console.log(field + ':' + segment[field]);
                     var stats = {
                        'length': (segment[field]).length,
                        'description': field,
                        'value': segment[field]
                     }
                     vm.stats.push(stats);
                  }
               } else {
                  for (var index in segment) {
                     var data = segment[index];
                     for (var field in data) {
                        //console.log(field + ':' + data[field]);
                        var stats = {
                           'length': (data[field]).length,
                           'description': field,
                           'value': data[field]
                        }
                        vm.stats.push(stats);
                     }
                  }
               }
            }
         }
      }


      console.log(vm.stats);

   });