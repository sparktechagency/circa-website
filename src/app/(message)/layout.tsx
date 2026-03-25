import { MessageLayout } from "@/components/layout/MessageLayout";
import React from "react";

export default function MessageGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessageLayout>{children}</MessageLayout>;
}
