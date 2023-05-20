import { z } from 'zod';

export const wordTypeSchema = z.object({
  id: z.string(),
  color: z.string(),
});
export type wordType = z.infer<typeof wordTypeSchema>;

export const fixedGrammarSchema = z.object({
  word: z.string(),
  wordType: z.string(),
});
export type fixedGrammarType = z.infer<typeof fixedGrammarSchema>;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const checkFixedGrammarType = (data: any): data is fixedGrammarType => {
  return typeof data.word === 'string' && typeof data.wordType === 'string';
};

export const inputGrammarSchema = z.object({ inputType: z.string() });
export type inputGrammarType = z.infer<typeof inputGrammarSchema>;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const checkInputGrammarType = (data: any): data is inputGrammarType => {
  return typeof data.inputType === 'string';
};

export const grammarSchema = z.object({
  type: z.enum(['fixed', 'input']),
  data: z.union([fixedGrammarSchema, inputGrammarSchema]),
});
export type grammar = z.infer<typeof grammarSchema>;

export const blockSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  grammar: z.array(grammarSchema),
});
export type block = z.infer<typeof blockSchema>;

export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  descriptiveTitle: z.string(),
  icon: z.string(),
  blocks: z.array(blockSchema),
});
export type category = z.infer<typeof categorySchema>;

export const editorLanguageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  wordTypes: z.record(wordTypeSchema),
  categories: z.array(categorySchema),
});
export type editorLanguage = z.infer<typeof editorLanguageSchema>;
