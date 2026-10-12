import React, { useState, useEffect } from 'react';
import { 
  Activity, Server, Database, HardDrive, Cpu, Clock, 
  CheckCircle, AlertTriangle, RefreshCw, ShieldCheck, Zap, 
  Terminal, Play, ArrowUpRight, Lock, RotateCcw, AlertOctagon, 
  Download, FileCheck, Layers, Wifi, Power
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Infrastructure & DevOps Telemetry"
        subtitle="High-availability cluster health, PostgreSQL connection pools, Redis in-memory cache vitals, background daemon daemons & disaster recovery snapshots"
        icon={<Activity className="w-5 h-5 text-institutional-600" />}
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
      <SoftCard className="p-4 bg-institutional-50/70 dark:bg-institutional-950/50 border-institutional-200 dark:border-institutional-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 relative" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 font-serif">
                  All Systems Operational &amp; Synchronized
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                  99.99% 30-Day SLA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                Cluster Region: ap-south-1 (Mumbai Private VPC) • Total Memory: 64 GB • Read Replicas: 2 Nodes Synchronized (0ms Lag)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right text-[11px] font-mono text-slate-500 mr-2">
              <span>Last Snapshot: </span>
              <strong className="text-slate-700 dark:text-slate-200 block text-[10px]">
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
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
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
              ? 'border-institutional-600 text-institutional-700 dark:text-institutional-300 dark:border-institutional-400'
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
              ? 'border-institutional-600 text-institutional-700 dark:text-institutional-300 dark:border-institutional-400'
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
              ? 'border-institutional-600 text-institutional-700 dark:text-institutional-300 dark:border-institutional-400'
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
          <SoftCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-institutional-50/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold uppercase text-[10px] tracking-wider border-b border-institutional-200 dark:border-slate-700">
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
          <SoftCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                  Disaster Recovery &amp; Cryptographic Snapshot Registry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
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
                  <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] font-semibold uppercase text-slate-500 border-b border-slate-200 dark:border-slate-700">
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
          </SoftCard>
        </div>
      )}

      {/* Tab 3: DevOps Live Console & Audit */}
      {activeTab === 'console' && (
        <div className="space-y-4">
          <SoftCard className="p-4 bg-slate-950 text-slate-100 font-mono text-xs rounded-2xl border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-[11px]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200">DevOps Cluster Event Stream</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                  LIVE SOCKET
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white h-7 text-[10px]"
                onClick={() => showToast('Diagnostics bundle exported as JSON')}
              >
                Export Diagnostics
              </Button>
            </div>

            <div className="space-y-1.5 max-h-96 overflow-y-auto p-2 text-[11px] leading-relaxed text-slate-300">
              <p className="text-emerald-400">[2026-10-09T18:00:00Z] [CRON] Attendance Daily Roll-up Daemon completed successfully. 1,480 student records aggregated.</p>
              <p className="text-slate-400">[2026-10-09T17:45:00Z] [HEALTH] HTTP ping latency check: all 5 internal nodes responding in &lt; 2.4ms.</p>
              <p className="text-slate-400">[2026-10-09T17:30:00Z] [POSTGRES] Autovacuum on &apos;timetable_slots&apos; reclaimed 12 dead tuples.</p>
              <p className="text-cyan-400">[2026-10-09T17:00:00Z] [REDIS] Eviction cycle complete. Zero expired sessions retained.</p>
              <p className="text-slate-400">[2026-10-09T16:15:00Z] [TLS] Let&apos;s Encrypt wildcard certificate verified (*.axiogen.edu, 64 days remaining).</p>
              <p className="text-amber-400">[2026-10-09T15:20:00Z] [AUTH] Elevated permission query by user-principal-01 authenticated via session token.</p>
              <p className="text-emerald-400">[2026-10-09T04:00:00Z] [SNAPSHOT] Automated daily snapshot verified and mirrored to secondary Frankfurt vault.</p>
            </div>
          </SoftCard>
        </div>
      )}

      {/* Backup Modal Progress */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-institutional-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {isBackingUp ? 'Creating Cryptographic Snapshot...' : 'Snapshot Complete'}
                </h3>
              </div>
              {!isBackingUp && (
                <button 
                  onClick={() => setIsBackupModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className={`p-2 rounded-lg border ${backupStep >= 1 ? 'bg-institutional-50 border-institutional-300 text-institutional-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                1. Checkpoint
              </div>
              <div className={`p-2 rounded-lg border ${backupStep >= 2 ? 'bg-institutional-50 border-institutional-300 text-institutional-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                2. Encrypt
              </div>
              <div className={`p-2 rounded-lg border ${backupStep >= 3 ? 'bg-institutional-50 border-institutional-300 text-institutional-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                3. Mirror S3
              </div>
              <div className={`p-2 rounded-lg border ${backupStep >= 4 ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                4. Verified
              </div>
            </div>

            {/* Terminal Log */}
            <div className="bg-slate-950 text-slate-200 font-mono text-[11px] p-3 rounded-xl max-h-48 overflow-y-auto space-y-1">
              {backupLogs.map((log, idx) => (
                <p key={idx}>{log}</p>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                disabled={isBackingUp}
                onClick={() => setIsBackupModalOpen(false)}
              >
                {isBackingUp ? 'Processing...' : 'Close & Return to Dashboard'}
              </Button>
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
