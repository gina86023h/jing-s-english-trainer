import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight, 
  ChevronLeft, Send, RefreshCw, Lightbulb, CheckCircle2, Sparkles
} from 'lucide-react';

// --- 题库数据保持不变 ---
const questionBank = {
  CAE: [
    { 
      cn: "不可否认的是，人工智能的发展不仅改变了我们的工作方式，也深刻地影响了我们的生活方式。", 
      en: "It is undeniable that the development of artificial intelligence has not only changed the way we work but also profoundly influenced our way of life.",
      hint: "Use 'not only... but also' structure."
    }
  ],
  FCE: [
    { 
      cn: "无论科技如何进步，人类对知识的渴望始终如一。", 
      en: "No matter how technology advances, humanity's thirst for knowledge remains the same.",
      hint: "Try starting with 'No matter how...'"
    }
  ]
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState('CAE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questionBank.CAE[0]);
  const [userInput, setUserInput] = useState('');
  
  // 用于存放 AI 返回的评分数据
  const [aiResult, setAiResult] = useState({
    score: 0,
    feedback: [],
    reference: ""
  });

  const getRandomQuestion = (level) => {
    const questions = questionBank[level] || questionBank['CAE'];
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserInput('');
    setShowFeedback(false);
  };

  // --- 核心：连接 DeepSeek 的逻辑 ---
  const handleEvaluate = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);

    try {
      /* 这里是未来连接 DeepSeek 的地方。
         为了防止现在报错，我们先用一个 setTimeout 模拟“正在评估”
      */
      setTimeout(() => {
        setAiResult({
          score: 70, // 对应你截图中的分数
          feedback: [
            { text: "将'change the way of working'改为'changed the way we work'。" },
            { text: "修正拼写错误 'influnce' 为 'influenced'。" }
          ],
          reference: currentQuestion.en
        });
        setIsLoading(false);
        setShowFeedback(true);
      }, 1500);

    } catch (error) {
      console.error("评估出错:", error);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#fcfcfd', position: 'fixed', top: 0, left: 0, fontFamily: 'sans-serif' }}>
      
      {/* 1. 侧边栏 (保持你喜欢的样式) */}
      <nav style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
        <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold' }}>英语水平等级</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['KET', 'PET', 'FCE', 'CAE', 'CPE', 'IELTS'].map(lvl => (
            <div 
              key={lvl}
              onClick={() => { setActiveLevel(lvl); setIsStarted(false); }}
              style={{ 
                padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                backgroundColor: activeLevel === lvl ? '#4338ca' : 'transparent',
                color: activeLevel === lvl ? 'white' : '#71717a',
                fontSize: '13px', fontWeight: '600', transition: 'all 0.2s'
              }}
            >
              {lvl} Level
            </div>
          ))}
        </div>
        
        {/* 中英文切换按钮 */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '10px' }}>
          {['EN', 'CN'].map(lang => (
            <button 
              key={lang} onClick={() => setActiveLanguage(lang)}
              style={{ flex: 1, border: 'none', padding: '8px', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeLanguage === lang ? '#4338ca' : 'transparent', color: activeLanguage === lang ? 'white' : '#71717a' }}
            >
              {lang === 'EN' ? 'GB EN' : 'CN 中文'}
            </button>
          ))}
        </div>
      </nav>

      {/* 2. 主内容区 */}
      <main style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        {!isStarted ? (
          /* 欢迎首页 */
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '850', color: '#18181b', textAlign: 'center' }}>
              掌握英文翻译<br/>
              <span style={{ color: '#4338ca' }}>一步步提升</span>
            </h1>
            <p style={{ color: '#71717a', margin: '24px 0 40px' }}>获得即时、智能的语法、词汇和措辞反馈。</p>
            <button 
              onClick={() => { getRandomQuestion(activeLevel); setIsStarted(true); }}
              style={{ backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              开始练习 <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          /* 练习/反馈区 */
          <div style={{ maxWidth: '850px', margin: '0 auto', padding: '40px 20px' }}>
            {!showFeedback ? (
              /* 练习输入模式 */
              <>
                <div onClick={() => setIsStarted(false)} style={{ color: '#71717a', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
                  <ChevronLeft size={18}/> 返回 {activeLevel}
                </div>
                
                <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eef2ff', padding: '32px', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Sparkles style={{ color: '#818cf8' }} size={20}/>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#18181b' }}>{currentQuestion.cn}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fffbeb', padding: '12px 16px', borderRadius: '12px', color: '#92400e', fontSize: '14px' }}>
                    <Lightbulb size={16}/> <strong>workspace.hint:</strong> {currentQuestion.hint}
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <textarea 
                    value={userInput} onChange={(e) => setUserInput(e.target.value)}
                    placeholder="请输入你的翻译..."
                    style={{ width: '100%', height: '200px', padding: '24px', borderRadius: '24px', border: '2px solid #eef2ff', fontSize: '18px', outline: 'none', resize: 'none' }}
                  />
                  <button 
                    onClick={handleEvaluate}
                    disabled={isLoading}
                    style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#4338ca', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: isLoading ? 0.7 : 1 }}
                  >
                    {isLoading ? '评估中...' : <><Sparkles size={18}/> 评估答案</>}
                  </button>
                </div>
              </>
            ) : (
              /* 反馈结果模式 (参考截图 image_c698df) */
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                <div style={{ display: 'flex', gap: '30px', backgroundColor: 'white', padding: '40px', borderRadius: '32px', border: '1px solid #f1f1f4', marginBottom: '30px' }}>
                  <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f4" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * aiResult.score) / 100} strokeLinecap="round" />
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: '800' }}>{aiResult.score}</div>
                      <div style={{ fontSize: '10px', color: '#a1a1aa' }}>SCORE</div>
                    </div>
                  </div>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0' }}>不错的尝试！</h2>
                    <p style={{ color: '#71717a', fontSize: '15px' }}>你的翻译已经很好地传达了句子的基本意思...</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e67e22', marginBottom: '12px' }}><Sparkles size={16}/> 需要改进</h4>
                    {aiResult.feedback.map((f, i) => (
                      <div key={i} style={{ backgroundColor: '#fffcf5', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fef3c7', fontSize: '14px', marginBottom: '8px' }}>• {f.text}</div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '12px' }}><CheckCircle2 size={16}/> 参考翻译</h4>
                    <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '16px', border: '1px solid #dcfce7', color: '#065f46', fontSize: '14px', lineHeight: 1.6 }}>{aiResult.reference}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <button onClick={() => setShowFeedback(false)} style={{ backgroundColor: '#f4f4f5', color: '#71717a', padding: '12px 32px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>重试</button>
                  <button onClick={() => getRandomQuestion(activeLevel)} style={{ backgroundColor: '#4338ca', color: 'white', padding: '12px 32px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginLeft: '12px' }}>下一题</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
