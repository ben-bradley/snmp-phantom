var snmp = require ("net-snmp"),
		fs = require('fs'),
		session = snmp.createSession (target, community, {version: version});

var target = process.argv[2],
		community = process.argv[3],
		version = (process.argv[4] == "2c") ? snmp.Version2c : snmp.Version1,
		oid = '1.3.6.1',
		maxRepetitions = 5,
		MIB = [];

function doneCb (error) {
	if (error) { console.error (error.toString()); }
	console.log('stringifying');
	fs.writeFileSync('MIBFROMBOX.json', JSON.stringify(MIB, null, 2));
	console.log('all done!');
}

function feedCb (varbinds) {
	for (var i = 0; i < varbinds.length; i++) {
		if (snmp.isVarbindError (varbinds[i])) {
			console.error (snmp.varbindError (varbinds[i]));
			process.exit(1);
		}
		else {
			var type = varbinds[i].type;
			if (type == 4 || type == 64) { varbinds[i].value = varbinds[i].value.toString(); }
			else { varbinds[i].value = Number(varbinds[i].value.toString()); }
			MIB.push(varbinds[i]);
		}
	}
}

session.walk (oid, maxRepetitions, feedCb, doneCb);