import Validator from '../Validator';

const errorMap = {
};

class CssLintValidator extends Validator {
  constructor(source) {
    super(source, 'css', errorMap);
  }

  _getRawErrors() {
    return System.import('../linters').then(({CSSLint}) => {
      try {
        const errors = CSSLint.verify(this._source).messages;
        debugger;
        return errors;
      } catch (_e) {
        return [];
      }
    });
  }

  _keyForError(error) {
    return error.rule.id;
  }

  _locationForError(error) {
    return {row: error.line - 1, column: error.token.charNum - 1};
  }
}

export default (source) => new CssLintValidator(source).getAnnotations();

