# 个人作品集网站（lab04）

一个纯静态的个人作品集单页网站，使用原生 HTML / CSS / JavaScript 编写，**无框架、无构建步骤、无第三方依赖**，双击 `index.html` 即可运行。

页面分为左侧固定信息栏与右侧内容主区，包含首屏介绍、项目作品、关于我、联系方式四个区块，并支持浅色 / 深色主题切换。

## 预览与运行

方式一，直接打开：

```text
双击 index.html（或拖入浏览器）
```

方式二，用任意静态服务器托管（推荐，便于手机同局域网访问）：

```bash
python -m http.server 8123
# 然后访问 http://127.0.0.1:8123
```

不需要 `npm install`，不需要打包，也没有环境变量或后端接口。

## 目录结构

```text
lab04/
├── index.html          页面结构：左侧栏 + 主区四个区块
├── css/
│   └── style.css       全部样式：变量、左侧栏、主区、动效、移动端适配
├── js/
│   ├── theme.js        深浅色主题：读取 / 保存 localStorage，首屏渲染前应用
│   ├── data.js         个人信息与项目数据（日常只需改这个文件）
│   └── main.js         渲染 DOM 与页面交互
├── assets/
│   ├── project-1.jpg   项目封面图（4 张）
│   ├── project-2.jpg
│   ├── project-3.jpg
│   └── project-4.jpg
├── profile_demo.md     个人信息与项目经历的原始素材（页面不读取它，仅供改数据时参考）
└── .trae/              项目规则与技能配置（与页面运行无关）
```

### 脚本加载顺序

| 位置 | 文件 | 作用 |
| --- | --- | --- |
| `<head>` | `js/theme.js` | 同步执行，在首屏渲染前应用主题，避免刷新闪白 |
| `<body>` 末尾 | `js/data.js` | 声明 `PROFILE`、`PROJECTS` 两个全局常量 |
| `<body>` 末尾 | `js/main.js` | 读取上面的数据，渲染页面并绑定交互 |

`main.js` 依赖 `data.js`，因此顺序不能调换；`theme.js` 独立，不依赖任何数据。

## 功能特性

| 功能 | 实现位置 |
| --- | --- |
| 深浅色主题切换，并用 localStorage 记忆选择 | `js/theme.js` + `css/style.css` |
| 移动端抽屉菜单（汉堡按钮、遮罩、点击导航自动收起） | `main.js` 的 `initMenu()` |
| 导航随滚动高亮当前区块 | `main.js` 的 `initNavSpy()` |
| 区块 / 卡片滚动淡入 | `main.js` 的 `initReveal()` |
| 邮箱、微信一键复制 | `main.js` 的 `renderContact()` / `copyText()` |
| 项目列表按数据自动渲染、图文左右交替 | `main.js` 的 `renderProjects()` |
| 页脚年份自动更新 | `main.js` 末尾 |

## 内容维护

页面所有文字和数据都来自 `js/data.js`，**修改内容不需要动 HTML 结构**。

### PROFILE（个人信息）

| 字段 | 说明 |
| --- | --- |
| `name` | 姓名，用于侧栏标题、顶栏与首屏问候语 |
| `role` | 身份一句话介绍，显示在姓名下方 |
| `school` / `location` | 侧栏状态栏与首屏标签 |
| `skills` | 技能标签数组，渲染在侧栏 |
| `directions` | 方向数组，渲染在首屏标签与「关于我」标签 |
| `heroDesc` | 首屏描述段落 |
| `about` | 「关于我」段落数组，一个元素一段 |
| `facts` | 「关于我」右侧信息行，`{ label, value }` |
| `contact` | 联系方式数组，见下表 |

`contact` 单项字段：

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `label` / `sub` | 是 | 中文名与英文小字，如「邮箱 / EMAIL」 |
| `value` | 是 | 显示值 |
| `link` | 否 | 有值时渲染为链接，否则渲染为纯文本 |
| `external` | 否 | 配合 `link` 使用，为真时新窗口打开并加 `rel="noreferrer"` |
| `copy` | 否 | 为真时在该行显示「复制」按钮 |

### PROJECTS（项目作品）

```js
{
  name: "项目名称",
  category: "项目类别",          // 渲染为类别标签
  date: "2026.07",              // 显示在类别右侧
  stack: ["Python", "FastAPI"], // 技术栈标签
  summary: "项目简介文字",
  alt: "封面图的替代文字",
  image: "assets/project-1.jpg"
}
```

向 `PROJECTS` 数组追加一个对象即可，序号（01、02…）与图文左右交替由代码和 CSS 自动处理；封面图放进 `assets/` 后把 `image` 改成对应路径。

## 主题切换实现

- 主题状态写在 `<html>` 的 `data-theme` 属性上：深色为 `data-theme="dark"`，浅色不设该属性。
- 用户选择保存在 `localStorage` 的 `portfolio-theme` 键中，取值为 `"light"` / `"dark"`；没有记录或值非法时默认浅色。
- 深色主题通过 `css/style.css` 中的 `:root[data-theme="dark"]` 覆盖主区色彩变量实现，**左侧栏的深绿渐变保持不变**，以延续原有视觉风格。
- 按钮位于 `.sidebar` 内：桌面端在左侧栏右上角，移动端（≤960px）移到顶部栏、汉堡按钮左侧；图标表示「将要切换到」的主题。
- `localStorage` 不可用时（如隐私模式）会静默降级：切换照常生效，只是不记忆。

## 响应式与兼容性

- 断点：`960px`
  - ≥960px：左侧 340px 固定栏 + 右侧主区
  - <960px：60px 顶部栏 + 抽屉式侧栏，页面主区改为单列，项目图片统一置顶
- 桌面端与移动端均已适配。
- 以下能力缺失时会自动降级，不影响内容阅读：
  - `IntersectionObserver` 不可用 → 跳过导航高亮与滚动淡入
  - `prefers-reduced-motion: reduce` → 关闭滚动淡入与平滑滚动
  - `navigator.clipboard` 不可用 → 回退到 `document.execCommand("copy")`

## 开发约定

- 只用原生 HTML / CSS / JavaScript，不引入 React、Vue 等框架，也不使用第三方 UI 组件库。
- HTML、CSS、JavaScript 分别放在各自文件中。
- 修改前先阅读现有代码，优先复用已有结构与逻辑；保持现有页面结构，不随意改动与任务无关的功能。
- 每次改动尽量控制范围，改完后需在浏览器中验证桌面端与移动端，且不得破坏已有功能。