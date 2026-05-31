import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import FrameworksHub from "@/components/frameworks/FrameworksHub";

export default function FrameworksPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <FrameworksHub />
      </Suspense>
    </AppShell>
  );
}
