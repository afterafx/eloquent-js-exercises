const { bigOak } = require('./crow-tech.js');

function anyStorage(nest, source, name) {
  if (source === nest.name) return storage(nest, name);
  return routeRequest(nest, source, 'storage', name);
}

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  }
  const via = findRoute(nest.name, target, nest.state.connections);
  if (!via) throw new Error(`No route to ${target}`);
  return request(nest, via, 'route', { target, type, content });
}

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        if (n < 3) attempt(n + 1);
        else reject(new Timeout('Timed out'));
      }, 250);
    }
    attempt(1);
  });
}

function findRoute(from, to, connections) {
  const work = [{ at: from, via: null }];
  for (let i = 0; i < work.length; i++) {
    const { at, via } = work[i];
    for (const next of connections.get(at) || []) {
      if (next === to) return via;
      if (!work.some(w => w.at === next)) {
        work.push({ at: next, via: via || next });
      }
    }
  }
  return null;
}

// Had to use solutions for this

async function locateScalpel(nest) {
  let current = nest.name;
  for (;;) {
    const next = await anyStorage(nest, current, 'scalpel');
    if (next === current) return current;
    current = next;
  }
}

// function locateScalpel2(nest) {
//   function loop(current) {
//     return anyStorage(nest, current, 'scalpel').then(next => {
//       if (next === current) return current;
//       return loop(next);
//     });
//   }
//   return loop(nest.name);
// }

locateScalpel(bigOak).then(console.log);
// → Butcher Shop

// locateScalpel2(bigOak).then(console.log);
// // → Butcher Shop
