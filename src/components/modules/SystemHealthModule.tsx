import React, { useState, useEffect } from 'react';
import { 
  Activity, Server, Database, HardDrive, Cpu, Clock, 
  CheckCircle, RefreshCw, ShieldCheck, Zap, 
  Terminal, Play, ArrowUpRight, Lock, RotateCcw, AlertOctagon, 
  Download, FileCheck, Layers, Wifi, Power, Search, Pause, Copy, Check, Filter, Trash2
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { StatCard } from '../common/StatCard';
import { Button } from '../common/Button';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';

interface NodeInfo {
  id: string;
  name: string;
  role: string;
  ip: string;
  status: 'healthy' | 'warning' | 'standby';
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
}

export interface EventLog {
  id: string;
  timestamp: string;
  timeDisplay: string;
  subsystem: 'CRON' | 'HEALTH' | 'POSTGRES' | 'REDIS' | 'TLS' | 'AUTH' | 'SNAPSHOT';
  level: 'INFO' | 'OK' | 'AUDIT' | 'WARN';
  message: string;
  details?: string;
  metrics?: string;
}

const INITIAL_LOGS: EventLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-10-09T18:00:00.241Z',
    timeDisplay: '18:00:00.241',
    subsystem: 'CRON',
    level: 'OK',
    message: 'Attendance Daily Roll-up Daemon completed successfully.',
    metrics: '1,480 student records aggregated',
    details: 'Batch CSE-2024, AI-2024, ECE-2024 reconciled with UGC audit ledger'
  },
  {
    id: 'log-02',
    timestamp: '2026-10-09T17:45:12.809Z',
    timeDisplay: '17:45:12.809',
    subsystem: 'HEALTH',
    level: 'OK',
    message: 'HTTP internal ping mesh latency check verified.',
    metrics: 'All 5 cluster nodes responding in < 2.4ms',
    details: 'Ingress node 10.0.1.10 p99 jitter: 0.18ms'
  },
  {
    id: 'log-03',
    timestamp: '2026-10-09T17:30:05.114Z',
    timeDisplay: '17:30:05.114',
    subsystem: 'POSTGRES',
    level: 'INFO',
    message: "Autovacuum worker completed on table 'timetable_slots'.",
    metrics: '12 dead tuples reclaimed, index size 4.2 MB',
    details: 'Transaction wraparound age 1,840,290 / 200,000,000'
  },
  {
    id: 'log-04',
    timestamp: '2026-10-09T17:00:44.920Z',
    timeDisplay: '17:00:44.920',
    subsystem: 'REDIS',
    level: 'INFO',
    message: 'Key eviction sweep cycle completed.',
    metrics: 'Zero expired JWT session tokens retained',
    details: 'Memory reclaimed: 14.8 MB • Active keys: 42,891'
  },
  {
    id: 'log-05',
    timestamp: '2026-10-09T16:15:30.002Z',
    timeDisplay: '16:15:30.002',
    subsystem: 'TLS',
    level: 'OK',
    message: "Let's Encrypt wildcard certificate integrity verified (*.axiogen.edu).",
    metrics: '64 days remaining before renewal',
    details: 'OCSP stapling active • Cipher: TLS_AES_256_GCM_SHA384'
  },
  {
    id: 'log-06',
    timestamp: '2026-10-09T15:20:19.450Z',
    timeDisplay: '15:20:19.450',
    subsystem: 'AUTH',
    level: 'AUDIT',
    message: 'Elevated authorization query by user-principal-01.',
    metrics: 'Authenticated via biometric session token',
    details: 'Policy check: Role [CAMPUS_DIRECTOR] granted access to Financial Audit'
  },
  {
    id: 'log-07',
    timestamp: '2026-10-09T04:00:00.088Z',
    timeDisplay: '04:00:00.088',
    subsystem: 'SNAPSHOT',
    level: 'OK',
    message: 'Automated daily cryptographic snapshot verified and mirrored.',
    metrics: 'Secondary Frankfurt vault synchronized',
    details: 'SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  }
];

