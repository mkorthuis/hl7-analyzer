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
      vm.totalMsg = 0;
      vm.analyzed = {}

      for (var id in filesInDir) {
         var filename = filesInDir[id];
         if (filename != '.DS_Store') {
            var data = fs.readFileSync(dir + '/' + filename).toString();
            //console.log(HL7Parse.parseMessage(data));
            vm.results.push(HL7Parse.parseMessage(data));
            vm.totalMsg++;
         }
      }

      //console.log(vm.results);
      //debugger;
      for (var id in vm.results) {
         var hl7 = vm.results[id];
         for (var index in hl7) {
            //console.log(segmentId);
            var segments = hl7[index];
            if(index == 'segments'){
               for (var index in segments) {
                  var segment = segments[index];
                  var segmentName = segment['_SegmentType'];
                  for (var field in segment) {
                    if (field == '_SegmentType') {
                        continue;
                    }
                     //console.log(field + ':' + data[field]);
                     var p = segmentName + '-' + HL7Parse.findFieldIndex(segmentName, field);
                     var stats = {
                        'length': (segment[field]).length,
                        'description': field,
                        'path': p,
                        'value': segment[field],
                     }
                     console.log(segmentName);
                     vm.stats.push(stats);
                  }
               }
            }
         }
      }

      console.log(vm.stats);
      for (var id in vm.stats){
         var newStat = vm.stats[id];
         if(typeof(vm.analyzed[newStat.path]) == 'object'){
            var prevSummary = vm.analyzed[newStat.path];
            console.log
            if(newStat['length'] < prevSummary['length']){
               vm.analyzed[newStat.path]['min_length'] = newStat['length'];
            }
            if(newStat['length'] > prevSummary['length']){
               vm.analyzed[newStat.path]['max_length'] = newStat['length'];
            }

            if(newStat['length'] > 0){
               vm.analyzed[newStat.path]['count']++;
            }
            vm.analyzed[newStat.path]['value']  = vm.analyzed[newStat.path]['value'] +', '+ newStat.value;
         }else{
            vm.analyzed[newStat.path] = {
               'max_length' : newStat.length,
               'min_length' : newStat.length,
               'value' : newStat.value,
               'description' : newStat.description,
               'path' : newStat.path,
               'count': 1
            };
         }
      }

      console.log(vm.analyzed);

   });