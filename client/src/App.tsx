import React, { useState } from 'react';

export default function App() {
const [text, setText] = useState('');

return (
<div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
<h1 style={{ color: '#0070f3' }}>Jing's English Trainer</h1>
<div style={{ backgroundColor: '#f0f9ff', padding: '10px', borderRadius: '8px', color: '#0070f3', marginBottom: '20px' }}>
✅ 部署状态：已在线
</div>
<textarea
style={{ width: '100%', height: '150px', padding: '15px', borderRadius: '8px', border: '2px solid #eaeaea', fontSize: '16px', boxSizing: 'border-box' }}
placeholder="在此输入英文练习内容..."
value={text}
onChange={(e) => setText(e.target.value)}
/>
<button
style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer' }}
onClick={() => alert('内容已接收：' + text)}
>
开始练习
</button>
</div>
);
}
