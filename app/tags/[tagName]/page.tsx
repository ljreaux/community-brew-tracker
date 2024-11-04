import { getItemsWithTag } from "@/app/actions/sheets";
import Tag from "@/components/Tag";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

async function TagPage({ params }: { params: Promise<{ tagName: string }> }) {
  const { tagName } = await params;
  const sheets = (await getItemsWithTag(tagName)) || [];
  function matchCommunityBrewTag(tag: string): string | null {
    const regex = /community-brew-(\d+)/; // Matches "community-brew-" followed by one or more digits
    const match = tag.match(regex);
    return match ? match[0] : null; // Return the matched string if found, otherwise null
  }
  if (!sheets.length)
    return <main>Error. No Brews found with this tag name.</main>;
  return (
    <main className="flex flex-col space-y-4">
      <h1 className="text-4xl text-center">Tag: {tagName}</h1>
      <div className="flex gap-4 flex-wrap p-4">
        {sheets.map((sheet) => {
          const startDate = sheet.start_date
            ? new Date(sheet.start_date).toLocaleDateString()
            : null;
          const endDate = sheet.end_date
            ? new Date(sheet.end_date).toLocaleDateString()
            : null;
          const brewNumberTag =
            sheet.tags.find((tag) => matchCommunityBrewTag(tag)) || "";
          return (
            <Card
              key={sheet.name}
              className="transition-opacity hover:opacity-80 "
            >
              <Link
                href={`/brew/${brewNumberTag.replace("community-brew-", "")}/${
                  sheet.name
                }`}
              >
                <CardHeader>
                  <CardTitle>{sheet.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {!startDate && !endDate && "No Details yet."}
                  {startDate && <p>Start Date: {startDate}</p>}
                  {endDate && <p>End Date: {endDate}</p>}
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-center">
                  <Card>
                    <CardDescription className="p-2 ">
                      {brewNumberTag}
                    </CardDescription>
                  </Card>
                </CardFooter>
              </Link>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

export default TagPage;
