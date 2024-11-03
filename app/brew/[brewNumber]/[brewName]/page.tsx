import { getSheets, UrlKey } from "@/app/actions/sheets";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";

async function Brew({
  params,
}: {
  params: Promise<{ brewNumber: string; brewName: string }>;
}) {
  const resolved = await params;
  const brewNumber = resolved.brewNumber;
  const brewName = decodeURIComponent(resolved.brewName);

  const sheets = (await getSheets(brewNumber as unknown as UrlKey)) || [];
  const currentSheet = sheets.find((sheet) => sheet.name === brewName);
  const formatDate = (date: string) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  if (!currentSheet) {
    return <div>Error: Brew not found.</div>;
  }

  const start_date = formatDate(currentSheet.start_date);
  const end_date = formatDate(currentSheet.end_date);
  const og = currentSheet.og ? currentSheet.og.toFixed(3) : "N/A";
  const fg = currentSheet.fg ? currentSheet.fg.toFixed(3) : "N/A";
  const after_backsweetening = currentSheet.after_backsweetening
    ? currentSheet.after_backsweetening.toFixed(3)
    : "N/A";

  return (
    <main className="flex flex-col w-full items-center justify-center p-4 space-y-12">
      <h1 className="text-4xl py-6">
        {currentSheet.name}'s Community Brew {brewNumber}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>OG</TableHead>
            <TableHead>FG</TableHead>
            <TableHead>FG After Backsweetening</TableHead>
            <TableHead>Current Stage</TableHead>
            <TableHead>Package Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{start_date}</TableCell>
            <TableCell>{end_date}</TableCell>
            <TableCell>{og}</TableCell>
            <TableCell>{fg}</TableCell>
            <TableCell>{after_backsweetening}</TableCell>
            <TableCell>{currentSheet.current_stage}</TableCell>
            <TableCell>{formatDate(currentSheet.package_date)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Honey Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Current Stage</TableHead>
            <TableHead>Package Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{currentSheet.honey?.type || "N/A"}</TableCell>
            <TableCell>{currentSheet.honey?.quantity || "N/A"}</TableCell>
            <TableCell>{currentSheet.current_stage}</TableCell>
            <TableCell>{formatDate(currentSheet.package_date)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient/Additive</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSheet.ingredients.length ? (
            currentSheet.ingredients.map((ingredient, index) => (
              <TableRow key={index}>
                <TableCell>{ingredient.ingredient}</TableCell>
                <TableCell>{currentSheet.ingredients[index].stage}</TableCell>
                <TableCell>{currentSheet.ingredients[index].amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No ingredients yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Note</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSheet.notes.length ? (
            currentSheet.notes.map((note, index) => (
              <TableRow key={index}>
                <TableCell>{note.note}</TableCell>
                <TableCell>{formatDate(note.date)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No notes yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}

export default Brew;
