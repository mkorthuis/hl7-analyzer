'use strict';

require('angular').module(global.appName).factory('HL7Parse',
function() {
    var service = {};

    //-----------------------------------------------------------------------------
    // Parse an HL7 message. Returns an object with the following fields:
    //  MSH:         T  he message header segment
    //  messageType: The message-type identifier string from the MSH segment.
    //  segments:    An ordered list of objects, one per segment. Each object has
    //               a field _SegmentType identify the type, and then an additional
    //               property for each field, the key being the field's description.
    service.parseMessage = function(message) {
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

    return service;
});