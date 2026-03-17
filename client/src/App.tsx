import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight, ChevronLeft, Send
} from 'lucide-react';

// --- 子组件：侧边栏等级项 ---
const SidebarItem = ({ label, level, active, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        padding: 'calc(6px + 0.5vh) 16px',
        backgroundColor: active ? '#4338ca' : (isHovered ? '#f4f4f5' : 'transparent'), 
        borderRadius: '12px', cursor: 'pointer', marginBottom: '4px',
        color: active ? 'white' : '#71717a', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.2s ease', flexShrink: 1,
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>{label}</div>
        <div style={{ fontSize: '11px', opacity: active ? 0.9 : 0.6 }}>{level}</div>
      </div>
      {active && <span style={{ fontSize: '12px' }}>✦</span>}
    </div>
  );
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState('FCE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false); // 控制是否进入题目界面
  const [userInput, setUserInput] = useState('');

  // 国际化文案
  const content = {
    CN: {
      tag: "● 智能评估",
      h1_top: "掌握英文翻译",
      h1_bot: "一步步提升",
      desc: "从KET到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。",
      cards: [
        { icon: <BookText color="#4338ca" size={24} />, title: '结构化课程', info: '从A2到C2分级' },
        { icon: <Brain color="#4338ca" size={24} />, title: '即时AI反馈', info: '详细的改正意见' },
        { icon: <Target color="#4338ca" size={24} />, title: '考试导向', info: '专为剑桥和雅思设计' }
      ],
      btn: "开始练习",
      back: "返回主页",
      placeholder: "在此输入您的翻译..."
    },
    EN: {
      tag: "● AI Evaluation",
      h1_top: "Master Translation",
      h1_bot: "Step by Step",
      desc: "Structured practice from KET to IELTS. Get instant feedback on grammar and phrasing.",
      cards: [
        { icon: <BookText color="#4338ca" size={24} />, title: 'Structured', info: 'From A2 to C2' },
        { icon: <Brain color="#4338ca" size={24} />, title: 'AI Feedback', info: 'Instant correction' },
        { icon: <Target color="#4338ca" size={24} />, title: 'Exam Focus', info: 'IELTS & Cambridge' }
      ],
      btn: "Get Started",
      back: "Back Home",
      placeholder: "Type your translation here..."
    }
  };

  const t = activeLanguage === 'CN' ? content.CN : content.EN;

  return (
    <div style={{ 
      display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: '#fcfcfd', position: 'fixed', top: 0, left: 0, fontFamily: 'sans-serif'
    }}>
      
      {/* 1. 左侧栏 */}
      <nav style={{ 
        width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', 
        display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 16px', boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold' }}>
            {activeLanguage === 'CN' ? '英语水平等级' : 'LEVELS'}
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
          {[
            { id: 'KET', label: 'Key (KET)', level: 'A2 Level' },
            { id: 'PET', label: 'Preliminary (PET)', level: 'B1 Level' },
            { id: 'FCE', label: 'First (FCE)', level: 'B2 Level' },
            { id: 'CAE', label: 'Advanced (CAE)', level: 'C1 Level' },
            { id: 'CPE', label: 'Proficiency (CPE)', level: 'C2 Level' },
            { id: 'IELTS', label: 'IELTS Academic', level: 'All bands Level' }
          ].map(item => (
            <SidebarItem 
              key={item.id} {...item} 
              active={activeLevel === item.id} 
              onClick={() => {
                setActiveLevel(item.id);
                setIsStarted(false); // 切换等级时回到欢迎页
              }} 
            />
          ))}
        </div>

        {/* 底部语言切换 */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', paddingBottom: '24px', borderTop: '1px solid #f4f4f5' }}>
          <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '10px' }}>
            {['EN', 'CN'].map(lang => (
              <button 
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                style={{ 
                  flex: 1, border: 'none', padding: '8px', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                  backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', 
                  color: activeLanguage === lang ? 'white' : '#71717a'
                }}
              >
                {lang === 'EN' ? 'GB EN' : 'CN 中文'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. 右侧动态内容区 */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative' }}>
        
        {!isStarted ? (
          /* --- 欢迎主页界面 --- */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', marginBottom: '3vh' }}>
              {t.tag}
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '2vh' }}>
              <h1 style={{ fontSize: 'min(56px, 7vh)', fontWeight: '850', color: '#18181b', margin: 0, lineHeight: 1.1 }}>{t.h1_top}</h1>
              <h1 style={{ 
                fontSize: 'min(56px, 7vh)', fontWeight: '850', margin: '8px 0', 
                background: 'linear-gradient(135deg, #4338ca 0%, #818cf8 100%)', 
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.1
              }}>{t.h1_bot}</h1>
              <p style={{ color: '#71717a', fontSize: '18px', maxWidth: '600px', margin: '20px auto' }}>{t.desc}</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '5vh' }}>
              {t.cards.map((card, i) => (
                <div key={i} style={{ 
                  backgroundColor: 'white', padding: '24px', borderRadius: '24px', 
                  border: '1px solid #f1f1f4', width: '200px', textAlign: 'center'
                }}>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{card.icon}</div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#18181b', marginBottom: '4px' }}>{card.title}</div>
                  <div style={{ fontSize: '13px', color: '#a1a1aa' }}>{card.info}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsStarted(true)}
              style={{ 
                backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', 
                border: 'none', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 20px 25px -5px rgba(67, 56, 202, 0.15)'
              }}
            >
              {t.btn} <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          /* --- 题目练习界面 (下一步) --- */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px' }}>
            {/* 练习页顶部导航 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <button 
                onClick={() => setIsStarted(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', color: '#71717a', fontSize: '14px' }}
              >
                <ChevronLeft size={18} /> {t.back}
              </button>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#4338ca', backgroundColor: '#eef2ff', padding: '4px 12px', borderRadius: '6px' }}>
                {activeLevel} Practice
              </div>
            </div>

            {/* 题目展示区 */}
            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', textTransform: 'uppercase' }}>Source Text (CN)</span>
                <h2 style={{ fontSize: '28px', color: '#18181b', marginTop: '12px', lineHeight: 1.4 }}>
                  “无论科技如何进步，人类对知识的渴望始终如一。”
                </h2>
              </div>

              {/* 用户输入区 */}
              <div style={{ position: 'relative' }}>
                <textarea 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t.placeholder}
                  style={{ 
                    width: '100%', height: '200px', padding: '24px', borderRadius: '20px', 
                    border: '1px solid #e1e1e6', fontSize: '18px', outline: 'none', resize: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', boxSizing: 'border-box'
                  }}
                />
                <button style={{ 
                  position: 'absolute', bottom: '20px', right: '20px',
                  backgroundColor: userInput ? '#4338ca' : '#e1e1e6', color: 'white',
                  width: '44px', height: '44px', borderRadius: '12px', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  <Send size={20} />
                </button>
              </div>
              
              <p style={{ marginTop: '20px', color: '#a1a1aa', fontSize: '13px', textAlign: 'center' }}>
                Press Enter to submit for AI feedback
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
