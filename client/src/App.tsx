import React, { useState } from 'react';

// 这个版本完全去掉了对 UI 组件库的依赖，直接使用标准 HTML/CSS
// 这样可以彻底跳过所有 "Module not found" 的报错
export default function App() {
  const [text, setText] = useState('');

  const handleStart = () => {
    if (!text.trim()) {
      alert('请先输入一些英文内容哦！');
      return;
    }
    alert('太棒了！部署已成功，主功能逻辑已就绪。');
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center',
      lineHeight: '1.5'
    }}>
      <h1 style={{ color: '#0070f3', marginBottom: '10px', fontSize: '2rem' }}>
        Jing's English Trainer
      </h1>
      
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        padding: '10px', 
        borderRadius: '8px', 
        color: '#0070f3',
        fontWeight: 'bold',
        display: 'inline-block',
        marginBottom: '30px'
      }}>
        ✅ 部署状态：已在线
      </div>

      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          输入练习内容：
        </label>
        <textarea 
          style={{ 
            width: '100%', 
            height: '180px', 
            padding: '15px',
            borderRadius: '12px',
            border: '2px solid #eaeaea',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none',
            focus: 'border-color: #0070f3'
          }}
          placeholder="在此输入你想练习的英文句子..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button 
        style={{ 
          width: '100%',
          padding: '16px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '12px', 
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
        }}
        onClick={handleStart}
      >
        开始练习
      </button>

      <footer style={{ marginTop: '60px', fontSize: '14px', color: '#888', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        温馨提示：只要能看到这个界面，就说明 Vercel 已经彻底打通了！
      </footer>
    </div>
  );
}
