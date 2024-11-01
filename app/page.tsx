import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { getSheets } from "./actions/sheets";

export default async function Home() {
  const sheets = await getSheets();

  console.log(sheets);

  return (
    <div>
      <header>
        <ModeToggle />
      </header>
      <main></main>
    </div>
  );
}
