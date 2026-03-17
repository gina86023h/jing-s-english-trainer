import React, { useState } from 'react';
import { Languages, TrendingUp, ClipboardList, ArrowRight, BookText, Lightbulb } from 'lucide-react';

export default function App() {
  const [activeLevel, setActiveLevel] = useState('Advanced (CAE)');
  const [activeLanguage, setActiveLanguage] = useState('CN'); 
  const [isStarted, setIsStarted] = useState(false);

  return (
    /* 1. 根容器：锁死视口高度，强制消除所有外层滚动条 */
    <div style={{ 
      width: '100vw', height: '100vh', overflow: 'hidden', 
      display: 'flex', backgroundColor: '#fcfcfd', margin: 0,
      fontFamily: 'Inter, -apple-system, system-ui, sans-serif'
    }}>
      
      {/* 2. 左侧侧边栏：恢复原始比例，确保点击层级 */}
      <nav style={{ 
        width: '280px', height: '100%', backgroundColor: 'white', 
        borderRight: '1px solid #f1f1f4', display: 'flex', flexDirection: 'column', 
        flexShrink: 0, zIndex: 50 // 确保点击不被右侧覆盖
      }}>
        {/* Logo */}
        <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#f0f2ff', padding: '8px', borderRadius: '12px' }}>
            <Languages size={22} color="#4338ca" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '19px', color: '#18181b' }}>LingoFlow</span>
        </div>

        {/* 等级列表：恢复系统悬停反馈 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: '700', marginBottom: '16px', paddingLeft: '12px' }}>英语水平等级</div>
          {[
            { label: 'Key (KET)', sub: 'A2 Level' },
            { label: 'Preliminary (PET)', sub: 'B1 Level' },
            { label: 'First (FCE)', sub: 'B2 Level' },
            { label: 'Advanced (CAE)', sub: 'C1 Level' },
            { label: 'Proficiency (CPE)', sub: 'C2 Level' },
            { label: 'IELTS Academic', sub: 'All bands' }
          ].map((item) => (
            <div 
              key={item.label}
              onClick={() => setActiveLevel(item.label)}
              className="hover-item"
              style={{ 
                padding: '12px 16px', borderRadius: '14px', cursor: 'pointer', marginBottom: '4px',
                backgroundColor: activeLevel === item.label ? '#4338ca' : 'transparent',
                color: activeLevel === item.label ? 'white' : '#3f3f46',
                transition: '0.2s'
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.label}</div>
              <div style={{ fontSize: '12px', opacity: 0.8, color: activeLevel === item.label ? 'white' : '#a1a1aa' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* 底部功能区：修复点击失效与中英切换逻辑 */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid #f1f1f4' }}>
          <div 
            onClick={() => alert('跳转至学习进度')} 
            className="hover-text"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#71717a', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >
            <TrendingUp size={18} /> 学习进度
          </div>
          <div 
            onClick={() => alert('跳转至错题本')} 
            className="hover-text"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#71717a', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}
          >
            <ClipboardList size={18} /> 错题本
          </div>
          
          {/* 中英切换按钮：锁定状态反馈 */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
            <button 
              onClick={() => setActiveLanguage('EN')}
              style={{ 
                flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                backgroundColor: activeLanguage === 'EN' ? 'white' : 'transparent',
                color: activeLanguage === 'EN' ? '#18181b' : '#71717a',
                boxShadow: activeLanguage === 'EN' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >GB EN</button>
            <button 
              onClick={() => setActiveLanguage('CN')}
              style={{ 
                flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                backgroundColor: activeLanguage === 'CN' ? '#4338ca' : 'transparent',
                color: activeLanguage === 'CN' ? 'white' : '#71717a'
              }}
            >CN 中文</button>
          </div>
        </div>
      </nav>

      {/* 3. 右侧主区域：恢复原始文案，严格控制溢出 */}
      <main style={{ 
        flex: 1, height: '100%', overflow: 'hidden', 
        display: 'flex', flexDirection: 'column', position: 'relative' 
      }}>
        {!isStarted ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', marginBottom: '24px' }}>● 智能评估</div>
            <h1 style={{ fontSize: '52px', fontWeight: '900', textAlign: 'center', lineHeight: 1.1, color: '#18181b', marginBottom: '24px' }}>
              掌握英文翻译<br/><span style={{ color: '#4338ca' }}>一步步提升</span>
            </h1>
            <p style={{ color: '#71717a', textAlign: 'center', maxWidth: '500px', marginBottom: '40px', fontSize: '16px' }}>
              从KET到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。
            </p>
            <button 
              onClick={() => setIsStarted(true)} 
              style={{ backgroundColor: '#4338ca', color: 'white', padding: '18px 48px', borderRadius: '16px', border: 'none', fontWeight: '800', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              开始练习 <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', padding: '60px 24px' }}>
             <div style={{ maxWidth: '800px', margin: '0 auto' }}>已
