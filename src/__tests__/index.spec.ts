import path from "path";
import ShopifyTaxonomyClient, { TaxonomyLanguage } from "..";

const DEFINITIONS_FOLDER_PATH = path.join(__dirname, "definitions");

describe("Core client", () => {
  const client = new ShopifyTaxonomyClient({
    language: TaxonomyLanguage.English,
    definitionsFolderPath: DEFINITIONS_FOLDER_PATH,
  });

  it("should load definitions correctly", () => {
    const createClient = () =>
      new ShopifyTaxonomyClient({
        language: TaxonomyLanguage.English,
        definitionsFolderPath: DEFINITIONS_FOLDER_PATH,
      });

    expect(createClient).not.toThrow();

    const client = createClient();
    expect(client.getLanguage()).toBe(TaxonomyLanguage.English);
  });

  it("should return category details", () => {
    expect(client.getCategory("ap")).toMatchObject(
      expect.objectContaining({
        fullName: "Animals & Pet Supplies",
        id: "ap",
        name: "Animals & Pet Supplies",
        parent_id: null,
      }),
    );

    expect(client.getCategory("ap-1")).toMatchObject(
      expect.objectContaining({
        fullName: "Animals & Pet Supplies > Live Animals",
        id: "ap-1",
        name: "Live Animals",
        parent_id: "ap",
      }),
    );

    expect(client.getCategory("ap-2-1")).toMatchObject(
      expect.objectContaining({
        fullName: "Animals & Pet Supplies > Pet Supplies > Bird Supplies",
        id: "ap-2-1",
        name: "Bird Supplies",
        parent_id: "ap-2",
      }),
    );
  });

  it("should throw error if category id is not valid", () => {
    expect(() => client.getCategory("p")).toThrowErrorMatchingSnapshot();

    expect(() =>
      client.getCategory("completely*mal_formed-id"),
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      client.getCategory("?***efewfewf-wdfkjhgdjhgdhjg2h"),
    ).toThrowErrorMatchingSnapshot();
  });

  it("should return null when category cannot be found", () => {
    expect(client.getCategory("ap-100")).toBe(null);
    expect(client.getCategory("ww")).toBe(null);
    expect(client.getCategory("hb-3-2-5-1-234")).toBe(null);
  });
});
