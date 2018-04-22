var fs = require('fs-extra');

fs.copy('src/offline.html', 'www/offline.html');
fs.copy('src/init.js', 'www/init.js');
fs.copy('src/appSettings.json', 'www/appSettings.json');
