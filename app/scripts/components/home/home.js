
'use strict';

angular.module('candescent.analyzer').controller('HomeController',
    function(HL7Parse) {


var hl7_1 = 'MSH|^~\&|CERNER||PriorityHealth||||ORU^R01|Q479004375T431430612|P|2.3|\r' +
    'PID|||001677980||SMITH^CURTIS||19680219|M||||||||||929645156318|123456789|\r' +
    'PD1||||1234567890^LAST^FIRST^M^^^^^NPI|\r' +
    'OBR|1|341856649^HNAM_ORDERID|000002006326002362|648088^Basic Metabolic Panel|||20061122151600|||||||||1620^Hooker^Robert^L||||||20061122154733|||F|||||||||||20061122140000|\r' +
    'OBX|1|NM|GLU^Glucose Lvl||59|mg/dL|65-99^65^99|L|||F|||20061122154733|';

var result = HL7Parse.parseMessage(hl7_1);
console.log(result);

});