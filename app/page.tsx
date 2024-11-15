/**
 * 主页面组件
 * 实现了以下核心功能：
 * 1. 助手选择和展示
 * 2. 响应式布局管理
 * 3. 侧边栏状态控制
 * 4. 主题切换集成
 */
"use client";

import { useState } from "react";
import { AgentSidebar } from "@/components/chat/agent-sidebar";
import ChatWindow from "@/components/chat/chat-window";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { agents } from "@/components/chat/agent-list";
import { categories } from "@/components/chat/agent-categories";

/**
 * 主页面组件
 * @component Home
 * @returns {JSX.Element} 主页面界面
 */
export default function Home() {
  // 当前选中的AI助手ID
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  // 移动端状态标识
  const [isMobile, setIsMobile] = useState(false);
  // 侧边栏折叠状态
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <main className="flex h-screen">
      {/* 助手选择侧边栏 */}
      <AgentSidebar
        selectedAgentId={selectedAgentId}
        onSelectAgent={(id) => setSelectedAgentId(id)}
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
        className={cn(
          "border-r transition-all duration-300 fixed left-0 z-50",
          isSidebarCollapsed ? "w-16" : "w-64",
          isMobile && "hidden"
        )}
      />

      {/* 主内容区域 */}
      <div className={cn(
        "flex-1 transition-all duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "overflow-y-auto z-40",
        isSidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {selectedAgentId ? (
          // 聊天窗口视图
          <div className="flex flex-col px-24">
            <ChatWindow
              key={`chat-${selectedAgentId}`}
              agentId={selectedAgentId}
              onBack={isMobile ? () => setSelectedAgentId(null) : undefined}
            />
          </div>
        ) : (
          // 助手分类展示视图
          <div className="px-24">
            <div className="py-8">
              {/* 页面标题和主题切换 */}
              <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">AI 助手</h1>
                <ThemeToggle />
              </div>
              
              {/* 助手分类列表 */}
              <div className="space-y-12">
                {Object.entries(categories).map(([key, category]) => (
                  <div key={key} className="space-y-6">
                    {/* 分类标题 */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        {category.icon && <category.icon className="h-6 w-6 text-primary" />}
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight">{category.name}</h2>
                    </div>
                    
                    {/* 助手卡片网格 */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {agents
                        .filter((agent) => agent.category === key)
                        .map((agent) => (
                          <Button
                            key={agent.id}
                            variant="ghost"
                            className={cn(
                              "relative h-auto p-6 justify-start gap-4 border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
                              "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/20 before:to-white/5 before:opacity-0 hover:before:opacity-100 dark:before:from-white/5",
                              selectedAgentId === agent.id && "bg-primary/5 before:opacity-100",
                              "rounded-xl"
                            )}
                            onClick={() => setSelectedAgentId(agent.id)}
                          >
                            {/* 助手图标 */}
                            <div className="rounded-lg bg-primary/10 p-2.5">
                              {agent.icon && <agent.icon className="h-5 w-5 text-primary" />}
                            </div>
                            {/* 助手信息 */}
                            <div className="flex-1 text-left space-y-1">
                              <h3 className="font-semibold tracking-tight">{agent.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {agent.description}
                              </p>
                              {/* 助手标签 */}
                              {agent.tags && agent.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {agent.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
