import once from 'lodash/once';

export default once(
  () => 'flex-grow' in getComputedStyle(document.documentElement),
);
