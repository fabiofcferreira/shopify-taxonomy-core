import { z } from "zod";

export enum TaxonomyLanguage {
  Danish = "da",
  German = "de",
  English = "en",
  Spanish = "es",
  Finnish = "fi",
  French = "fr",
  Italian = "it",
  Japanese = "ja",
  Korean = "ko",
  Dutch = "nl",
  Polish = "pl",
  BrazilianPortuguese = "pt-BR",
  Portuguese = "pt-PT",
  Chinese = "zh-CN",
}

export const CATEGORY_ID_REGEXP = new RegExp(/^[a-z]{2}((-[0-9]+)*)$/);

const TaxonomyTreeVerticalCategoryValidator = z.object({
  id: z.string(),
  name: z.string(),
  parent_id: z.string().nullable(),
});

export type TaxonomyTreeVerticalCategory = z.infer<
  typeof TaxonomyTreeVerticalCategoryValidator
>;

export type TaxonomyCategory = TaxonomyTreeVerticalCategory & {
  fullName: string;
};

const TaxonomyTreeVerticalValidator = z.object({
  name: z.string(),
  prefix: z.string(),
  categories: TaxonomyTreeVerticalCategoryValidator.array(),
});

export type TaxonomyTreeVertical = z.infer<
  typeof TaxonomyTreeVerticalValidator
>;

export const TaxonomyTreeValidator = z.object({
  version: z.string(),
  verticals: TaxonomyTreeVerticalValidator.array(),
});

export type TaxonomyTree = z.infer<typeof TaxonomyTreeValidator>;
