# CheaprEats TypeScript SDK

[![npm version](https://badge.fury.io/js/%40cheapreats%2Fts-sdk.svg)](https://badge.fury.io/js/%40cheapreats%2Fts-sdk) [![Documentation](https://img.shields.io/badge/docs-js--sdk.cheapreats.com-blue.svg)](https://js-sdk.cheapreats.com/)

CheaprEats TypeScript SDK

```
$ npm install @cheapreats/ts-sdk
```

## Using the Published SDK Version

```
import CE, { Enums } from '@cheapreats/ts-sdk';
```

## Using the SDK Locally

Locally importing is used typically while testing new SDK method implementations.

First build the package `npm run build`

Make sure `src/enums.ts` exists. If it does not, run `npm run transpile` **(must be logged in to Github package registry)**
```
import CE, { Enums } from 'path/to/ts-sdk/root';
```
Root folder is fine, it is not necessary to add `/dist`

**When updating type definitions, please use src/enums rather than handcrafting  your own enums when possible**

**If enum is not in src/enums, consider adding it to graphql-api if it would benefit backend**

## Example Usage

```
import CE, { Enums } from '@cheapreats/ts-sdk';

CE.setAuthenticationToken('YOUR_TOKEN');

CE.Verification.sendSms(12508574718)
.then(verification_request_id => console.log("SMS Sent", verification_request_id))
.catch(e => console.log(e));

console.log(Enums.ResetCodeSendMethod.SMS);
```

## Auto-generating code for New Mutation 

The `npm run add:mutation <Object>.<methodName>` command auto-generates code for the *Object* and *methodName* passed.

For example - `npm run add:mutation Category.batchArchive`

## Publishing to NPM

*Ensure that package version in feature branch is ahead of master branch, otherwise publish will fail*

### Automatic:

By default package is automatically published anytime a change is made on master

### Manual:

If package is to be published manually, execute following commands:

* `npm install`
* `npm run build`
* `npm publish`
