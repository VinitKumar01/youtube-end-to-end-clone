"use client";

import { trpc } from "@/trpc/client";

export default function PageClient() {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Vinit" });
  return <div>page client says: {data.greeting}</div>;
}
