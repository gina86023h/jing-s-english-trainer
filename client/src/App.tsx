import React, { useState } from 'react';

// 下面是手动定义的样式，不依赖任何外部文件
const CardStyle = {
background: 'white',
borderRadius: '12px',
border: '1px solid #e4e4e7',
boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
padding: '24px',
textAlign: 'left'
};

const ButtonStyle = {
width: '100%',
padding: '12px',
backgroundColor: '#18181b',
color: 'white',
border: 'none',
borderRadius: '8px',
fontSize: '16px',
fontWeight: '600',
cursor: 'pointer',
marginTop: '16px'
};

export default function App() {
const [input, setInput] = useState('');
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);

const handleAnalyze = () => {
if (!input) return;
setLoading(true);
// 模拟分析过程
setTimeout(() => {
setResult("分析完成！建议：可以多使用一些从句来增加表达的深度。");
setLoading(false);
}, 1500);
};

return (
<div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '40px 20px', fontFamily: 'sans-serif' }}>
<div style={{ maxWidth: '600px', margin: '0 auto' }}>
<header style={{ marginBottom: '32px', textAlign: 'center' }}>
<h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#09090b' }}>
Jing's English Trainer
</h1>
<p style={{ color: '#71717a' }}>像母语者一样思考和表达</p>
</header>

);
}
