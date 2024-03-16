"use client";

import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Payments Dapp</title>
        <meta
          name="description"
          content="Enabling Millions of Africans leverage the blockchain to access better and stable finances"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Link
            href="/sign-in"
            className="rounded border bg-blue-600 p-6 text-lg"
          >
            Connect
          </Link>
        </div>
      </main>
    </>
  );
}