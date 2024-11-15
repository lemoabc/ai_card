# AI 聊天平台设计文档

## 1. 产品概述

### 1.1 项目背景
本项目旨在创建一个现代化的AI聊天平台，为用户提供多个专业领域的AI助手服务。平台设计借鉴了Apple和Google的设计理念，强调简洁性、可用性和美观性。

### 1.2 目标用户
- 需要专业领域咨询的用户
- 寻求通用AI助手服务的用户
- 对AI技术感兴趣的开发者和研究者

### 1.3 核心价值主张
- 多样化的AI助手选择
- 简洁直观的用户界面
- 流畅的对话体验
- 智能分类的助手系统
- 本地存储的聊天记录

## 2. 系统架构

### 2.1 技术栈选择
- **前端框架**: Next.js 14.1.0 (App Router)
- **UI框架**: React 18.2.0
- **样式解决方案**: Tailwind CSS
- **组件库**: shadcn/ui
- **图标库**: lucide-react
- **状态管理**: React Hooks + LocalStorage
- **主题系统**: next-themes
- **类型系统**: TypeScript 5.2.2

### 2.2 目录结构
```
project/
├── app/                    # Next.js 应用主目录
│   ├── layout.tsx         # 全局布局（主题配置）
│   ├── page.tsx           # 主页面（智能助手展示和聊天）
│   └── globals.css        # 全局样式
├── components/            # 组件目录
│   ├── chat/             # 聊天相关组件
│   │   ├── agent-list.ts        # 智能助手定义和数据
│   │   ├── agent-categories.ts  # 助手分类定义
│   │   ├── agent-sidebar.tsx    # 侧边栏导航组件
│   │   └── chat-window.tsx      # 聊天窗口组件
│   ├── theme-provider.tsx # 主题提供者组件
│   ├── theme-toggle.tsx   # 主题切换按钮
│   └── ui/               # 基础UI组件（shadcn/ui）
└── lib/                  # 工具函数
    └── utils.ts          # 通用工具函数
```

## 3. 智能助手系统

### 3.1 助手分类
```typescript
// agent-categories.ts
export interface Category {
  name: string;        // 分类名称
  description: string; // 分类描述
  icon: LucideIcon;    // 分类图标
}

export const categories = {
  general: {
    name: "通用助手",
    description: "处理日常问题和查询",
    icon: Brain
  },
  development: { ... },
  creative: { ... },
  analysis: { ... },
  education: { ... },
  business: { ... },
  science: { ... }
};
```

### 3.2 助手定义
```typescript
// agent-list.ts
export interface Agent {
  id: number;          // 唯一标识
  name: string;        // 助手名称
  icon: LucideIcon;    // 显示图标
  description: string; // 功能描述
  category: string;    // 所属分类
  tags?: string[];     // 标签列表
}

export const agents: Agent[] = [
  // 通用助手
  { 
    id: 1, 
    name: "智能问答", 
    icon: Brain,
    category: "general",
    ...
  },
  // ... 其他助手
];
```

## 4. 组件设计

### 4.1 AgentSidebar 组件
```typescript
interface AgentSidebarProps {
  selectedAgentId: number | null;     // 当前选中的助手
  onSelectAgent: (id: number | null) => void; // 选择回调
  isCollapsed: boolean;               // 折叠状态
  onCollapsedChange: (collapsed: boolean) => void; // 折叠切换
  className?: string;                 // 自定义样式
}
```

### 4.2 ChatWindow 组件
```typescript
interface ChatWindowProps {
  agentId: number;     // 当前助手ID
  onBack?: () => void; // 返回回调（移动端）
}

interface Message {
  id: string;          // 消息ID
  content: string;     // 消息内容
  role: "user" | "assistant"; // 发送者角色
  timestamp: number;   // 时间戳
  agentId: number;     // 关联的助手ID
  tags?: string[];     // 消息标签（用于后续功能扩展）
}
```

### 4.3 主题系统
```typescript
// theme-provider.tsx
<NextThemesProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</NextThemesProvider>
```

### 4.4 助手系统
```typescript
interface Agent {
  id: number;          // 助手ID
  name: string;        // 助手名称
  icon: LucideIcon;    // 助手图标
  description: string; // 助手描述
  category: string;    // 所属分类
  tags?: string[];     // 助手标签
}

interface Category {
  name: string;        // 分类名称
  description: string; // 分类描述
  icon: LucideIcon;    // 分类图标
}
```

## 5. 状态管理

### 5.1 本地存储
- 使用 localStorage 存储聊天记录
- 每个助手独立的存储空间：`chat-history-${agentId}`
- 消息数量限制：最多保留50条消息
- 支持清空历史记录

### 5.2 组件状态
- 侧边栏折叠状态
- 当前选中的助手
- 展开的分类列表
- 输入框内容
- 消息列表

## 6. 交互设计

### 6.1 布局响应
- 侧边栏：展开 256px (w-64)，折叠 64px (w-16)
- 主内容区自适应宽度
- 移动端支持（待实现）

### 6.2 主题切换
- 支持亮色/暗色模式
- 跟随系统设置
- 平滑过渡动画

### 6.3 消息交互
- 支持回车发送
- 自动滚动到最新消息
- 清空历史确认提示
- 首次对话引导界面

### 6.4 助手交互
- 分类展示：按类别组织助手列表
- 标签系统：支持通过标签快速筛选助手
- 助手切换：保持各助手独立的对话上下文
- 首次使用引导：新助手首次使用时显示引导界面

## 7. 后续规划

### 7.1 功能增强
- [ ] 移动端适配优化
- [ ] 助手搜索功能
- [ ] 消息导出功能
- [ ] 更多助手类型
- [ ] 自定义助手配置

### 7.2 技术优化
- [ ] 性能优化
- [ ] 状态管理优化
- [ ] 组件复用优化
- [ ] 类型定义完善
- [ ] 测试覆盖

### 7.3 用户体验优化
- [ ] 消息加载动画
- [ ] 输入框自动聚焦
- [ ] 消息时间戳显示
- [ ] 消息复制功能
- [ ] 快捷键支持