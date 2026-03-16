import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight 
} from 'lucide-react';

const SidebarItem = ({ label, level, active, onClick }: any) => (
  <div 
    onClick={onClick} 
    className={active ? 'sidebar-item active' : 'sidebar-item'}
    style={{ 
      padding: '12px 20px', 
      backgroundColor: active ? '#4338ca' : 'transparent', 
      borderRadius: '12px', 
      cursor: 'pointer', 
      marginBottom: '4px', 
      color: active ? 'white' : '#71717a', 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      transition: 'all 0.2s'
    }}
  >
    <div>
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{label}</div>
      <div style={{ fontSize: '12px', opacity: active ? 0.8 : 0.6 }}>{level} Level</div>
    </div>
    {active && <span style={{ color: 'white', fontSize: '18px' }}>✦</span>}
  </div>
); 

export default function App() {
  const [activeTab, setActiveTab] = useState('');
  const [activeLevel, setActiveLevel] = useState('FCE');
  const [activeLanguage, setActiveLanguage] = useState('CN');

  const content = {
    CN: {
      tag: "● 智能评估",
      h1_top: "掌握英文翻译",
      h1_bot: "一步步提升",
      desc: "从KET到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。",
      cards: [
        { icon: <BookText color="#4338ca" size={28} />, title: '结构化课程', desc: '从A2到C2分级' },
        { icon: <Brain color="#4338ca" size={28} />, title: '即时AI反馈', desc: '详细的改正意见' },
        { icon: <Target color="#4338ca" size={28} />, title: '考试导向', desc: '专为剑桥和雅思设计' }
      ],
      btn: "开始练习"
    },
    EN: {
      tag: "● Smart Evaluation",
      h1_top: "Master Translation",
      h1_bot: "Step by Step",
      desc: "Structured translation practice from KET to IELTS. Get instant, intelligent feedback on grammar and phrasing.",
      cards: [
        { icon: <BookText color="#4338ca" size={28} />, title: 'Structured', desc: 'From A2 to C2' },
        { icon: <Brain color="#4338ca" size={28} />, title: 'AI Feedback', desc: 'Instant corrections' },
        { icon: <Target color="#4338ca" size={28} />, title: 'Exam Focus', desc: 'For IELTS & Cambridge' }
      ],
      btn: "Get Started"
    }
  };

  const t = activeLanguage === 'CN' ? content.CN : content.EN;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fcfcfd', fontFamily: 'sans-serif' }}>
      <div style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <style dangerouslySetInnerHTML={{ __html: ".sidebar-item:not(.active):hover { background-color: #f8f8fb !important; }" }} />
        <div style={{ marginBottom: '32px', paddingLeft: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold' }}>英语水平等级</div>
        </div>
        <div style={{ flex: 1 }}>
          {['KET', 'B1', 'FCE', 'CAE', 'C2', 'IELTS'].map(id => (
            <SidebarItem key={id} label={id} level={id} active={activeLevel === id} onClick={() => setActiveLevel(id)} />
          ))}
        </div>
        <div style={{ marginTop: '32px', borderTop: '1px solid #f4f4f5', paddingTop: '24px' }}>
          {['学习进度', '错题本'].map((item) => (
            <div key={item} onClick={() => setActiveTab(item)} style={{ padding: '12px 16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderRadius: '12px', backgroundColor: activeTab === item ? '#4338ca' : 'transparent', color: activeTab === item ? 'white' : '#71717a' }}>
              {item === '学习进度' ? <LineChart size={18} /> : <BookOpen size={18} />}
              <span style={{ fontWeight: '500' }}>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: '20px', display: 'flex', gap: '8px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
            {['EN', 'CN'].map(lang => (
              <div key={lang} onClick={() => setActiveLanguage(lang)} style={{ flex: 1, textAlign: 'center', fontSize: '12px', padding: '6px', cursor: 'pointer', borderRadius: '6px', backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', color: activeLanguage === lang ? 'white' : '#71717a' }}>
                {lang === 'EN' ? 'GB EN' : 'CN 中文'}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '24px' }}>{t.tag}</div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '64px', fontWeight: '900', color: '#18181b', margin: 0 }}>{t.h1_top}</h1>
          <h1 style={{ fontSize: '64px', fontWeight: '900', margin: '10px 0 30px 0', background: 'linear-gradient(to right, #4338ca, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '8px' }}>{t.h1_bot}</h1>
          <p style={{ color: '#71717a', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>{t.desc}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 240px)', gap: '24px', margin: '40px 0' }}>
          {t.cards.map((card, i) => (
            <div key={i} style={{ backgroundColor: 'white', padding: '32px 20px', borderRadius: '24px', border: '1px solid #f1f1f4', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#f5f7ff', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>{card.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#18181b' }}>{card.title}</div>
              <div style={{ color: '#a1a1aa', fontSize: '14px' }}>{card.desc}</div>
            </div>
          ))}
        </div>
        <button style={{ backgroundColor: '#4338ca', color: 'white', padding: '18px 48px', borderRadius: '16px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {t.btn} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
