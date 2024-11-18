/**
 * 导入所需的 Lucide 图标
 * 这些图标用于各个AI助手的视觉展示
 */
import { 
  Brain, 
  Code, 
  Search,
  Globe2, // 用于多语言助手的图标
  Blocks,
  Terminal,
  Laptop,
  Pen,
  Palette,
  Music,
  Camera,
  BarChart3,
  LayoutDashboard,
  TrendingUp,
  School,
  FileText,
  MessageSquare,
  Globe,
  Calculator,
  Wand2,
  Microscope,
  Variable,
  TestTube
} from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * AI助手的类型定义
 * @interface Agent
 * @property {number} id - 助手的唯一标识符
 * @property {string} name - 助手的显示名称
 * @property {LucideIcon} icon - 助手的图标组件
 * @property {string} description - 助手的功能描述
 * @property {string} category - 助手所属的分类
 * @property {string[]} [tags] - 可选的标签列表，用于搜索和过滤
 */
export interface Agent {
  id: number;
  name: string;
  icon: LucideIcon;
  description: string;
  category: string;
  tags?: string[];
}

/**
 * AI助手配置列表
 * 按照不同类别组织的所有可用助手
 * 注意：
 * 1. id 必须唯一
 * 2. category 必须与 agent-categories.ts 中定义的类别对应
 * 3. 建议为每个助手添加适当的标签以便后续实现搜索功能
 */
export const agents: Agent[] = [
  // 通用助手类别
  { 
    id: 1, 
    name: "智能问答", 
    icon: Brain, 
    description: "回答各类常见问题，提供全面解答",
    category: "general",
    tags: ["问答", "通用"]
  },
  {
    id: 2,
    name: "多语言助手",
    icon: Globe2, // 使用 Globe2 替代原来的 Languages 图标
    description: "支持多语言翻译和交流",
    category: "general",
    tags: ["翻译", "语言"]
  },
  {
    id: 3,
    name: "搜索专家",
    icon: Search,
    description: "智能信息检索和整理",
    category: "general",
    tags: ["搜索", "信息"]
  },

  // 开发工具类别
  {
    id: 4,
    name: "代码专家",
    icon: Code,
    description: "编程问题解答和代码优化",
    category: "development",
    tags: ["编程", "代码"]
  },
  {
    id: 5,
    name: "架构顾问",
    icon: Blocks,
    description: "系统架构设计和技术选型",
    category: "development",
    tags: ["架构", "设计"]
  },
  {
    id: 6,
    name: "调试助手",
    icon: Terminal,
    description: "代码调试和问题排查",
    category: "development",
    tags: ["调试", "修复"]
  },
  {
    id: 7,
    name: "DevOps专家",
    icon: Laptop,
    description: "部署运维和流程优化",
    category: "development",
    tags: ["运维", "部署"]
  },

  // 创意助手类别
  {
    id: 8,
    name: "创意写手",
    icon: Pen,
    description: "文案创作和内容生成",
    category: "creative",
    tags: ["写作", "创作"]
  },
  {
    id: 9,
    name: "设计顾问",
    icon: Palette,
    description: "UI/UX设计和视觉创意",
    category: "creative",
    tags: ["设计", "视觉"]
  },
  {
    id: 10,
    name: "音乐创作",
    icon: Music,
    description: "音乐创作和编曲建议",
    category: "creative",
    tags: ["音乐", "创作"]
  },
  {
    id: 11,
    name: "视觉创意",
    icon: Camera,
    description: "图像处理和视觉设计",
    category: "creative",
    tags: ["视觉", "设计"]
  },

  // 数据分析类别
  {
    id: 12,
    name: "数据分析师",
    icon: BarChart3,
    description: "数据分析和可视化",
    category: "analysis",
    tags: ["分析", "统计"]
  },
  {
    id: 13,
    name: "商业智能",
    icon: LayoutDashboard,
    description: "商业数据分析和决策支持",
    category: "analysis",
    tags: ["商业", "决策"]
  },
  {
    id: 14,
    name: "预测模型",
    icon: TrendingUp,
    description: "数据预测和趋势分析",
    category: "analysis",
    tags: ["预测", "趋势"]
  },

  // 教育学习类别
  {
    id: 15,
    name: "学习导师",
    icon: School,
    description: "个性化学习规划和辅导",
    category: "education",
    tags: ["教育", "学习"]
  },
  {
    id: 16,
    name: "考试助手",
    icon: FileText,
    description: "考试备考和题目解析",
    category: "education",
    tags: ["考试", "解题"]
  },
  {
    id: 17,
    name: "语言教师",
    icon: MessageSquare,
    description: "语言学习和口语练习",
    category: "education",
    tags: ["语言", "学习"]
  },

  // 商业助手类别
  {
    id: 18,
    name: "市场分析",
    icon: Globe,
    description: "市场研究和竞争分析",
    category: "business",
    tags: ["市场", "分析"]
  },
  {
    id: 19,
    name: "财务顾问",
    icon: Calculator,
    description: "财务分析和投资建议",
    category: "business",
    tags: ["财务", "投资"]
  },
  {
    id: 20,
    name: "战略规划",
    icon: Wand2,
    description: "企业战略和发展规划",
    category: "business",
    tags: ["战略", "规划"]
  },

  // 科研助手类别
  {
    id: 21,
    name: "研究助手",
    icon: Microscope,
    description: "科研方法和实验设计",
    category: "science",
    tags: ["研究", "实验"]
  },
  {
    id: 22,
    name: "数学专家",
    icon: Variable,
    description: "数学问题和公式推导",
    category: "science",
    tags: ["数学", "推导"]
  },
  {
    id: 23,
    name: "实验设计",
    icon: TestTube,
    description: "实验方案设计和数据分析",
    category: "science",
    tags: ["实验", "设计"]
  }
];
