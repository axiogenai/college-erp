import React, { useState } from 'react';
import { 
  Bot, AlertTriangle, FileText, Send, 
  CheckCircle, ShieldCheck, HelpCircle, ArrowRight, 
  Lightbulb, BookOpen, Clock, User 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';

export const AiAssistantModule: React.FC = () => {
  const { students, notices, addNotice, logAudit } = useErpData();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'policy' | 'risk' | 'notice-drafter'>('policy');

  // Policy Q&A state
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<{ query: string; answer: string; citations: string }[]>([
    {
      query: 'What is the mandatory attendance requirement to appear for semester examinations?',
      answer: 'According to Ordinance 14.2 of the Academic Regulations, every undergraduate scholar must maintain a minimum of 75.0% aggregate attendance across all registered lecture and laboratory courses to qualify for the End-Semester Examination Hall Ticket. A relaxation up to 65.0% may be granted by the Academic Council solely on documented medical grounds or participation in approved inter-collegiate representations.',
      citations: 'Axiogen University Academic Bylaws (2024 Revised), Section 14: Attendance & Hall Ticket Eligibility'
    }
  ]);

  // Notice Drafter state
  const [noticeTopic, setNoticeTopic] = useState('');
  const [noticeAudience, setNoticeAudience] = useState<'All' | 'Students' | 'Faculty'>('All');
  const [generatedDraft, setGeneratedDraft] = useState<{ title: string; content: string; category: any; priority: any } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Policy Knowledge Base lookup simulator
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    let ans = "According to the institutional regulations, all academic and financial requirements must be fulfilled in adherence with university council guidelines.";
    let cite = "University General Governance Handbook (Section 4)";

    const qLower = question.toLowerCase();
    if (qLower.includes('attendance') || qLower.includes('shortage') || qLower.includes('75%')) {
      ans = "Statutory minimum attendance is 75%. Scholars falling between 65% and 75% require formal condonation approved by the Dean of Academic Affairs. Scholars with less than 65% are detained from the end-semester examinations and must re-register for the course.";
      cite = "Bylaws Chapter 8, Clause 8.3: Condonation of Attendance";
    } else if (qLower.includes('grade') || qLower.includes('passing') || qLower.includes('cgpa')) {
      ans = "The university follows the 10-point relative grading scale. Minimum passing requirement is 40% in internal continuous assessment and 40% in end-semester theory. Cumulative GPA of 5.0 is required for degree conferment.";
      cite = "Statute 12: Examination and Grading Framework";
    } else if (qLower.includes('refund') || qLower.includes('fee')) {
      ans = "Full tuition fee refund is permitted if withdrawal is submitted 15 days prior to session commencement, subject to an administrative deduction of INR 1,000. Subsequent withdrawals follow proportionate deductions in accordance with AICTE fee guidelines.";
      cite = "Treasury & Finance Manual 2026, Rule 9.1: Fee Refund and Caution Deposits";
    }

    setChatHistory(prev => [...prev, { query: question, answer: ans, citations: cite }]);
    logAudit('AI_POLICY_QUERY', 'AI', `User queried policy: "${question.slice(0, 40)}..."`);
    setQuestion('');
  };

  // Generate Draft Notice
  const handleGenerateNoticeDraft = () => {
    if (!noticeTopic.trim()) return;

    const draft = {
      title: `Official Directive: ${noticeTopic}`,
      content: `This circular is issued under the authority of the Dean of Academic Affairs regarding ${noticeTopic}. All relevant institutional stakeholders are advised to note the stipulated guidelines and adhere strictly to the schedule communicated herein. For queries, contact the academic registry office.`,
      category: 'Academic' as const,
      priority: 'high' as const
    };

    setGeneratedDraft(draft);
    logAudit('AI_GENERATED_CIRCULAR_DRAFT', 'AI', `Generated draft for topic: ${noticeTopic}`);
  };

  const handleApproveNotice = () => {
    if (!generatedDraft) return;
    setIsPublishing(true);

    addNotice({
      title: generatedDraft.title,
      category: generatedDraft.category,
      priority: generatedDraft.priority,
      publishDate: new Date().toISOString().split('T')[0],
      validUntil: '2026-12-31',
      content: generatedDraft.content,
      author: `${currentUser.name} (${currentUser.designation})`,
      targetAudience: noticeAudience,
      isPublished: true,
      isAiAssisted: true
    });

    setIsPublishing(false);
    setGeneratedDraft(null);
    setNoticeTopic('');
    setFeedback('AI-assisted circular officially approved and published to the university notice board.');
    setTimeout(() => setFeedback(null), 4000);
  };

  const criticalStudents = students.filter(s => s.riskLevel === 'critical');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise AI &amp; Academic Intelligence Suite"
        subtitle="Policy knowledge retrieval, early risk detection radar, and human-verified administrative drafts"
        icon={<Bot className="w-5 h-5 text-[#0F2942] dark:text-sky-400" />}
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

      {/* Compliance / Safety Callout */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-300" />
            <h3 className="text-sm font-semibold tracking-tight text-white font-serif">
              Enterprise Governance &amp; AI Privacy Boundary
            </h3>
          </div>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/20">
            Statutory Compliance Boundary
          </span>
        </div>
        <div className="p-4 bg-slate-50/40 dark:bg-slate-900/40 text-xs">
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            All AI capabilities operate under strict institutional confidentiality: outputs are grounded in verified university statutes, student data is filtered by active role authorization, and all consequential actions require executive human sign-off.
          </p>
        </div>
      </SoftCard>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('policy')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'policy'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Institutional Policy Assistant
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'risk'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Academic Risk Radar ({criticalStudents.length} Active Warnings)
        </button>
        <button
          onClick={() => setActiveTab('notice-drafter')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'notice-drafter'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Senate Notice Drafter (With Human Approval)
        </button>
      </div>

      {/* Tab 1: Policy Assistant */}
      {activeTab === 'policy' && (
        <div className="space-y-3">
          <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Institutional Regulations, Bylaws &amp; Calendars Engine
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  Instant retrieval from official ordinances, examination rules, and statutes
                </p>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-white border border-white/20 font-mono">
                AI Knowledge Engine
              </span>
            </div>

            <div className="p-5">

            {/* Q&A Chat Logs */}
            <div className="space-y-2.5 max-h-96 overflow-y-auto mb-3 p-1">
              {chatHistory.map((item, idx) => (
                <div key={idx} className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">User Question</span>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{item.query}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50/40 dark:bg-slate-800/60 p-3 rounded-lg border border-blue-200/50 dark:border-blue-900/40">
                    <Bot className="w-3.5 h-3.5 text-[#0F2942] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                          Axiogen Academic Intelligence
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                          Verified Policy
                        </span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                        {item.answer}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-1 border-t border-institutional-200/50 dark:border-institutional-800/50">
                        Citation: {item.citations}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt input */}
            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask e.g. 'What is the attendance condonation criteria?' or 'What is the passing CGPA?'..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-institutional-500"
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
              <button
                type="submit"
                className="whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#5B1389] via-[#450D6F] to-[#350757] hover:from-[#6A17A0] hover:via-[#501082] hover:to-[#3E0966] text-white border border-purple-400/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_2px_8px_rgba(69,13,111,0.35)] transition-all active:scale-[0.985] flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Query</span>
              </button>
            </form>
          </div>
        </SoftCard>
      </div>
      )}

      {/* Tab 2: Academic Risk Radar */}
      {activeTab === 'risk' && (
        <div className="space-y-3">
          <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Early Academic-Risk Diagnostic Dossier
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  Transparent multi-factor scoring (Attendance &lt; 75% + Assessment drops). Non-punitive counseling pipeline.
                </p>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-200 border border-rose-400/30 font-mono">
                ⚠ {criticalStudents.length} Students At Risk
              </span>
            </div>

            <div className="p-5">
              <div className="space-y-3">
              {criticalStudents.map(student => (
                <div key={student.id} className="p-3.5 rounded-lg border border-rose-200/80 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-rose-200/60 dark:border-rose-900/40">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{student.fullName}</span>
                      <span className="font-mono text-[11px] text-slate-500">({student.enrollmentId})</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-rose-700 dark:text-rose-400">
                      Risk Severity Score: {student.academicRiskScore}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2.5">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Attendance Metric</span>
                      <span className="text-xs font-bold font-mono text-rose-600">{student.attendancePercentage}%</span>
                      <span className="text-[10px] text-slate-500 block">6.6% below minimum requirement</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Continuous Assessment</span>
                      <span className="text-xs font-bold font-mono text-amber-600">{student.sgpa} SGPA</span>
                      <span className="text-[10px] text-slate-500 block">Failed Mid-Term 2 (CS502)</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Fee Account</span>
                      <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">INR {student.feeBalance.toLocaleString()} Due</span>
                      <span className="text-[10px] text-rose-500 block">Status: Overdue</span>
                    </div>
                  </div>

                  <div className="mt-2 space-y-0.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block text-[11px]">Identified Diagnostic Triggers:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400 text-[11px]">
                      {student.riskFactors?.map((rf, i) => (
                        <li key={i}>{rf}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-rose-200/60 dark:border-rose-900/40 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Guardian: {student.guardianName} ({student.guardianPhone})
                    </span>
                    <button
                      type="button"
                      className="whitespace-nowrap px-3 py-1 rounded-lg text-[11px] font-semibold bg-gradient-to-r from-[#5B1389] via-[#450D6F] to-[#350757] hover:from-[#6A17A0] hover:via-[#501082] hover:to-[#3E0966] text-white border border-purple-400/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_2px_8px_rgba(69,13,111,0.35)] transition-all active:scale-[0.985]"
                    >
                      Issue Counseling Summons
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </SoftCard>
        </div>
      )}

      {/* Tab 3: Senate Notice Drafter */}
      {activeTab === 'notice-drafter' && (
        <div className="space-y-3">
          <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  AI-Assisted Administrative Circular Drafting
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  Rapid regulatory and syndicate notice generation with mandatory executive approval
                </p>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-white border border-white/20 font-mono">
                Executive Verification
              </span>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Circular Directive Theme / Subject *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rescheduling of Semester 5 Laboratory Examinations due to University Founder's Day..."
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs"
                  value={noticeTopic}
                  onChange={e => setNoticeTopic(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Target Recipient Audience
                </label>
                <Select
                  size="sm"
                  className="w-full"
                  value={noticeAudience}
                  onChange={val => setNoticeAudience(val as any)}
                  options={[
                    { value: 'All', label: 'All University Members' },
                    { value: 'Students', label: 'Scholars & Students Only' },
                    { value: 'Faculty', label: 'Faculty & Teaching Staff Only' },
                  ]}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleGenerateNoticeDraft}
                  className="whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#5B1389] via-[#450D6F] to-[#350757] hover:from-[#6A17A0] hover:via-[#501082] hover:to-[#3E0966] text-white border border-purple-400/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_2px_8px_rgba(69,13,111,0.35)] transition-all active:scale-[0.985] flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Professional Gazette Draft</span>
                </button>
              </div>
            </div>

            {/* Generated Draft with Required Human Sign-Off */}
            {generatedDraft && (
              <div className="mt-4 p-3.5 rounded-lg border border-blue-500/25 bg-blue-50/30 dark:bg-slate-800/50 space-y-2.5 text-xs animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                      Generated Draft
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">{generatedDraft.title}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                    Pending Approval
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs">
                  {generatedDraft.content}
                </div>

                <p className="text-[11px] text-slate-500">
                  Author Sign-off: {currentUser.name} ({currentUser.designation}). By authorizing, this circular becomes live on the student portal and gazette ticker.
                </p>

                <div className="flex items-center justify-end gap-2 pt-1.5">
                  <Button variant="outline" size="sm" onClick={() => setGeneratedDraft(null)}>
                    Discard Draft
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    loading={isPublishing}
                    icon={<CheckCircle className="w-3.5 h-3.5" />}
                    onClick={handleApproveNotice}
                  >
                    Human Verify &amp; Officially Release
                  </Button>
                </div>
              </div>
            )}
          </SoftCard>
        </div>
      )}
    </div>
  );
};
