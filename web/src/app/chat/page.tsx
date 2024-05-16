"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Chat from "../components/chat";
import { isSession } from "../components/chat/core/session";

export default function ChatPage() {
  useEffect(() => {
    if (!isSession()) {
      redirect("/");
    }
  }, []);
  return <Chat />;
}
