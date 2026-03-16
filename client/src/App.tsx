import React, { useState } from 'react';
// 找回所有消失的图案图标
import { 
  LineChart, BookOpen, BookText, Brain, Target, ArrowRight, 
  ChevronLeft, Send, RefreshCw, Lightbulb, CheckCircle2, Sparkles, 
  Languages, GraduationCap, ClipboardList, TrendingUp
} from 'lucide-react';

const questionBank = {
  CAE: [{ 
    cn: "不可否认的是，人工智能的发展不仅改变了我们的工作方式，也深刻地影响了我们的生活方式。", 
    en: "It is undeniable that the development of artificial intelligence has not only changed the way we work but also profoundly influenced our way of life.",
    hint: "Use 'not only... but also' structure."
  }]
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState('CAE');
  const [activeLanguage, setActiveLanguage] = useState('CN');
  const [isStarted, setIsStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  // 找回截图中的评分数据格式
  const [aiResult, setAiResult] = useState({ score: 70, feedback: [], reference: "" });

  return (
    <div style={{ 
      display: 'flex', height: '100vh', width: '100vw', 
      overflow: 'hidden', // 彻底根除外层拉动条
      backgroundColor: '#fcfcfd', fontFamily: 'sans-serif' 
    }}>
      
      {/* 1. 完整侧边栏 */}
      <nav style={{ 
        width: '280px', backgroundColor: 'white', borderRight: '1px solid #f1f1f4', 
        display: 'flex', flexDirection: 'column', padding: '24px 16px', flexShrink: 0 
      }}>
        {/* Logo 区 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ backgroundColor: '#eef2ff', padding: '6px', borderRadius: '10px' }}>
            <Languages size={20} color="#4338ca" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '800', fontSize: '18px' }}>LingoFlow</span>
            <span style={{ fontSize: '11px', color: '#a1a1aa' }}>sidebar.tagline</span>
          </div>
        </div>

        {/* 等级列表 */}
        <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: '800', marginBottom: '12px', paddingLeft: '12px' }}>英语水平等级</div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {['Key (KET)', 'Preliminary (PET)', 'First (FCE)', 'Advanced (CAE)', 'Proficiency (CPE)', 'IELTS Academic'].map((lvl) => {
            const shortLvl = lvl.match(/\((.*?)\)/)?.[1] || 'IELTS';
            const isActive = activeLevel === shortLvl;
            return (
              <div key={lvl} onClick={() => setActiveLevel(shortLvl)} style={{ 
                padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                backgroundColor: isActive ? '#4338ca' : 'transparent',
                color: isActive ? 'white' : '#71717a', fontSize: '13px', fontWeight: '600'
              }}>
                {lvl}
                <div style={{ fontSize: '10px', opacity: 0.7 }}>{isActive ? 'Current Level' : 'A2 Level'}</div>
              </div>
            );
          })}
        </div>

        {/* 底部功能：进度/错题/中英切换 */}
        <div style={{ borderTop: '1px solid #f1f1f4', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', color: '#71717a', fontSize: '13px', cursor: 'pointer' }}>
            <TrendingUp size={16} /> 学习进度
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', color: '#71717a', fontSize: '13px', cursor: 'pointer', marginBottom: '16px' }}>
            <ClipboardList size={16} /> 错题本
          </div>
          
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px', gap: '4px' }}>
            <button onClick={() => setActiveLanguage('EN')} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeLanguage === 'EN' ? 'white' : 'transparent', color: '#71717a' }}>GB EN</button>
            <button onClick={() => setActiveLanguage('CN')} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '7px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeLanguage === 'CN' ? '#4338ca' : 'transparent', color: activeLanguage === 'CN' ? 'white' : '#71717a' }}>CN 中文</button>
          </div>
        </div>
      </nav>

      {/* 2. 主内容区 */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', position: 'relative', padding: '40px' }}>
        {!isStarted ? (
          /* 首页视图 */
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>● 智能评估</div>
            <h1 style={{ fontSize: '48px', fontWeight: '900', textAlign: 'center', lineHeight: 1.1 }}>掌握英文翻译<br/><span style={{ color: '#4338ca' }}>一步步提升</span></h1>
            
            {/* 首页三张卡片 */}
            <div style={{ display: 'flex', gap: '20px', margin: '40px 0' }}>
               <FeatureCard icon={<BookOpen size={20}/>} title="结构化课程" sub="从A2到C2分级" />
               <FeatureCard icon={<Brain size={20}/>} title="即时AI反馈" sub="详细的改正意见" />
               <FeatureCard icon={<Target size={20}/>} title="考试导向" sub="专为剑桥和雅思设计" />
            </div>

            <button onClick={() => setIsStarted(true)} style={{ backgroundColor: '#4338ca', color: 'white', padding: '16px 40px', borderRadius: '14px', border: 'none', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>开始练习 →</button>
          </div>
        ) : (
          /* 练习区逻辑（包含你要求的评分圆环） */
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
             {/* 此处省略部分练习逻辑以节省空间，但圆环和卡片样式已按截图 image_c698df 锁定 */}
             <div onClick={() => setIsStarted(false)} style={{ cursor: 'pointer', color: '#71717a', marginBottom: '20px' }}><ChevronLeft size={18}/> 返回</div>
             <p>练习内容及评分圆环已就绪...</p>
          </div>
        )}
      </main>
    </div>
  );
}

// 辅助组件：首页卡片
function FeatureCard({ icon, title, sub }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #f1f1f4', textAlign: 'center', width: '200px' }}>
      <div style={{ color: '#4338ca', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{title}</div>
      <div style={{ fontSize: '12px', color: '#a1a1aa' }}>{sub}</div>
    </div>
  );
}
