//-----------------------------------------------------------------------------
// PREREQUISITES:
//      Node and npm
//      npm install hl7-dictionary
//          https://www.npmjs.com/package/hl7-dictionary
//


//-----------------------------------------------------------------------------
// load up the hl7 dictionary; use the latest definition and assume backward
// compatability
//var hl7Dict = require('hl7-dictionary').definitions['2.7.1'];
// if needed, this dictionary could be cloned and modified for specific
// customer variations from the standard...


//-----------------------------------------------------------------------------
// Function to parse a multi-segment HL7 message. Returns an object with
// properties for the MSH segment, the overall message type (from the MSH
// segment) and an ordered list of objects, each of which represents one
// segment, with field-name keys.
function parseHL7(message, hl7Dict) {

    var segmentsOut = [];
    var segments    = message.split('\r');
    var msh         = null;

    for (var s = 0; s < segments.length; s++) {
        if (segments[s] == '') {
            continue;
        }

        var fields  = segments[s].split('|');
        var segment = fields[0];

        if (! hl7Dict.segments.hasOwnProperty(segment)) {
            throw 'Unknown segment: ' + segment;
        }

        var segDefn         = hl7Dict.segments[segment];
        var seg             = {};
        seg['_SegmentType'] = segment;

        for (var f = 1; f < fields.length; f++) {
            if (fields[f] != '') {
                if (f >= segDefn.fields.length) {
                    throw 'Segment ' + segment + 'has too many fields';
                }
                seg[segDefn.fields[f].desc] = fields[f].trim();
            }
        }
        if (segment == 'MSH') {
            if (msh != null) {
                throw 'Multiple MSH in message';
            }
            msh = seg;
        }
        segmentsOut.push(seg);
    }

    if (msh == null) {
        throw 'No MSH in message';
    }

    result                = {};
    result['segments']    = segmentsOut;
    result['MSH']         = msh;
    result['messageType'] = msh['Message Type'];
    return result;
};


//-----------------------------------------------------------------------------
// brain-dead test data
/*
var hl7_1 = 'MSH|^~\&|CERNER||PriorityHealth||||ORU^R01|Q479004375T431430612|P|2.3|\r' +
    'PID|||001677980||SMITH^CURTIS||19680219|M||||||||||929645156318|123456789|\r' +
    'PD1||||1234567890^LAST^FIRST^M^^^^^NPI|\r' +
    'OBR|1|341856649^HNAM_ORDERID|000002006326002362|648088^Basic Metabolic Panel|||20061122151600|||||||||1620^Hooker^Robert^L||||||20061122154733|||F|||||||||||20061122140000|\r' +
    'OBX|1|NM|GLU^Glucose Lvl||59|mg/dL|65-99^65^99|L|||F|||20061122154733|';

var hl7_2 = 'MSH|^~\&|SOURCE|383018129|PRIORITY HEALTH|382715520|2007100914484648||ORU^R01|0129938170710091448|P|2.3|\r' +
    'PID|1|1034157|012993817||LASTNAME^FIRSTNAME||19520101|M|||1234 MAIN^^DEARBORN HEIGHT^MI^48127||||||||\r' +
    'PID|1||94000000000^^^Priority Health||LASTNAME^FIRSTNAME||19400101|F|\r' +
    'PD1|1|||1234567890^DOCLAST^DOCFIRST^M^^^^^NPI|\r' +
    'OBR|1|||80061^LIPID PROFILE^CPT-4||20070911||||||||||\r' +
    'OBX|1|NM|13457-7^LDL (CALCULATED)^LOINC|49.000|MG/DL| 0.000 - 100.000|N|||F|\r' +
    'OBX|2|NM|2093-3^CHOLESTEROL^LOINC|138.000|MG/DL|100.000 - 200.000|N|||F|\r' +
    'OBX|3|NM|2086-7^HDL^LOINC|24.000|MG/DL|45.000 - 150.000|L|||F|\r' +
    'OBX|4|NM|2571-8^TRIGLYCERIDES^LOINC|324.000|MG/DL| 0.000 - 150.000|H|||F|';

var r = parseHL7(hl7_2, hl7Dict);
console.log(r);
*/





