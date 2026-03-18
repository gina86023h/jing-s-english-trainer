import React, { useState } from 'react';
import { 
  LineChart, BookOpen, Star, Send, Brain, CheckCircle2, AlertCircle 
} from 'lucide-react';

// --- 子组件：侧边栏项 (锁定版 UI) ---
const SidebarItem = ({ label, active, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        padding: '12px 16px',
        backgroundColor: active ? '#4338ca' : (isHovered ? '#f4f4f5' : 'transparent'), 
        borderRadius: '12px', cursor: 'pointer', marginBottom: '6px',
        color: active ? 'white' : '#71717a', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>{label}</div>
      {active && <Star size={12} />}
    </div>
  );
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState('FCE');
  const [activeLanguage, setActiveLanguage] = useState('EN');
  const [userInput, setUserInput] = useState('');
  
  // --- 新增：AI 分析相关状态 (不影响 UI 结构) ---
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // --- 新增：模拟发送逻辑 ---
  const handleSend = () => {
    if (!userInput.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setFeedback(null);

    // 模拟 AI 延迟过程
    setTimeout(() => {
      setIsAnalyzing(false);
      setFeedback({
        score: 85,
        correction: "无论科技如何进步，人类对知识的渴望始终如一。",
        suggestion: activeLanguage === 'CN' 
          ? "你的翻译很准确，但将 'longing for' 换成 'thirst for' 更符合更深层次的渴望。建议注意 'one and the same' 的正式程度。"
          : "Accuracy is great. Consider using 'thirst for' instead of 'longing for' for a deeper sense of desire.",
        reference: "No matter how technology advances, human thirst for knowledge remains the same."
      });
    }, 1500);
  };

  return (
    <div style={{ 
      display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: '#fcfcfd', position: 'fixed', top: 0, left: 0, 
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif' // 恢复字体锁定
    }}>
      
      {/* 1. 左侧栏 (完全保持锁定) */}
      <nav style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 16px', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold' }}>
            {activeLanguage === 'CN' ? 'LEVELS' : '英语水平等级'}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {['KET', 'PET', 'FCE', 'CAE', 'CPE', 'IELTS'].map(id => (
            <SidebarItem key={id} label={id} active={activeLevel === id} onClick={() => { setActiveLevel(id); setFeedback(null); setUserInput(''); }} />
          ))}
        </div>
        <div style={{ height: '1px', backgroundColor: '#f4f4f5', margin: '20px 8px' }} />
        <div style={{ paddingLeft: '8px', marginBottom: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '12px' }}>
            {activeLanguage === 'CN' ? 'LEARNING TOOLS' : '学习工具'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#71717a', padding: '10px 16px' }}><LineChart size={18}/> Progress</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#71717a', padding: '10px 16px' }}><BookOpen size={18}/> Mistake Notebook</div>
        </div>
        <div style={{ paddingTop: '16px', borderTop: '1px solid #f4f4f5' }}>
          <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '12px' }}>
            {['EN', 'CN'].map(lang => (
              <button key={lang} onClick={() => setActiveLanguage(lang)} style={{ flex: 1, border: 'none', padding: '8px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', color: activeLanguage === lang ? 'white' : '#71717a', transition: '0.3s' }}>{lang === 'EN' ? 'English' : '中文'}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. 右侧动态内容区 (这里我们要手动把逻辑和卡片 UI 塞进来) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
               <h2 style={{ fontSize: '28px', color: '#18181b', marginBottom: '32px' }}>“无论科技如何进步，人类对知识的渴望始终如一。”</h2>
                
                {/* 输入框和发送按钮 (逻辑核心点) */}
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isAnalyzing}
                    placeholder={activeLanguage === 'CN' ? 'Type your translation here...' : '在此输入您的翻译...'}
                    style={{ width: '100%', height: '180px', padding: '24px', borderRadius: '20px', border: isAnalyzing ? '1px solid #eef2ff' : '1px solid #e1e1e6', fontSize: '18px', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'all 0.3s' }}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!userInput.trim() || isAnalyzing}
                    style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: userInput.trim() && !isAnalyzing ? '#4338ca' : '#e1e1e6', color: 'white', width: '48px', height: '48px', borderRadius: '12px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}
                  >
                    {isAnalyzing ? <div style={{ width: '20px', height: '20px', border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <Send size={22} />}
                  </button>
                </div>

                {/* --- AI 结果展示区 (这是新注入的卡片 UI) --- */}
                {isAnalyzing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4338ca', fontSize: '14px', fontWeight: 'bold' }}>
                    <Brain size={18} className="animate-pulse" /> {activeLanguage === 'CN' ? 'AI is analyzing...' : 'AI 正在深度分析中...'}
                  </div>
                )}

                {feedback && (
                  <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef2ff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', animation: 'slideUp 0.4s ease-out' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#18181b', fontWeight: 'bold' }}>
                        <CheckCircle2 size={20} color="#10b981" /> AI {activeLanguage === 'CN' ? 'Score' : '评分'}
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: '900', color: '#4338ca' }}>{feedback.score}/100</div>
                    </div>
                    <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '16px', borderLeft: '4px solid #4338ca' }}>
                      <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '4px' }}>AI REFERENCE</div>
                      <div style={{ color: '#1e293b', fontSize: '15px', lineHeight: 1.5 }}>{feedback.reference}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <AlertCircle size={18} color="#f59e0b" style={{ marginTop: '2px' }} />
                      <div style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}><strong>{activeLanguage === 'CN' ? 'Advice' : '改进建议'}:</strong> {feedback.suggestion}</div>
                    </div>
                  </div>
                )}
            </div>
        </div>
      </main>

      {/* 动画样式注入 */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
