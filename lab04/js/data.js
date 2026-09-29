/* ==========================================================
   页面数据：修改个人信息与项目只需编辑此文件
   ========================================================== */

const PROFILE = {
  name: "蔡铠漩",
  role: "软件工程专业学生 · 关注 AI 辅助开发与大语言模型技术",
  school: "广州软件学院 · 在读",
  location: "中国 · 广州",
  skills: ["Python", "Java", "TypeScript", "HTML / CSS"],
  directions: ["AI 辅助开发", "大语言模型应用", "前后端开发", "数据可视化"],
  heroDesc:
    "软件工程专业在读，目前主要关注 AI 辅助开发与大语言模型技术，" +
    "平时使用 Python、Java 和 TypeScript 进行项目开发，也在持续学习前后端开发、数据可视化和 AI 应用构建。",
  about: [
    "我叫蔡铠漩，是一名软件工程专业学生，目前主要关注 AI 辅助开发与大语言模型技术。平时主要使用 Python、Java 和 TypeScript 进行项目开发，也在持续学习前后端开发、数据可视化和 AI 应用构建。"
  ],
  facts: [
    { label: "学校状态", value: "广州软件学院 · 在读" },
    { label: "主攻方向", value: "AI 辅助开发 · 大语言模型应用" },
    { label: "常用技能", value: "Python · Java · TypeScript · HTML/CSS" },
    { label: "所在城市", value: "中国 · 广州" }
  ],
  contact: [
    { label: "邮箱", sub: "EMAIL", value: "caikaixuan@example.com", link: "mailto:caikaixuan@example.com", copy: true },
    { label: "微信", sub: "WECHAT", value: "caikaixuan", copy: true },
    { label: "GitHub", sub: "GITHUB", value: "github.com/caikaixuan", link: "https://github.com/caikaixuan", external: true },
    { label: "个人主页", sub: "HOMEPAGE", value: "caikaixuan.dev", link: "https://caikaixuan.dev", external: true }
  ]
};

/* 新增项目：向数组追加一个对象即可，页面自动渲染 */
const PROJECTS = [
  {
    name: "轻记账",
    category: "移动应用",
    date: "2025.04",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    summary:
      "面向日常生活场景的极简记账小程序，重点解决快速记录和查看个人收支的问题。" +
      "支持语音快捷记账、月度收支统计和预算提醒，使用微信云开发完成数据存储与后端能力。",
    alt: "轻记账小程序封面插图",
    image: "assets/project-1.jpg"
  },
  {
    name: "拾光集市",
    category: "Web 应用",
    date: "2025.09",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    summary:
      "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。" +
      "从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    alt: "拾光集市平台封面插图",
    image: "assets/project-2.jpg"
  },
  {
    name: "城市脉搏",
    category: "数据可视化",
    date: "2026.03",
    stack: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    summary:
      "城市实时交通与天气数据可视化大屏，集中展示交通、天气和城市运行信息。" +
      "通过多数据源轮询聚合数据，结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏展示。",
    alt: "城市脉搏数据大屏封面插图",
    image: "assets/project-3.jpg"
  },
  {
    name: "课语通",
    category: "AI 应用",
    date: "2026.07",
    stack: ["Python", "FastAPI", "RAG", "向量检索", "LLM API", "Streamlit"],
    summary:
      "基于大语言模型的课程问答助手。上传课程资料后自动建立知识索引，" +
      "根据课程内容回答问题并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    alt: "课语通 AI 问答助手封面插图",
    image: "assets/project-4.jpg"
  }
];
