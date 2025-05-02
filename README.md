# WEEKEND 度假住宿网站

## 项目介绍

WEEKEND 是一个专注于提供高品质度假住宿服务的网站平台。我们精选设计感强、自然环境优美的度假住所，为用户提供难忘的度假体验。

### 主要特色

- **精选度假住宿**：森林秘境小屋、湖光山色别墅等多种精品度假选择
- **沉浸式体验**：每处住宿都提供独特的自然风光和休闲体验
- **便捷预订**：简单直观的预订流程，轻松规划您的周末度假
- **个性化定制**：可根据您的需求定制度假方案

## 技术架构

- **前端框架**：Next.js 14
- **UI 组件**：基于 Tailwind CSS 和自定义 UI 组件
- **状态管理**：React Hooks
- **内容管理**：自定义内容管理系统

## 功能模块

### 前台网站

- 首页：展示热门度假住宿和平台特色
- 住宿详情页：展示住宿详细信息、设施、价格和预订功能
- 预订流程：选择日期、定制选项和在线支付
- 关于我们：平台理念和服务介绍

### 后台管理

- 内容管理系统：可视化编辑网站内容
- 用户管理：管理用户账户和权限
- 订单管理：处理预订订单和查看统计数据

## 安装教程

### 开发环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆仓库到本地
   ```bash
   git clone https://gitee.com/flycat321/weekend-website.git
   cd weekend-website
   ```

2. 安装依赖
   ```bash
   npm install
   # 或
   yarn install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

4. 访问开发站点
   打开浏览器访问 http://localhost:3000

## 部署指南

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 运行生产版本

```bash
npm run start
# 或
yarn start
```

## 内容管理系统使用指南

1. 访问管理后台：登录 `/admin` 页面
2. 内容编辑：
   - 在内容管理页面选择要编辑的页面
   - 使用可视化编辑器添加、修改或删除内容块
   - 可以添加标题、文本、图片等不同类型的内容
   - 支持移动设备预览
3. 保存更改：点击"保存"按钮应用更改

## 项目目录结构

```
weekend-website/
├── app/                # Next.js 应用目录
│   ├── admin/          # 管理后台相关页面
│   ├── house/          # 房屋相关页面
│   ├── stay/           # 住宿详情页面
│   └── ...             # 其他页面组件
├── components/         # 可复用的组件
│   ├── admin/          # 管理后台组件
│   ├── ui/             # UI 基础组件
│   └── ...             # 其他组件
├── public/             # 静态资源文件
├── styles/             # 样式文件
├── types/              # TypeScript 类型定义
└── ...                 # 其他配置文件
```

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 `git checkout -b feature/AmazingFeature`
3. 提交您的更改 `git commit -m 'Add some AmazingFeature'`
4. 推送到分支 `git push origin feature/AmazingFeature`
5. 创建一个 Pull Request

## 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 项目地址：[https://gitee.com/flycat321/weekend-website](https://gitee.com/flycat321/weekend-website)
- 电子邮件：[联系邮箱]

---

© 2025 WEEKEND. 保留所有权利.
