# RxJS oparator `paginated`

Concatenates paginated array

Requires RxJS 6

## Installation and usage

`npm install rx-paginated`

Usage example with GitHub API

```js
const paginated = require('rx-paginated');
const octokit = require('@octokit/rest')();
const { from } = require('rxjs');

from(
  octokit.repos.getBranches({
    owner: 'vorobievalex',
    repo: 'rx-paginated',
    per_page: 10
  })
)
  .pipe(paginated(octokit.hasNextPage, from(octokit.getNextPage)))
  .subscribe(branches => console.log('Branches:', branches));
```
