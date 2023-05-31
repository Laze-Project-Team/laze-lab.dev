import { z } from 'zod';

const baseHTMLElementSchema = z.object({
  $astId: z.string(),
  attr: z.record(z.string()),
  tagName: z.string(),
  text: z.string(),
});

export type htmlElementType = z.infer<typeof baseHTMLElementSchema> & {
  children: htmlElementType[];
};

export const htmlElementSchema: z.ZodType<htmlElementType> =
  baseHTMLElementSchema.extend({
    children: z.lazy(() => htmlElementSchema.array()),
  });
