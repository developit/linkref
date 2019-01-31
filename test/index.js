import test from 'ava';
import React, { Component } from 'react';
import ReactTestUtils from 'react-addons-test-utils'
import linkRef from '..';

test('linkRef', t => {
	let component = { is:'COMPONENT' };
	let ref = linkRef(component, 'foo');
	let element = { is:'ELEMENT' };
	ref(element);
	t.deepEqual(component.refs, { 'foo': element });
});


test('in React', t => {
	class Foo extends Component {
		render() {
			return React.createElement('input', {
				ref: linkRef(this, 'input')
			});
		}
	}
	ReactTestUtils.renderIntoDocument(React.createElement(Foo));
});
