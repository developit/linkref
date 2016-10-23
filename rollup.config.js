import babel from 'rollup-plugin-babel';
import es3 from 'rollup-plugin-es3';

export default {
	exports: 'default',
	entry: 'src/index',
	plugins: [
		babel({
			presets: [
				['es2015', { loose:true, modules:false }]
			]
		}),
		es3()
	]
};
