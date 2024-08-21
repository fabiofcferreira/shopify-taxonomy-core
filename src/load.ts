import { readFileSync } from "fs";
import path from "path";
import { TaxonomyLanguage, TaxonomyTreeValidator } from "./types";

export function loadTaxonomyTree(directory = "./", language: TaxonomyLanguage) {
  try {
    const taxonomyFilename = `${language}.json`;

    const fileBuffer = readFileSync(path.join(directory, taxonomyFilename));
    const fileContents = JSON.parse(Buffer.from(fileBuffer).toString());

    return TaxonomyTreeValidator.parse(fileContents);
  } catch (ex) {
    throw new Error(
      `Could not load taxonomy tree file: ${ex instanceof Error ? ex.message : ex}`,
    );
  }
}
