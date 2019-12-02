import {createSelector} from 'reselect';
import includes from 'lodash/includes';
import map from 'lodash/map';
import partition from 'lodash/partition';

import {LANGUAGES} from '../util/editor';

import getHiddenUIComponents from './getHiddenUIComponents';

export default createSelector([getHiddenUIComponents], hiddenUIComponents => {
  const [hiddenLanguages, visibleLanguages] = partition(
    map(LANGUAGES, (language, index) => ({language, index})),
    ({language}) => includes(hiddenUIComponents, `editor.${language}`),
  );
  return {hiddenLanguages, visibleLanguages};
});
