import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import AttacksHub from "@/components/attacks/AttacksHub";

export default function AttacksPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <AttacksHub />
      </Suspense>
    </AppShell>
  );
}
