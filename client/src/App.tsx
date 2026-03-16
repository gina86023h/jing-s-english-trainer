import React, { useState } from 'react';
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight, 
  ChevronLeft, Send, RefreshCw, Lightbulb, CheckCircle2, Sparkles, 
  Languages, ClipboardList, TrendingUp
} from 'lucide-react';

export default function App() {
  const [activeLevel, setActiveLevel] = useState('CAE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false);
  const [hoverItem, setHoverItem] = useState(null); // 处理悬停
  const [userInput, setUserInput] = useState('');

  // 1. 模拟点击事件（让进度和错题本有反应）
  const handleFeatureClick = (name) => {
    alert(`您点击了：${name}，该功能开发中...`);
  };

  return (
    <div style={{ 
      display: 'flex', height: '100vh', width: '100vw', 
      overflow: 'hidden', backgroundColor: '#fcfcfd', fontFamily: 'sans-serif' 
    }}>
      
      {/* --- 左侧导航栏 --- */}
      <nav style={{ 
        width: '280px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', 
        display: 'flex', flexDirection: 'column', padding: '24px 16px', flexShrink: 0,
        height: '100%'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ backgroundColor: '#eef2ff', padding: '6px', borderRadius: '10px' }}>
            <Languages size={20} color="#4338ca" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#18181b' }}>LingoFlow</span>
        </div>

        {/* 等级列表 - 增加悬停和点击逻辑 */}
        <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: '800', marginBottom: '12px', paddingLeft: '12px' }}>英语水平等级</div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['KET', 'PET', 'FCE', 'CAE', 'CPE', 'IELTS'].map((lvl) => {
            const isActive = activeLevel === lvl;
            const isHover = hoverItem === lvl;
            return (
              <div 
                key={lvl}
                onMouseEnter={() => setHoverItem(lvl)}
                onMouseLeave={() => setHoverItem(null)}
                onClick={() => { setActiveLevel(lvl); setIsStarted(false); }}
                style={{ 
                  padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                  backgroundColor: isActive ? '#4338ca' : (isHover ? '#f4f4f5' : 'transparent'),
                  color: isActive ? 'white' : '#71717a',
                  transition: 'all 0.2s ease', fontWeight: '600', fontSize: '13px'
                }}
              >
                {lvl} Level
                <div style={{ fontSize: '10px', opacity: 0.7 }}>{isActive ? 'Current Practice' : 'Cambridge Exam'}</div>
              </div>
            );
          })}
        </div>

        {/* 底部功能区 - 修复无反应问题 */}
        <div style={{ borderTop: '1px solid #f1f1f4', paddingTop: '16px' }}>
          {[
            { id: 'progress', icon: <TrendingUp size={16} />, label: '学习进度' },
            { id: 'wrong', icon: <ClipboardList size={16} />, label: '错题本' }
          ].map(item => (
            <div 
              key={item.id}
              onClick={() => handleFeatureClick(item.label)}
              onMouseEnter={() => setHoverItem(item.id)}
              onMouseLeave={() => setHoverItem(null)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', 
                color: '#71717a', fontSize: '13px', cursor: 'pointer', borderRadius: '10px',
                backgroundColor: hoverItem === item.id ? '#f4f4f5' : 'transparent',
                marginBottom: '4px'
              }}
            >
              {item.icon} {item.label}
            </div>
          ))}
          
          {/* 中英切换 - 增加点击交互 */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px', gap: '4px', marginTop: '12px' }}>
            <button 
              onClick={() => setActiveLanguage('EN')}
              style={{ 
                flex: 1, padding: '8px', border: 'none', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                backgroundColor: activeLanguage === 'EN' ? 'white' : 'transparent',
                color: activeLanguage === 'EN' ? '#18181b' : '#71717a',
                boxShadow: activeLanguage === 'EN' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >GB EN</button>
            <button 
              onClick={() => setActiveLanguage('CN')}
              style={{ 
                flex: 1, padding: '8px', border: 'none', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                backgroundColor: activeLanguage === 'CN' ? '#4338ca' : 'transparent',
                color: activeLanguage === 'CN' ? 'white' : '#71717a'
              }}
            >CN 中文</button>
          </div>
        </div>
      </nav>

      {/* --- 右侧主内容区 - 彻底解决滚动条 --- */}
      <main style={{ 
        flex: 1, height: '100%', overflowY: 'auto', // 只有这里可以滚动
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
      }}>
        {!isStarted ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>● 智能评估</div>
            <h1 style={{ fontSize: '48px', fontWeight: '900', textAlign: 'center', lineHeight: 1.1, margin: 0 }}>掌握英文翻译<br/><span style={{ color: '#4338ca' }}>一步步提升</span></h1>
            
            <div style={{ display: 'flex', gap: '20px', margin: '40px 0' }}>
               <FeatureCard icon={<BookOpen size={20}/>} title="结构化课程" sub="从A2到C2分级" />
               <FeatureCard icon={<Brain size={20}/>} title="即时AI反馈" sub="详细的改正意见" />
               <FeatureCard icon={<Target size={20}/>} title="考试导向" sub="专为剑桥和雅思设计" />
            </div>

            <button 
              onClick={() => setIsStarted(true)}
              style={{ backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', border: 'none', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.2)' }}
            >
              开始练习 →
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 20px' }}>
             <button onClick={() => setIsStarted(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', marginBottom: '30px' }}>
               <ChevronLeft size={18}/> 返回主页
             </button>

             <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f1f4', padding: '32px', marginBottom: '32px' }}>
               <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '12px' }}>翻译成英文 ({activeLevel})</div>
               <div style={{ fontSize: '24px', fontWeight: '700', color: '#18181b', lineHeight: 1.4 }}>
                 “无论科技如何进步，人类对知识的渴望始终如一。”
               </div>
             </div>

             <textarea 
               value={userInput}
               onChange={(e) => setUserInput(e.target.value)}
               placeholder="在此输入您的翻译..."
               style={{ width: '100%', height: '200px', padding: '24px', borderRadius: '24px', border: '2px solid #eef2ff', fontSize: '18px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
             />
          </div>
        )}
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, sub }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #f1f1f4', textAlign: 'center', width: '160px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
      <div style={{ color: '#4338ca', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '11px', color: '#a1a1aa' }}>{sub}</div>
    </div>
  );
}
