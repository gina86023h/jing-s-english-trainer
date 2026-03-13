import React, { useState } from 'react';
import { 
  Search, Bell, ChevronRight, GraduationCap, Settings, HelpCircle, 
  LineChart, BookOpen, Star, Brain, Target 
} from 'lucide-react';
const SidebarItem = ({ label, level, active, onClick }: any) => (

<div onClick={onClick} className={active ? 'sidebar-item active' : 'sidebar-item'}
style={{ padding: '12px 20px', backgroundColor: active ? '#4338ca' : 'transparent', borderRadius: '12px', cursor: 'pointer', marginBottom: '4px', color: active ? 'white' : '#71717a', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
>
<div>
<div style={{ fontSize: '14px', fontWeight: 'bold' }}>{label}</div>
<div style={{ fontSize: '12px', opacity: active ? 0.8 : 0.6 }}>{level} Level</div>
</div>
{active && <span style={{ color: 'white', fontSize: '18px' }}>✦</span>}
</div>
); 
export default function App() {
  const [activeTab, setActiveTab] = React.useState('');
  const [activeLevel, setActiveLevel] = useState('FCE');
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <div style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e4e4e7', padding: '24px' }}>
       <style dangerouslySetInnerHTML={{ __html: ".sidebar-item:not(.active):hover { background-color: #f4f4f5 !important; } .sidebar-sub-item:hover { background-color: #f4f4f5 !important; color: #18181b !important; }" }} />
        <div style={{ marginBottom: '32px', paddingLeft: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold' }}>英语水平等级</div>
        </div>
        <SidebarItem label="Key (KET)" level="A2" active={activeLevel === 'KET'} onClick={() => setActiveLevel('KET')} />
<SidebarItem label="Preliminary (PET)" level="B1" active={activeLevel === 'B1'} onClick={() => setActiveLevel('B1')} />
<SidebarItem label="First (FCE)" level="B2" active={activeLevel === 'FCE'} onClick={() => setActiveLevel('FCE')} />
<SidebarItem label="Advanced (CAE)" level="C1" active={activeLevel === 'CAE'} onClick={() => setActiveLevel('CAE')} />
<SidebarItem label="Proficiency (CPE)" level="C2" active={activeLevel === 'CPE'} onClick={() => setActiveLevel('CPE')} />
<SidebarItem label="IELTS Academic" level="All bands" active={activeLevel === 'IELTS'} onClick={() => setActiveLevel('IELTS')} />
        <div style={{ marginTop: '32px', borderTop: '1px solid #f4f4f5', paddingTop: '24px' }}>
<div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '16px' }}>LEARNING TOOLS</div>
{['学习进度', '错题本'].map((item) => (

<div
key={item}
onClick={() => setActiveTab(item)}
style={{
padding: '12px 16px',
fontSize: '14px',
display: 'flex',
alignItems: 'center',
gap: '12px',
cursor: 'pointer',
borderRadius: '12px',
transition: 'all 0.2s',
marginBottom: '4px',
backgroundColor: activeTab === item ? '#4338ca' : 'transparent',
color: activeTab === item ? 'white' : '#71717a'
}}
onMouseEnter={(e) => { if(activeTab !== item) e.currentTarget.style.backgroundColor = '#f4f4f5' }}
onMouseLeave={(e) => { if(activeTab !== item) e.currentTarget.style.backgroundColor = 'transparent' }}
>
{item === '学习进度' ? <LineChart size={18} /> : <BookOpen size={18} />}
<span style={{ fontWeight: '500' }}>{item}</span>
</div>
))}
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
<div style={{ flex: 1, textAlign: 'center', fontSize: '12px', padding: '6px' }}>GB EN</div>
<div style={{ flex: 1, textAlign: 'center', fontSize: '12px', padding: '6px', backgroundColor: '#4338ca', color: 'white', borderRadius: '6px' }}>CN 中文</div>
</div>
      </div>
      <div style={{ flex: 1, padding: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>✦ 智能评估</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginTop: '20px', background: 'linear-gradient(to bottom, #1e293b 20%, #4338ca 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.2' }}>掌握英文翻译<br/>一步步提升</h1>
            <p style={{ color: '#71717a', fontSize: '18px', marginTop: '16px' }}>从 KET 到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e4e4e7' }}><strong>结构化课程</strong><br/><small>A2到C2分级</small></div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e4e4e7' }}><strong>即时AI反馈</strong><br/><small>详细改正意见</small></div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e4e4e7' }}><strong>考试导向</strong><br/><small>专为剑桥雅思设计</small></div>
          </div>
          <button style={{ backgroundColor: '#4338ca', color: 'white', padding: '16px 40px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>开始练习 →</button>
        </div>
      </div>
    </div>
  );
 }