const INITIAL_NODES: NodeInfo[] = [
  { id: 'node-1', name: 'srv-ingress-01.axiogen.edu', role: 'NGINX Ingress & TLS 1.3 Gateway', ip: '10.0.1.10', status: 'healthy', cpu: 14, memory: 34, disk: 22, uptime: '48 days' },
  { id: 'node-2', name: 'srv-app-primary.axiogen.edu', role: 'React Core & Fastify API Cluster', ip: '10.0.1.20', status: 'healthy', cpu: 28, memory: 52, disk: 38, uptime: '24 days' },
  { id: 'node-3', name: 'srv-db-master.axiogen.edu', role: 'PostgreSQL 16 Primary (Read/Write)', ip: '10.0.2.11', status: 'healthy', cpu: 19, memory: 68, disk: 44, uptime: '92 days' },
  { id: 'node-4', name: 'srv-db-replica.axiogen.edu', role: 'PostgreSQL 16 Standby (Sync 0ms)', ip: '10.0.2.12', status: 'healthy', cpu: 11, memory: 65, disk: 44, uptime: '92 days' },
  { id: 'node-5', name: 'srv-worker-01.axiogen.edu', role: 'Redis 7.2 & Celery Task Daemons', ip: '10.0.3.30', status: 'healthy', cpu: 22, memory: 41, disk: 19, uptime: '36 days' },
];

