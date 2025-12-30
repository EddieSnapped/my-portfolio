function showPage(pageId) {
    // 1. 隐藏所有页面
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));

    // 2. 移除所有按钮激活状态
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. 显示目标页面
    const target = document.getElementById(pageId + '-page');
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0); // 切换时回到顶部
    }

    // 4. 激活对应按钮
    // 找到对应的按钮并添加active类 (这里简单通过遍历匹配onclick内容来实现，或者直接event.target)
    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(pageId));
    if (activeBtn) activeBtn.classList.add('active');
}
