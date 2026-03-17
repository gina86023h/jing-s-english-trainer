import React, { useState } from 'react';
import { Languages, TrendingUp, ClipboardList } from 'lucide-react';

export default function App() {
  const [activeLevel, setActiveLevel] = useState('CAE');
  const [activeLanguage, setActiveLanguage] = useState('CN');

  return (
    /* 1. 根容器：锁死宽高，绝对禁止溢出 */
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      display: 'flex',
      backgroundColor: '#fcfcfd',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* 2. 左侧侧边栏：固定宽度 */}
      <nav style={{ 
        width: '280px', 
        height: '100%', 
        backgroundColor: 'white', 
        borderRight: '1px solid #f1f1f4', 
        display: 'flex', 
        flexDirection: 'column', 
        flexShrink: 0, // 防止被右侧挤压
        boxSizing: 'border-box'
      }}>
        {/* Logo */}
        <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#f0f2ff', padding: '8px', borderRadius: '12px' }}>
            <Languages size={22} color="#4338ca" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '19px', color: '#18181b' }}>LingoFlow</span>
        </div>

        {/* 等级列表：如果项目多，只在这一小块区域内部滚动 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: '700', marginBottom: '16px', paddingLeft: '12px' }}>英语水平等级</div>
          {['KET', 'PET', 'FCE', 'CAE', 'CPE', 'IELTS'].map((lvl) => (
            <div 
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              style={{ 
                padding: '12px 16px', borderRadius: '14px', cursor: 'pointer', marginBottom: '4px',
                backgroundColor: activeLevel === lvl ? '#4338ca' : 'transparent',
                color: activeLevel === lvl ? 'white' : '#3f3f46',
                fontWeight: '600'
              }}
            >
              {lvl} Level
            </div>
          ))}
        </div>

        {/* 底部功能区：中英切换 */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid #f1f1f4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#71717a', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <TrendingUp size={18} /> 学习进度
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#71717a', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>
            <ClipboardList size={18} /> 错题本
          </div>
          
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
            <button 
              onClick={() => setActiveLanguage('EN')}
              style={{ 
                flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                backgroundColor: activeLanguage === 'EN' ? 'white' : 'transparent',
                color: activeLanguage === 'EN' ? '#18181b' : '#71717a'
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

      {/* 3. 右侧内容区：严禁溢出 */}
      <main style={{ 
        flex: 1, 
        height: '100%', 
        overflow: 'hidden', // 关键：右侧主容器也不允许有滚动条
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '40px'
        }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#18181b' }}>干净的页面</h1>
          <p style={{ color: '#71717a' }}>无论怎么缩放，外层都不会出现滚动条</p>
        </div>
      </main>
    </div>
  );
}
