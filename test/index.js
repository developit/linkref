import test from 'ava';
import linkRef from '..';

test('linkRef', t => {
	let component = { is:'COMPONENT' };
	let ref = linkRef(component, 'foo');
	let element = { is:'ELEMENT' };
	ref(element);
	t.deepEqual(component.refs, { 'foo': element });
});
