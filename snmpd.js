var snmp = require('snmpjs');
var logger = require('bunyan');
var fs = require('fs');

var log = new logger({ name: 'snmpd', level: 'info' }),
		agent = snmp.createAgent({ log: log }),
		MIB = JSON.parse(fs.readFileSync('MIBFROMBOX.json'));

for (var o in MIB) {
	(function(m) {
		if (!m.oid || !m.type || !m.value) { return false; }
		agent.request({ oid: m.oid, handler: function(prq) {
			var val = snmp.data.createData({ type: m.type, value: m.value });
			try { snmp.provider.readOnlyScalar(prq, val); }
			catch(err) {
				console.log(err);
				console.log(m);
			}
		} });
	})(MIB[o])
}

agent.bind({ family: 'udp4', port: 161 });