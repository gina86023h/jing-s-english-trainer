import React, { useState } from 'react';
// 确保引入了这些图标，否则图案会消失
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight, 
  ChevronLeft, Send, RefreshCw, Lightbulb, CheckCircle2, Sparkles, Languages
} from 'lucide-react';

const questionBank = {
  CAE: [{ 
    cn: "不可否认的是，人工智能的发展不仅改变了我们的工作方式，也深刻地影响了我们的生活方式。", 
    en: "It is undeniable that the development of artificial intelligence has not only changed the way we work but also profoundly influenced our way of life.",
    hint: "Use 'not only... but also' structure."
  }],
  FCE: [{ 
    cn: "无论科技如何进步，人类对知识的渴望始终如一。", 
    en: "No matter how technology advances, humanity's thirst for knowledge remains the same.",
    hint: "Try starting with 'No matter how...'"
  }]
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState('CAE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questionBank.CAE[0]);
  const [userInput, setUserInput] = useState('');
  
  const [aiResult, setAiResult] = useState({ score: 0, feedback: [], reference: "" });

  const getRandomQuestion = (level) => {
    const questions = questionBank[level] || questionBank['CAE'];
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserInput('');
    setShowFeedback(false);
  };

  const handleEvaluate = () => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setAiResult({
        score: 70,
        feedback: [
          { text: "将'change the way of working'改为'changed the way we work'。" },
          { text: "修正拼写错误 'influnce' 为 'influenced'。" }
        ],
        reference: currentQuestion.en
      });
      setIsLoading(false);
      setShowFeedback(true);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden', // 关键：禁止最外层滚动，防止出现双滚动条
      backgroundColor: '#fcfcfd', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
    }}>
      
      {/* 左侧栏 */}
      <nav style={{ width: '280px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', display: 'flex', flexDirection: 'column', padding: '32px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#eef2ff', padding: '8px', borderRadius: '12px' }}>
            <Languages size={24} color="#4338ca" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '20px', color: '#18181b' }}>LingoFlow</span>
        </div>

        <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '16px', paddingLeft: '8px' }}>英语水平等级</div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['Key (KET)', 'Preliminary (PET)', 'First (FCE)', 'Advanced (CAE)', 'Proficiency (CPE)', 'IELTS Academic'].map((lvl) => {
            const shortLvl = lvl.match(/\((.*?)\)/)?.[1] || lvl.split(' ')[0];
            const isActive = activeLevel === shortLvl;
            return (
              <div 
                key={shortLvl}
                onClick={() => { setActiveLevel(shortLvl); setIsStarted(false); }}
                style={{ 
                  padding: '14px 16px', borderRadius: '14px', cursor: 'pointer',
                  backgroundColor: isActive ? '#4338ca' : 'transparent',
                  color: isActive ? 'white' : '#71717a',
                  fontSize: '14px', fontWeight: '600', transition: '0.2s',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                {lvl}
                {isActive && <Sparkles size={14} fill="white" />}
              </div>
            );
          })}
        </div>
      </nav>

      {/* 右侧主内容区 */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {!isStarted ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
             {/* 还原截图中的“智能评估”标签 */}
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4338ca' }}></div>
              智能评估
            </div>
            <h1 style={{ fontSize: '56px', fontWeight: '900', color: '#18181b', textAlign: 'center', lineHeight: '1.1', marginBottom: '24px' }}>
              掌握英文翻译<br/>
              <span style={{ color: '#4338ca' }}>一步步提升</span>
            </h1>
            <p style={{ color: '#71717a', fontSize: '18px', maxWidth: '500px', textAlign: 'center', lineHeight: '1.6', marginBottom: '40px' }}>
              从KET到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。
            </p>
            <button 
              onClick={() => { getRandomQuestion(activeLevel); setIsStarted(true); }}
              style={{ backgroundColor: '#4338ca', color: 'white', padding: '18px 40px', borderRadius: '16px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.3)', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              开始练习 <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
            {/* 练习界面内容 */}
            {!showFeedback ? (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <button onClick={() => setIsStarted(false)} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}>
                  <ChevronLeft size={18}/> 返回 {activeLevel}
                </button>
                
                <div style={{ backgroundColor: 'white', borderRadius: '28px', border: '1px solid #f1f1f4', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative' }}>
                   {/* 还原截图中的图标 */}
                  <div style={{ position: 'absolute', left: '40px', top: '44px', color: '#e2e8f0' }}>
                    <BookText size={32} />
                  </div>
                  <div style={{ paddingLeft: '50px' }}>
                    <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase' }}>翻译成英文</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#18181b', lineHeight: '1.4' }}>{currentQuestion.cn}</div>
                  </div>
                  
                  <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fffbeb', padding: '16px 20px', borderRadius: '16px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '14px' }}>
                    <Lightbulb size={18} />
                    <span><strong>workspace.hint:</strong> {currentQuestion.hint}</span>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <textarea 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="在此输入你的英文翻译..."
                    style={{ width: '100%', height: '220px', padding: '32px', borderRadius: '28px', border: '2px solid #eef2ff', fontSize: '20px', outline: 'none', resize: 'none', transition: 'border-color 0.2s', backgroundColor: 'white' }}
                  />
                  <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: '#a1a1aa' }}>Cmd/Ctrl + Enter 提交</span>
                    <button 
                      onClick={handleEvaluate}
                      disabled={isLoading}
                      style={{ backgroundColor: '#4338ca', color: 'white', padding: '14px 28px', borderRadius: '14px', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(67, 56, 202, 0.2)' }}
                    >
                      {isLoading ? '评估中...' : <><Sparkles size={18}/> 评估答案</>}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* 反馈界面 */
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '32px', border: '1px solid #f1f1f4', padding: '40px', marginBottom: '32px', display: 'flex', gap: '40px', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
                    <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f1f4" strokeWidth="10" />
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#fbbf24" strokeWidth="10" strokeDasharray="339" strokeDashoffset={339 - (339 * aiResult.score) / 100} strokeLinecap="round" />
                    </svg>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '36px', fontWeight: '900', color: '#18181b' }}>{aiResult.score}</span>
                      <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: 'bold' }}>SCORE</span>
                    </div>
                  </div>
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>不错的尝试！</h2>
                    <p style={{ color: '#71717a', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>你的翻译已经很好地传达了句子的基本意思，但部分词语和表达可以更准确...</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e67e22', fontWeight: 'bold', marginBottom: '20px' }}>
                      <Sparkles size={18}/> 需要改进的地方
                    </div>
                    {aiResult.feedback.map((f, i) => (
                      <div key={i} style={{ backgroundColor: '#fffcf5', padding: '20px', borderRadius: '18px', border: '1px solid #fef3c7', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: '1.5', display: 'flex', gap: '12px' }}>
                        <div style={{ color: '#fbbf24', fontSize: '20px', fontWeight: 'bold' }}>•</div> {f.text}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 'bold', marginBottom: '20px' }}>
                      <CheckCircle2 size={18}/> 参考翻译
                    </div>
                    <div style={{ backgroundColor: '#f0fdf4', padding: '24px', borderRadius: '22px', border: '1px solid #dcfce7', color: '#065f46', fontSize: '16px', lineHeight: '1.7', fontWeight: '500' }}>
                      {aiResult.reference}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '50px', paddingBottom: '40px' }}>
                  <button onClick={() => setShowFeedback(false)} style={{ backgroundColor: '#f4f4f5', color: '#71717a', padding: '14px 36px', borderRadius: '14px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>重试</button>
                  <button onClick={() => getRandomQuestion(activeLevel)} style={{ backgroundColor: '#4338ca', color: 'white', padding: '14px 36px', borderRadius: '14px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>下一题</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        textarea::placeholder { color: #cbd5e1; }
      `}</style>
    </div>
  );
}
