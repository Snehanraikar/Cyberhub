import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import CheatsheetHub from "@/components/cheatsheets/CheatsheetHub";

export default function CheatsheetsPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <CheatsheetHub />
      </Suspense>
    </AppShell>
  );
}
