"use server";

const { NEXT_PUBLIC_BREW_FOUR_URL = "" } = process.env;

const apiUrls = {
  "4": NEXT_PUBLIC_BREW_FOUR_URL,
};

export type UrlKey = keyof typeof apiUrls;
export interface SheetType {
  name: string;
  start_date: string;
  end_date: string;
  ingredients: {
    ingredient?: string;
    amount?: string;
    stage?: string;
  }[];
  honey: {
    type: string;
    quantity: string;
  };
  notes: { note: string; date: string }[];
  og?: number;
  fg?: number;
  after_backsweetening?: number;
  package_date: string;
  current_stage: "Primary" | "Secondary" | "Packaging" | "Finished";
  tags: string[];
}

export async function getSheets(brewNumber?: UrlKey) {
  const apiUrl = brewNumber ? apiUrls[brewNumber] : NEXT_PUBLIC_BREW_FOUR_URL;
  try {
    if (!apiUrl)
      throw new Error("Requested API URL is not defined in the .env");

    const res = await fetch(apiUrl);
    const data = await res.json();
    const sheets: SheetType[] = data.filter(
      (sheet: SheetType) => sheet.name !== "Template"
    );

    return sheets;
  } catch (error) {
    console.error(error);
  }
}

export const getItemsWithTag = async (tag: string) => {
  const brews = [];
  for (const [key, value] of Object.entries(apiUrls)) {
    const sheets = await getSheets(key as UrlKey);
    if (sheets) brews.push(sheets);
  }
  return brews.flatMap((sheets) =>
    sheets.filter((sheet) => sheet.tags.includes(tag))
  );
};
