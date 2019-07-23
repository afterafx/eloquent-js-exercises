// Node exercises can not be ran in the browser,
// but you can look at their solution here.

const { methods, urlPath, stat } = require('./file-server');

methods.MKCOL = async function(request) {
  const path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    else return { status: 204 };
  }
  if (stats.isDirectory()) return { status: 204 };
  return { status: 400, body: 'Directory does not exist' };
};
