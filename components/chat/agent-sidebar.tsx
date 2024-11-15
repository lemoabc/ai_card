"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { agents } from "@/components/chat/agent-list";
import { type Category, categories } from "./agent-categories";

interface AgentSidebarProps {
  selectedAgentId: number | null;
  onSelectAgent: (id: number | null) => void;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  className?: string;
}

export function AgentSidebar({ 
  selectedAgentId, 
  onSelectAgent,
  isCollapsed,
  onCollapsedChange,
  className 
}: AgentSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={cn(
      "sticky top-0 h-screen border-r bg-background transition-all duration-300",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onCollapsedChange(!isCollapsed)}
        className={cn(
          "fixed top-6 z-[60]",
          isCollapsed ? "left-[68px]" : "left-[260px]",
          "h-8 w-8",
          "hover:bg-accent/50",
          "rounded-full",
          "transition-all duration-200 ease-in-out",
          isCollapsed && "rotate-180"
        )}
      >
        <PanelLeftClose className="h-4 w-4" />
      </Button>

      <div className="flex h-full flex-col">
        <div className="p-4">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-2 mb-2",
              "h-12",
              isCollapsed ? (
                "w-full px-0 justify-center"
              ) : (
                "w-full px-4 justify-start"
              )
            )}
            onClick={() => onSelectAgent(null)}
          >
            <Sparkles className={cn(
              isCollapsed ? "h-7 w-7" : "h-6 w-6",
              "transition-all duration-200"
            )} />
            {!isCollapsed && <span className="font-semibold text-base">智能助手</span>}
          </Button>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-2">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="space-y-1">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between",
                    isCollapsed ? "px-3" : "px-4",
                    "hover:bg-accent group relative",
                    "h-10"
                  )}
                  onClick={() => !isCollapsed && toggleCategory(key)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon && <category.icon className="h-5 w-5" />}
                    {!isCollapsed && <span>{category.name}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedCategories.includes(key) ? "rotate-180" : ""
                      )}
                    />
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 hidden rounded-md bg-popover px-2 py-1 text-sm group-hover:block">
                      {category.name}
                    </div>
                  )}
                </Button>
                {!isCollapsed && expandedCategories.includes(key) && (
                  <div className="ml-4 space-y-1">
                    {agents
                      .filter(agent => agent.category === key)
                      .map(agent => (
                        <Button
                          key={agent.id}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start pl-6",
                            selectedAgentId === agent.id ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-accent",
                            "group relative"
                          )}
                          onClick={() => onSelectAgent(agent.id)}
                        >
                          {agent.icon && <agent.icon className={cn(
                            "h-4 w-4 mr-2",
                            selectedAgentId === agent.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )} />}
                          <span className="truncate">{agent.name}</span>
                        </Button>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
