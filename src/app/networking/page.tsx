import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import NetworkingHub from "@/components/networking/NetworkingHub";

export default function NetworkingPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <NetworkingHub />
      </Suspense>
    </AppShell>
  );
}
