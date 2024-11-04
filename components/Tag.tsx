import { Card, CardDescription } from "./ui/card";
import Link from "next/link";

function Tag({ text }: { text: string }) {
  return (
    <Card>
      <Link href={`/tags/${text}`}>
        <CardDescription className="p-2">{text}</CardDescription>{" "}
      </Link>
    </Card>
  );
}

export default Tag;
