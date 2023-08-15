const req = require.context('./', true, /\.png$/);
const pngHashMap = [];

req.keys().forEach((eachPng) => {
  const imgConfig = req(eachPng);
  const name = eachPng.replace(/^\.\/(.*)\.\w+$/, '$1');
  pngHashMap.push({ name, url: req(eachPng).default || imgConfig });
});

export default pngHashMap;