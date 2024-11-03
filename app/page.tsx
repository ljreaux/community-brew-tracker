import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { communityBrews } from "@/lib/communityBrews";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <main className="grid items-center justify-center p-4 space-y-6">
        <h1 className="text-5xl">DtM Community Brew Tracker</h1>
        <p className="max-w-screen-sm">
          Welcome to the DtM Community Brew Tracker! This tool keeps track of
          all of the stats from the various members participating in the
          community brew.
        </p>
        <p>
          Click on one of the cards below to see info on that community brew.
        </p>
        <div>
          {communityBrews.map((brew) => (
            <Card
              key={brew.label}
              className="transition-opacity hover:opacity-80 w-max"
            >
              <Link href={`/brews/${brew.brewNumber}`}>
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    {brew.label}
                  </CardTitle>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
