# WEEKEND - 零碳周末生活方式平台

## 项目介绍

WEEKEND 是全球首个以"零碳周末生活"为核心的未来生活方式平台，通过创新产品与生态服务重构城市郊区度假场景。平台提供零碳房屋定制、精选自然住宿体验、在地活动和礼品卡等服务。

**设计参考：** [Raus.life](https://www.raus.life/) — 德国/奥地利精品小木屋租赁平台

### 核心理念

- **零碳承诺** — 每栋 Weekend House 实现全生命周期零碳排放
- **体验优先** — 卖的不是住宿，是自然中的生活方式
- **在地合作** — 与本地农场、手艺人深度绑定
- **坦诚透明** — 如实告知信号、温度等"不完美"，让用户做出知情选择

### 主要功能

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | Hero 视差动画、产品展示、碳计算器、社区、品牌故事 |
| 住宿预订 | `/stay` | 筛选器（日期/区域/人数/设施）+ 房源卡片列表 |
| 住宿详情 | `/stay/[id]` | 大图、特色、活动、交通、FAQ、侧边栏预订面板 |
| 体验活动 | `/experience` | 户外探索、在地美食、小惊喜、Digital Detox |
| 住宿指南 | `/guide` | 设施轮播、季节提醒、坦诚告知、打包清单 |
| Journal | `/journal` | 用户故事、自然笔记、正念生活、零碳知识 |
| 礼品卡 | `/gift` | 金额选择、收件人信息、实时卡面预览 |
| 零碳房屋 | `/house` | 产品介绍、技术参数、定制流程 |
| 产品定制 | `/house/order` | 外墙材料、储能系统、附加选项、实时总价 |
| 关于我们 | `/about` | 品牌使命、核心价值、发展历程 |
| 联系我们 | `/contact` | 联系表单 + 联系方式 |
| 管理后台 | `/admin` | 登录 + 仪表盘（图表、KPI） |

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 动画 | framer-motion (视差、滚动揭示、3D 倾斜) |
| 图表 | recharts |
| 字体 | Noto Sans SC + Noto Serif SC (next/font/google) |
| 图标 | lucide-react |
| 表单 | react-hook-form + zod |
| 地图 | Leaflet + react-leaflet (已集成但未启用) |

## 快速开始

### 环境要求

- Node.js 18+
- yarn

### 安装与运行

```bash
# 克隆仓库
git clone https://gitee.com/flycat321/weekend-website.git
cd weekend-website

# 安装依赖
yarn install

# 启动开发服务器
yarn dev

# 访问 http://localhost:3000
```

### 构建

```bash
yarn build    # 生产构建
yarn start    # 运行生产版本
```

## 项目结构

```
weekend-website/
├── app/                    # Next.js 页面路由
│   ├── page.tsx            # 首页（组件组合）
│   ├── stay/               # 住宿列表 + [id] 详情
│   ├── experience/         # 体验活动
│   ├── guide/              # 住宿指南
│   ├── journal/            # 内容博客
│   ├── gift/               # 礼品卡
│   ├── house/              # 产品介绍 + order 定制
│   ├── about/              # 关于我们
│   ├── contact/            # 联系我们
│   ├── terms/              # 使用条款
│   ├── privacy/            # 隐私政策
│   ├── search/             # → 重定向到 /stay
│   ├── admin/              # 管理后台
│   ├── layout.tsx          # 根布局（字体、主题）
│   └── globals.css         # CSS 变量、品牌色、动画 keyframes
├── components/
│   ├── brand/logo.tsx      # SVG Logo（叶子+房屋）
│   ├── home/               # 首页 5 个子组件
│   ├── motion/reveal.tsx   # 滚动揭示动画组件
│   ├── ui/                 # shadcn/ui 组件库 (60+)
│   ├── admin/              # 管理后台组件
│   ├── navbar.tsx          # 响应式导航栏
│   ├── footer.tsx          # 页脚（订阅、链接）
│   ├── hero-section.tsx    # 视差 Hero（framer-motion）
│   ├── product-showcase.tsx # 技术展厅（3D 倾斜 + 热点）
│   └── carbon-calculator.tsx # 碳计算器（recharts）
├── lib/
│   ├── data.ts             # 所有 mock 数据（6 个房源）
│   ├── types.ts            # TypeScript 类型定义
│   └── utils.ts            # cn() 工具函数
├── public/                 # 静态资源
│   ├── house1-8.avif       # 房源高清图片
│   └── house-new1.png      # 产品渲染图
├── tailwind.config.ts      # Tailwind 配置（品牌色、动画）
├── next.config.mjs         # Next.js 配置
└── components.json         # shadcn/ui 配置
```

## 设计系统

### 品牌色

| Token | 色值 | 用途 |
|-------|------|------|
| `brand-turquoise` | `hsl(174, 100%, 40%)` | 主色调、CTA、强调 |
| `brand-earth` | `hsl(30, 21%, 44%)` | 次要按钮、温暖感 |
| `brand-cream` | `hsl(36, 33%, 97%)` | 区块背景、卡片 |
| `brand-forest` | `hsl(150, 30%, 20%)` | 深色区块、Hero 背景 |

### 动画

- **Reveal** — 滚动进入动画（上/下/左/右方向），基于 `useInView`
- **Hero 视差** — `useScroll` + `useTransform` 驱动背景缩放和内容偏移
- **3D 倾斜** — 鼠标追踪 `useMotionValue` + CSS `perspective`
- **CountUp** — 数字递增动画
- **粒子飘浮** — CSS `particle-drift` keyframe

### 图片策略

> **重要：** 所有图片必须使用本地文件，不得使用 Unsplash 等外网 URL。原因：国内网络环境下 Unsplash 加载超时（>5秒）。

- 房源图片：`/public/house1-8.avif`
- 产品渲染：`/public/house-new1.png`
- 在 `<Reveal>` 组件内的图片需添加 `loading="eager"` 或 `priority` 属性

## 竞品分析笔记 (Raus.life)

以下是分析 Raus.life 后提炼的可借鉴策略：

| 策略 | Raus 做法 | WEEKEND 已实施 |
|------|----------|---------------|
| 体验独立产品线 | `/extras` 一级页面 | `/experience` 页面 |
| 透明住宿指南 | `/staying-with-us` 详尽说明 | `/guide` 页面（含"坦诚告知"板块） |
| 编辑内容驱动 | `/journal` 杂志化博客 | `/journal` 页面（4 个分类） |
| 礼品卡增长 | Gift cards 系统 | `/gift` 页面 |
| Digital Detox | 作为卖点单独推广 | `/experience` 页面 Digital Detox 专区 |
| 冒险等级系统 | Adventure Level 1-3 | 数据中已有 `level` 字段 |
| 城市距离标注 | "1:30h from Munich" | 卡片上显示 `travelTimes` |
| 本地合作生态 | 每个地点绑定当地农场/作坊 | 美食体验标注合作伙伴 |
| Newsletter 激励 | 订阅享 10% 折扣 | 待实施 |
| Become a Host | 轻资产扩张入口 | 待实施 |

## 管理后台

- 登录地址：`/admin`
- 账号：`admin` / 密码：`weekend123`
- 仪表盘包含 recharts 图表（访问量折线图、流量来源饼图）

## 联系方式

- 项目地址：[https://gitee.com/flycat321/weekend-website](https://gitee.com/flycat321/weekend-website)
- 邮箱：354610696@qq.com

---

&copy; 2025 WEEKEND. 保留所有权利.
