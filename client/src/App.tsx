import React, { useState } from 'react';
import { 
  Languages, TrendingUp, ClipboardList, BookOpen, Brain, Target, 
  ArrowRight, ChevronLeft, Sparkles, BookText, Lightbulb, CheckCircle2 
} from 'lucide-react';

export default function App() {
  const [activeLevel, setActiveLevel] = useState('CAE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  // 模拟题目数据
  const question = {
    cn: "不可否认的是，人工智能的发展不仅改变了我们的工作方式，也深刻地影响了我们的生活方式。",
    hint: "Use 'not only... but also' structure."
  };

  return (
    <div style={{ 
      display: 'flex', width: '100vw', height: '100vh', 
      overflow: 'hidden', backgroundColor: '#fcfcfd',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      
      {/* --- 左侧侧边栏 --- */}
      <nav style={{ 
        width: '280px', height: '100%', backgroundColor: 'white', 
        borderRight: '1px solid #f1f1f4', display: 'flex', flexDirection: 'column', flexShrink: 0 
      }}>
        {/* Logo 部分 */}
        <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#f0f2ff', padding: '8px', borderRadius: '12px' }}>
            <Languages size={22} color="#4338ca" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '19px', color: '#18181b', letterSpacing: '-0.02em' }}>LingoFlow</span>
        </div>

        {/* 等级列表 - 严格参考 image_bbc3b5 字体样式 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: '700', marginBottom: '16px', paddingLeft: '12px' }}>英语水平等级</div>
          {[
            { id: 'KET', label: 'Key (KET)', sub: 'A2 Level' },
            { id: 'PET', label: 'Preliminary (PET)', sub: 'B1 Level' },
            { id: 'FCE', label: 'First (FCE)', sub: 'B2 Level' },
            { id: 'CAE', label: 'Advanced (CAE)', sub: 'C1 Level' },
            { id: 'CPE', label: 'Proficiency (CPE)', sub: 'C2 Level' },
            { id: 'IELTS', label: 'IELTS Academic', sub: 'All bands' }
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => { setActiveLevel(item.id); setIsStarted(false); }}
              style={{ 
                padding: '12px 16px', borderRadius: '14px', cursor: 'pointer', marginBottom: '4px',
                backgroundColor: activeLevel === item.id ? '#4338ca' : 'transparent',
                color: activeLevel === item.id ? 'white' : '#3f3f46',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.label}</div>
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* 底部功能区 - 修复切换无效问题 */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid #f1f1f4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#71717a', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <TrendingUp size={18} /> 学习进度
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#71717a', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>
            <ClipboardList size={18} /> 错题本
          </div>
          
          {/* 中英文切换 - 修复逻辑 */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
            <button 
              onClick={() => setActiveLanguage('EN')}
              style={{ 
                flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                backgroundColor: activeLanguage === 'EN' ? 'white' : 'transparent',
                color: activeLanguage === 'EN' ? '#18181b' : '#71717a',
                boxShadow: activeLanguage === 'EN' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                transition: '0.2s'
              }}
            >GB EN</button>
            <button 
              onClick={() => setActiveLanguage('CN')}
              style={{ 
                flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                backgroundColor: activeLanguage === 'CN' ? '#4338ca' : 'transparent',
                color: activeLanguage === 'CN' ? 'white' : '#71717a',
                transition: '0.2s'
              }}
            >CN 中文</button>
          </div>
        </div>
      </nav>

      {/* --- 右侧内容区：严禁外层滚动 --- */}
      <main style={{ flex: 1, height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {!isStarted ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', marginBottom: '24px' }}>● 智能评估</div>
            <h1 style={{ fontSize: '52px', fontWeight: '900', textAlign: 'center', lineHeight: 1.1, color: '#18181b', marginBottom: '24px' }}>
              掌握英文翻译<br/><span style={{ color: '#4338ca' }}>一步步提升</span>
            </h1>
            <p style={{ color: '#71717a', fontSize: '17px', maxWidth: '500px', textAlign: 'center', marginBottom: '48px', lineHeight: 1.6 }}>
              从KET到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。
            </p>
            <button 
              onClick={() => setIsStarted(true)}
              style={{ backgroundColor: '#4338ca', color: 'white', padding: '18px 48px', borderRadius: '16px', border: 'none', fontWeight: '800', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 20px -5px rgba(67, 56, 202, 0.3)' }}
            >
              开始练习 <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
            <button onClick={() => setIsStarted(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', marginBottom: '40px', fontSize: '14px', fontWeight: '700' }}>
              <ChevronLeft size={18}/> 返回 {activeLevel}
            </button>

            <div style={{ backgroundColor: 'white', borderRadius: '28px', border: '1px solid #f1f1f4', padding: '40px', marginBottom: '32px', position: 'relative' }}>
              <div style={{ color: '#e2e8f0', position: 'absolute', left: '30px', top: '35px' }}><BookText size={36}/></div>
              <div style={{ paddingLeft: '40px' }}>
                <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: '800', marginBottom: '10px' }}>翻译成英文</div>
                <div style={{ fontSize: '26px', fontWeight: '700', color: '#18181b', lineHeight: 1.4 }}>{question.cn}</div>
              </div>
              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fffbeb', padding: '16px', borderRadius: '14px', color: '#92400e', fontSize: '14px', border: '1px solid #fef3c7' }}>
                <Lightbulb size={18} />
                <span><strong>workspace.hint:</strong> {question.hint}</span>
              </div>
            </div>

            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="在此输入翻译..."
              style={{ width: '100%', height: '220px', padding: '30px', borderRadius: '28px', border: '2px solid #eef2ff', fontSize: '19px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
