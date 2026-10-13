import React, { useState } from 'react';
import { 
  Award, CheckCircle, AlertTriangle, ShieldCheck, 
  FileText, Edit, Eye, Filter, Lock, Unlock 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { ExamRecord, MarksEntry } from '../../types';

export const ExaminationsModule: React.FC = () => {
  const { examRecords, updateMarksEntry, publishExamResults } = useErpData();
  const { hasPermission, currentUser } = useAuth();

  const [selectedExamId, setSelectedExamId] = useState<string>(examRecords[0]?.id || '');
  const [editingMarks, setEditingMarks] = useState<{ examId: string; studentId: string; internal: number; external: number } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentExam = examRecords.find(e => e.id === selectedExamId) || examRecords[0];

  const canEditMarks = hasPermission('enter_marks');
  const canPublish = hasPermission('publish_results');

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMarks) return;

    updateMarksEntry(editingMarks.examId, editingMarks.studentId, editingMarks.internal, editingMarks.external);
    setEditingMarks(null);
    setFeedback('Marks and grade points updated successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handlePublish = () => {
    if (!currentExam) return;
    const res = publishExamResults(currentExam.id);
    if (res.success) {
      setFeedback(res.message);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Examinations, Evaluation & Autonomous Gradebook"
        subtitle="Configurable institutional grading scale (O to F), marks entry and COE-authorized result publication"
        icon={<Award className="w-5 h-5" />}
        actions={
          currentExam?.status !== 'published' && canPublish && (
            <Button
              variant="primary"
              size="sm"
              icon={<ShieldCheck className="w-4 h-4" />}
              onClick={handlePublish}
            >
              Authorize Official Publication
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

      {/* Select Exam Card */}
      <SoftCard className="border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-t-xl">
          <div>
            <h3 className="text-sm font-bold font-serif text-white">
              Examination Session &amp; Diet Parameters
            </h3>
            <p className="text-xs text-sky-200/80 mt-0.5">
              Select course diet, moderation status, and continuous assessment gradebook
            </p>
          </div>
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20 w-fit">
            Publication: {currentExam.status === 'published' ? 'Officially Released' : currentExam.status === 'under_review' ? 'Under Review' : 'Draft Entry'}
          </span>
        </div>

        <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">Select Exam Diet:</label>
            <Select
              className="w-full sm:w-80"
              value={selectedExamId}
              onChange={val => setSelectedExamId(val)}
              options={examRecords.map(exam => ({
                value: exam.id,
                label: `${exam.examName} (${exam.subjectCode})`,
                badge: exam.status === 'published' ? 'Published' : exam.status === 'under_review' ? 'Under Review' : 'Draft'
              }))}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">COE Standing:</span>
            <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
              currentExam.status === 'published'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                : currentExam.status === 'under_review'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}>
              {currentExam.status === 'published' ? '✓ Officially Published' : currentExam.status === 'under_review' ? '⏳ Under Review by COE' : 'Draft'}
            </span>
          </div>
        </div>
      </SoftCard>

      {/* Grading Scale Reference Card */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
          <h4 className="text-xs font-bold font-serif text-white tracking-wide uppercase">
            Statutory Relative Grading Matrix (UGC / AICTE 10-Point System)
          </h4>
          <span className="text-[10px] font-mono text-sky-200 bg-white/10 px-2 py-0.5 rounded border border-white/15">
            Ordinance 12.4 Standard
          </span>
        </div>
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] font-mono">
              Grade Point Scale Distribution:
            </span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">O: 90+ (10 GP)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">A+: 80–89 (9 GP)</span>
              <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700">A: 70–79 (8 GP)</span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700">B+: 60–69 (7 GP)</span>
              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">F: &lt;40 (Fail)</span>
            </div>
          </div>
        </div>
      </SoftCard>

      {/* Marks Registry Table */}
      <SoftCard className="overflow-hidden">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-serif text-white">
              Evaluated Student Gradebook ({currentExam.subjectName})
            </h3>
            <p className="text-xs text-sky-200/80 mt-0.5">
              Subject Code: {currentExam.subjectCode} • Academic Year: {currentExam.academicYear} • Term: Sem {currentExam.semester}
            </p>
          </div>
          {currentExam.publishedBy && (
            <span className="text-[11px] text-sky-200/90 font-mono">
              Authorized By: {currentExam.publishedBy}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white font-semibold uppercase text-[10px] tracking-wider border-b border-blue-500/25">
              <tr>
                <th className="px-4 py-3 align-middle whitespace-nowrap">Roll Number</th>
                <th className="px-4 py-3 align-middle whitespace-nowrap">Scholar Name</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Internal (Max 40)</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">External (Max 60)</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Total (Max 100)</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Letter Grade</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Grade Points</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Outcome</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentExam.marks.map(entry => (
                <tr key={entry.studentId} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 align-middle whitespace-nowrap font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {entry.enrollmentId}
                  </td>
                  <td className="px-4 py-3 align-middle whitespace-nowrap font-bold text-slate-900 dark:text-slate-100">
                    {entry.studentName}
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono">
                    {entry.internalMarks}
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono">
                    {entry.externalMarks}
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono font-bold text-slate-900 dark:text-slate-100">
                    {entry.totalMarks}
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-institutional-100 text-institutional-800 dark:bg-institutional-950 dark:text-institutional-200">
                      {entry.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono font-bold">
                    {entry.gradePoints}
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                      entry.status === 'pass'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                    }`}>
                      {entry.status === 'pass' ? '✓ Pass' : '✕ Fail'}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                    {canEditMarks && currentExam.status !== 'published' ? (
                      <button
                        onClick={() => setEditingMarks({
                          examId: currentExam.id,
                          studentId: entry.studentId,
                          internal: entry.internalMarks,
                          external: entry.externalMarks
                        })}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 inline-block"
                        title="Edit Marks"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-300 inline-block" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SoftCard>

      {/* Edit Marks Modal */}
      {editingMarks && (
        <Modal
          isOpen={!!editingMarks}
          onClose={() => setEditingMarks(null)}
          title="Update Examination Marks"
          subtitle="Modifications trigger automated grade recalculation and audit trail logging"
          maxWidth="sm"
        >
          <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Internal Assessment (Max 40)</label>
              <input
                type="number"
                min="0"
                max="40"
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                value={editingMarks.internal}
                onChange={e => setEditingMarks({ ...editingMarks, internal: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">External Theory (Max 60)</label>
              <input
                type="number"
                min="0"
                max="60"
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                value={editingMarks.external}
                onChange={e => setEditingMarks({ ...editingMarks, external: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-[11px] font-mono">
              Total Calculated: <strong>{editingMarks.internal + editingMarks.external} / 100</strong>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={() => setEditingMarks(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Recalculate &amp; Commit
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
