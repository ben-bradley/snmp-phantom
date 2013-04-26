SNMP Phantom
============
SNMP Phantom is a simple web app that clones the SNMP responses into a profile that can then be served to respond to SNMP requests.


Clone
-----
To create a clone profile, select 'Clone' from the nav bar and provide the necessary data to conduct an SNMP walk of the device you wish to clone.
The responses from this device are stored in a Mongo database.


Simulate
--------
To simulate a device profile, select 'Simulate' from the nav bar, select the cloned profile in the 'Available Profiles' list that you want to simulate, select a port number to attach the simulated device to and click 'Simulate!'.
Once activated, the device profile will appear in the 'Active Profiles' list.  It is possible to simulate as many profiles as your host machine can support.


Remote Operations
-----------------
In some cases, you might want to be able to store device profiles remotely or you may wish to simulate a remote device profile.  In this case, simply specify the location of the Mongo server that you want to use instead of the local server.


Device Profiles
---------------
Device profiles contain recorded SNMP responses.  These profiles can be stored on a local or remote Mongo database.