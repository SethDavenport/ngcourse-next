selenium-standalone start &
npm start &
sleep 5 # Wait for the webserver to start up.
wdio wdio.conf.js
