const { empty, pipe } = require('rxjs');
const { expand, reduce } = require('rxjs/operators');

const nextPageStream = (hasNext, nextStream) => response =>
  hasNext(response) ? nextStream(response) : empty();

const concatArrays = (acc, curr) => acc.concat(curr.data);

exports.paginated = (hasNext, nextStream) =>
  pipe(expand(nextPageStream(hasNext, nextStream))); //, reduce(concatArrays, []));

exports.concat = pipe(reduce(concatArrays, []));
