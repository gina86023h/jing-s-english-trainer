import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight 
} from 'lucide-react';

const SidebarItem = ({ label, level, active, onClick }: any) => (
  <div 
    onClick={onClick} 
    className={active ? 'sidebar-item active' : 'sidebar-item'}
    style={{ 
      padding: '10px 20px', // 缩小间距以适应单页
      backgroundColor: active ? '#4338ca' : 'transparent', 
      borderRadius: '12px', 
      cursor: 'pointer', 
      marginBottom: '2px', // 缩小项间距
      color: active ? 'white' : '#71717a', 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      transition: 'all 0.2s'
    }}
  >
    <div>
      <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{label}</div>
      <div style={{ fontSize: '11px', opacity: active ? 0.8 : 0.6 }}>{level} Level</div>
    </div>
    {active && <span style={{ color: 'white', fontSize: '16px' }}>✦</span>}
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
        { icon: <BookText color="#4338ca" size={24} />, title: '结构化课程', desc: '从A2到C2分级' },
        { icon: <Brain color="#4338ca" size={24} />, title: '即时AI反馈', desc: '详细的改正意见' },
        { icon: <Target color="#4338ca" size={24} />, title: '考试导向', desc: '专为剑桥和雅思设计' }
      ],
      btn: "开始练习"
    },
    EN: {
      tag: "● Smart Evaluation",
      h1_top: "Master Translation",
      h1_bot: "Step by Step",
      desc: "Structured translation practice from KET to IELTS. Get instant, intelligent feedback on grammar and phrasing.",
      cards: [
        { icon: <BookText color="#4338ca" size={24} />, title: 'Structured', desc: 'From A2 to C2' },
        { icon: <Brain color="#4338ca" size={24} />, title: 'AI Feedback', desc: 'Instant corrections' },
        { icon: <Target color="#4338ca" size={24} />, title: 'Exam Focus', desc: 'For IELTS & Cambridge' }
      ],
      btn: "Get Started"
    }
  };

  const t = activeLanguage === 'CN' ? content.CN : content.EN;

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', // 锁定视口高度，防止滚动
      overflow: 'hidden', 
      backgroundColor: '#fcfcfd', 
      fontFamily: 'sans-serif' 
    }}>
      
      {/* 侧边栏：优化布局防止溢出 */}
      <div style={{ 
        width: '240px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #f1f1f4', 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%'
      }}>
        <div style={{ marginBottom: '24px', paddingLeft: '16px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>英语水平等级</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}> {/* 仅在项目极多时内部微调 */}
          {[
            { id: 'KET', label: 'Key (KET)', level: 'A2' },
            { id: 'B1', label: 'Preliminary (PET)', level: 'B1' },
            { id: 'FCE', label: 'First (FCE)', level: 'B2' },
            { id: 'CAE', label: 'Advanced (CAE)', level: 'C1' },
            { id: 'C2', label: 'Proficiency (CPE)', level: 'C2' },
            { id: 'IELTS', label: 'IELTS Academic', level: 'All bands' }
          ].map(item => (
            <SidebarItem key={item.id} label={item.label} level={item.level} active={activeLevel === item.id} onClick={() => setActiveLevel(item.id)} />
          ))}
        </div>

        <div style={{ marginTop: '20px', borderTop: '1px solid #f4f4f5', paddingTop: '20px' }}>
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

          <div style={{ marginTop: '16px', display: 'flex', gap: '6px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
            {['EN', 'CN'].map(lang => (
              <div 
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                style={{ 
                  flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px', cursor: 'pointer', borderRadius: '6px',
                  backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', 
                  color: activeLanguage === lang ? 'white' : '#71717a',
                  fontWeight: 'bold'
                }}>
                {lang === 'EN' ? 'GB EN' : 'CN 中文'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 主内容区：消除滚动条，文字单行 */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px' 
      }}>
        
        <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '3vh' }}>
          {t.tag}
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '900', color: '#18181b', margin: 0, lineHeight: 1 }}>
            {t.h1_top}
          </h1>
          <h1 style={{ 
            fontSize: '56px', fontWeight: '900', margin: '10px 0 25px 0', 
            background: 'linear-gradient(to right, #4338ca, #6366f1)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '6px', lineHeight: 1
          }}>
            {t.h1_bot}
          </h1>
          
          {/* 图一优化：文字单行，不可换行 */}
          <p style={{ 
            color: '#71717a', 
            fontSize: '16px', 
            margin: '0 auto', 
            whiteSpace: 'nowrap', // 强制单行
            opacity: 0.9
          }}>
            {t.desc}
          </p>
        </div>

        {/* 紧凑版卡片组 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 220px)', gap: '20px', margin: '5vh 0' }}>
          {t.cards.map((card, i) => (
            <div key={i} style={{ 
              backgroundColor: 'white', padding: '24px 16px', borderRadius: '24px', 
              border: '1px solid #f1f1f4', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.02)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}>
              <div style={{ backgroundColor: '#f5f7ff', padding: '12px', borderRadius: '16px', marginBottom: '16px' }}>
                {card.icon}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '6px', color: '#18181b' }}>{card.title}</div>
              <div style={{ color: '#a1a1aa', fontSize: '13px' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <button style={{ 
          backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', 
          border: 'none', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 15px 20px -5px rgba(67, 56, 202, 0.25)'
        }}>
          {t.btn} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
