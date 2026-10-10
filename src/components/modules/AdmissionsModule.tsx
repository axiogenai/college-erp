import React, { useState } from 'react';
import { 
  UserPlus, Search, Filter, CheckCircle, Clock, 
  FileCheck, AlertCircle, ChevronRight, Mail, Phone, Plus 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { AdmissionEnquiry } from '../../types';

export const AdmissionsModule: React.FC = () => {
  const { enquiries, updateEnquiryStatus, addEnquiry } = useErpData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newEnquiry, setNewEnquiry] = useState({
    candidateName: '',
    email: '',
    phone: '',
    programInterested: 'B.Tech Computer Science & Engineering',
    category: 'General' as const,
    entranceExam: 'JEE Advanced',
    score: 95.4,
    documentsStatus: 'verified' as const,
    applicationStatus: 'under_review' as const,
    counselorAssigned: 'Dr. Meera Nambiar',
    submissionDate: new Date().toISOString().split('T')[0]
  });

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = 
      enq.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.programInterested.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === 'all' || enq.applicationStatus === selectedStage;
    return matchesSearch && matchesStage;
  });

  const formatStage = (stage: string) => 
    stage.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const handleStageChange = (id: string, newStage: AdmissionEnquiry['applicationStatus']) => {
    updateEnquiryStatus(id, newStage);
    setFeedback(`Candidate ${id} moved to stage: ${formatStage(newStage)}`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const res = addEnquiry({
      candidateName: newEnquiry.candidateName,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      programInterested: newEnquiry.programInterested,
      category: newEnquiry.category,
      qualifyingExamScore: Number(newEnquiry.score),
      applicationStatus: newEnquiry.applicationStatus,
      documents: [
        { name: 'Class 12 Marksheet', status: 'verified' },
        { name: 'Entrance Rank Card', status: 'verified' }
      ],
      appliedDate: newEnquiry.submissionDate,
      assignedCounselor: newEnquiry.counselorAssigned,
      notes: `Entrance Exam: ${newEnquiry.entranceExam} (Score: ${newEnquiry.score}%)`
    });
    setIsAddModalOpen(false);
    setFeedback(res.message);
    setTimeout(() => setFeedback(null), 4000);
    setNewEnquiry({
      candidateName: '',
      email: '',
      phone: '',
      programInterested: 'B.Tech Computer Science & Engineering',
      category: 'General',
      entranceExam: 'JEE Advanced',
      score: 95.4,
      documentsStatus: 'verified',
      applicationStatus: 'under_review',
      counselorAssigned: 'Dr. Meera Nambiar',
      submissionDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admissions Funnel &amp; Merit Enrollment Pipeline"
        subtitle="Prospective scholar application management, document verification, and seat allocation"
        icon={<UserPlus className="w-5 h-5" />}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Register Candidate
          </Button>
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

      {/* Filter and Search Bar */}
      <SoftCard className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, application ref (e.g. APP-2026-0819)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800 dark:text-slate-100"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            className="w-full sm:w-56"
            value={selectedStage}
            onChange={val => setSelectedStage(val)}
            options={[
              { value: 'all', label: 'All Pipeline Stages' },
              { value: 'enquiry', label: 'Enquiry Stage' },
              { value: 'under_review', label: 'Under Review' },
              { value: 'documents_verified', label: 'Documents Verified' },
              { value: 'merit_listed', label: 'Merit Listed' },
              { value: 'enrolled', label: 'Enrolled / Confirmed' },
            ]}
          />
        </div>
      </SoftCard>

      {/* Candidates Table */}
      <SoftCard className="overflow-visible">
        <div className="overflow-x-visible">
          <table className="w-full text-left text-xs">
            <thead className="bg-institutional-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold uppercase text-[10px] tracking-wider border-b border-institutional-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 align-middle whitespace-nowrap">Application Ref</th>
                <th className="px-4 py-3 align-middle whitespace-nowrap">Candidate Name</th>
                <th className="px-4 py-3 align-middle">Target Program</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Score / Percentile</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Documents Status</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Current Stage</th>
                <th className="px-4 py-3 align-middle text-center whitespace-nowrap">Progress Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEnquiries.map((enq, idx) => {
                const verifiedCount = enq.documents.filter(d => d.status === 'verified').length;
                const totalDocs = enq.documents.length;
                const allVerified = verifiedCount === totalDocs;

                return (
                  <tr key={enq.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 align-middle whitespace-nowrap font-mono font-bold text-slate-900 dark:text-slate-100">
                      {enq.applicationNumber}
                    </td>
                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{enq.candidateName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{enq.email}</span>
                    </td>
                    <td className="px-4 py-3 align-middle text-slate-700 dark:text-slate-300 font-medium">
                      {enq.programInterested}
                    </td>
                    <td className="px-4 py-3 align-middle text-center whitespace-nowrap font-mono font-bold text-institutional-700 dark:text-institutional-300">
                      {enq.qualifyingExamScore}%
                    </td>
                    <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        allVerified
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                      }`}>
                        {allVerified ? `✓ ${verifiedCount}/${totalDocs} Verified` : `⏳ ${verifiedCount}/${totalDocs} Verified`}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        enq.applicationStatus === 'enrolled'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : enq.applicationStatus === 'merit_listed'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                          : enq.applicationStatus === 'documents_verified'
                          ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                          : enq.applicationStatus === 'under_review'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {enq.applicationStatus === 'enrolled'
                          ? '✓ Enrolled'
                          : enq.applicationStatus === 'merit_listed'
                          ? '★ Merit Shortlist'
                          : enq.applicationStatus === 'documents_verified'
                          ? '✓ Documents Verified'
                          : enq.applicationStatus === 'under_review'
                          ? '⏳ Under Review'
                          : formatStage(enq.applicationStatus)}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                      <Select
                        size="sm"
                        align="right"
                        direction={idx >= filteredEnquiries.length - 2 ? 'up' : 'down'}
                        className="w-40 inline-block text-left"
                        value={enq.applicationStatus}
                        onChange={val => handleStageChange(enq.id, val as any)}
                        options={[
                          { value: 'enquiry', label: 'Enquiry' },
                          { value: 'under_review', label: 'Under Review' },
                          { value: 'documents_verified', label: 'Verify Documents' },
                          { value: 'merit_listed', label: 'Merit Shortlist' },
                          { value: 'enrolled', label: 'Confirm Enrollment' },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SoftCard>

      {/* Register Candidate Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register Candidate in Admissions Pipeline"
        subtitle="Record application details, entrance exam credentials, and assign academic counselor"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateEnquiry} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Candidate Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newEnquiry.candidateName}
                onChange={e => setNewEnquiry({ ...newEnquiry, candidateName: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Email Address *</label>
              <input
                type="email"
                required
                placeholder="ananya.s@gmail.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newEnquiry.email}
                onChange={e => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98450 12345"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                value={newEnquiry.phone}
                onChange={e => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Program Interested</label>
              <Select
                className="w-full"
                value={newEnquiry.programInterested}
                onChange={val => setNewEnquiry({ ...newEnquiry, programInterested: val })}
                options={[
                  { value: 'B.Tech Computer Science & Engineering', label: 'B.Tech Computer Science & Engineering' },
                  { value: 'B.Tech Artificial Intelligence & Data Science', label: 'B.Tech Artificial Intelligence & Data Science' },
                  { value: 'B.Tech Electronics & Communication', label: 'B.Tech Electronics & Communication' },
                  { value: 'B.Tech Mechanical Engineering', label: 'B.Tech Mechanical Engineering' },
                  { value: 'MBA Executive', label: 'MBA Executive' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Entrance Percentile / Score</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                value={newEnquiry.score}
                onChange={e => setNewEnquiry({ ...newEnquiry, score: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Entrance Exam</label>
              <Select
                className="w-full"
                value={newEnquiry.entranceExam}
                onChange={val => setNewEnquiry({ ...newEnquiry, entranceExam: val })}
                options={[
                  { value: 'JEE Advanced', label: 'JEE Advanced' },
                  { value: 'JEE Main', label: 'JEE Main' },
                  { value: 'State CET / COMEDK', label: 'State CET / COMEDK' },
                  { value: 'CAT / GMAT', label: 'CAT / GMAT' },
                ]}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Register Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
