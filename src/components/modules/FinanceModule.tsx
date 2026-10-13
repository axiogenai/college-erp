import React, { useState } from 'react';
import { 
  CreditCard, Printer, CheckCircle, AlertTriangle, 
  Plus, RotateCcw, Download, Search, Filter 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { PageHeader } from '../common/PageHeader';
import { ReceiptModal } from '../common/ReceiptModal';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { FeeInvoice, FeePayment, RefundRequest } from '../../types';

export const FinanceModule: React.FC = () => {
  const { feeInvoices, feePayments, refundRequests, recordPayment, processRefund, addFeeInvoice, students } = useErpData();
  const { hasPermission } = useAuth();

  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'refunds'>('invoices');
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<FeeInvoice | null>(null);
  const [selectedPaymentForReceipt, setSelectedPaymentForReceipt] = useState<FeePayment | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  // Invoice creation form state
  const [newInvoiceData, setNewInvoiceData] = useState({
    studentId: '',
    academicYear: '2026–2027',
    semester: 5,
    dueDate: '2026-11-30',
    tuitionFee: 85000,
    labFee: 15000,
    libraryFee: 5000,
    developmentFee: 10000,
  });

  // Payment form state
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<FeePayment['paymentMode']>('UPI Gateway');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const canRecordPayment = hasPermission('record_fee_payment');
  const canApproveRefunds = hasPermission('approve_refunds');

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find(s => s.id === (newInvoiceData.studentId || students[0]?.id)) || students[0];
    if (!stu) return;

    const total = Number(newInvoiceData.tuitionFee) + Number(newInvoiceData.labFee) + Number(newInvoiceData.libraryFee) + Number(newInvoiceData.developmentFee);
    const res = addFeeInvoice({
      studentId: stu.id,
      studentName: stu.fullName,
      enrollmentId: stu.enrollmentId,
      department: stu.department,
      semester: newInvoiceData.semester,
      academicYear: newInvoiceData.academicYear,
      dueDate: newInvoiceData.dueDate,
      components: {
        tuitionFee: Number(newInvoiceData.tuitionFee),
        labFee: Number(newInvoiceData.labFee),
        libraryFee: Number(newInvoiceData.libraryFee),
        developmentFee: Number(newInvoiceData.developmentFee),
        examinationFee: 0
      },
      totalAmount: total,
      paidAmount: 0,
      balanceAmount: total,
      status: 'unpaid'
    });

    setIsCreateInvoiceOpen(false);
    setFeedback(res.message);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenPayModal = (invoice: FeeInvoice) => {
    setSelectedInvoiceForPay(invoice);
    setPaymentAmount(invoice.balanceAmount);
    setTransactionRef(`TXN-BANK-${Date.now().toString().slice(-6)}`);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceForPay) return;

    const res = recordPayment(selectedInvoiceForPay.id, paymentAmount, paymentMode, transactionRef);
    if (res.success) {
      setFeedback(res.message);
      setSelectedInvoiceForPay(null);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleRefundAction = (id: string, action: 'approve' | 'reject') => {
    processRefund(id, action, 'Comptroller of Finance verified ledger clearance');
    setFeedback(`Refund request ${id} ${action}d successfully.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Treasury, Fee Invoicing &amp; Cashflow Reconciliation"
        subtitle="End-to-end fee accounting, invoice generation, transaction-safe receipts, and caution refund authorizations"
        icon={<CreditCard className="w-5 h-5" />}
        actions={
          canRecordPayment && (
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateInvoiceOpen(true)}
            >
              Generate Fee Invoice
            </Button>
          )
        }
      />

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'invoices'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Fee Invoices &amp; Receivables ({feeInvoices.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'payments'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Settled Payments &amp; Receipts ({feePayments.length})
        </button>
        <button
          onClick={() => setActiveTab('refunds')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'refunds'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Refund Claims ({refundRequests.length})
        </button>
      </div>

      {/* Tab 1: Invoices */}
      {activeTab === 'invoices' && (
        <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold font-serif text-white">
                Student Fee Invoices &amp; Receivables Ledger ({feeInvoices.length} Invoices)
              </h3>
              <p className="text-xs text-sky-200/80 mt-0.5">
                Official billing statements, payment clearance tracking, and term accounts
              </p>
            </div>
            <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20 w-fit">
              AY 2026–27 Billing
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white font-semibold uppercase text-[10px] tracking-wider border-b border-blue-500/25">
                <tr>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Invoice Number</th>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Scholar Name</th>
                  <th className="px-4 py-3 align-middle">Department</th>
                  <th className="px-4 py-3 align-middle text-right whitespace-nowrap">Total Billed</th>
                  <th className="px-4 py-3 align-middle text-right whitespace-nowrap">Amount Paid</th>
                  <th className="px-4 py-3 align-middle text-right whitespace-nowrap">Balance Due</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Due Date</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap w-32">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {feeInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 align-middle whitespace-nowrap font-mono font-bold text-slate-900 dark:text-slate-100">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block whitespace-nowrap">{inv.studentName}</span>
                      <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">{inv.enrollmentId}</span>
                    </td>
                    <td className="px-4 py-3 align-middle text-slate-600 dark:text-slate-300 max-w-[160px]">
                      {inv.department}
                    </td>
                    <td className="px-4 py-3 align-middle text-right whitespace-nowrap font-mono font-semibold">
                      INR {inv.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-middle text-right whitespace-nowrap font-mono text-emerald-600 font-semibold">
                      INR {inv.paidAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-middle text-right whitespace-nowrap font-mono font-bold text-slate-900 dark:text-slate-100">
                      INR {inv.balanceAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono text-slate-500">
                      {inv.dueDate}
                    </td>
                    <td className="px-4 py-3 align-middle text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        inv.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : inv.status === 'partial'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                      }`}>
                        {inv.status === 'paid' ? '✓ Paid' : inv.status === 'partial' ? '◑ Partial' : '✕ Overdue'}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-center w-32">
                      {inv.balanceAmount > 0 && canRecordPayment ? (
                        <button
                          onClick={() => handleOpenPayModal(inv)}
                          className="whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-semibold bg-institutional-600 hover:bg-institutional-700 text-white transition-colors"
                        >
                          Collect Payment
                        </button>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                          ✓ Settled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SoftCard>
      )}

      {/* Tab 2: Payments & Receipts */}
      {activeTab === 'payments' && (
        <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold font-serif text-white">
                Settled Payments &amp; Treasury Reconciled Receipts ({feePayments.length} Receipts)
              </h3>
              <p className="text-xs text-sky-200/80 mt-0.5">
                Multi-channel counter vouchers, online payment gateway clearances, and official receipts
              </p>
            </div>
            <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20 w-fit">
              Gateway Synced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white font-semibold uppercase text-[10px] tracking-wider border-b border-blue-500/25">
                <tr>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Receipt Number</th>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Scholar Name</th>
                  <th className="px-4 py-3 align-middle text-right whitespace-nowrap">Amount Settled</th>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Payment Channel</th>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Gateway Ref</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Timestamp</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Reconciliation</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Official Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {feePayments.map(pay => (
                  <tr key={pay.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 align-middle whitespace-nowrap font-mono font-bold text-slate-900 dark:text-slate-100">
                      {pay.receiptNumber}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block whitespace-nowrap">{pay.studentName}</span>
                      <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">{pay.enrollmentId}</span>
                    </td>
                    <td className="px-4 py-3 align-middle text-right whitespace-nowrap font-mono font-bold text-emerald-600">
                      INR {pay.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-middle whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                      {pay.paymentMode}
                    </td>
                    <td className="px-4 py-3 align-middle whitespace-nowrap font-mono text-[11px] text-slate-500">
                      {pay.transactionReference}
                    </td>
                    <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono text-[11px] text-slate-400">
                      {new Date(pay.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 align-middle text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                        ✓ Reconciled
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Printer className="w-3.5 h-3.5" />}
                        onClick={() => {
                          setSelectedPaymentForReceipt(pay);
                          setIsReceiptOpen(true);
                        }}
                      >
                        Print Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SoftCard>
      )}

      {/* Tab 3: Refund Claims */}
      {activeTab === 'refunds' && (
        <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold font-serif text-white">
                Treasury Caution Deposit &amp; Fee Refund Claims ({refundRequests.length} Claims)
              </h3>
              <p className="text-xs text-sky-200/80 mt-0.5">
                Security deposits, excess fee reversions, and bursar authorization workflows
              </p>
            </div>
            <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20 w-fit">
              Treasury Queue
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white font-semibold uppercase text-[10px] tracking-wider border-b border-blue-500/25">
                <tr>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Claim Ref</th>
                  <th className="px-4 py-3 align-middle whitespace-nowrap">Scholar Name</th>
                  <th className="px-4 py-3 align-middle text-right whitespace-nowrap">Claim Amount</th>
                  <th className="px-4 py-3 align-middle">Reason / Justification</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Claim Date</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Audit Status</th>
                  <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Authorization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {refundRequests.map(ref => (
                  <tr key={ref.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 align-middle whitespace-nowrap font-mono font-bold text-slate-900 dark:text-slate-100">
                      {ref.requestNumber}
                    </td>
                    <td className="px-4 py-3 align-middle whitespace-nowrap font-bold text-slate-900 dark:text-slate-100">
                      {ref.studentName}
                    </td>
                    <td className="px-4 py-3 align-middle text-right whitespace-nowrap font-mono font-bold text-slate-900 dark:text-slate-100">
                      INR {ref.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-middle text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {ref.reason}
                    </td>
                    <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono text-slate-400">
                      {ref.requestedDate}
                    </td>
                    <td className="px-4 py-3 align-middle text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        ref.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : ref.status === 'pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                      }`}>
                        {ref.status === 'approved' ? '✓ Approved' : ref.status === 'pending' ? '⏳ Pending' : '✕ Rejected'}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-center">
                      {ref.status === 'pending' && canApproveRefunds ? (
                        <div className="flex items-center justify-center gap-1.5">
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
                            Disburse
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SoftCard>
      )}

      {/* Collect Payment Modal */}
      {selectedInvoiceForPay && (
        <Modal
          isOpen={!!selectedInvoiceForPay}
          onClose={() => setSelectedInvoiceForPay(null)}
          title={`Collect Fee: ${selectedInvoiceForPay.studentName}`}
          subtitle={`Invoice ${selectedInvoiceForPay.invoiceNumber} • Remaining Due: INR ${selectedInvoiceForPay.balanceAmount.toLocaleString()}`}
          maxWidth="md"
        >
          <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Amount to Receive (INR)</label>
              <input
                type="number"
                min="1"
                max={selectedInvoiceForPay.balanceAmount}
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono text-sm font-bold"
                value={paymentAmount}
                onChange={e => setPaymentAmount(parseInt(e.target.value) || 0)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Payment Instrument Mode</label>
              <Select
                className="w-full"
                value={paymentMode}
                onChange={val => setPaymentMode(val as any)}
                options={[
                  { value: 'UPI Gateway', label: 'UPI Gateway (PhonePe / GPay / BHIM)' },
                  { value: 'Net Banking', label: 'Net Banking (HDFC / SBI / ICICI Direct)' },
                  { value: 'Credit/Debit Card', label: 'Credit / Debit Card' },
                  { value: 'Demand Draft', label: 'Demand Draft (Bank DD)' },
                  { value: 'NEFT/RTGS', label: 'NEFT / RTGS Wire Transfer' },
                ]}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Bank Transaction Reference / UTR</label>
              <input
                type="text"
                required
                placeholder="e.g. UTR-9821890421"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                value={transactionRef}
                onChange={e => setTransactionRef(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={() => setSelectedInvoiceForPay(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Confirm Receipt &amp; Settle
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Official Printable Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        payment={selectedPaymentForReceipt || undefined}
      />
    </div>
  );
};
