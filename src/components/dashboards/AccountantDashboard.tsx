import React, { useState } from 'react';
import { 
  CreditCard, TrendingUp, AlertTriangle, CheckCircle, 
  Clock, ArrowDownRight, Printer, ShieldCheck, 
  RotateCcw, RefreshCw, ChevronRight, FileSpreadsheet 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ReceiptModal } from '../common/ReceiptModal';
import { useErpData } from '../../context/ErpDataContext';

interface AccountantDashboardProps {
  onNavigate: (module: string) => void;
}

export const AccountantDashboard: React.FC<AccountantDashboardProps> = ({ onNavigate }) => {
  const { feeInvoices, feePayments, refundRequests, processRefund } = useErpData();

  const totalInvoiced = feeInvoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalCollected = feeInvoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOverdue = feeInvoices.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.balanceAmount, 0);
  
  const pendingRefunds = refundRequests.filter(r => r.status === 'pending');

  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleRefundAction = (id: string, action: 'approve' | 'reject') => {
    processRefund(id, action, `Treasury Bursar authorized via Accountant Dashboard`);
    setActionMessage(`Refund request #${id} ${action}d successfully.`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Action Notification */}
      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-emerald-600 hover:text-emerald-800 font-bold">✕</button>
        </div>
      )}

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Cashflow Collections"
          value={`INR ${(totalCollected / 1000).toLocaleString()}k`}
          change="+18.4% today"
          trend="up"
          trendLabel="HDFC Gateway"
          subtitle="Net Settled in Treasury"
          colorScheme="emerald"
          icon={<CreditCard className="w-5 h-5" />}
        />
        <StatCard
          title="Outstanding Receivables"
          value={`INR ${(totalOverdue / 1000).toLocaleString()}k`}
          change="3 Overdue Invoices"
          trend="down"
          subtitle="Fall Term Tuition"
          colorScheme="rose"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <StatCard
          title="Pending Refund Claims"
          value={pendingRefunds.length.toString()}
          change="Action Required"
          trend="neutral"
          subtitle="Caution Deposits & Duplicate Payments"
          colorScheme="institutional"
          icon={<RotateCcw className="w-5 h-5" />}
        />
        <StatCard
          title="Gateway Health & Reconciliation"
          value="99.98%"
          change="Zero Anomalies"
          trend="up"
          subtitle="Razorpay / HDFC Integrated Node"
          colorScheme="institutional"
          icon={<ShieldCheck className="w-5 h-5" />}
        />
      </div>

      {/* Main Treasury Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Refunds & Overdue Invoices */}
        <div className="lg:col-span-7 space-y-6">
          {/* Refund Approval Queue */}
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-institutional-50/80 dark:bg-slate-800/90 border-b border-institutional-200/70 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                  Treasury Refund Requests
                </h3>
              </div>
              <Badge variant={pendingRefunds.length > 0 ? 'warning' : 'success'} size="sm">
                {pendingRefunds.length} Pending Approval
              </Badge>
            </div>

            <div className="p-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {pendingRefunds.map(ref => (
                  <div key={ref.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{ref.requestNumber}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{ref.studentName}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Amount: <strong>INR {ref.amount.toLocaleString()}</strong> • Reason: {ref.reason}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRefundAction(ref.id, 'reject')}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleRefundAction(ref.id, 'approve')}
                      >
                        Approve &amp; Disburse
                      </Button>
                    </div>
                  </div>
                ))}

                {pendingRefunds.length === 0 && (
                  <div className="py-6 text-center text-slate-400 text-xs">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-1 opacity-70" />
                    All student caution deposit refunds are fully processed.
                  </div>
                )}
              </div>
            </div>
          </SoftCard>

          {/* Overdue Fee Invoices */}
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-institutional-50/80 dark:bg-slate-800/90 border-b border-institutional-200/70 dark:border-slate-700/80 flex items-center justify-between">
              <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                Overdue Student Invoices
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] h-7"
                onClick={() => onNavigate('finance')}
              >
                Open Full Ledger
              </Button>
            </div>

            <div className="p-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {feeInvoices.filter(i => i.status === 'overdue' || i.status === 'partial').map(inv => (
                  <div key={inv.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{inv.invoiceNumber}</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{inv.studentName}</span>
                      </div>
                      <p className="text-[11px] text-rose-600 mt-0.5">
                        Balance Due: INR {inv.balanceAmount.toLocaleString()} • Due Date: {inv.dueDate}
                      </p>
                    </div>
                    <Badge variant={inv.status === 'overdue' ? 'danger' : 'warning'} size="sm">
                      {inv.status === 'overdue' ? 'Overdue' : 'Partial'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </SoftCard>
        </div>

        {/* Right: Settled Transactions & Reconciliation Ledger */}
        <div className="lg:col-span-5 space-y-6">
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-institutional-50/80 dark:bg-slate-800/90 border-b border-institutional-200/70 dark:border-slate-700/80 flex items-center justify-between">
              <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                Recent Reconciled Receipts
              </h3>
              <Badge variant="success" size="sm" dot>Gateway Synced</Badge>
            </div>

            <div className="p-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {feePayments.map(pay => (
                  <div key={pay.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100 block">{pay.receiptNumber}</span>
                      <span className="text-slate-500 text-[11px]">{pay.studentName} • INR {pay.amount.toLocaleString()}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Printer className="w-3.5 h-3.5" />}
                      onClick={() => {
                        setSelectedPayment(pay);
                        setIsReceiptOpen(true);
                      }}
                      className="text-[11px] h-7"
                    >
                      Receipt
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => onNavigate('finance')}
                >
                  Record New Payment Counter Voucher
                </Button>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        payment={selectedPayment}
      />
    </div>
  );
};
