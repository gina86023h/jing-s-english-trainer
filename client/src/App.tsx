import React, { useState } from 'react';

export default function App() {
const [text, setText] = useState('');
const [loading, setLoading] = useState(false);

return (
<div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
<h1 style={{ color: '#0070f3' }}>Jing's English Trainer</h1>
<textarea
style={{ width: '100%', height: '150px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
placeholder="在此输入英文内容..."
value={text}
onChange={(e) => setText(e.target.value)}
/>
<button
style={{ width: '100%', padding: '15px', marginTop: '10px', backgroundColor: '#18181b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
onClick={() => alert('分析功能正在接通中...')}
>
开始分析
</button>
</div>
);
}
