import React, { useState } from 'react';
import { LineChart, BookOpen, Brain, Target, ArrowRight } from 'lucide-react';

const SidebarItem = ({ label, level, active, onClick }) => (
  <div 
    onClick={onClick} 
    style={{ 
      padding: 'calc(6px + 0.4vh) 16px', // 随高度缩放的动态内边距
      backgroundColor: active ? '#4338ca' : 'transparent', 
      borderRadius: '12px', 
      cursor: 'pointer', 
      marginBottom: '4px',
      color: active ? 'white' : '#71717a', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      flexShrink: 1, // 关键：允许在窄屏下收缩
    }}
  >
    <div style={{ overflow: 'hidden' }}>
      <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ fontSize: '11px', opacity: active ? 0.9 : 0.6 }}>{level}</div>
    </div>
    {active && <span style={{ fontSize: '12px' }}>✦</span>}
  </div>
);

export default function App() {
  const [activeLevel, setActiveLevel] = useState('FCE');
  const [activeLanguage, setActiveLanguage] = useState('CN');

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden', // 绝不允许出现拉动条
      backgroundColor: '#fcfcfd',
      position: 'fixed', // 锁定在视口，防止移动端弹性滚动
      top: 0, left: 0
    }}>
      
      {/* 左侧栏：像 ChatGPT 一样布局 */}
      <nav style={{ 
        width: '260px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #f1f1f4', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        padding: '20px 16px',
        boxSizing: 'border-box'
      }}>
        {/* 顶部标签 */}
        <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
          <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            英语水平等级
          </div>
        </div>

        {/* 等级列表：通过 min-height: 0 实现弹性挤压，防止显示不全 */}
        <div style={{ 
          flex: 1, 
          minHeight: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2px',
          overflow: 'hidden' // 确保内部即使溢出也不产生父级滚动
        }}>
          {[
            { id: 'KET', label: 'Key (KET)', level: 'A2 Level' },
            { id: 'PET', label: 'Preliminary (PET)', level: 'B1 Level' },
            { id: 'FCE', label: 'First (FCE)', level: 'B2 Level' },
            { id: 'CAE', label: 'Advanced (CAE)', level: 'C1 Level' },
            { id: 'CPE', label: 'Proficiency (CPE)', level: 'C2 Level' },
            { id: 'IELTS', label: 'IELTS Academic', level: 'All bands Level' }
          ].map(item => (
            <SidebarItem 
              key={item.id} 
              {...item} 
              active={activeLevel === item.id} 
              onClick={() => setActiveLevel(item.id)} 
            />
          ))}
        </div>

        {/* 底部区域：增加 Padding-bottom 确保构图距离 */}
        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '20px',
          paddingBottom: '20px', // 模仿 GPT 的底部留白距离
          borderTop: '1px solid #f4f4f5'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
            <div style={{ padding: '10px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px', color: '#71717a', cursor: 'pointer' }}>
              <LineChart size={16} /> 学习进度
            </div>
            <div style={{ padding: '10px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px', color: '#71717a', cursor: 'pointer' }}>
              <BookOpen size={16} /> 错题本
            </div>
          </div>

          {/* 语言切换器 */}
          <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '10px' }}>
            {['EN', 'CN'].map(lang => (
              <button 
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                style={{ 
                  flex: 1, border: 'none', padding: '8px', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                  backgroundColor: activeLanguage === lang ? 'white' : 'transparent', 
                  color: activeLanguage === lang ? '#4338ca' : '#71717a',
                  boxShadow: activeLanguage === lang ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                {lang === 'EN' ? 'GB EN' : 'CN 中文'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 右侧主内容：居中构图 */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        padding: '40px'
      }}>
        {/* 背景装饰（可选，增加空间感） */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', zIndex: -1 }} />

        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
            <span style={{ fontSize: '16px' }}>●</span> 智能评估
          </div>
          
          <h1 style={{ fontSize: 'min(56px, 8vh)', fontWeight: '850', color: '#18181b', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            掌握英文翻译
          </h1>
          <h1 style={{ 
            fontSize: 'min(56px, 8vh)', fontWeight: '850', margin: '8px 0 24px 0', 
            background: 'linear-gradient(135deg, #4338ca 0%, #818cf8 100%)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.1
          }}>
            一步步提升
          </h1>
          
          <p style={{ color: '#71717a', fontSize: '18px', lineHeight: '1.6', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            从 KET 到雅思的结构化翻译练习。获得即时、智能的语法、词汇和措辞反馈。
          </p>

          <button style={{ 
            backgroundColor: '#4338ca', color: 'white', padding: '16px 48px', borderRadius: '14px', 
            border: 'none', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto',
            boxShadow: '0 20px 25px -5px rgba(67, 56, 202, 0.15)',
            transition: 'transform 0.2s'
          }}>
            开始练习 <ArrowRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
