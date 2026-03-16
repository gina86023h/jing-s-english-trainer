import React, { useState } from 'react';
import { 
  LineChart, BookOpen 
} from 'lucide-react';

// 侧边栏子项组件
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
  const [activeLanguage, setActiveLanguage] = useState('CN'); // 语言切换状态

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* 侧边栏 */}
      <div style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e4e4e7', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <style dangerouslySetInnerHTML={{ __html: ".sidebar-item:not(.active):hover { background-color: #f4f4f5 !important; } .sidebar-sub-item:hover { background-color: #f4f4f5 !important; color: #18181b !important; }" }} />
        
        <div style={{ marginBottom: '32px', paddingLeft: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold' }}>英语水平等级</div>
        </div>

        <div style={{ flex: 1 }}>
          <SidebarItem label="Key (KET)" level="A2" active={activeLevel === 'KET'} onClick={() => setActiveLevel('KET')} />
          <SidebarItem label="Preliminary (PET)" level="B1" active={activeLevel === 'B1'} onClick={() => setActiveLevel('B1')} />
          <SidebarItem label="First (FCE)" level="B2" active={activeLevel === 'FCE'} onClick={() => setActiveLevel('FCE')} />
          <SidebarItem label="Advanced (CAE)" level="C1" active={activeLevel === 'CAE'} onClick={() => setActiveLevel('CAE')} />
          <SidebarItem label="Proficiency (CPE)" level="C2" active={activeLevel === 'C2'} onClick={() => setActiveLevel('C2')} />
          <SidebarItem label="IELTS Academic" level="All bands" active={activeLevel === 'IELTS'} onClick={() => setActiveLevel('IELTS')} />
        </div>

        <div style={{ marginTop: '32px', borderTop: '1px solid #f4f4f5', paddingTop: '24px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '16px' }}>LEARNING TOOLS</div>
          {['学习进度', '错题本'].map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                padding: '12px 16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', borderRadius: '12px', transition: 'all 0.2s', marginBottom: '4px',
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

          {/* 语言切换栏：带点击效果和指针反馈 */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '8px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
            <div 
              onClick={() => setActiveLanguage('EN')}
              style={{ 
                flex: 1, textAlign: 'center', fontSize: '12px', padding: '6px', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.2s',
                backgroundColor: activeLanguage === 'EN' ? '#4338ca' : 'transparent', 
                color: activeLanguage === 'EN' ? 'white' : '#71717a' 
              }}>
              GB EN
            </div>
            <div 
              onClick={() => setActiveLanguage('CN')}
              style={{ 
                flex: 1, textAlign: 'center', fontSize: '12px', padding: '6px', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.2s',
                backgroundColor: activeLanguage === 'CN' ? '#4338ca' : 'transparent', 
                color: activeLanguage === 'CN' ? 'white' : '#71717a' 
              }}>
              CN 中文
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区：全方位恢复视觉效果 */}
      <div style={{ flex: 1, padding: '60px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '40px' }}>
            <span style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
              ✦ 智能评估
            </span>
            
            <h1 style={{ 
              fontSize: '52px', fontWeight: '800', marginTop: '24px', 
              background: 'linear-gradient(to bottom, #1e293b 20%, #4338ca 100%)', 
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '-1.5px', lineHeight: 1.1
            }}>
              {activeLanguage === 'CN' ? "欢迎来到 Jing's English Trainer" : "Welcome to Jing's English Trainer"}
            </h1>
            
            <p style={{ color: '#71717a', fontSize: '20px', marginTop: '20px', lineHeight: '1.6' }}>
              {activeLanguage === 'CN' 
                ? "从 KET 到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。" 
                : "Structured translation practice from KET to IELTS. Get instant, intelligent feedback on grammar, vocabulary, and phrasing."}
            </p>
          </div>

          {/* 功能卡片 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            {[
              { cn: '结构化课程', en: 'Structured Courses', desc_cn: 'A2到C2分级练习', desc_en: 'A2 to C2 graded practice' },
              { cn: '即时AI反馈', en: 'Instant AI Feedback', desc_cn: '详细改正意见', desc_en: 'Detailed correction advice' },
              { cn: '考试导向', en: 'Exam Oriented', desc_cn: '专为剑桥雅思设计', desc_en: 'Designed for Cambridge & IELTS' }
            ].map((card, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', padding: '32px 24px', borderRadius: '20px', 
                border: '1px solid #e4e4e7', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '17px', marginBottom: '8px', color: '#18181b' }}>
                  {activeLanguage === 'CN' ? card.cn : card.en}
                </div>
                <div style={{ color: '#71717a', fontSize: '14px' }}>
                  {activeLanguage === 'CN' ? card.desc_cn : card.desc_en}
                </div>
              </div>
            ))}
          </div>

          <button style={{ 
            backgroundColor: '#4338ca', color: 'white', padding: '18px 56px', borderRadius: '16px', 
            border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 20px 25px -5px rgba(67, 56, 202, 0.2)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#3730a3'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = '#4338ca'; }}
          >
            {activeLanguage === 'CN' ? '开始练习' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}
