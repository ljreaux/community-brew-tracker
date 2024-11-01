"use server";

import axios from "axios";

const { NEXT_PUBLIC_BREW_FOUR_URL } = process.env;

const apiUrls = {
  4: NEXT_PUBLIC_BREW_FOUR_URL,
};

export type UrlKey = keyof typeof apiUrls;

export async function getSheets(brewNumber?: UrlKey) {
  const apiUrl = brewNumber ? apiUrls[brewNumber] : NEXT_PUBLIC_BREW_FOUR_URL;
  try {
    if (!apiUrl)
      throw new Error("Requested API URL is not defined in the .env");

    const { data } = await axios.get(apiUrl);
    const sheets = data.filter(
      (sheet: { name: string }) => sheet.name !== "Template"
    );

    return sheets;
  } catch (error) {
    console.error(error);
  }
}
