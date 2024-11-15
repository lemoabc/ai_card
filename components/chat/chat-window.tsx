"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Trash2, Bot, UserCircle2, Sparkles, PartyPopper } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { agents } from "@/components/chat/agent-list";
import { Textarea } from "@/components/ui/textarea";
import { Celebration } from '@/components/effects/celebration';

/**
 * 消息类型定义
 * @interface Message
 * @property {string} id - 消息的唯一标识符
 * @property {string} content - 消息内容
 * @property {"user" | "assistant"} role - 消息发送者角色
 * @property {number} timestamp - 消息发送时间戳
 * @property {number} agentId - 关联的AI助手ID
 */
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
  agentId: number;
}

/**
 * 聊天窗口组件属性
 * @interface ChatWindowProps
 * @property {number} agentId - 当前AI助手的ID
 * @property {() => void} [onBack] - 移动端返回回调函数（可选）
 */
interface ChatWindowProps {
  agentId: number;
  onBack?: () => void;
}

/**
 * 加自动调整高度的函数
 * @param {HTMLTextAreaElement} textarea - 文本输入框元素
 */
const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'inherit';
  const computed = window.getComputedStyle(textarea);
  const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + textarea.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
  
  textarea.style.height = `${Math.min(height, 200)}px`; // 最大高度200px
};

/**
 * 聊天窗口组件
 * 实现了以下核心功能：
 * 1. 消息的发送和接收
 * 2. 聊天历史记录的本地存储
 * 3. 消息列表的展示和滚动
 * 4. 清空历史记录功能
 * 5. 响应式布局支持
 * 
 * @component ChatWindow
 * @param {ChatWindowProps} props - 组件属性
 * @returns {JSX.Element} 聊天窗口界面
 */
export default function ChatWindow({ agentId, onBack }: ChatWindowProps) {
  // 从localStorage加载历史消息
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedMessages = localStorage.getItem(`chat-history-${agentId}`);
        return savedMessages ? JSON.parse(savedMessages) : [];
      } catch (error) {
        console.error('Error loading messages:', error);
        return [];
      }
    }
    return [];
  });
  
  // 输入框内容状态
  const [input, setInput] = useState("");
  // 用于消息列表自动滚动的引用
  const scrollRef = useRef<HTMLDivElement>(null);
  // Toast通知
  const { toast } = useToast();
  // 最大消息数量限制
  const MAX_MESSAGES = 50;
  // 获取当前AI助手信息
  const currentAgent = agents.find(agent => agent.id === agentId);

  // 添加新的状态来控制按钮切换
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [effectType, setEffectType] = useState<'fireworks' | 'confetti' | null>(null);

  // 保存消息到localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat-history-${agentId}`, JSON.stringify(messages));
    }
  }, [messages, agentId]);

  /**
   * 发送消息并处理回复
   * 包含以下步骤：
   * 1. 验证消息内容
   * 2. 创建并添加用户消息
   * 3. 模拟AI助手回复（TODO: 替换为实际的API调用）
   * 4. 维护消息数量上限
   * 
   * @param {string} content - 消息内容
   */
  const handleSend = async (content: string = input) => {
    if (!content.trim()) return;

    // 创建用户消息
    const newMessage: Message = {
      id: `user-${agentId}-${Date.now()}`,
      content: content.trim(),
      role: "user",
      timestamp: Date.now(),
      agentId
    };

    // 更新消息列表，保持最大消息数量限制
    setMessages(prev => {
      const updated = [...prev, newMessage];
      return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
    });
    
    setInput("");

    // 模拟AI助手回复
    setTimeout(() => {
      const response: Message = {
        id: `assistant-${agentId}-${Date.now()}`,
        content: `来自${currentAgent?.name}的回复：${content}`,
        role: "assistant",
        timestamp: Date.now(),
        agentId
      };
      
      setMessages(prev => {
        const updated = [...prev, response];
        return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
      });
    }, 1000);
  };

  /**
   * 清空聊天历史记录
   * 1. 从localStorage中删除当前助手的聊天记录
   * 2. 清空内存中的消息列表
   * 3. 显示操作成功提示
   */
  const clearHistory = () => {
    localStorage.removeItem(`chat-history-${agentId}`);
    setMessages([]);
    toast({
      description: "对话历史已清空",
    });
  };

  // 移除原有的 handleFireworks 和 handleConfetti 函数
  const handleEffect = () => {
    if (isCelebrating) {
      setEffectType('confetti');
    } else {
      setEffectType('fireworks');
    }
    setIsCelebrating(!isCelebrating);
  };

  if (!agentId) {
    return null;
  }

  // 渲染首次对话的引导界面
  if (messages.length === 0 && currentAgent) {
    return (
      <div className="flex h-full flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <Bot className="h-5 w-5" />
              </Button>
            )}
            <h2 className="text-lg font-semibold">{currentAgent.name}</h2>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 mt-32">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {currentAgent.icon && <currentAgent.icon className="h-6 w-6 text-primary" />}
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {currentAgent.name}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {currentAgent.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustTextareaHeight(e.target);
                }}
                placeholder="输入消息..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 min-h-[44px] max-h-[200px] resize-none whitespace-pre-wrap"
                rows={1}
                ref={(textarea) => {
                  if (textarea) {
                    adjustTextareaHeight(textarea);
                  }
                }}
              />
              <Button onClick={() => handleSend()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 渲染常规对话界面
  if (!currentAgent) return null;

  return (
    <div className="flex h-screen flex-col relative">
      {/* 添加 Celebration 组件 */}
      <Celebration
        isVisible={effectType !== null}
        type={effectType || 'fireworks'}
        onComplete={() => setEffectType(null)}
      />

      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <Bot className="h-5 w-5" />
            </Button>
          )}
          <h2 className="text-lg font-semibold">{currentAgent.name}</h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>
                    {currentAgent.icon && <currentAgent.icon className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap break-words",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>
                    <UserCircle2 className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="border-t">
        <div className="p-4">
          <div className="flex items-end gap-2">
            {/* 修改按钮点击事件 */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={handleEffect}
            >
              {isCelebrating ? (
                <PartyPopper className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>

            {/* 现有的清空历史按钮 */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-10 w-10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>清空对话历史</AlertDialogTitle>
                  <AlertDialogDescription>
                    此操作将清空当前对话中的所有消息，且不可恢复。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={clearHistory}>
                    确认清空
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustTextareaHeight(e.target);
              }}
              placeholder="输入消息..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 min-h-[40px] max-h-[200px] resize-none whitespace-pre-wrap w-[calc(100%-5rem)]"
              rows={1}
              ref={(textarea) => {
                if (textarea) {
                  adjustTextareaHeight(textarea);
                }
              }}
            />
            <Button 
              onClick={() => handleSend()}
              className="h-10 w-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-center p-2 text-sm text-muted-foreground">
          © 2024 AI Chat Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export { ChatWindow };