export const SystemHealthModule: React.FC = () => {
  const { 
    systemHealth, 
    triggerManualBackup, 
    flushRedisCache, 
    optimizeDatabasePool, 
    restartWorkerProcess, 
    toggleMaintenanceMode,
    logAudit 
  } = useErpData();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'topology' | 'backups' | 'console'>('topology');
  const [nodes, setNodes] = useState<NodeInfo[]>(INITIAL_NODES);

  // Backup progress simulation
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupStep, setBackupStep] = useState<number>(0);
  const [backupLogs, setBackupLogs] = useState<string[]>([]);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // Restart modal
  const [selectedNodeToRestart, setSelectedNodeToRestart] = useState<NodeInfo | null>(null);

  // Live Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Run Backup Simulation
  const handleStartBackup = () => {
    setIsBackupModalOpen(true);
    setIsBackingUp(true);
    setBackupStep(1);
    setBackupLogs([
      `[${new Date().toLocaleTimeString()}] [INIT] Initiating enterprise disaster snapshot...`,
      `[${new Date().toLocaleTimeString()}] [DB] Acquiring transaction checkpoint on PostgreSQL 16 cluster...`
    ]);

    setTimeout(() => {
      setBackupStep(2);
      setBackupLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [WAL] Streaming write-ahead logs to local staging buffer...`,
        `[${new Date().toLocaleTimeString()}] [CRYPTO] Encrypting database dump with AES-256-GCM cipher...`
      ]);
    }, 1200);

    setTimeout(() => {
      setBackupStep(3);
      setBackupLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [S3] Uploading cryptographic archive to offsite disaster mirror...`,
        `[${new Date().toLocaleTimeString()}] [CHECKSUM] Verifying SHA-256 hash against primary storage...`
      ]);
    }, 2400);

    setTimeout(() => {
      setBackupStep(4);
      const res = triggerManualBackup();
      setIsBackingUp(false);
      setBackupLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [SUCCESS] Snapshot verified: backup_${Date.now()}_prod.enc`,
        `[${new Date().toLocaleTimeString()}] [REGISTRY] Snapshot catalog updated: ${res.timestamp}`
      ]);
      showToast('Disaster Recovery Snapshot created and verified successfully!');
    }, 3600);
  };

  // Cache Flush
  const handleFlushCache = () => {
    const res = flushRedisCache();
    showToast(res.message);
  };

  // DB Pool Optimize
  const handleOptimizeDb = () => {
    const res = optimizeDatabasePool();
    showToast(res.message);
  };

  // Restart Node
  const handleConfirmRestart = () => {
    if (!selectedNodeToRestart) return;
    const res = restartWorkerProcess(selectedNodeToRestart.name);
    setNodes(prev => prev.map(n => n.id === selectedNodeToRestart.id ? { ...n, cpu: 12, memory: 30 } : n));
    showToast(res.message);
    setSelectedNodeToRestart(null);
  };

  // Console Stream State & Actions
  const [consoleLogs, setConsoleLogs] = useState<EventLog[]>(INITIAL_LOGS);
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('ALL');
  const [isStreamPaused, setIsStreamPaused] = useState(false);
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);

  const handleCopyLog = (log: EventLog) => {
    const text = `[${log.timestamp}] [${log.subsystem}] [${log.level}] ${log.message} ${log.metrics ? `(${log.metrics})` : ''}`;
    navigator.clipboard?.writeText(text);
    setCopiedLogId(log.id);
    showToast(`Copied ${log.subsystem} event to clipboard`);
    setTimeout(() => setCopiedLogId(null), 2000);
  };

  const handleCopyAllLogs = () => {
    const text = filteredLogs.map(l => `[${l.timestamp}] [${l.subsystem}] [${l.level}] ${l.message} ${l.metrics ? `(${l.metrics})` : ''}`).join('\n');
    navigator.clipboard?.writeText(text);
    showToast(`Copied ${filteredLogs.length} event logs to clipboard`);
  };

  const handleClearLogs = () => {
    setConsoleLogs([]);
    showToast('Event stream buffer cleared');
  };

  const handleResetLogs = () => {
    setConsoleLogs(INITIAL_LOGS);
    showToast('Default event telemetry restored');
  };

  const handleTestPing = () => {
    const now = new Date();
    const newPingLog: EventLog = {
      id: `log-${Date.now()}`,
      timestamp: now.toISOString(),
      timeDisplay: now.toISOString().split('T')[1].slice(0, 12),
      subsystem: 'HEALTH',
      level: 'OK',
      message: 'Synthetic telemetry mesh health ping executed across all 5 nodes.',
      metrics: 'RTT 1.62ms • Zero packet drop',
      details: 'Health heartbeat ACK confirmed by ap-south-1 worker node'
    };
    setConsoleLogs(prev => [newPingLog, ...prev]);
    showToast('Live telemetry ping executed (1.62ms RTT)');
  };

  const filteredLogs = consoleLogs.filter(log => {
    const matchesSubsystem = selectedSubsystem === 'ALL' || log.subsystem === selectedSubsystem;
    const matchesQuery = !logSearchQuery || 
      log.message.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.subsystem.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      (log.metrics && log.metrics.toLowerCase().includes(logSearchQuery.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(logSearchQuery.toLowerCase()));
    return matchesSubsystem && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Infrastructure & DevOps Telemetry"
        subtitle="High-availability cluster health, PostgreSQL connection pools, Redis in-memory cache vitals, background daemon daemons &amp; disaster recovery snapshots"
        icon={<Activity className="w-5 h-5 text-[#0F2942] dark:text-sky-400" />}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleFlushCache}
            >
              Purge Redis Cache
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Database className="w-4 h-4" />}
              onClick={handleOptimizeDb}
            >
              Optimize DB Pool
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<HardDrive className="w-4 h-4" />}
              onClick={handleStartBackup}
            >
              Trigger Snapshot
            </Button>
          </div>
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="font-bold ml-4">✕</button>
        </div>
      )}

      {/* High-Availability Cluster Status Banner */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-serif text-sm">
                  All Systems Operational &amp; Synchronized
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-emerald-300 border border-white/20">
                  99.99% 30-Day SLA
                </span>
              </div>
              <p className="text-[11px] text-sky-200/80 mt-0.5 font-mono">
                Cluster Region: ap-south-1 (Mumbai Private VPC) • Total Memory: 64 GB • Read Replicas: 2 Nodes Synchronized (0ms Lag)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right text-[11px] font-mono text-sky-200/80 mr-2">
              <span>Last Snapshot: </span>
              <strong className="text-white block text-[10px]">
                {systemHealth.lastBackupTime.split('(')[0]}
              </strong>
            </div>
            <button
              onClick={() => {
                const nextMode = toggleMaintenanceMode();
                showToast(`Maintenance mode is now ${nextMode ? 'ACTIVE' : 'DISABLED'}`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                systemHealth.maintenanceMode
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{systemHealth.maintenanceMode ? 'Maintenance Mode ON' : 'Maintenance Mode OFF'}</span>
            </button>
          </div>
        </div>
      </SoftCard>

      {/* DevOps Subsystem KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="PostgreSQL 16 Cluster"
          value="Healthy (1.14ms)"
          trend="up"
          trendLabel="connection pool: 24/100"
          subtitle="2 Read Replicas Synchronized"
          colorScheme="emerald"
          icon={<Database className="w-5 h-5" />}
        />
        <StatCard
          title="Redis 7.2 Cache Store"
          value="99.97% Hit Rate"
          trend="up"
          trendLabel="0.32ms latency"
          subtitle={`${systemHealth.activeSessions} Active Web Sessions`}
          colorScheme="institutional"
          icon={<Server className="w-5 h-5" />}
        />
        <StatCard
          title="Background Daemons"
          value="4/4 Workers Active"
          trend="up"
          trendLabel="0 dead-letter queue"
          subtitle="Timetable Clash Scheduler Online"
          colorScheme="indigo"
          icon={<Cpu className="w-5 h-5" />}
        />
        <StatCard
          title="Campus Cloud Vault"
          value={`${systemHealth.storageUsageGB} GB`}
          change="41.2% Allocated"
          trend="neutral"
          subtitle="Encrypted AES-256-GCM at Rest"
          colorScheme="gold"
          icon={<HardDrive className="w-5 h-5" />}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('topology')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'topology'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Cluster Node Topology ({nodes.length} Nodes)</span>
        </button>
        <button
          onClick={() => setActiveTab('backups')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'backups'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Disaster Recovery &amp; Cryptographic Snapshots</span>
        </button>
        <button
          onClick={() => setActiveTab('console')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'console'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>DevOps Live Terminal &amp; Audit Telemetry</span>
        </button>
      </div>

      {/* Tab 1: Cluster Nodes Topology */}
      {activeTab === 'topology' && (
        <div className="space-y-4">
          <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Active Infrastructure Node Topology (5 Production Clusters Online)
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  High-availability ingress, API instances, replicated databases, and queue daemons
                </p>
              </div>
              <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20 w-fit">
                TLS 1.3 Strict
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white font-semibold uppercase text-[10px] tracking-wider border-b border-blue-500/25">
                  <tr>
                    <th className="px-4 py-3">Server Node</th>
                    <th className="px-4 py-3">Cluster Role</th>
                    <th className="px-4 py-3 font-mono">Private IP</th>
                    <th className="px-4 py-3">CPU Load</th>
                    <th className="px-4 py-3">RAM Allocation</th>
                    <th className="px-4 py-3">Uptime</th>
                    <th className="px-4 py-3 text-right">Node Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {nodes.map(node => (
                    <tr key={node.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-[11px]">
                            {node.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-600 dark:text-slate-300 text-[11px]">
                        {node.role}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {node.ip}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${node.cpu > 70 ? 'bg-rose-500' : node.cpu > 40 ? 'bg-amber-500' : 'bg-institutional-600'}`} 
                              style={{ width: `${node.cpu}%` }} 
                            />
                          </div>
                          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{node.cpu}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${node.memory > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${node.memory}%` }} 
                            />
                          </div>
                          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{node.memory}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {node.uptime}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-[10px] px-2"
                          icon={<RotateCcw className="w-3 h-3" />}
                          onClick={() => setSelectedNodeToRestart(node)}
                        >
                          Restart Service
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SoftCard>
        </div>
      )}

      {/* Tab 2: Disaster Recovery & Snapshots */}
      {activeTab === 'backups' && (
        <div className="space-y-4">
          <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Disaster Recovery &amp; Cryptographic Snapshot Registry
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  Automated and manual snapshots stored across geo-redundant encrypted cold vaults.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={<HardDrive className="w-4 h-4" />}
                onClick={handleStartBackup}
              >
                Create Instant Snapshot
              </Button>
            </div>

            <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Last Snapshot Timestamp</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mt-1 font-mono text-xs">
                  {systemHealth.lastBackupTime}
                </span>
                <span className="text-[10px] text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                  <CheckCircle className="w-3 h-3" /> Integrity Verified (SHA-256 Match)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Encryption Standard</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mt-1 font-mono text-xs">
                  AES-256-GCM Envelope Encryption
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  HSM Root Key Rotated: 2026-09-01
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Recovery Point Objective (RPO)</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mt-1 font-mono text-xs">
                  &lt; 15 Minutes Continuous WAL
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  RTO: &lt; 4 Minutes Automated Failover
                </span>
              </div>
            </div>

            {/* Snapshot History Table */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
                Recent Validated Snapshots Archive
              </h4>
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white text-[10px] font-semibold uppercase tracking-wider border-b border-blue-500/25">
                    <tr>
                      <th className="px-4 py-2.5 align-middle">Snapshot Identifier</th>
                      <th className="px-4 py-2.5 align-middle">Type</th>
                      <th className="px-4 py-2.5 align-middle">Size</th>
                      <th className="px-4 py-2.5 align-middle">Created At</th>
                      <th className="px-4 py-2.5 align-middle">Cryptographic Checksum</th>
                      <th className="px-4 py-2.5 align-middle text-center">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                    <tr>
                      <td className="px-4 py-3 align-middle font-mono font-bold text-slate-900 dark:text-slate-100">
                        snap-20261009-daily-0400
                      </td>
                      <td className="px-4 py-3 align-middle">Scheduled Nightly</td>
                      <td className="px-4 py-3 align-middle font-mono">1.84 GB</td>
                      <td className="px-4 py-3 align-middle font-mono text-slate-400">2026-10-09 04:00 AM</td>
                      <td className="px-4 py-3 align-middle font-mono text-[10px] text-slate-400">e82a...91f4 (SHA256)</td>
                      <td className="px-4 py-3 align-middle text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                          ✓ Verified Clean
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 align-middle font-mono font-bold text-slate-900 dark:text-slate-100">
                        snap-20261008-daily-0400
                      </td>
                      <td className="px-4 py-3 align-middle">Scheduled Nightly</td>
                      <td className="px-4 py-3 align-middle font-mono">1.82 GB</td>
                      <td className="px-4 py-3 align-middle font-mono text-slate-400">2026-10-08 04:00 AM</td>
                      <td className="px-4 py-3 align-middle font-mono text-[10px] text-slate-400">3a41...c018 (SHA256)</td>
                      <td className="px-4 py-3 align-middle text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                          ✓ Verified Clean
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 align-middle font-mono font-bold text-slate-900 dark:text-slate-100">
                        snap-20261007-pre-migration
                      </td>
                      <td className="px-4 py-3 align-middle">Operator Ad-Hoc</td>
                      <td className="px-4 py-3 align-middle font-mono">1.81 GB</td>
                      <td className="px-4 py-3 align-middle font-mono text-slate-400">2026-10-07 19:22 PM</td>
                      <td className="px-4 py-3 align-middle font-mono text-[10px] text-slate-400">f990...b2a5 (SHA256)</td>
                      <td className="px-4 py-3 align-middle text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                          ✓ Verified Clean
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SoftCard>
      </div>
      )}

      {/* Tab 3: DevOps Live Console & Audit */}
      {activeTab === 'console' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#121215] shadow-xs overflow-hidden">
            {/* Oxford Navy Institutional Chrome Bar */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/30 border border-white/10 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Terminal className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <h3 className="text-sm font-semibold tracking-tight text-white font-sans truncate">
                      DevOps Cluster Event Stream &amp; Production Telemetry
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 text-emerald-300 border border-emerald-500/30">
                      <span className={`w-1.5 h-1.5 rounded-full ${isStreamPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                      {isStreamPaused ? 'Stream Paused' : 'Live Socket'}
                    </span>
                  </div>
                  <p className="text-[10px] text-sky-200/80 font-mono mt-0.5 truncate">
                    axiogen-prod-cluster-01 • wss://telemetry.axiogen.edu:8443/v1/stream
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <button
                  onClick={() => setIsStreamPaused(!isStreamPaused)}
                  className={`h-7 px-2.5 rounded-lg text-[10px] font-mono font-semibold border flex items-center gap-1.5 transition-all ${
                    isStreamPaused
                      ? 'bg-amber-500/20 text-amber-200 border-amber-400/40 hover:bg-amber-500/30'
                      : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/15'
                  }`}
                  title={isStreamPaused ? 'Resume live event stream' : 'Pause stream ingestion'}
                >
                  {isStreamPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  <span>{isStreamPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  onClick={handleTestPing}
                  className="h-7 px-2.5 rounded-lg text-[10px] font-mono font-semibold bg-white/10 text-white/90 border border-white/15 hover:bg-white/15 flex items-center gap-1.5 transition-all"
                  title="Send synthetic health ping"
                >
                  <Zap className="w-3 h-3 text-[#C5A059]" />
                  <span>Test Ping</span>
                </button>
                <button
                  onClick={() => showToast('Diagnostics bundle exported as JSON (SHA-256 signed)')}
                  className="h-7 px-2.5 rounded-lg text-[10px] font-mono font-semibold bg-white/15 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <Download className="w-3 h-3 text-sky-300" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Telemetry Hardware HUD Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="p-3 pl-5 space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Socket Ingestion</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">124 msg/sec</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">0 drops</span>
                </div>
              </div>
              <div className="p-3 pl-5 space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Peer Mesh Latency</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">1.8 ms</span>
                  <span className="text-[10px] font-mono text-slate-400">p99: 3.2ms</span>
                </div>
              </div>
              <div className="p-3 pl-5 space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Buffer Memory</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">18.4% Allocated</span>
                  <span className="text-[10px] font-mono text-slate-400">3.2 / 16 MB</span>
                </div>
              </div>
              <div className="p-3 pl-5 space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Active Subsystems</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">7 / 7 Online</span>
                  <span className="text-[10px] font-mono text-slate-400">TLS 1.3 Strict</span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-3 px-5 bg-white dark:bg-[#121215] border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Subsystem Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold mr-1">Filter:</span>
                {['ALL', 'CRON', 'HEALTH', 'POSTGRES', 'REDIS', 'TLS', 'AUTH', 'SNAPSHOT'].map(sys => {
                  const isActive = selectedSubsystem === sys;
                  return (
                    <button
                      key={sys}
                      onClick={() => setSelectedSubsystem(sys)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {sys}
                    </button>
                  );
                })}
              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={logSearchQuery}
                    onChange={e => setLogSearchQuery(e.target.value)}
                    placeholder="Search events..."
                    className="pl-8 pr-3 py-1 text-xs font-mono bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800 dark:text-slate-100 w-40"
                  />
                </div>
                <button
                  onClick={handleCopyAllLogs}
                  className="h-7 px-2.5 rounded-lg text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1"
                  title="Copy all logs"
                >
                  <Copy className="w-3 h-3" />
                  <span className="hidden sm:inline">Copy</span>
                </button>
                {consoleLogs.length === 0 ? (
                  <button
                    onClick={handleResetLogs}
                    className="h-7 px-2.5 rounded-lg text-[10px] font-mono font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100"
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    onClick={handleClearLogs}
                    className="h-7 px-2 rounded-lg text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200/80 dark:border-slate-700"
                    title="Clear buffer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Obsidian Console Body */}
            <div className="bg-[#090C12] text-slate-200 font-mono text-xs p-4 sm:p-5 max-h-[440px] overflow-y-auto space-y-1.5 selection:bg-blue-500/30">
              {filteredLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs">
                  <Terminal className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                  <p>No telemetry events match query &apos;{logSearchQuery || selectedSubsystem}&apos;</p>
                  <button 
                    onClick={() => { setLogSearchQuery(''); setSelectedSubsystem('ALL'); }} 
                    className="mt-2 text-sky-400 underline hover:text-sky-300 text-xs"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                filteredLogs.map((log, index) => {
                  const isCopied = copiedLogId === log.id;
                  return (
                    <div
                      key={log.id}
                      className="group relative p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-start gap-2.5 text-[11.5px] leading-relaxed"
                    >
                      {/* Line Number & Time */}
                      <div className="flex items-center gap-2 shrink-0 select-none text-[10.5px]">
                        <span className="text-slate-600 w-5 text-right font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-slate-400 tabular-nums font-mono">
                          [{log.timeDisplay}]
                        </span>
                      </div>

                      {/* Subsystem & Level Badges */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider ${
                          log.subsystem === 'CRON' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                          log.subsystem === 'HEALTH' ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' :
                          log.subsystem === 'POSTGRES' ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' :
                          log.subsystem === 'REDIS' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                          log.subsystem === 'TLS' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' :
                          log.subsystem === 'AUTH' ? 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30' :
                          'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                        }`}>
                          {log.subsystem}
                        </span>
                        <span className="px-1 py-0.2 rounded text-[8.5px] font-mono text-slate-400 bg-slate-800 border border-slate-700">
                          {log.level}
                        </span>
                      </div>

                      {/* Content & Highlighting */}
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-100 font-medium">
                          {log.message}
                        </div>
                        {log.metrics && (
                          <div className="text-[#C5A059] font-mono text-[10.5px] mt-0.5">
                            ↳ {log.metrics}
                          </div>
                        )}
                        {log.details && (
                          <div className="text-slate-500 text-[10px] font-mono mt-0.5 truncate">
                            {log.details}
                          </div>
                        )}
                      </div>

                      {/* Copy Action */}
                      <button
                        onClick={() => handleCopyLog(log)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 self-start"
                        title="Copy entry"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Terminal Console Footer */}
            <div className="px-5 py-2.5 bg-slate-900 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Socket: CONNECTED (0% Packet Drop)</span>
                <span className="text-slate-600">•</span>
                <span>TLS 1.3 AES-256-GCM</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Showing {filteredLogs.length} of {consoleLogs.length} events</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-semibold">UGC Statutory Audit Retention: 365 Days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Modal Progress */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-[#141417] rounded-2xl max-w-xl w-full shadow-2xl border border-neutral-200 dark:border-white/[0.08] overflow-hidden space-y-0">
            {/* Modal Header: Oxford Navy Bar */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#C5A059] shrink-0">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-white font-sans">
                    {isBackingUp ? 'Creating Cryptographic Snapshot...' : 'Cryptographic Snapshot Verified'}
                  </h3>
                  <p className="text-[10px] text-sky-200/80 font-mono mt-0.5">
                    UGC Statutory Disaster Vault Replication • AES-256-GCM
                  </p>
                </div>
              </div>
              {!isBackingUp && (
                <button 
                  onClick={() => setIsBackupModalOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center text-xs transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Precision Stepper */}
            <div className="px-6 pt-5 pb-2">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { step: 1, title: '1. Checkpoint', desc: 'PostgreSQL WAL' },
                  { step: 2, title: '2. Encrypt', desc: 'AES-256-GCM' },
                  { step: 3, title: '3. Mirror S3', desc: 'Frankfurt Vault' },
                  { step: 4, title: '4. Verified', desc: 'SHA-256 Match' }
                ].map(s => {
                  const isDone = backupStep > s.step || (!isBackingUp && backupStep === 4);
                  const isCurrent = backupStep === s.step && isBackingUp;
                  return (
                    <div 
                      key={s.step} 
                      className={`p-2.5 rounded-xl border transition-all text-center ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                          : isCurrent
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200 ring-1 ring-blue-400/30'
                          : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {isDone && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />}
                        <span className="font-mono text-[11px] font-bold block">{s.title}</span>
                      </div>
                      <span className="text-[9.5px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">{s.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Obsidian Terminal Box */}
            <div className="px-6 py-3">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#090C12] shadow-inner">
                <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-1 text-slate-300 font-medium">daemon-worker-01: /proc/sys/dr-backup.log</span>
                  </div>
                  <span className="text-[#C5A059] font-mono text-[9px] uppercase tracking-wider">TLS 1.3 Safe</span>
                </div>
                <div className="p-3 max-h-48 overflow-y-auto space-y-1 font-mono text-[11px] leading-relaxed text-slate-300 select-text">
                  {backupLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-slate-600 select-none text-[10px]">{String(idx + 1).padStart(2, '0')}</span>
                      <span className={log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' : log.includes('[CRYPTO]') ? 'text-purple-300' : log.includes('[S3]') ? 'text-sky-300' : 'text-slate-300'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  {isBackingUp && (
                    <div className="flex items-center gap-2 text-blue-400 animate-pulse text-[11px] mt-1">
                      <span className="text-slate-600 select-none text-[10px]">..</span>
                      <span>Streaming cryptographic blocks...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                {isBackingUp ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C5A059]" />
                    <span className="text-slate-600 dark:text-slate-300">Replicating to Frankfurt Cold Vault...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Integrity Verified (SHA-256 Match)</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isBackingUp ? (
                  <div className="px-4 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono font-medium cursor-not-allowed flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs font-semibold px-4"
                    onClick={() => setIsBackupModalOpen(false)}
                  >
                    Close &amp; Return to Dashboard
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restart Node Confirmation Modal */}
      {selectedNodeToRestart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Restart Subsystem Service
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {selectedNodeToRestart.name} ({selectedNodeToRestart.ip})
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This will gracefully signal the supervisor daemon to drain active requests and restart the service process. Zero downtime will occur as peer replicas are currently online.
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedNodeToRestart(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmRestart}>
                Confirm Restart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
