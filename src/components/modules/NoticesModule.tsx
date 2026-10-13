import React, { useState } from 'react';
import { 
  FileText, Search, Plus, Filter, Calendar, 
  CheckCircle, AlertCircle 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { InstitutionalNotice } from '../../types';

export const NoticesModule: React.FC = () => {
  const { notices, addNotice } = useErpData();
  const { currentUser, role } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Academic' as InstitutionalNotice['category'],
    priority: 'medium' as InstitutionalNotice['priority'],
    publishDate: new Date().toISOString().split('T')[0],
    validUntil: '2026-12-31',
    content: '',
    author: `${currentUser.name} (${currentUser.designation})`,
    targetAudience: 'All' as InstitutionalNotice['targetAudience'],
    isPublished: true,
    isAiAssisted: false
  });

  const filteredNotices = notices.filter(n => {
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === 'all' || n.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice(newNotice);
    setIsAddModalOpen(false);
    setFeedback(`Official circular published to campus registry.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const canCreate = role === 'principal' || role === 'faculty';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Official Senate Circulars, Notifications &amp; Gazette"
        subtitle="Institutional announcements, examination schedules, fee directives, and placements"
        icon={<FileText className="w-5 h-5 text-[#0F2942] dark:text-sky-400" />}
        actions={
          canCreate && (
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Issue New Circular
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

      {/* Filter and Search Bar */}
      <SoftCard className="border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-sky-300" />
            <h3 className="text-xs font-bold font-serif text-white tracking-wide uppercase">
              Notice Categorization &amp; Circular Search
            </h3>
          </div>
          <span className="text-[10px] font-mono text-sky-200 bg-white/10 px-2 py-0.5 rounded border border-white/15">
            Official Bulletins
          </span>
        </div>
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search circular title, reference number (e.g. CITS/ACAD/2026/041)..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800 dark:text-slate-100"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <Select
              className="w-full sm:w-56"
              value={selectedCat}
              onChange={val => setSelectedCat(val)}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'Academic', label: 'Academic' },
                { value: 'Examination', label: 'Examination' },
                { value: 'Fee/Finance', label: 'Fee & Finance' },
                { value: 'Placement', label: 'Placement' },
                { value: 'Administrative', label: 'Administrative' },
              ]}
            />
          </div>
        </div>
      </SoftCard>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotices.map(notice => (
          <SoftCard key={notice.id} hoverEffect className="overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800">
            {/* Dark Royal Oxford Navy Top Banner */}
            <div className="px-5 py-3 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                {notice.referenceNumber}
              </span>
              <div className="flex items-center gap-1.5">
                {notice.isAiAssisted && (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-sky-200 font-mono border border-white/15">
                    <FileText className="w-3 h-3 text-sky-300" /> Assisted
                  </span>
                )}
                {notice.priority === 'urgent' ? (
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-200 border border-rose-400/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                    Urgent
                  </span>
                ) : notice.priority === 'high' ? (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-400/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                    High Priority
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/85 border border-white/15 font-mono text-[10px] font-bold uppercase tracking-wider">
                    General
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-slate-100 mb-2">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {notice.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">{notice.author}</span>
                  <span>Audience: {notice.targetAudience}</span>
                </div>
                <div className="text-right font-mono">
                  <span>Date: {notice.publishDate}</span>
                  <span className="block text-[10px]">Valid thru: {notice.validUntil}</span>
                </div>
              </div>
            </div>
          </SoftCard>
        ))}
      </div>

      {/* Issue Circular Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Issue Official Institutional Circular"
        subtitle="Publishes directive to student and faculty portals with official university reference ID"
        maxWidth="md"
      >
        <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Circular Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule of Annual Convocation Ceremony"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-serif font-bold"
              value={newNotice.title}
              onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Category</label>
              <Select
                className="w-full"
                value={newNotice.category}
                onChange={val => setNewNotice({ ...newNotice, category: val as any })}
                options={[
                  { value: 'Academic', label: 'Academic' },
                  { value: 'Examination', label: 'Examination' },
                  { value: 'Fee/Finance', label: 'Fee/Finance' },
                  { value: 'Placement', label: 'Placement' },
                  { value: 'Administrative', label: 'Administrative' },
                ]}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Priority Level</label>
              <Select
                className="w-full"
                value={newNotice.priority}
                onChange={val => setNewNotice({ ...newNotice, priority: val as any })}
                options={[
                  { value: 'low', label: 'Low Priority' },
                  { value: 'medium', label: 'Medium Priority' },
                  { value: 'high', label: 'High Priority' },
                  { value: 'urgent', label: 'Urgent Directive' },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Directive Content *</label>
            <textarea
              required
              rows={4}
              placeholder="Type official notification body text..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              value={newNotice.content}
              onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Sign &amp; Issue Directive
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
