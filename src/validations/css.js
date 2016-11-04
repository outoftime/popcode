import mergeValidations from './mergeValidations';
import validateWithCss from './css/css';
import validateWithPrettyCSS from './css/prettycss';
import validateWithCssLint from './css/csslint';

export default (source) => mergeValidations([
  validateWithCss(source),
  validateWithPrettyCSS(source),
  validateWithCssLint(source),
]);
