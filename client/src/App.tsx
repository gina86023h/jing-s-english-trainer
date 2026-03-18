import React, { useState } from 'react';
import { 
  BookText, Brain, Target, ArrowRight, ChevronLeft, Send, 
  LineChart, BookOpen, CheckCircle2, AlertCircle 
} from 'lucide-react';

// --- 子组件：侧边栏项 (保持锁定，完全不改) ---
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

  // --- 新增：AI 分析状态 ---
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);

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
      tools: { progress: "学习进度", notebook: "错题本" },
      ai: { loading: "AI 正在分析中...", score: "评分", ref: "参考范文", advice: "建议" }
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
      tools: { progress: "Progress", notebook: "Mistake Notebook" },
      ai: { loading: "AI is analyzing...", score: "Score", ref: "Reference", advice: "Advice" }
    }
  };

  const t = activeLanguage === 'CN' ? content.CN : content.EN;

  // --- 新增：发送逻辑 ---
  const handleSend = () => {
    if (!userInput.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setFeedback(null);

    // 模拟 AI 延迟过程
    setTimeout(() => {
      setIsAnalyzing(false);
      setFeedback({
        score: 85,
        reference: "No matter how technology advances, human thirst for knowledge remains the same.",
        suggestion: activeLanguage === 'CN' 
          ? "翻译非常准确！建议将 'longing' 替换为 'thirst' 以表达更强烈的渴求感。"
          : "Very accurate! Consider replacing 'longing' with 'thirst' to sound more natural."
      });
    }, 1500);
  };

  return (
    <div style={{ 
      display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: '#fcfcfd', position: 'fixed', top: 0, left: 0, 
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
    }}>
      
      {/* 1. 左侧栏 (完全锁定) */}
      <nav style={{ 
        width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', 
        display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 16px', boxSizing: 'border-box' 
      }}>
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
                setFeedback(null); // 切换时清除旧反馈
              }} 
            />
          ))}
        </div>

        <div style={{ height: '1px', backgroundColor: '#f4f4f5', margin: '20px 8px' }} />

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
          <div style={{ flex: 1, padding: '40px' }}>
            <h1 style={{ color: '#18181b' }}>{t.tools.notebook}</h1>
            <p style={{ color: '#71717a', marginTop: '12px' }}>您的翻译记录将在这里显示。</p>
          </div>
        ) : activeTab === 'progress' ? (
          <div style={{ flex: 1, padding: '40px' }}>
            <h1 style={{ color: '#18181b' }}>{t.tools.progress}</h1>
            <p style={{ color: '#71717a', marginTop: '12px' }}>这里是您的学习数据分析。</p>
          </div>
        ) : !isStarted ? (
          /* --- 欢迎主页 (锁定版本，仅 desc 改为一行) --- */
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
              <p style={{ 
                color: '#71717a', fontSize: '18px', margin: '20px auto', lineHeight: 1.6,
                whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textAlign: 'center'
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
          /* --- 题目练习界面 --- */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <button onClick={() => { setIsStarted(false); setFeedback(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', color: '#71717a', fontSize: '14px' }}>
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
                
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isAnalyzing}
                    placeholder={t.placeholder}
                    style={{ width: '100%', height: '220px', padding: '24px', borderRadius: '20px', border: '1px solid #e1e1e6', fontSize: '18px', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!userInput.trim() || isAnalyzing}
                    style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: userInput.trim() && !isAnalyzing ? '#4338ca' : '#e1e1e6', color: 'white', border: 'none', borderRadius: '12px', width: '48px', height: '48px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {isAnalyzing ? <div style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <Send size={20} />}
                  </button>
                </div>

                {/* AI 结果区域 (按需显示) */}
                {(isAnalyzing || feedback) && (
                  <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef2ff', animation: 'fadeIn 0.4s ease-out' }}>
                    {isAnalyzing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4338ca', fontWeight: 'bold' }}>
                        <Brain size={20} /> {t.ai.loading}
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                             <CheckCircle2 size={20} color="#10b981" /> {t.ai.score}
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: '900', color: '#4338ca' }}>{feedback.score}/100</div>
                        </div>
                        <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '4px' }}>{t.ai.ref}</div>
                          <div style={{ color: '#1e293b' }}>{feedback.reference}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#475569' }}>
                           <AlertCircle size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
                           <div><strong>{t.ai.advice}:</strong> {feedback.suggestion}</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
