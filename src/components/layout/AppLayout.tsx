import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { GlobalSearch } from '../common/GlobalSearch';
import { PrincipalDashboard } from '../dashboards/PrincipalDashboard';
import { FacultyDashboard } from '../dashboards/FacultyDashboard';
import { StudentDashboard } from '../dashboards/StudentDashboard';
import { AccountantDashboard } from '../dashboards/AccountantDashboard';
import { StudentsModule } from '../modules/StudentsModule';
import { FacultyModule } from '../modules/FacultyModule';
import { TimetableModule } from '../modules/TimetableModule';
import { AttendanceModule } from '../modules/AttendanceModule';
import { ExaminationsModule } from '../modules/ExaminationsModule';
import { FinanceModule } from '../modules/FinanceModule';
import { AdmissionsModule } from '../modules/AdmissionsModule';
import { AiAssistantModule } from '../modules/AiAssistantModule';
import { AcademicRiskModule } from '../modules/AcademicRiskModule';
import { AuditLogsModule } from '../modules/AuditLogsModule';
import { SystemHealthModule } from '../modules/SystemHealthModule';
import { NoticesModule } from '../modules/NoticesModule';
import { useAuth } from '../../context/AuthContext';

interface AppLayoutProps {
  onNavigateLanding: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ onNavigateLanding }) => {
  const { role } = useAuth();

  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Render dashboard based on active role persona
  const renderDashboard = () => {
    switch (role) {
      case 'principal':
        return <PrincipalDashboard onNavigate={setActiveModule} />;
      case 'faculty':
        return <FacultyDashboard onNavigate={setActiveModule} />;
      case 'student':
        return <StudentDashboard onNavigate={setActiveModule} />;
      case 'accountant':
        return <AccountantDashboard onNavigate={setActiveModule} />;
      default:
        return <PrincipalDashboard onNavigate={setActiveModule} />;
    }
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return renderDashboard();
      case 'students':
        return <StudentsModule />;
      case 'faculty':
        return <FacultyModule />;
      case 'timetable':
        return <TimetableModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'examinations':
        return <ExaminationsModule />;
      case 'finance':
        return <FinanceModule />;
      case 'admissions':
        return <AdmissionsModule />;
      case 'ai-assistant':
        return <AiAssistantModule />;
      case 'risk-detector':
        return <AcademicRiskModule />;
      case 'audit-logs':
        return <AuditLogsModule />;
      case 'system-health':
        return <SystemHealthModule />;
      case 'notices':
        return <NoticesModule />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 flex transition-colors selection:bg-institutional-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <TopNavbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onNavigateLanding={onNavigateLanding}
          onSelectModule={setActiveModule}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveModule()}
        </main>
      </div>

      {/* Global Search Dialog */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setActiveModule}
      />
    </div>
  );
};
