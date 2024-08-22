import path from "path";
import { loadTaxonomyTree } from "../load";
import { TaxonomyLanguage } from "../locale";

const DEFINITIONS_FOLDER_PATH = path.join(__dirname, "definitions");

describe("Loader", () => {
  it("should load correctly when taxonomy definition file is found", () => {
    expect(() =>
      loadTaxonomyTree(DEFINITIONS_FOLDER_PATH, TaxonomyLanguage.English),
    ).not.toThrow();
  });

  it("should throw error when taxonomy definition file is not found", () => {
    expect(() =>
      loadTaxonomyTree(DEFINITIONS_FOLDER_PATH, TaxonomyLanguage.German),
    ).toThrow();
  });

  it("should throw error when taxonomy definition file schema is not unknown", () => {
    expect(() =>
      loadTaxonomyTree(DEFINITIONS_FOLDER_PATH, TaxonomyLanguage.Portuguese),
    ).toThrow();
  });
});
