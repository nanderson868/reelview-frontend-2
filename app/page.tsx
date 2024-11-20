import React from "react";
import Dashboard from "./dashboard/page";
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the dashboard
  redirect("/dashboard");
}
