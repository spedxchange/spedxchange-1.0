const fsx = require('fs-extra');
const fs = require('fs');

(async () => {
  const src = './client/public/static/media';
  const dist = './client/build/static/media';
  const dirName = './client/build/static/css/';
  const cssFile = './client/src/theme.css';
  await fsx.copy(src, dist);
  // console.log('media copied');

  fs.readdir(dirName, (err, files) => {
    if (err) console.log(err);
    let fileName;
    files.forEach(file => {
      // console.log(file);
      if (file.indexOf('main.') > -1 && file.indexOf('.map') < 0) {
        fileName = dirName + file;
        // console.log('fileName: ', fileName);
        fsx.copy(cssFile, fileName);
      }
    });
  });
})();
