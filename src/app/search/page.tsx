import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import SearchPage from "@/components/search/SearchPage";

export default function Search() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <SearchPage />
      </Suspense>
    </AppShell>
  );
}
