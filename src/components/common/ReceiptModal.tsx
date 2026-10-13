import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { FeePayment, FeeInvoice } from '../../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment?: FeePayment;
  invoice?: FeeInvoice;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, payment, invoice }) => {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Official Institutional Fee Receipt" 
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            Ref: {payment.transactionReference}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" size="sm" icon={<Printer className="w-4 h-4" />} onClick={handlePrint}>
              Print / Save PDF
            </Button>
          </div>
        </div>
      }
    >
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 print:p-0 print:border-none" id="printable-receipt">
        {/* Institutional Letterhead */}
        <div className="border-b-2 border-institutional-800 pb-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-institutional-800 text-white flex items-center justify-center font-serif font-bold text-lg">
              A
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-institutional-900 dark:text-institutional-100 font-serif uppercase">
                Axiogen Institute of Technology & Sciences
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Autonomous University • NAAC Accredited &lsquo;A++&rsquo; Grade • Approved by AICTE
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            University Campus, Knowledge Corridor, Bengaluru – 560100 • Tel: +91 80 2841 9000 • finance@axiogen.edu.in
          </p>
          <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-institutional-50 text-institutional-800 dark:bg-institutional-950 dark:text-institutional-200 text-xs font-semibold tracking-wider uppercase border border-institutional-200">
            Official E-Treasury Receipt
          </div>
        </div>

        {/* Receipt Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 py-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl px-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Receipt Number</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{payment.receiptNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Transaction Date</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {new Date(payment.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Payment Mode</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{payment.paymentMode}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Student Name</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{payment.studentName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Enrollment ID</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{payment.enrollmentId}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Bank Ref / Txn ID</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px]">{payment.transactionReference}</span>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden my-4 text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-3 py-2">S.No</th>
                <th className="px-3 py-2">Fee Head / Description</th>
                <th className="px-3 py-2 text-right">Applicable Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {invoice?.components ? (
                <>
                  <tr>
                    <td className="px-3 py-2">01</td>
                    <td className="px-3 py-2">Tuition & Academic Instructional Fee</td>
                    <td className="px-3 py-2 text-right">INR {invoice.components.tuitionFee.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">02</td>
                    <td className="px-3 py-2">Advanced Computing & Laboratory Facility</td>
                    <td className="px-3 py-2 text-right">INR {invoice.components.labFee.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">03</td>
                    <td className="px-3 py-2">Central Library & Digital Journal Subscription</td>
                    <td className="px-3 py-2 text-right">INR {invoice.components.libraryFee.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">04</td>
                    <td className="px-3 py-2">Institutional Campus Infrastructure Development</td>
                    <td className="px-3 py-2 text-right">INR {invoice.components.developmentFee.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">05</td>
                    <td className="px-3 py-2">End-Semester Examination & Registry Evaluation</td>
                    <td className="px-3 py-2 text-right">INR {invoice.components.examinationFee.toLocaleString()}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td className="px-3 py-2">01</td>
                  <td className="px-3 py-2">Academic & Term Tuition Installment Fee</td>
                  <td className="px-3 py-2 text-right">INR {payment.amount.toLocaleString()}</td>
                </tr>
              )}
              <tr className="bg-slate-50 dark:bg-slate-800/40 font-bold text-slate-900 dark:text-slate-100">
                <td colSpan={2} className="px-3 py-2.5 text-right uppercase text-[11px]">Total Paid in this Transaction:</td>
                <td className="px-3 py-2.5 text-right text-sm text-institutional-700 dark:text-institutional-300">
                  INR {payment.amount.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verification & Signatory Stamp */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-neutral-200 dark:border-white/[0.08] text-xs">
          <div className="flex items-center gap-2 text-[#C5A059] mb-3 sm:mb-0">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <div>
              <span className="font-semibold block text-neutral-900 dark:text-[#EDEDEF]">Digitally Verified & Reconciled</span>
              <span className="text-[10px] text-neutral-400 dark:text-[#71717A]">Secured via University Treasury Gateway</span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="inline-block p-1 border border-dashed border-institutional-300 dark:border-institutional-700 rounded-lg mb-1">
              <span className="text-[10px] font-mono text-institutional-700 dark:text-institutional-300 font-semibold block px-2">
                AXIOGEN TREASURY STAMP
              </span>
            </div>
            <p className="font-serif font-bold text-slate-800 dark:text-slate-200">Mr. Rajeshwar Rao, CA</p>
            <p className="text-[10px] text-slate-400">Chief Bursar & Comptroller of Accounts</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
