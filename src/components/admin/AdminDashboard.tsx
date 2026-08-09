"use client";

import { useState } from "react";
import { getAdminLabels } from "@/data/admin-labels";
import {
  MOCK_ADMIN,
  MOCK_PLATFORM_STATS,
  MOCK_ASSESSMENT_DISTRIBUTION,
  MOCK_ANALYSIS_ACTIVITY,
  MOCK_USERS,
  MOCK_PRODUCTS,
  MOCK_INGREDIENTS,
  MOCK_EVIDENCE_ENTRIES,
  MOCK_DATA_QUALITY_ISSUES,
  MOCK_ANALYSIS_LOGS,
  MOCK_SYSTEM_HEALTH,
  MOCK_AUDIT_LOG,
  MOCK_SYSTEM_SETTINGS,
} from "@/data/admin-data";
import { AdminSidebar, type AdminSection } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { PlatformOverview } from "./PlatformOverview";
import { AnalysisActivity } from "./AnalysisActivity";
import { ConcernDistribution } from "./ConcernDistribution";
import { UserManagement } from "./UserManagement";
import { ProductManagement } from "./ProductManagement";
import { IngredientManagement } from "./IngredientManagement";
import { EvidenceManagement } from "./EvidenceManagement";
import { DataQuality } from "./DataQuality";
import { AnalysisLogs } from "./AnalysisLogs";
import { ErrorMonitoring } from "./ErrorMonitoring";
import { AuditLog } from "./AuditLog";
import { SystemSettings } from "./SystemSettings";
import { AdminProfile } from "./AdminProfile";

type AdminDashboardProps = {
  lang?: string;
};

export function AdminDashboard({ lang = "en" }: AdminDashboardProps) {
  const labels = getAdminLabels(lang);
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (section: AdminSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — desktop */}
      <div className="hidden lg:flex">
        <AdminSidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          labels={labels.sidebar}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Sidebar — mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full">
            <AdminSidebar
              activeSection={activeSection}
              onNavigate={handleNavigate}
              labels={labels.sidebar}
            />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          labels={labels.header}
          onToggleSidebar={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {activeSection === "dashboard" && (
              <>
                <PlatformOverview
                  stats={MOCK_PLATFORM_STATS}
                  labels={labels.overview}
                />
                <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <AnalysisActivity
                    entries={MOCK_ANALYSIS_ACTIVITY}
                    labels={labels.analysisActivity}
                  />
                  <ConcernDistribution
                    distribution={MOCK_ASSESSMENT_DISTRIBUTION}
                    labels={labels.concernDistribution}
                  />
                </div>
                <ErrorMonitoring
                  health={MOCK_SYSTEM_HEALTH}
                  labels={labels.errorMonitoring}
                />
              </>
            )}

            {activeSection === "users" && (
              <UserManagement
                users={MOCK_USERS}
                labels={labels.userManagement}
              />
            )}

            {activeSection === "products" && (
              <ProductManagement
                products={MOCK_PRODUCTS}
                labels={labels.productManagement}
              />
            )}

            {activeSection === "ingredients" && (
              <IngredientManagement
                ingredients={MOCK_INGREDIENTS}
                labels={labels.ingredientManagement}
              />
            )}

            {activeSection === "evidence" && (
              <EvidenceManagement
                entries={MOCK_EVIDENCE_ENTRIES}
                labels={labels.evidenceManagement}
              />
            )}

            {activeSection === "analysis_logs" && (
              <AnalysisLogs
                logs={MOCK_ANALYSIS_LOGS}
                labels={labels.analysisLogs}
              />
            )}

            {activeSection === "data_quality" && (
              <DataQuality
                issues={MOCK_DATA_QUALITY_ISSUES}
                labels={labels.dataQuality}
              />
            )}

            {activeSection === "system_settings" && (
              <SystemSettings
                settings={MOCK_SYSTEM_SETTINGS}
                labels={labels.systemSettings}
              />
            )}

            {activeSection === "audit_logs" && (
              <AuditLog
                entries={MOCK_AUDIT_LOG}
                labels={labels.auditLog}
              />
            )}

            {activeSection === "admin_profile" && (
              <AdminProfile admin={MOCK_ADMIN} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
