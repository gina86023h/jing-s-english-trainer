import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight, 
  ChevronLeft, Send, RefreshCw, Lightbulb, CheckCircle2, Sparkles
} from 'lucide-react';

// --- 扩展版题库（增加提示和参考答案） ---
const questionBank = {
  CAE: [
    { 
      cn: "不可否认的是，人工智能的发展不仅改变了我们的工作方式，也深刻地影响了我们的生活方式。", 
      en: "It is undeniable that the development of artificial intelligence has not only changed the way we work but also profoundly influenced our way of life.",
      hint: "Use 'not only... but also' structure.",
      feedback: [
        { type: 'improve', text: "将'change the way of working'改为'changed the way we work'，以符合英语习惯表达。" },
        { type: 'fix', text: "修正'deeply influnce the way of our lifestyle'为'profoundly influenced our way of life'。" }
      ]
    }
  ],
  FCE: [
    { 
      cn: "无论科技如何进步，人类对知识的渴望始终如一。", 
      en: "No matter how technology advances, humanity's thirst for knowledge remains the same.",
      hint: "Try starting with 'No matter how...'",
      feedback: [{ type: 'improve', text: "使用 'remains unchanged' 会让语气更正式。" }]
    }
  ]
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState('CAE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false); // 控制反馈页面
  const [currentQuestion, setCurrentQuestion] = useState(questionBank.CAE[0]);
  const [userInput, setUserInput] = useState('');

  const getRandomQuestion = (level) => {
    const questions = questionBank[level] || questionBank['CAE'];
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserInput('');
    setShowFeedback(false);
  };

  const handleEvaluate = () => {
    if (userInput.trim()) setShowFeedback(true);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#fcfcfd', position: 'fixed', fontFamily: 'sans-serif' }}>
      
      {/* 侧边栏保持不变 (省略部分重复代码以保持简洁) */}
      <nav style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
        <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '20px' }}>LEVELS</div>
        <div style={{ flex: 1 }}>
          {['KET', 'PET', 'FCE', 'CAE', 'CPE', 'IELTS'].map(lvl => (
            <div key={lvl} onClick={() => {setActiveLevel(lvl); setIsStarted(false);}} style={{ padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeLevel === lvl ? '#4338ca' : 'transparent', color: activeLevel === lvl ? 'white' : '#71717a', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{lvl} Level</div>
          ))}
        </div>
      </nav>

      {/* 主内容区 */}
      <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#fcfcfd' }}>
        {!isStarted ? (
          /* 首页界面 (同前) */
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={() => {getRandomQuestion(activeLevel); setIsStarted(true);}} style={{ backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>开始练习 →</button>
          </div>
        ) : (
          <div style={{ maxWidth: '850px', margin: '0 auto', padding: '40px 20px' }}>
            {/* 练习/评估界面切换 */}
            {!showFeedback ? (
              <>
                <div onClick={() => setIsStarted(false)} style={{ color: '#71717a', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '5px' }}><ChevronLeft size={18}/> 返回 {activeLevel}</div>
                
                {/* 题目卡片 (参考 image_c69c85) */}
                <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eef2ff', padding: '32px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ color: '#818cf8', marginTop: '4px' }}><Sparkles size={20}/></div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '8px' }}>翻译成英文</div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#18181b', lineHeight: 1.5 }}>{currentQuestion.cn}</div>
                    </div>
                  </div>
                  
                  {/* Hint 提示条 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fffbeb', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '14px' }}>
                    <Lightbulb size={16}/> <strong>workspace.hint:</strong> {currentQuestion.hint}
                  </div>
                </div>

                {/* 输入框 */}
                <div style={{ position: 'relative' }}>
                  <textarea 
                    value={userInput} onChange={(e) => setUserInput(e.target.value)}
                    placeholder="请输入你的翻译..."
                    style={{ width: '100%', height: '180px', padding: '24px', borderRadius: '24px', border: '2px solid #eef2ff', fontSize: '18px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                  />
                  <button 
                    onClick={handleEvaluate}
                    style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#4338ca', color: 'white', padding: '10px 24px', borderRadius: '12px', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <Sparkles size={18}/> 评估答案
                  </button>
                </div>
              </>
            ) : (
              /* 反馈结果页 (参考 image_c698df) */
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <div style={{ display: 'flex', gap: '30px', backgroundColor: 'white', padding: '40px', borderRadius: '32px', border: '1px solid #f1f1f4', marginBottom: '30px' }}>
                  {/* 分数圆环 */}
                  <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="120" height="120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f1f4" strokeWidth="10" />
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#fbbf24" strokeWidth="10" strokeDasharray="339" strokeDashoffset="100" strokeLinecap="round" />
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', color: '#18181b' }}>70</div>
                      <div style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: 'bold' }}>SCORE</div>
                    </div>
                  </div>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 12px 0' }}>不错的尝试！</h2>
                    <p style={{ color: '#71717a', lineHeight: 1.6, margin: 0 }}>你的翻译已经很好地传达了句子的基本意思，但部分词语和表达可以更准确，以达到更高的语言流畅度。</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                  {/* 需要改进的地方 */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#e67e22', marginBottom: '16px' }}>
                      <Sparkles size={18}/> 需要改进的地方
                    </div>
                    {currentQuestion.feedback?.map((f, i) => (
                      <div key={i} style={{ backgroundColor: '#fffcf5', padding: '16px', borderRadius: '16px', border: '1px solid #fef3c7', marginBottom: '12px', fontSize: '14px', color: '#444', lineHeight: 1.5, display: 'flex', gap: '10px' }}>
                        <div style={{ color: '#fbbf24', fontSize: '18px' }}>•</div> {f.text}
                      </div>
                    ))}
                  </div>
                  {/* 参考翻译 */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#10b981', marginBottom: '16px' }}>
                      <CheckCircle2 size={18}/> 参考翻译
                    </div>
                    <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '20px', border: '1px solid #dcfce7', color: '#065f46', fontSize: '15px', lineHeight: 1.6, fontWeight: '500' }}>
                      {currentQuestion.en}
                    </div>
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
