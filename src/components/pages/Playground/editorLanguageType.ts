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
export const checkFixedGrammarType = (
  data: unknown,
): data is fixedGrammarType => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  if (!('word' in data) || !('wordType' in data)) {
    return false;
  }
  return typeof data.word === 'string' && typeof data.wordType === 'string';
};

export const inputGrammarSchema = z.object({
  inputType: z.string(),
  var: z.string(),
});
export type inputGrammarType = z.infer<typeof inputGrammarSchema>;
export const checkInputGrammarType = (
  data: unknown,
): data is inputGrammarType => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  if (!('inputType' in data) || !('var' in data)) {
    return false;
  }
  return typeof data.inputType === 'string' && typeof data.var === 'string';
};

export const varAstGrammarSchema = z.object({
  var: z.string(),
  type: z.optional(z.string()),
});
export type varAstGrammarType = z.infer<typeof varAstGrammarSchema>;
export const checkVarAstGrammarType = (
  data: unknown,
): data is varAstGrammarType => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  if (!('var' in data)) {
    return false;
  }
  return typeof data.var === 'string';
};

export const varStringGrammarSchema = z.object({
  var: z.string(),
  wordType: z.string(),
});
export type varStringGrammarType = z.infer<typeof varStringGrammarSchema>;
export const checkVarStringGrammarType = (
  data: unknown,
): data is varStringGrammarType => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  if (!('var' in data) || !('wordType' in data)) {
    return false;
  }
  return typeof data.var === 'string' && typeof data.wordType === 'string';
};

export const grammarSchema = z.object({
  type: z.enum(['fixed', 'input', 'varAst', 'varString', 'newline']),
  data: z.optional(
    z.union([
      fixedGrammarSchema,
      inputGrammarSchema,
      varStringGrammarSchema,
      varAstGrammarSchema,
    ]),
  ),
});
export type grammar = z.infer<typeof grammarSchema>;

export const settingsSchema = z.object({
  separator: z.optional(z.array(grammarSchema)),
});

export const astToBlockSchema = z.object({
  grammar: z.array(grammarSchema),
  settings: z.optional(settingsSchema),
});
export type astToBlock = z.infer<typeof astToBlockSchema>;

export type ast =
  | {
      [key: string]: string | ast;
    }
  | ast[];
export const astSchema: z.ZodSchema<ast> = z.lazy(() =>
  z.union([z.record(z.union([z.string(), astSchema])), z.array(astSchema)]),
);

export const blockSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  ast: astSchema,
});
export type block = z.infer<typeof blockSchema>;

export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  descriptiveTitle: z.string(),
  icon: z.string(),
  blocks: z.array(z.string()),
});
export type category = z.infer<typeof categorySchema>;

export const editorLanguageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  editorRootAST: z.array(z.string()),
  astToBlock: z.record(astToBlockSchema),
  wordTypes: z.record(wordTypeSchema),
  categories: z.array(categorySchema),
  blocks: z.record(blockSchema),
});
export type editorLanguage = z.infer<typeof editorLanguageSchema>;
