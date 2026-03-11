import React from 'react';
const cardStyle = { backgroundColor: 'white', padding: '32px 24px', borderRadius: '16px', border: '1px solid #e4e4e7', textAlign: 'center' as const };
const SidebarItem = ({ label, level, active }: any) => (

<div style={{ padding: '12px 20px', backgroundColor: active ? '#f4f4f5' : 'transparent', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px' }}>
<div style={{ fontSize: '14px', fontWeight: 'bold', color: active ? '#18181b' : '#71717a' }}>{label}</div>
<div style={{ fontSize: '12px', color: '#a1a1aa' }}>{level} Level</div>
</div>
);
export default function App() {
return (
<div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'sans-serif' }}>
<div style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e4e4e7', padding: '24px' }}>
<div style={{ marginBottom: '32px', paddingLeft: '20px' }}><div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold' }}>英语水平等级</div></div>
<SidebarItem label="Key (KET)" level="A2" />
<SidebarItem label="Preliminary (PET)" level="B1" />
<SidebarItem label="First (FCE)" level="B2" active={true} />
<SidebarItem label="Advanced (CAE)" level="C1" />
<SidebarItem label="Proficiency (CPE)" level="C2" />
</div>
);
}
