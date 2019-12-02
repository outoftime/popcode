import classnames from 'classnames';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import map from 'lodash/map';
import partial from 'lodash/partial';
import PropTypes from 'prop-types';
import React from 'react';

import libraries from '../../config/libraries';

import createMenu, {MenuItem} from './createMenu';
import LibraryPickerButton from './LibraryPickerButton';

const LibraryPicker = createMenu({
  menuClass: 'top-bar__menu_left',
  name: 'libraryPicker',

  renderItems({enabledLibraries, onToggleLibrary}) {
    return map(libraries, (library, key) => {
      const isActive = enabledLibraries.includes(key);

      return (
        <MenuItem
          isActive={isActive}
          key={key}
          onClick={partial(onToggleLibrary, key)}
        >
          <FontAwesomeIcon
            className={classnames({u__invisible: !isActive})}
            icon={faCheck}
          />
          {` ${library.name}`}
        </MenuItem>
      );
    });
  },
})(LibraryPickerButton);

LibraryPicker.propTypes = {
  enabledLibraries: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleLibrary: PropTypes.func.isRequired,
};

export default LibraryPicker;
