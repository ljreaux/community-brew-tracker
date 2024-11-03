import { getSheets, UrlKey } from "../../actions/sheets";
import { groupBy } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function Main({ params }: { params: Promise<{ brewNumber: string }> }) {
  const { brewNumber } = await params;
  const sheets = (await getSheets(brewNumber as unknown as UrlKey)) || [];
  const groupedSheets = groupBy(sheets, (sheet) => sheet.current_stage);
  const groups = ["Primary", "Secondary", "Packaging", "Finished"];

  if (!sheets.length) return <div>Error Retrieving Community Brew Info</div>;

  return (
    <main className="flex items-center justify-center flex-col p-2">
      <h1 className="text-6xl">Community Brew {brewNumber}</h1>
      <div className="flex gap-4 w-full p-4">
        {groups.map((group) => (
          <div
            key={group}
            className="flex-1 hover:bg-secondary transition-colors p-4 "
          >
            <h2 className="text-xl font-semibold mb-4">{group}</h2>
            <div className="space-y-4">
              {groupedSheets[group]?.map((sheet) => {
                const startDate = sheet.start_date
                  ? new Date(sheet.start_date).toLocaleDateString()
                  : null;
                const endDate = sheet.end_date
                  ? new Date(sheet.end_date).toLocaleDateString()
                  : null;
                return (
                  <Card
                    key={sheet.name}
                    className="transition-opacity hover:opacity-80"
                  >
                    <Link href={`/brew/${brewNumber}/${sheet.name}`}>
                      <CardHeader>
                        <CardTitle>{sheet.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {!startDate && !endDate && "No Details yet."}
                        {startDate && <p>Start Date: {startDate}</p>}
                        {endDate && <p>End Date: {endDate}</p>}
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
