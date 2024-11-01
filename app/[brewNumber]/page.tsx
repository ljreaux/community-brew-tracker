import React from "react";
import { getSheets, UrlKey } from "../actions/sheets";
async function Main({ params }: { params: { brewNumber: string } }) {
  const { brewNumber } = await params;
  const sheets = await getSheets(brewNumber as unknown as UrlKey);

  if (!sheets) return <div>Error Retrieving Community Brew Info</div>;

  return (
    <div>
      {sheets.map((sheet: { name: string; id: string }) => (
        <p key={sheet.id}>{sheet.name}</p>
      ))}
    </div>
  );
}

export default Main;
