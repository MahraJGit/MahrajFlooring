import { z } from "zod";

import { isLexicalDoc, lexicalHasVisibleText } from "@/lib/cms/lexical";
import { slugify } from "@/lib/cms/slug";

const optionalObjectId = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || /^[a-f0-9]{24}$/i.test(value), {
    message: "Please choose a valid image.",
  });

const publishedAtSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Use a valid publication date.",
  });

const faqSchema = z.object({
  question: z.string().trim().max(300, "Keep the question shorter."),
  answer: z.string().trim().max(2000, "Keep the answer shorter."),
});

const lexicalContent = z.unknown().superRefine((value, ctx) => {
  if (value == null) return;
  if (!isLexicalDoc(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Article content is not in a readable format.",
    });
  }
});

export const postInputSchema = z.object({
  title: z.string().trim().min(1, "Please enter a title."),
  slug: z
    .string()
    .trim()
    .transform((value, ctx) => {
      const next = slugify(value);
      if (!next) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a URL slug.",
        });
        return z.NEVER;
      }
      return next;
    }),
  excerpt: z
    .string()
    .trim()
    .max(300, "Keep the summary to 300 characters or fewer.")
    .optional()
    .or(z.literal("")),
  content: lexicalContent,
  coverImage: optionalObjectId,
  seoTitle: z.string().trim().max(120).optional().or(z.literal("")),
  seoDescription: z
    .string()
    .trim()
    .max(200, "Keep the meta description to 200 characters or fewer.")
    .optional()
    .or(z.literal("")),
  focusKeyword: z.string().trim().max(80).optional().or(z.literal("")),
  imageAlt: z.string().trim().max(180).optional().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  faqs: z.array(faqSchema).max(20).default([]),
  category: z.string().trim().optional().or(z.literal("")),
  author: z.string().trim().optional().or(z.literal("")),
  authorRole: z.string().trim().max(120).optional().or(z.literal("")),
  authorImage: optionalObjectId,
  readTime: z.string().trim().max(40).optional().or(z.literal("")),
  publishedAt: publishedAtSchema,
  featured: z.boolean().default(false),
  _status: z.enum(["draft", "published"]),
});

export const postDraftSchema = postInputSchema.superRefine((value, ctx) => {
  if (value.category && !/^[a-f0-9]{24}$/i.test(value.category)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["category"],
      message: "Please choose a valid category.",
    });
  }

  const incompleteFaq = value.faqs.some(
    (item) => Boolean(item.question.trim()) !== Boolean(item.answer.trim())
  );
  if (incompleteFaq) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["faqs"],
      message: "Each FAQ needs both a question and an answer.",
    });
  }

  if (value._status !== "published") return;

  if (!value.excerpt?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["excerpt"],
      message: "A short summary is required before publishing.",
    });
  }
  if (!value.coverImage) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["coverImage"],
      message: "Please choose a cover image before publishing.",
    });
  }
  if (!value.category) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["category"],
      message: "Please choose a category before publishing.",
    });
  }
  if (!lexicalHasVisibleText(value.content)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["content"],
      message: "Add article content before publishing.",
    });
  }
});

export type PostInput = z.infer<typeof postDraftSchema>;
