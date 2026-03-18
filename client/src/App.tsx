import React, { useState } from 'react';
import { 
  BookText, Brain, Target, ArrowRight, ChevronLeft, Send, 
  LineChart, BookOpen 
} from 'lucide-react';

// --- 子组件：侧边栏项 ---
const SidebarItem = ({ label, level, active, onClick, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        padding: '10px 16px',
        backgroundColor: active ? '#4338ca' : (isHovered ? '#f4f4f5' : 'transparent'), 
        borderRadius: '12px', 
        cursor: 'pointer', 
        marginBottom: '4px',
        color: active ? 'white' : '#71717a', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box'
      }}
    >
      {Icon && <Icon size={18} style={{ flexShrink: 0 }} />}
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>{label}</div>
        {level && <div style={{ fontSize: '11px', opacity: active ? 0.9 : 0.6 }}>{level}</div>}
      </div>
      {active && <span style={{ fontSize: '12px' }}>✦</span>}
    </div>
  );
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState('FCE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('practice'); 
  const [userInput, setUserInput] = useState('');

  const content = {
    CN: {
      tag: "● 智能评估",
      h1_top: "掌握英文翻译",
      h1_bot: "一步步提升",
      desc: "从KET到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。",
      btn: "开始练习",
      back: "返回主页",
      placeholder: "在此输入您的翻译...",
      levelHeader: "英语水平等级",
      toolHeader: "LEARNING TOOLS",
      tools: { progress: "学习进度", notebook: "错题本" }
    },
    EN: {
      tag: "● AI Evaluation",
      h1_top: "Master Translation",
      h1_bot: "Step by Step",
      desc: "Structured practice from KET to IELTS. Get instant feedback on grammar and phrasing.",
      btn: "Get Started",
      back: "Back Home",
      placeholder: "Type your translation here...",
      levelHeader: "LEVELS",
      toolHeader: "LEARNING TOOLS",
      tools: { progress: "Progress", notebook: "Mistake Notebook" }
    }
  };

  const t = activeLanguage === 'CN' ? content.CN : content.EN;

  return (
    <div style={{ 
      display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: '#fcfcfd', position: 'fixed', top: 0, left: 0, 
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
    }}>
      
      {/* 1. 左侧栏 (保持锁定) */}
      <nav style={{ 
        width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', 
        display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 16px', boxSizing: 'border-box' 
      }}>
        
        {/* 顶部：英语等级部分 (保持锁定) */}
        <div style={{ marginBottom: '12px', paddingLeft: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            {t.levelHeader}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {[
            { id: 'KET', label: 'Key (KET)', level: 'A2 Level' },
            { id: 'PET', label: 'Preliminary (PET)', level: 'B1 Level' },
            { id: 'FCE', label: 'First (FCE)', level: 'B2 Level' },
            { id: 'CAE', label: 'Advanced (CAE)', level: 'C1 Level' },
            { id: 'CPE', label: 'Proficiency (CPE)', level: 'C2 Level' },
            { id: 'IELTS', label: 'IELTS Academic', level: 'All bands' }
          ].map(item => (
            <SidebarItem 
              key={item.id} {...item} 
              active={activeLevel === item.id && activeTab === 'practice'} 
              onClick={() => {
                setActiveLevel(item.id);
                setActiveTab('practice');
                setIsStarted(false); 
              }} 
            />
          ))}
        </div>

        {/* 中间分割线 */}
        <div style={{ height: '1px', backgroundColor: '#f4f4f5', margin: '20px 8px' }} />

        {/* 底部：Learning Tools 部分 (保持锁定) */}
        <div style={{ paddingLeft: '8px', marginBottom: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '12px' }}>
            {t.toolHeader}
          </div>
          <SidebarItem 
            label={t.tools.progress} 
            icon={LineChart}
            active={activeTab === 'progress'}
            onClick={() => setActiveTab('progress')}
          />
          <SidebarItem 
            label={t.tools.notebook} 
            icon={BookOpen}
            active={activeTab === 'notebook'}
            onClick={() => setActiveTab('notebook')}
          />
        </div>

        {/* 语言切换 (保持锁定) */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid #f4f4f5' }}>
          <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '12px' }}>
            {['EN', 'CN'].map(lang => (
              <button 
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                style={{ 
                  flex: 1, border: 'none', padding: '8px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                  backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', 
                  color: activeLanguage === lang ? 'white' : '#71717a', transition: '0.3s'
                }}
              >
                {lang === 'EN' ? 'English' : '中文'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. 右侧动态内容区 */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: 'auto' }}>
        {activeTab === 'notebook' ? (
          /* 错题本页预览 (保持锁定) */
          <div style={{ flex: 1, padding: '40px' }}>
            <h1 style={{ color: '#18181b' }}>{t.tools.notebook}</h1>
            <p style={{ color: '#71717a', marginTop: '12px' }}>您的翻译记录将在这里显示。</p>
          </div>
        ) : activeTab === 'progress' ? (
          /* 学习进度页预览 (保持锁定) */
          <div style={{ flex: 1, padding: '40px' }}>
            <h1 style={{ color: '#18181b' }}>{t.tools.progress}</h1>
            <p style={{ color: '#71717a', marginTop: '12px' }}>这里是您的学习数据分析。</p>
          </div>
        ) : !isStarted ? (
          /* --- 欢迎主页 (核心修改点) --- */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
              {t.tag}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '850', color: '#18181b', margin: 0 }}>{t.h1_top}</h1>
              <h1 style={{ 
                fontSize: '48px', fontWeight: '850', margin: '8px 0', 
                background: 'linear-gradient(135deg, #4338ca 0%, #818cf8 100%)', 
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>{t.h1_bot}</h1>
              
              {/* --- 修改点：将 desc 调整为一行 --- */}
              <p style={{ 
                color: '#71717a', 
                fontSize: '18px', 
                margin: '20px auto', 
                lineHeight: 1.6,
                // 新增：强制一行显示，不换行
                whiteSpace: 'nowrap',
                // 新增：设置最大宽度，如果超出则隐藏
                maxWidth: '100%', 
                overflow: 'hidden',
                // 新增（可选）：文本对齐
                textAlign: 'center',
                boxSizing: 'border-box'
              }}>
                {t.desc}
              </p>
            </div>
            <button 
              onClick={() => setIsStarted(true)}
              style={{ 
                backgroundColor: '#4338ca', color: 'white', padding: '16px 40px', borderRadius: '14px', 
                border: 'none', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.2)'
              }}
            >
              {t.btn} <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          /* --- 题目练习界面 (保持锁定) --- */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <button onClick={() => setIsStarted(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', color: '#71717a', fontSize: '14px' }}>
                <ChevronLeft size={18} /> {t.back}
              </button>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#4338ca', backgroundColor: '#eef2ff', padding: '6px 16px', borderRadius: '8px' }}>
                {activeLevel} Practice
              </div>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
               <h2 style={{ fontSize: '28px', color: '#18181b', marginBottom: '32px' }}>
                  “无论科技如何进步，人类对知识的渴望始终如一。”
                </h2>
                <textarea 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t.placeholder}
                  style={{ width: '100%', height: '220px', padding: '24px', borderRadius: '20px', border: '1px solid #e1e1e6', fontSize: '18px', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
