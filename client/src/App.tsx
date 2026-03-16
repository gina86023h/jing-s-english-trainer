import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight 
} from 'lucide-react';

const SidebarItem = ({ label, level, active, onClick }) => (
  <div 
    onClick={onClick} 
    style={{ 
      padding: 'clamp(6px, 1vh, 10px) 16px', // 随高度动态缩小的内边距
      backgroundColor: active ? '#4338ca' : 'transparent', 
      borderRadius: '10px', 
      cursor: 'pointer', 
      marginBottom: '2px',
      color: active ? 'white' : '#71717a', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      transition: 'all 0.2s',
      flexShrink: 1 // 允许在极端情况下收缩
    }}
  >
    <div style={{ overflow: 'hidden' }}>
      <div style={{ fontSize: '13px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ fontSize: '11px', opacity: active ? 0.8 : 0.6 }}>{level}</div>
    </div>
    {active && <span style={{ color: 'white', fontSize: '14px', marginLeft: '4px' }}>✦</span>}
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
      btn: "开始练习"
    }
  };

  const t = content.CN;

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden', 
      backgroundColor: '#fcfcfd', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      
      {/* 左侧栏：重构为严格不溢出结构 */}
      <div style={{ 
        width: '240px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #f1f1f4', 
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '2vh', paddingLeft: '12px', marginTop: '1vh' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>英语水平等级</div>
        </div>

        {/* 等级列表：占据剩余空间的中间部分 */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {[
            { id: 'KET', label: 'Key (KET)', level: 'A2' },
            { id: 'B1', label: 'Preliminary (PET)', level: 'B1' },
            { id: 'FCE', label: 'First (FCE)', level: 'B2' },
            { id: 'CAE', label: 'Advanced (CAE)', level: 'C1' },
            { id: 'C2', label: 'Proficiency (CPE)', level: 'C2' },
            { id: 'IELTS', label: 'IELTS Academic', level: 'All bands' }
          ].map(item => (
            <SidebarItem key={item.id} {...item} active={activeLevel === item.id} onClick={() => setActiveLevel(item.id)} />
          ))}
        </div>

        {/* 底部工具栏：强制在底部，且保留安全间距 */}
        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '16px', 
          paddingBottom: '24px', // 确保距离底部有类似GPT的构图距离
          borderTop: '1px solid #f4f4f5' 
        }}>
          {['学习进度', '错题本'].map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                padding: '10px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', borderRadius: '10px', marginBottom: '4px',
                backgroundColor: activeTab === item ? '#4338ca' : 'transparent',
                color: activeTab === item ? 'white' : '#71717a'
              }}
            >
              {item === '学习进度' ? <LineChart size={16} /> : <BookOpen size={16} />}
              <span style={{ fontWeight: '500' }}>{item}</span>
            </div>
          ))}

          <div style={{ marginTop: '12px', display: 'flex', gap: '4px', padding: '3px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
            {['EN', 'CN'].map(lang => (
              <div key={lang} onClick={() => setActiveLanguage(lang)} style={{ 
                  flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px', cursor: 'pointer', borderRadius: '6px',
                  backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', 
                  color: activeLanguage === lang ? 'white' : '#71717a', fontWeight: 'bold'
                }}>{lang === 'EN' ? 'GB EN' : 'CN 中文'}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧主内容：锁定高度，禁止滚动 */}
      <div style={{ 
        flex: 1, 
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 40px',
        boxSizing: 'border-box',
        overflow: 'hidden' 
      }}>
        
        <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '2vh' }}>
          {t.tag}
        </div>

        <div style={{ textAlign: 'center', maxWidth: '100%' }}>
          <h1 style={{ fontSize: 'min(50px, 7vh)', fontWeight: '900', color: '#18181b', margin: 0, lineHeight: 1.1 }}>
            {t.h1_top}
          </h1>
          <h1 style={{ 
            fontSize: 'min(50px, 7vh)', fontWeight: '900', margin: '0.5vh 0 1.5vh 0', 
            background: 'linear-gradient(to right, #4338ca, #6366f1)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '4px', lineHeight: 1.1
          }}>
            {t.h1_bot}
          </h1>
          
          <p style={{ 
            color: '#71717a', fontSize: 'min(16px, 1.8vh)', 
            margin: '0 auto', whiteSpace: 'nowrap'
          }}>
            {t.desc}
          </p>
        </div>

        {/* 卡片组：使用 flex 代替 grid 以获得更好的收缩控制 */}
        <div style={{ display: 'flex', gap: '20px', margin: '4vh 0', flexShrink: 1 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ 
              backgroundColor: 'white', padding: '2vh 20px', borderRadius: '24px', 
              border: '1px solid #f1f1f4', minWidth: '180px', textAlign: 'center'
            }}>
              <div style={{ backgroundColor: '#f5f7ff', width: '40px', height: '40px', borderRadius: '12px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain color="#4338ca" size={20} />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#18181b' }}>智能反馈</div>
            </div>
          ))}
        </div>

        <button style={{ 
          backgroundColor: '#4338ca', color: 'white', padding: '14px 40px', borderRadius: '12px', 
          border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.2)'
        }}>
          {t.btn} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
