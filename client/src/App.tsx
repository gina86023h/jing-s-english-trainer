import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight 
} from 'lucide-react';

// --- 子组件：侧边栏等级项 (含悬停与选中逻辑) ---
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
        borderRadius: '12px', 
        cursor: 'pointer', 
        marginBottom: '4px',
        color: active ? 'white' : '#71717a', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
        flexShrink: 1,
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

// --- 主组件 ---
export default function App() {
  const [activeLevel, setActiveLevel] = useState('FCE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [activeTool, setActiveTool] = useState('');
  const [hoveredTool, setHoveredTool] = useState('');

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
      btn: "开始练习"
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
      btn: "Get Started"
    }
  };

  const t = activeLanguage === 'CN' ? content.CN : content.EN;

  return (
    <div style={{ 
      display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: '#fcfcfd', position: 'fixed', top: 0, left: 0, fontFamily: 'sans-serif'
    }}>
      
      {/* 1. 左侧栏 (Sidebar) */}
      <nav style={{ 
        width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', 
        display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 16px', boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            {activeLanguage === 'CN' ? '英语水平等级' : 'PROFICIENCY LEVELS'}
          </div>
        </div>

        {/* 等级列表：通过 flex:1 自动伸缩防止滚动条 */}
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
              onClick={() => setActiveLevel(item.id)} 
            />
          ))}
        </div>

        {/* 底部工具与语言切换 */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', paddingBottom: '24px', borderTop: '1px solid #f4f4f5' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
            {[
              { id: 'prog', label: activeLanguage === 'CN' ? '学习进度' : 'Progress', icon: <LineChart size={16} /> },
              { id: 'note', label: activeLanguage === 'CN' ? '错题本' : 'Notebook', icon: <BookOpen size={16} /> }
            ].map((tool) => (
              <div
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool('')}
                style={{
                  padding: '10px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px',
                  borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
                  backgroundColor: activeTool === tool.id ? '#4338ca' : (hoveredTool === tool.id ? '#f4f4f5' : 'transparent'),
                  color: activeTool === tool.id ? 'white' : '#71717a'
                }}
              >
                {tool.icon} {tool.label}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '10px' }}>
            {['EN', 'CN'].map(lang => (
              <button 
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                style={{ 
                  flex: 1, border: 'none', padding: '8px', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                  backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', 
                  color: activeLanguage === lang ? 'white' : '#71717a',
                  transition: 'all 0.3s'
                }}
              >
                {lang === 'EN' ? 'GB EN' : 'CN 中文'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. 右侧主内容 (Main Content) */}
      <main style={{ 
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', padding: '40px', boxSizing: 'border-box' 
      }}>
        
        {/* 顶部标签 */}
        <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', marginBottom: '3vh' }}>
          {t.tag}
        </div>
        
        {/* 标题 */}
        <div style={{ textAlign: 'center', marginBottom: '2vh' }}>
          <h1 style={{ fontSize: 'min(56px, 7vh)', fontWeight: '850', color: '#18181b', margin: 0, lineHeight: 1.1 }}>
            {t.h1_top}
          </h1>
          <h1 style={{ 
            fontSize: 'min(56px, 7vh)', fontWeight: '850', margin: '8px 0', 
            background: 'linear-gradient(135deg, #4338ca 0%, #818cf8 100%)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.1
          }}>
            {t.h1_bot}
          </h1>
          <p style={{ color: '#71717a', fontSize: '18px', maxWidth: '600px', margin: '20px auto' }}>
            {t.desc}
          </p>
        </div>

        {/* 3. 功能卡片组 (恢复回归) */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '5vh' }}>
          {t.cards.map((card, i) => (
            <div key={i} style={{ 
              backgroundColor: 'white', padding: '24px', borderRadius: '24px', 
              border: '1px solid #f1f1f4', width: '200px', textAlign: 'center',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
            }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{card.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#18181b', marginBottom: '4px' }}>{card.title}</div>
              <div style={{ fontSize: '13px', color: '#a1a1aa' }}>{card.info}</div>
            </div>
          ))}
        </div>

        {/* 开始练习按钮 */}
        <button style={{ 
          backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', 
          border: 'none', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '10px',
          boxShadow: '0 20px 25px -5px rgba(67, 56, 202, 0.15)'
        }}>
          {t.btn} <ArrowRight size={20} />
        </button>
      </main>
    </div>
  );
}
