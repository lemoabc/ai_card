/**
 * AI助手分类定义文件
 * 定义了平台支持的所有AI助手类别及其基本信息
 */

import { 
  Brain,
  Code,
  Palette,
  BarChart3,
  School,
  TrendingUp,
  Microscope
} from "lucide-react";

/**
 * 分类接口定义
 * @interface Category
 * @property {string} name - 分类显示名称
 * @property {string} description - 分类功能描述
 * @property {LucideIcon} icon - 分类图标组件
 */
export interface Category {
  name: string;
  description: string;
  icon: any; // TODO: 建议改为 LucideIcon 类型以提供更好的类型安全
}

/**
 * AI助手分类配置
 * 包含所有可用的助手类别及其详细信息
 */
export const categories: Record<string, Category> = {
  // 通用助手类别：处理日常查询和基础问题
  general: {
    name: "通用助手",
    description: "处理日常问题和查询",
    icon: Brain
  },
  // 开发工具类别：提供编程相关支持
  development: {
    name: "开发工具",
    description: "编程和技术支持",
    icon: Code
  },
  // 创意助手类别：支持创意和设计工作
  creative: {
    name: "创意助手",
    description: "内容创作和设计",
    icon: Palette
  },
  // 数据分析类别：提供数据处理和分析能力
  analysis: {
    name: "数据分析",
    description: "数据处理和分析",
    icon: BarChart3
  },
  // 教育学习类别：提供学习辅导服务
  education: {
    name: "教育学习",
    description: "学习辅导和知识获取",
    icon: School
  },
  // 商业助手类别：提供商业分析和决策支持
  business: {
    name: "商业助手",
    description: "商业分析和决策支持",
    icon: TrendingUp
  },
  // 科研助手类别：支持科学研究工作
  science: {
    name: "科研助手",
    description: "科学研究和实验支持",
    icon: Microscope
  }
} as const;
