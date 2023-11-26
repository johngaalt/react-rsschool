import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>404 Not Found</h1>
      <Link href="/" className="text-red-800 text-3xl">
        Go Home
      </Link>
    </div>
  );
}
