import { describe, expect, it } from 'vitest';
import { generateExtraFiles } from './../src/index';
import { verbOptions, output, context } from './1575.json';
describe('query params coerce', () => {
  it("it shouldn't add coerce for string params", async () => {
    // cf https://github.com/orval-labs/orval/issues/1575
    const res = await generateExtraFiles(
      verbOptions as any,
      output as any,
      context as any,
    );
    expect(res).toBeDefined();
    const validator = res.find((r) => r.path.endsWith('zod.ts'));
    expect(validator).toBeDefined();

    const numbervalidation = validator?.content
      .split('\n')
      .find((l) => l.includes('numbervalue'));
    expect(numbervalidation).toBeDefined();

    // Previously was generating :
    //  "numbervalue": zod.number().optional()
    // but for query params, non string attribute have to be coerced
    expect(numbervalidation?.trim()).toBe(
      '"numbervalue": zod.number({coerce:true}).optional()',
    );
  });
});
