import React, { useState } from 'react';
import { 
  LineChart, BookOpen 
} from 'lucide-react';

const SidebarItem = ({ label, level, active, onClick }: any) => (
  <div 
    onClick={onClick} 
    className={active ? 'sidebar-item active' : 'sidebar-item'}
    style={{ 
      padding: '12px 20px', 
      backgroundColor: active ? '#4338ca' : 'transparent', 
      borderRadius: '12px', 
      cursor: 'pointer', 
      marginBottom: '4px', 
      color: active ? 'white' : '#71717a', 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between' 
    }}
  >
    <div>
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{label}</div>
      <div style={{ fontSize: '12px', opacity: active ? 0.8 : 0.6 }}>{level} Level</div>
    </div>
    {active && <span style={{ color: 'white', fontSize: '18px' }}>✦</span>}
  </div>
); 

export default function App() {
  const [activeTab, setActiveTab] = React.useState('');
  const [activeLevel, setActiveLevel] = useState('FCE');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* 侧边栏 */}
      <div style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e4e4e7', padding: '24px' }}>
        <style dangerouslySetInnerHTML={{ __html: ".sidebar-item:not(.active):hover { background-color: #f4f4f5 !important; } .sidebar-sub-item:hover { background-color: #f4f4f5 !important; color: #18181b !important; }" }} />
        
        <div style={{ marginBottom: '32px', paddingLeft: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold' }}>英语水平等级</div>
        </div>

        <SidebarItem label="Key (KET)" level="A2" active={activeLevel === 'KET'} onClick={() => setActiveLevel('KET')} />
        <SidebarItem label="Preliminary (PET)" level="B1" active={activeLevel === 'B1'} onClick={() => setActiveLevel('B1')} />
        <SidebarItem label="First (FCE)" level="B2" active={activeLevel === 'FCE'} onClick={() => setActiveLevel('FCE')} />
        <SidebarItem label="Advanced (CAE)" level="C1" active={activeLevel === 'CAE'} onClick={() => setActiveLevel('CAE')} />
        <SidebarItem label="Proficiency (CPE)" level="C2" active={activeLevel === 'CPE'} onClick={() => setActiveLevel('CPE')} />
        <SidebarItem label="IELTS Academic" level="All bands" active={activeLevel === 'IELTS'} onClick={() => setActiveLevel('IELTS')} />

        <div style={{ marginTop: '32px', borderTop: '1px solid #f4f4f5', paddingTop: '24px' }}>
          <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', marginBottom: '16px' }}>LEARNING TOOLS</div>
          {['学习进度', '错题本'].map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                padding: '12px 16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                borderRadius: '12px',
                transition: 'all 0.2s',
                marginBottom: '4px',
                backgroundColor: activeTab === item ? '#4338ca' : 'transparent',
                color: activeTab === item ? 'white' : '#71717a'
              }}
              onMouseEnter={(e) => { if(activeTab !== item) e.currentTarget.style.backgroundColor = '#f4f4f5' }}
              onMouseLeave={(e) => { if(activeTab !== item) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {item === '学习进度' ? <LineChart size={18} /> : <BookOpen size={18} />}
              <span style={{ fontWeight: '500' }}>{item}</span>
            </div>
          ))}

          {/* 语言切换栏 */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '8px', padding: '4px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
            <div style={{ flex: 1, textAlign: 'center', fontSize: '12px', padding: '6px' }}>GB EN</div>
            <div style={{ flex: 1, textAlign: 'center', fontSize: '12px', padding: '6px', backgroundColor: '#4338ca', color: 'white', borderRadius: '6px' }}>CN 中文</div>
          </div>
        </div>
      </div>

      {/* 主内容区（补全这块，否则右侧是一片空白） */}
      <div style={{ flex: 1, padding: '40px' }}>
        <h1>欢迎来到 Jing's English Trainer</h1>
        <p>选择左侧等级开始学习。</p>
      </div>
    </div>
  );
}
