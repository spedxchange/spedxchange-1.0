const createSlug = title => {
  var slug = title.replace(/[^A-Za-z0-9-]+/g, '-').toLowerCase();
  var len = slug.length;
  if (slug.substring(len - 1) === '-') {
    slug = slug.substring(0, len - 1);
    len--;
  }
  if (len > 80) {
    slug = slug.substring(0, 79);
  }
  return slug;
};

const createUid = () => {
  const d = new Date();
  const s = '' + d.getTime();
  return s.substring(s.length - 5);
};

module.exports = RouteUtil = {
  createSlug: createSlug,
  createUid: createUid
};