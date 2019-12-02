import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import pick from 'lodash/pick';

export default async function validationTest(
  input,
  validate,
  ...expectedErrors
) {
  const errors = await validate(input);
  expect(
    map(orderBy(errors, ['reason', 'row']), error =>
      pick(error, ['reason', 'row', 'payload']),
    ),
  ).toEqual(orderBy(expectedErrors, ['reason', 'row']));
}
