"use client";

import { trpc } from "@/trpc/client";

export default function PageClient() {
  const [data] = trpc.catagories.getMany.useSuspenseQuery();
  return <div>{JSON.stringify(data)}</div>;
}
