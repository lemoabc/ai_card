import { Brain, Code, Palette, ChartBar, School, TrendingUp, Microscope } from "lucide-react";

export const categories = {
  general: {
    name: "通用助手",
    description: "处理日常问题和查询",
    icon: Brain
  },
  development: {
    name: "开发工具",
    description: "编程和技术支持",
    icon: Code
  },
  creative: {
    name: "创意助手",
    description: "内容创作和设计",
    icon: Palette
  },
  analysis: {
    name: "数据分析",
    description: "数据处理和分析",
    icon: ChartBar
  },
  education: {
    name: "教育学习",
    description: "学习辅导和知识获取",
    icon: School
  },
  business: {
    name: "商业助手",
    description: "商业分析和决策支持",
    icon: TrendingUp
  },
  science: {
    name: "科研助手",
    description: "科学研究和实验支持",
    icon: Microscope
  }
} as const;