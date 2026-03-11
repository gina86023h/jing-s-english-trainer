import React, { useState } from 'react';

// 样式配置：恢复原本的高级黑白质感
const styles = {
container: { minHeight: '100vh', backgroundColor: '#fafafa', padding: '40px 20px', fontFamily: '-apple-system, sans-serif' },
wrapper: { maxWidth: '800px', margin: '0 auto' },
header: { textAlign: 'center' as const, marginBottom: '40px' },
card: { background: 'white', borderRadius: '16px', border: '1px solid #e4e4e7', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '32px' },
label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#3f3f46', marginBottom: '12px' },
textarea: { width: '100%', height: '160px', padding: '16px', borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '16px', lineHeight: '1.6', boxSizing: 'border-box' as const, outline: 'none', transition: 'border 0.2s' },
button: { width: '100%', marginTop: '20px', padding: '14px', backgroundColor: '#18181b', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
resultBox: { marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }
};

export default function App() {
const [input, setInput] = useState('');
const [loading, setLoading] = useState(false);
const [analysis, setAnalysis] = useState<any>(null);

const handleAnalyze = () => {
if (!input.trim()) return;
setLoading(true);

};

return (
<div style={styles.container}>
<div style={styles.wrapper}>
<header style={styles.header}>
<h1 style={{ fontSize: '32px', fontWeight: '800', color: '#09090b', margin: 0 }}>Jing's English Trainer</h1>
<p style={{ color: '#71717a', marginTop: '8px' }}>智能 AI 辅助，让你的英文表达更地道</p>
</header>

);
}
