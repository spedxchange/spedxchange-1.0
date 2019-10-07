const fsx = require('fs-extra');
const fs = require('fs');

(async () => {
  const src = './client/public/static/media';
  const dist = './client/build/static/media';
  await fsx.copy(src, dist);
})();
