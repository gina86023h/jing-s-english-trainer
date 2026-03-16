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
  const [hoverItem, setHoverItem] = useState(null);
  const [userInput, setUserInput] = useState('');

  // 1. 定义侧边栏数据，确保“学习进度”和“错题本”在这里
  const menuItems = [
    { id: 'progress', icon: <TrendingUp size={18} />, label: '学习进度' },
    { id: 'wrong', icon: <ClipboardList size={18} />, label: '错题本' }
  ];

  return (
    /* 最外层容器：锁定屏幕，不准滚动 */
    <div style={{ 
      width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden',
      backgroundColor: '#fcfcfd', fontFamily: '-apple-system, sans-serif'
    }}>
      
      {/* --- 左侧导航栏：固定宽度，自己内部滚动 --- */}
      <nav style={{ 
        width: '280px', height: '100%', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', 
        display: 'flex', flexDirection: 'column', flexShrink: 0
      }}>
        <div style={{ padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#eef2ff', padding: '8px', borderRadius: '12px' }}>
              <Languages size={24} color="#4338ca" />
            </div>
            <span style={{ fontWeight: '800', fontSize: '20px', color: '#18181b' }}>LingoFlow</span>
          </div>
        </div>

        {/* 等级列表区：独立滚动 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: '800', marginBottom: '16px', paddingLeft: '8px' }}>级别选择</div>
          {['KET', 'PET', 'FCE', 'CAE', 'CPE', 'IELTS'].map((lvl) => {
            const isActive = activeLevel === lvl;
            return (
              <div 
                key={lvl}
                onClick={() => { setActiveLevel(lvl); setIsStarted(false); }}
                onMouseEnter={() => setHoverItem(lvl)}
                onMouseLeave={() => setHoverItem(null)}
                style={{ 
                  padding: '12px 16px', borderRadius: '14px', cursor: 'pointer', marginBottom: '4px',
                  backgroundColor: isActive ? '#4338ca' : (hoverItem === lvl ? '#f4f4f5' : 'transparent'),
                  color: isActive ? 'white' : '#71717a', transition: '0.2s', fontWeight: '600'
                }}
              >
                {lvl} Level
              </div>
            );
          })}
        </div>

        {/* 底部固定区：学习进度、错题本、语言切换 */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid #f1f1f4' }}>
          {menuItems.map(item => (
            <div 
              key={item.id}
              onMouseEnter={() => setHoverItem(item.id)}
              onMouseLeave={() => setHoverItem(null)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
                color: '#71717a', fontSize: '14px', cursor: 'pointer', borderRadius: '12px',
                backgroundColor: hoverItem === item.id ? '#f4f4f5' : 'transparent', marginBottom: '4px'
              }}
            >
              {item.icon} {item.label}
            </div>
          ))}

          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '12px', marginTop: '16px' }}>
            <button onClick={() => setActiveLanguage('EN')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeLanguage === 'EN' ? 'white' : 'transparent', color: activeLanguage === 'EN' ? '#18181b' : '#71717a', boxShadow: activeLanguage === 'EN' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>EN</button>
            <button onClick={() => setActiveLanguage('CN')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeLanguage === 'CN' ? '#4338ca' : 'transparent', color: activeLanguage === 'CN' ? 'white' : '#71717a' }}>中文</button>
          </div>
        </div>
      </nav>

      {/* --- 右侧内容区：锁定高度，内部滚动 --- */}
      <main style={{ 
        flex: 1, height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' 
      }}>
        {!isStarted ? (
          /* 1. 首页视图 */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', marginBottom: '24px' }}>● 智能评估系统</div>
            <h1 style={{ fontSize: '56px', fontWeight: '900', textAlign: 'center', lineHeight: 1.1, margin: 0, color: '#18181b' }}>
              掌握英文翻译<br/><span style={{ color: '#4338ca' }}>一步步提升</span>
            </h1>
            
            <div style={{ display: 'flex', gap: '24px', margin: '48px 0' }}>
               <FeatureCard icon={<BookOpen size={24}/>} title="分级练习" sub="KET 到雅思全覆盖" />
               <FeatureCard icon={<Brain size={24}/>} title="AI 纠错" sub="即时语法深度反馈" />
               <FeatureCard icon={<Target size={24}/>} title="提分神器" sub="专为考试场景优化" />
            </div>

            <button 
              onClick={() => setIsStarted(true)}
              style={{ backgroundColor: '#4338ca', color: 'white', padding: '20px 56px', borderRadius: '18px', border: 'none', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer', boxShadow: '0 20px 25px -5px rgba(67, 56, 202, 0.2)' }}
            >
              开始练习 →
            </button>
          </div>
        ) : (
          /* 2. 练习视图 */
          <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto', padding: '60px 24px' }}>
             <button onClick={() => setIsStarted(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', marginBottom: '40px', fontSize: '15px', fontWeight: '600' }}>
               <ChevronLeft size={20}/> 返回主页
             </button>

             <div style={{ backgroundColor: 'white', borderRadius: '32px', border: '1px solid #f1f1f4', padding: '48px', marginBottom: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
               <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                 <Sparkles color="#4338ca" size={24} style={{ marginTop: '4px' }} />
                 <div>
                   <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>翻译题目 ({activeLevel})</div>
                   <div style={{ fontSize: '28px', fontWeight: '700', color: '#18181b', lineHeight: 1.4 }}>“无论科技如何进步，人类对知识的渴望始终如一。”</div>
                 </div>
               </div>
             </div>

             <textarea 
               value={userInput}
               onChange={(e) => setUserInput(e.target.value)}
               placeholder="在此处开始你的翻译..."
               style={{ width: '100%', height: '240px', padding: '32px', borderRadius: '32px', border: '2px solid #eef2ff', fontSize: '20px', outline: 'none', resize: 'none', boxSizing: 'border-box', transition: '0.2s' }}
               onFocus={(e) => e.target.style.borderColor = '#4338ca'}
               onBlur={(e) => e.target.style.borderColor = '#eef2ff'}
             />
          </div>
        )}
      </main>
    </div>
  );
}

// 首页小卡片组件
function FeatureCard({ icon, title, sub }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '32px 24px', borderRadius: '24px', border: '1px solid #f1f1f4', textAlign: 'center', width: '180px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      <div style={{ color: '#4338ca', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#18181b' }}>{title}</div>
      <div style={{ fontSize: '13px', color: '#a1a1aa' }}>{sub}</div>
    </div>
  );
}
