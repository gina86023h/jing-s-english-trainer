import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight 
} from 'lucide-react';

const SidebarItem = ({ label, level, active, onClick }: any) => (
  <div 
    onClick={onClick} 
    className={active ? 'sidebar-item active' : 'sidebar-item'}
    style={{ 
      padding: '8px 16px', // 进一步压缩高度
      backgroundColor: active ? '#4338ca' : 'transparent', 
      borderRadius: '10px', 
      cursor: 'pointer', 
      marginBottom: '2px',
      color: active ? 'white' : '#71717a', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      transition: 'all 0.2s'
    }}
  >
    <div style={{ overflow: 'hidden' }}>
      <div style={{ fontSize: '13px', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{label}</div>
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
      cards: [
        { icon: <BookText color="#4338ca" size={22} />, title: '结构化课程', desc: '从A2到C2分级' },
        { icon: <Brain color="#4338ca" size={22} />, title: '即时AI反馈', desc: '详细的改正意见' },
        { icon: <Target color="#4338ca" size={22} />, title: '考试导向', desc: '专为剑桥和雅思设计' }
      ],
      btn: "开始练习"
    },
    EN: {
      tag: "● Smart Evaluation",
      h1_top: "Master Translation",
      h1_bot: "Step by Step",
      desc: "Structured translation practice from KET to IELTS. Get instant, intelligent feedback on grammar and phrasing.",
      cards: [
        { icon: <BookText color="#4338ca" size={22} />, title: 'Structured', desc: 'From A2 to C2' },
        { icon: <Brain color="#4338ca" size={22} />, title: 'AI Feedback', desc: 'Instant corrections' },
        { icon: <Target color="#4338ca" size={22} />, title: 'Exam Focus', desc: 'For IELTS & Cambridge' }
      ],
      btn: "Get Started"
    }
  };

  const t = activeLanguage === 'CN' ? content.CN : content.EN;

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden', // 强制禁止整页滚动
      backgroundColor: '#fcfcfd', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      
      {/* 侧边栏：使用 flex-grow 确保底部内容可见 */}
      <div style={{ 
        width: '230px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #f1f1f4', 
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh'
      }}>
        <div style={{ marginBottom: '16px', paddingLeft: '12px', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>英语水平等级</div>
        </div>

        <div style={{ flex: 1, overflowY: 'hidden' }}> {/* 禁止项目区滚动 */}
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

        {/* 侧边栏底部固定内容 */}
        <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: '16px', paddingBottom: '8px' }}>
          {['学习进度', '错题本'].map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                padding: '10px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', borderRadius: '10px', marginBottom: '2px',
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
              <div 
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                style={{ 
                  flex: 1, textAlign: 'center', fontSize: '11px', padding: '5px', cursor: 'pointer', borderRadius: '6px',
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

      {/* 主内容区：使用 vh 动态控制间距 */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 40px',
        height: '100vh'
      }}>
        
        <div style={{ 
          backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', 
          fontSize: '12px', fontWeight: 'bold', marginBottom: '3vh' 
        }}>
          {t.tag}
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'min(52px, 6vh)', fontWeight: '900', color: '#18181b', margin: 0, lineHeight: 1.1 }}>
            {t.h1_top}
          </h1>
          <h1 style={{ 
            fontSize: 'min(52px, 6vh)', fontWeight: '900', margin: '1vh 0 2vh 0', 
            background: 'linear-gradient(to right, #4338ca, #6366f1)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '6px', lineHeight: 1.1
          }}>
            {t.h1_bot}
          </h1>
          
          <p style={{ 
            color: '#71717a', 
            fontSize: 'min(16px, 2vh)', 
            margin: '0 auto', 
            whiteSpace: 'nowrap', // 强制单行
            maxWidth: '100%'
          }}>
            {t.desc}
          </p>
        </div>

        {/* 紧凑版卡片组：高度自适应 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, min(220px, 25vw))', 
          gap: '20px', 
          margin: '4vh 0' 
        }}>
          {t.cards.map((card, i) => (
            <div key={i} style={{ 
              backgroundColor: 'white', padding: '2vh 16px', borderRadius: '24px', 
              border: '1px solid #f1f1f4', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.02)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}>
              <div style={{ backgroundColor: '#f5f7ff', padding: '12px', borderRadius: '16px', marginBottom: '12px' }}>
                {card.icon}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px', color: '#18181b' }}>{card.title}</div>
              <div style={{ color: '#a1a1aa', fontSize: '12px', lineHeight: 1.3 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <button style={{ 
          backgroundColor: '#4338ca', color: 'white', padding: 'min(14px, 2vh) 40px', borderRadius: '12px', 
          border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.2)'
        }}>
          {t.btn} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
