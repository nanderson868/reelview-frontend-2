import { Spinner } from "flowbite-react";
import React from "react";

export default function Skeleton() {
  // Or a custom loading skeleton component
  return (
    <div className="flex justify-items-center">
      <Spinner className="flex size-10" />
    </div>
  );
}
