/* eslint react/prop-types: "off" */
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import i18next from 'i18next';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faUnlink, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {UserAccount} from '../../records';

import createMenu, {MenuItem} from './createMenu';
import CurrentUserButton from './CurrentUserButton';

const CurrentUserMenu = createMenu({
  menuClass: 'top-bar__menu_right',
  name: 'currentUser',

  renderItems({onLinkGitHub, onLogOut, onUnlinkGitHub, user}) {
    const githubIdentityProvider = user.identityProviders.get('github.com');
    return (
      <Fragment>
        {isUndefined(githubIdentityProvider) ? (
          <MenuItem onClick={onLinkGitHub}>
            <div className="top-bar__menu-item_container">
              {i18next.t('top-bar.session.link-github')}
              <div className="top-bar__menu-item-icon">
                <FontAwesomeIcon icon={faGithub} />
              </div>
            </div>
          </MenuItem>
        ) : (
          <MenuItem onClick={onUnlinkGitHub}>
            <div className="top-bar__menu-item_container">
              <img
                className="top-bar__avatar top-bar__menu-item_avatar"
                src={githubIdentityProvider.avatarUrl}
              />
              {isNull(githubIdentityProvider.displayName)
                ? i18next.t('top-bar.session.unlink-github-default')
                : i18next.t('top-bar.session.unlink-github', {
                    displayName: githubIdentityProvider.displayName.split(
                      ' ',
                    )[0],
                  })}
              <div className="top-bar__menu-item-icon">
                <FontAwesomeIcon icon={faUnlink} />
              </div>
            </div>
          </MenuItem>
        )}
        <MenuItem onClick={onLogOut}>
          <div className="top-bar__menu-item_container">
            {i18next.t('top-bar.session.log-out-prompt')}
            <div className="top-bar__menu-item-icon">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          </div>
        </MenuItem>
      </Fragment>
    );
  },
})(CurrentUserButton);

CurrentUserMenu.propTypes = {
  user: PropTypes.instanceOf(UserAccount),
  onLinkGitHub: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onUnlinkGitHub: PropTypes.func.isRequired,
};

CurrentUserMenu.defaultProps = {
  user: null,
};

export default CurrentUserMenu;
