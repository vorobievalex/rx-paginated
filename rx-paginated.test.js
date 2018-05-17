const { paginated, concat } = require('./rx-paginated');
const { of } = require('rxjs');
const { marbles } = require('rxjs-marbles/jest');

const testPaginate = (input, next, output) =>
  marbles(m =>
    m
      .expect(
        m
          .hot('-^-a-|', { a: input })
          .pipe(paginated(response => response.hasNext, next), concat)
      )
      .toBeObservable(m.cold('----(b|)', { b: output }))
  );

test(
  'Returns no branches',
  testPaginate({ hasNext: false, data: [] }, null, [])
);

test(
  'Returns 1 branch',
  testPaginate({ hasNext: false, data: ['release/2.40'] }, null, [
    'release/2.40'
  ])
);

test(
  'Returns many branches from 2 pages',
  testPaginate(
    { hasNext: true, data: ['release/2.40', 'release/2.41', 'release/2.42'] },
    () => of({ hasNext: false, data: ['release/2.43', 'release/2.44'] }),
    [
      'release/2.40',
      'release/2.41',
      'release/2.42',
      'release/2.43',
      'release/2.44'
    ]
  )
);
