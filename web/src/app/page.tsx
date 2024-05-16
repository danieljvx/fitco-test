"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { isSession } from "./components/chat/core/session";
import Register from "./components/chat/register";

export default function Home() {
  const [sessionLoading, setSessionLoading] = useState(true);
  useEffect(() => {
    if (isSession()) {
      redirect("/chat");
    }
    setSessionLoading(false);
  }, []);
  return !sessionLoading ? <Register /> : <></>;
}
