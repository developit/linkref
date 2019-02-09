# `linkref` [![NPM](https://img.shields.io/npm/v/linkref.svg?style=flat)](https://www.npmjs.org/package/linkref) [![travis-ci](https://travis-ci.org/developit/linkref.svg?branch=master)](https://travis-ci.org/developit/linkref)

[![Greenkeeper badge](https://badges.greenkeeper.io/developit/linkref.svg)](https://greenkeeper.io/)

> Like [Preact]'s [Linked State], but for [refs].

<img src="http://i.imgur.com/V4kTgbn.png" width="447">

This gives you **the ease of String Refs** _(unavailable in Preact core, deprecated in React)_, **using Function Refs**.

Calling `linkRef('name')` creates an optimized ref handler function that populates `this.refs.name` on your component for you. The trick is that `linkRef()` is **memoized** - this means you can call it as many times as you want (inline, in render!) and it won't create any new closures. 🌈

> **Note:** You can accomplish this with function refs just fine! It's important to understand how function refs work, since `linkRef()` is just generating a function ref on your behalf. Here is an unoptimized implementation of `linkRef()` - be sure to understand how it works:
>
> ```js
> function linkRef(component, name) {
>   if (!component.refs) component.refs = {};
>   return (ref) => component.refs[name] = ref;
> }
> ```


---


### Installation

Available as [linkref on npm](https://npm.im/linkref):

```sh
npm install --save linkref
```


### Simple Example

```js
import linkRef from 'linkref';

class Foo extends Component {
    componentDidMount() {
        // log the <div /> to the console:
        console.log(this.refs.foo);
    }
    render() {
        return (
            <div ref={linkRef(this, 'foo')}>
                some text
            </div>
        );
    }
}
```


### Preact Polyfill

[Preact]'s `Component` class is extensible, so `linkref` provides a polyfill to integrate more tightly:

```js
import 'linkref/polyfill';

class Foo extends Component {
    componentDidMount() {
        // log the <div /> to the console:
        console.log(this.refs.foo);
    }
    render() {
        return (
            <div ref={this.linkRef('foo')}>
                some text
            </div>
        );
    }
}
```


### Babel Plugin

There's also a Babel plugin available as `linkref/babel`:

```js
// .babelrc
{
  "plugins": [
    "linkref/babel",

    // all options are optional - here are the defaults:
    ["linkref/babel", {
      "module": "linkref",
      "importName": "_createStringRef"
    }]
  ]
}
```

It's also useful as a one-off codemod for upgrading from string refs to linkref:

```sh
npm i --save linkref

# run babel on all files in ./src, changing them in-place:
npx babel --no-babelrc --plugins=linkref/babel src -d src
```

<details>
<summary>Don't have <code>npx</code>?</summary>

Update to the latest `npm` version to get it, or do this instead:

```sh
# get babel cli:
npm i @babel/core @babel/cli
# you'll be using linkref as a library now:
npm i --save linkref
# run babel on all files in ./src, changing them in-place:
./node_modules/.bin/babel --no-babelrc --plugins=linkref/babel src -d src
```
</details>

---


### License

MIT


[Preact]: https://github.com/developit/preact
[Linked State]: https://preactjs.com/guide/linked-state
[refs]: https://facebook.github.io/react/docs/refs-and-the-dom.html
