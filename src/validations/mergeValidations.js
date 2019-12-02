import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import flatMap from 'lodash/flatMap';
import sortBy from 'lodash/sortBy';
import omit from 'lodash/omit';
import uniqWith from 'lodash/uniqWith';

function filterErrors(errors) {
  function dedupeErrors(errs) {
    return uniqWith(errs, (e, i) => e.reason === i.reason && i.row === e.row);
  }
  const dedupedErrors = dedupeErrors(errors);
  const groupedErrors = groupBy(dedupedErrors, 'reason');

  const suppressedTypes = flatMap(flatten(values(groupedErrors)), 'suppresses');

  return flatten(values(omit(groupedErrors, suppressedTypes)));
}

async function mergeValidations(errors) {
  const results = await Promise.all(errors);
  const filteredErrors = filterErrors(flatten(results));
  return sortBy(filteredErrors, 'row');
}

export default mergeValidations;
