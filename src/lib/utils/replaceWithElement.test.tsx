import { expect, it } from 'vitest';

import { replaceWithElement } from './replaceWithElement';

it('should work correctly', () => {
  expect(
    replaceWithElement(
      'replace {{hello}} with Hello',
      '{{hello}}',
      <span key="hello">Hello</span>,
    ),
  ).toEqual(['replace ', <span key="hello">Hello</span>, ' with Hello']);

  expect(
    replaceWithElement(
      'replace {{hello}} with Hello',
      'no match',
      <span key="hello">Hello</span>,
    ),
  ).toEqual(['replace {{hello}} with Hello']);
});
