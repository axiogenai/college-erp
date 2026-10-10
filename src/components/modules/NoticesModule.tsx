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
        icon={<FileText className="w-5 h-5 text-institutional-600" />}
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
      <SoftCard className="p-4">
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
      </SoftCard>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotices.map(notice => (
          <SoftCard key={notice.id} hoverEffect className="overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800">
            {/* Soft Color Top Bar */}
            <div className="px-5 py-3 bg-institutional-100 dark:bg-slate-800 border-b border-institutional-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-institutional-700 dark:text-institutional-400">
                {notice.referenceNumber}
              </span>
              <div className="flex items-center gap-1.5">
                {notice.isAiAssisted && (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-600">
                    <FileText className="w-3 h-3 text-slate-400" /> Assisted
                  </span>
                )}
                <Badge
                  variant={
                    notice.priority === 'urgent' ? 'danger' :
                    notice.priority === 'high' ? 'warning' : 'neutral'
                  }
                  size="sm"
                >
                  {notice.priority === 'urgent' ? 'Urgent' : notice.priority === 'high' ? 'High Priority' : 'General'}
                </Badge>
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
                  { value: 'low', label: 'Low', dotColor: 'bg-slate-400' },
                  { value: 'medium', label: 'Medium', dotColor: 'bg-sky-500' },
                  { value: 'high', label: 'High', dotColor: 'bg-amber-500' },
                  { value: 'urgent', label: 'Urgent', dotColor: 'bg-rose-500' },
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
