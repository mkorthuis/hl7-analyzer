'use strict';

angular.module('candescent.analyzer').controller('HomeController',
   function (HL7Parse) {
      var vm = this;
      var fs = require('fs');
      var dir = 'app/hl7/orm';
      var filesInDir = fs.readdirSync(dir);

      vm.map = {};
      vm.results = [];
      vm.stats = [];

      for (var id in filesInDir) {
         var filename = filesInDir[id];
         if (filename != '.DS_Store') {
            var data = fs.readFileSync(dir + '/' + filename).toString();
            //console.log(HL7Parse.parseMessage(data));
            vm.results.push(HL7Parse.parseMessage(data));
         }
      }

      //console.log(vm.results);
      //debugger;
      for (var id in vm.results) {
         var hl7 = vm.results[id];
         for (var segmentId in hl7) {
            //console.log(segmentId);
            var segment = hl7[segmentId];
            if(segmentId == 'segments'){
               for (var index in segment) {
                  var data = segment[index];
                  var segmentName = data['_SegmentType'];
                  for (var field in data) {
                    if (field == '_SegmentType') {
                        continue;
                    }
                     //console.log(field + ':' + data[field]);
                     var p = segmentName + '-' + HL7Parse.findFieldIndex(segmentName, field);
                     var stats = {
                        'length': (data[field]).length,
                        'description': field,
                        'path': p,
                        'value': data[field]
                     }
                     console.log(segmentName);
                     vm.stats.push(stats);
                  }
               }
            }
         }
      }

      console.log(vm.stats);


      //console.log(vm.results);

   });