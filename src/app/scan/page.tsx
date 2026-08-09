import { AuthGuard } from "@/components/AuthGuard";
import { ScannerPage } from "@/components/scanner/ScannerPage";

export default function ScanRoute() {
  return (
    <AuthGuard>
      <ScannerPage />
    </AuthGuard>
  );
}
