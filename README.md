# `linkref` [![NPM](https://img.shields.io/npm/v/linkref.svg?style=flat)](https://www.npmjs.org/package/linkref) [![travis-ci](https://travis-ci.org/developit/linkref.svg?branch=master)](https://travis-ci.org/developit/linkref)

> Like [Preact]'s [Linked State], but for [refs].

This gives you **the ease of String Refs** _(unavailable in Preact core, deprecated in React)_, **using Function Refs**.

Calling `linkRef('name')` creates an optimized ref handler function that populates `this.refs.name` on your component for you.

The trick is that `linkRef()` is **memoized** - this means you can call it as many times as you want (inline, in render!) and it won't create any new closures. 🌈


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


---


### License

MIT


[Preact]: https://github.com/developit/preact
[Linked State]: https://preactjs.com/guide/linked-state
[refs]: https://facebook.github.io/react/docs/refs-and-the-dom.html
