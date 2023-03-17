import { z } from 'zod';

export const contentBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const learningPathSchema = contentBaseSchema.extend({
  courses: z.array(z.string()),
});
export type learningPath = z.infer<typeof learningPathSchema>;
export const learningCourseSchema = contentBaseSchema.extend({
  steps: z.array(z.string()),
});
export type learningCourse = z.infer<typeof learningCourseSchema>;
export const learningStepSchema = contentBaseSchema;
export type learningStep = z.infer<typeof learningStepSchema>;

export const learningContentsSchema = z.object({
  paths: z.record(learningPathSchema),
  courses: z.record(learningCourseSchema),
  steps: z.record(learningStepSchema),
});

export type learningContents = z.infer<typeof learningContentsSchema>;
