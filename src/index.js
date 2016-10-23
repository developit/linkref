export default function linkRef(component, name) {
	let cache = component._linkedRefs || (component._linkedRefs = {});
	if (!component.refs) component.refs = {};
	return cache[name] || (cache[name] = c => {
		component.refs[name] = c;
	});
}
