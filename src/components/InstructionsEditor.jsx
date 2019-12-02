import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import bindAll from 'lodash/bindAll';

export default class InstructionsEditor extends React.Component {
  constructor() {
    super();
    bindAll(this, '_handleCancelEditing', '_handleSaveChanges', '_ref');
  }

  componentDidMount() {
    if (!this.props.instructions) {
      this._editor.focus();
    }
  }

  _handleCancelEditing() {
    this.props.onCancelEditing();
  }

  _handleSaveChanges() {
    const newValue = this._editor.value.trim();
    this.props.onSaveChanges(this.props.projectKey, newValue);
  }

  _ref(editorElement) {
    this._editor = editorElement;
  }

  render() {
    return (
      <div className="instructions-editor">
        <div className="instructions-editor__menu">
          <button
            className={classnames(
              'instructions-editor__menu-button',
              'instructions-editor__menu-button_secondary',
            )}
            onClick={this._handleCancelEditing}
          >
            {i18next.t('workspace.components.instructions.cancel')}
          </button>
          <button
            className="instructions-editor__menu-button"
            onClick={this._handleSaveChanges}
          >
            {i18next.t('workspace.components.instructions.save')}
          </button>
        </div>
        <div className="instructions-editor__input-container">
          <textarea
            className="instructions-editor__input"
            defaultValue={this.props.instructions}
            placeholder="Type here..."
            ref={this._ref}
          />
        </div>
        <div className="instructions-editor__footer">
          <a
            className="instructions-editor__footer-link"
            href="https://guides.github.com/features/mastering-markdown/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Styling with Markdown is supported
          </a>
        </div>
      </div>
    );
  }
}

InstructionsEditor.propTypes = {
  instructions: PropTypes.string.isRequired,
  projectKey: PropTypes.string.isRequired,
  onCancelEditing: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
};
