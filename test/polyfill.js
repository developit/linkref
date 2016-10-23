import test from 'ava';
import { Component } from 'preact';
import '../polyfill';

test('polyfill', t => {
	t.is(typeof Component.prototype.linkRef, 'function');

	class Foo extends Component {}
	let component = new Foo();
	let ref = component.linkRef('foo');
	let element = { is:'ELEMENT' };
	ref(element);
	t.deepEqual(component.refs, { 'foo': element });
});
