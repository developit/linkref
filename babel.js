module.exports = function linkRefBabelPlugin(babel, options) {
	const t = babel.types;
	options = options || {};

	const refFnIdent = t.identifier(options.importName || '_createStringRef');

	function getImport() {
		return t.importDeclaration(
			[t.importDefaultSpecifier(refFnIdent)],
			t.stringLiteral(options.module || 'linkref')
		);
	}

	return {
		name: "string-refs-to-linkref",
		visitor: {
			Program: {
				exit(path, state) {
					if (state.get('stringrefs')) {
						path.unshiftContainer('body', getImport());
					}
				}
			},
			JSXAttribute(path, state) {
				const node = path.node;
				if (node.name && t.isJSXIdentifier(node.name) && node.name.name === 'ref' && t.isStringLiteral(node.value)) {
					// this module should import "linkref"
					state.set('stringrefs', true);
					// name={_createStringRef(this, "refname")}
					path.replaceWith(t.jSXAttribute(node.name, t.jSXExpressionContainer(
						t.callExpression(refFnIdent, [t.thisExpression(), node.value])
					)));
				}
			}
		}
	};
};
