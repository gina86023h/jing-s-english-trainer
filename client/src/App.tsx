<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>学习管理系统</title>
    <style>
        /* --- CSS 样式部分：解决滚动条与字体问题 --- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body, html {
            height: 100%;
            width: 100%;
            /* 恢复你要求的原字体 */
            font-family: "PingFang SC", "Microsoft YaHei", -apple-system, sans-serif;
            /* 彻底移除右侧和底部冗余滚动条 */
            overflow: hidden; 
        }

        .main-container {
            display: flex;
            height: 100vh;
            width: 100vw;
        }

        /* 左侧侧边栏 */
        .sidebar {
            width: 240px;
            background-color: #2c3e50;
            color: #ecf0f1;
            display: flex;
            flex-direction: column;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            z-index: 10;
        }

        /* 修复悬停无反应：确保样式优先级 */
        .nav-item {
            padding: 20px 25px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid #34495e;
        }

        .nav-item:hover {
            background-color: #3e5871 !important; /* 强制悬停变色 */
        }

        /* 右侧内容区 */
        .content-area {
            flex: 1;
            background-color: #f4f7f6;
            padding: 40px;
            /* 仅在右侧内容过多时显示滚动条，且不影响整体布局 */
            overflow-y: auto; 
        }

        .lang-switcher {
            margin-top: auto;
            background-color: #1a252f;
            border-top: 1px solid #34495e;
        }

        h1 { color: #333; margin-bottom: 20px; }
        p { color: #666; font-size: 18px; }

    </style>
</head>
<body>

    <div class="main-container">
        <aside class="sidebar">
            <div class="nav-item" id="btn-progress">
                <span>📊</span>
                <span class="menu-text" data-zh="学习进度" data-en="Learning Progress">学习进度</span>
            </div>
            <div class="nav-item" id="btn-notebook">
                <span>📓</span>
                <span class="menu-text" data-zh="错题本" data-en="Mistake Notebook">错题本</span>
            </div>
            <div class="nav-item lang-switcher" id="btn-lang">
                <span>🌐</span>
                <span class="menu-text">English / 中文</span>
            </div>
        </aside>

        <main class="content-area">
            <h1 id="main-title">欢迎使用</h1>
            <p id="main-desc">请从左侧选择功能模块开始。</p>
        </main>
    </div>

    <script>
        /* --- JavaScript 部分：解决点击无反应与语言切换 --- */
        document.addEventListener('DOMContentLoaded', () => {
            let currentLang = 'zh'; // 初始语言

            const langBtn = document.getElementById('btn-lang');
            const menuTexts = document.querySelectorAll('.menu-text');
            const title = document.getElementById('main-title');
            const desc = document.getElementById('main-desc');

            // 1. 中英切换逻辑
            langBtn.onclick = () => {
                currentLang = (currentLang === 'zh') ? 'en' : 'zh';
                
                menuTexts.forEach(el => {
                    const text = el.getAttribute(`data-${currentLang}`);
                    if (text) el.innerText = text;
                });
                
                console.log("当前语言已切换为: " + currentLang);
            };

            // 2. 学习进度点击事件
            document.getElementById('btn-progress').onclick = () => {
                title.innerText = (currentLang === 'zh') ? "学习进度" : "Learning Progress";
                desc.innerText = (currentLang === 'zh') ? "这里展示您的学习曲线数据。" : "Your learning curve data is shown here.";
            };

            // 3. 错题本点击事件
            document.getElementById('btn-notebook').onclick = () => {
                title.innerText = (currentLang === 'zh') ? "错题本" : "Mistake Notebook";
                desc.innerText = (currentLang === 'zh') ? "这里记录了您所有需要复习的题目。" : "All questions for review are recorded here.";
            };
        });
    </script>
</body>
</html>
