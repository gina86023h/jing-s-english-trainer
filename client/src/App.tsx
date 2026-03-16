import React, { useState } from 'react';
import { 
  Search, Bell, ChevronRight, GraduationCap, Settings, HelpCircle, 
  LineChart, BookOpen, Star, Brain, Target 
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

          {/* 语言切换栏交互优化 */}
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

      {/* 主内容区 - 恢复精美视觉设计 */}
      <div style={{ flex: 1, padding: '60px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '40px' }}>
            <span style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
              ✦ 智能评估
            </span>
            
            <h1 style={{ 
              fontSize: '48px', fontWeight: '800', marginTop: '20px', 
              background: 'linear-gradient(to bottom, #1e293b 20%, #4338ca 100%)', 
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px'
            }}>
              欢迎来到 Jing's English Trainer
            </h1>
            
            <p style={{ color: '#71717a', fontSize: '18px', marginTop: '16px', lineHeight: '1.6' }}>
              从 KET 到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。
            </p>
          </div>

          {/* 功能卡片网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '48px' }}>
            {[
              { title: '结构化课程', desc: 'A2到C2分级练习' },
              { title: '即时AI反馈', desc: '详细改正意见' },
              { title: '考试导向', desc: '专为剑桥雅思设计' }
            ].map((card, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', padding: '24px', borderRadius: '16px', 
                border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px', color: '#18181b' }}>{card.title}</div>
                <div style={{ color: '#71717a', fontSize: '13px' }}>{card.desc}</div>
              </div>
            ))}
          </div>

          <button style={{ 
            backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', 
            border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            开始练习
          </button>
        </div>
      </div>
    </div>
  );
}
