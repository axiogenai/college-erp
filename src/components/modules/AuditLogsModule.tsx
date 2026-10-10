import React, { useState } from 'react';
import { 
  ShieldAlert, Activity, Filter, Search, CheckCircle, 
  AlertTriangle, Server, Database, HardDrive, Cpu, Clock 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { StatCard } from '../common/StatCard';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';

export const AuditLogsModule: React.FC = () => {
  const { auditLogs, systemHealth } = useErpData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = selectedModule === 'all' || log.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Compliance &amp; Immutable System Audit Trail"
        subtitle="Institutional governance telemetry, role-authenticated action logs, and DevOps cluster vitals"
        icon={<ShieldAlert className="w-5 h-5 text-institutional-600" />}
      />

      {/* DevOps System Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Enterprise PostgreSQL Cluster"
          value="Online (1.2ms)"
          subtitle="Read Replicas: 2 Synchronized"
          colorScheme="emerald"
          icon={<Database className="w-5 h-5" />}
        />
        <StatCard
          title="Redis Cache &amp; Session Store"
          value="99.99% Hit Rate"
          subtitle="Active Sessions: 184 Connected"
          colorScheme="institutional"
          icon={<Server className="w-5 h-5" />}
        />
        <StatCard
          title="Campus Cloud Storage Quota"
          value={`${systemHealth.storageUsageGB} GB`}
          subtitle="41.2% Allocated (Encrypted)"
          colorScheme="indigo"
          icon={<HardDrive className="w-5 h-5" />}
        />
        <StatCard
          title="Daily Automated Snapshot"
          value="Completed 04:00 AM"
          subtitle="Offsite Replica Verified"
          colorScheme="gold"
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      {/* Audit Log Filters */}
      <SoftCard className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by action, user name, or operational details..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800 dark:text-slate-100"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            className="w-full sm:w-56"
            value={selectedModule}
            onChange={val => setSelectedModule(val)}
            options={[
              { value: 'all', label: 'All Subsystems' },
              { value: 'Students', label: 'Students Registry' },
              { value: 'Examinations', label: 'Examinations & Grades' },
              { value: 'Finance', label: 'Treasury & Finance' },
              { value: 'Attendance', label: 'Attendance Ledger' },
              { value: 'Timetable', label: 'Timetable Scheduler' },
              { value: 'AI', label: 'AI Intelligence Tools' },
              { value: 'Auth', label: 'Security & Auth' },
            ]}
          />
        </div>
      </SoftCard>

      {/* Audit Trail Table */}
      <SoftCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-institutional-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold uppercase text-[10px] tracking-wider border-b border-institutional-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 align-middle whitespace-nowrap">Timestamp (UTC)</th>
                <th className="px-4 py-3 align-middle whitespace-nowrap">Actor &amp; Role</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Subsystem</th>
                <th className="px-4 py-3 align-middle font-mono whitespace-nowrap">Action Signature</th>
                <th className="px-4 py-3 align-middle">Operational Details</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 align-middle font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-middle whitespace-nowrap">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 block text-xs">{log.userName}</span>
                    <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">{log.userRole}</span>
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle font-mono text-[11px] font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 align-middle text-slate-600 dark:text-slate-300 max-w-md text-xs">
                    {log.details}
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                      log.status === 'success'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                        : log.status === 'warning'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                    }`}>
                      {log.status === 'success' ? '✓ Success' : log.status === 'warning' ? '⚠ Warning' : '✕ Error'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SoftCard>
    </div>
  );
};
