"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Save, Eye, EyeOff, Trash2, ChevronUp, ChevronDown, Image as ImageIcon
} from "lucide-react"
import Image from "next/image"
import { ContentBlock, HeadingBlock, TextBlock, ImageBlock } from "@/types/content"

// 组件属性类型
type SimpleEditorProps = {
  initialContent?: ContentBlock[];
  onSave?: (content: ContentBlock[]) => void;
  className?: string;
}

// 简化版内容编辑器 - 只支持基本内容类型
export default function SimpleEditor({ 
  initialContent = [],
  onSave = () => {},
  className = "" 
}: SimpleEditorProps) {
  const [editMode, setEditMode] = useState(true)
  
  // 过滤内容，只保留编辑器支持的类型（标题、文本、图片）
  const filterSupportedContent = (content: ContentBlock[]): ContentBlock[] => {
    return content.filter(block => 
      block.type === "heading" || 
      block.type === "text" || 
      block.type === "image"
    ) as ContentBlock[];
  };
  
  const [content, setContent] = useState<ContentBlock[]>(filterSupportedContent(initialContent))
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

  // 添加新内容块
  const addContentBlock = (type: string) => {
    const blockId = `${type}-${Date.now()}`
    
    if (type === "heading") {
      const newBlock: HeadingBlock = {
        type: "heading",
        id: blockId,
        content: "新标题",
        level: 2
      }
      setContent([...content, newBlock])
      setSelectedBlock(blockId)
    } 
    else if (type === "text") {
      const newBlock: TextBlock = {
        type: "text",
        id: blockId,
        content: "输入文本内容..."
      }
      setContent([...content, newBlock])
      setSelectedBlock(blockId)
    }
    else if (type === "image") {
      const newBlock: ImageBlock = {
        type: "image",
        id: blockId,
        src: "/placeholder-forest-1.jpg",
        alt: "图片描述"
      }
      setContent([...content, newBlock])
      setSelectedBlock(blockId)
    }
  }

  // 更新内容块
  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    const newContent = content.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ) as ContentBlock[]
    setContent(newContent)
  }

  // 删除内容块
  const deleteBlock = (id: string) => {
    const newContent = content.filter(block => block.id !== id)
    setContent(newContent)
    setSelectedBlock(null)
  }

  // 移动内容块
  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = content.findIndex(block => block.id === id)
    if (
      (direction === "up" && index === 0) || 
      (direction === "down" && index === content.length - 1)
    ) {
      return
    }

    const newContent = [...content]
    const block = newContent[index]
    newContent.splice(index, 1)
    newContent.splice(direction === "up" ? index - 1 : index + 1, 0, block)
    setContent(newContent)
  }

  // 渲染内容块
  const renderBlock = (block: ContentBlock) => {
    switch(block.type) {
      case "heading": {
        const headingBlock = block as HeadingBlock
        return editMode ? (
          <div className="space-y-2">
            <select 
              value={headingBlock.level} 
              onChange={(e) => updateBlock(block.id, { level: parseInt(e.target.value) })}
              className="h-9 rounded-md border px-3 py-1 text-sm"
            >
              <option value={1}>大标题</option>
              <option value={2}>中标题</option>
              <option value={3}>小标题</option>
            </select>
            <Input 
              value={headingBlock.content} 
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              className={
                headingBlock.level === 1 ? "text-3xl font-bold" :
                headingBlock.level === 2 ? "text-2xl font-bold" :
                "text-xl font-bold"
              }
            />
          </div>
        ) : (
          headingBlock.level === 1 ? (
            <h1 className="text-3xl font-bold">{headingBlock.content}</h1>
          ) : headingBlock.level === 2 ? (
            <h2 className="text-2xl font-bold">{headingBlock.content}</h2>
          ) : (
            <h3 className="text-xl font-bold">{headingBlock.content}</h3>
          )
        )
      }
      
      case "text": {
        const textBlock = block as TextBlock
        return editMode ? (
          <Textarea 
            value={textBlock.content} 
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="min-h-[100px]"
          />
        ) : (
          <p className="text-gray-700">{textBlock.content}</p>
        )
      }
      
      case "image": {
        const imageBlock = block as ImageBlock
        return editMode ? (
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              {imageBlock.src ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={imageBlock.src} 
                    alt={imageBlock.alt || ""}
                    fill
                    className="object-cover"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute bottom-2 right-2 bg-white/90"
                    onClick={() => {
                      // 简化的图片选择
                      const newImage = prompt("请输入图片路径 (例如 /house-new1.png):", imageBlock.src)
                      if (newImage) {
                        updateBlock(block.id, { src: newImage })
                      }
                    }}
                  >
                    更换图片
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => {
                    const newImage = prompt("请输入图片路径:", "/house-new1.png")
                    if (newImage) {
                      updateBlock(block.id, { src: newImage })
                    }
                  }}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  选择图片
                </Button>
              )}
            </div>
            <Input 
              placeholder="图片替代文本 (SEO用)" 
              value={imageBlock.alt || ""} 
              onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
            />
          </div>
        ) : (
          <div className="relative">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <Image 
                src={imageBlock.src} 
                alt={imageBlock.alt || ""} 
                fill
                className="object-cover"
              />
            </div>
          </div>
        )
      }
      
      default:
        return <div>未支持的内容块类型</div>
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="sticky top-0 z-10 bg-white border-b mb-6 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
              {editMode ? <><Eye className="h-4 w-4 mr-2" /> 预览</> : <><EyeOff className="h-4 w-4 mr-2" /> 编辑</>}
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-[#00CED1] hover:bg-[#00CED1]/90"
              onClick={() => onSave(content)}
            >
              <Save className="h-4 w-4 mr-2" /> 保存
            </Button>
          </div>
          
          {editMode && (
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => addContentBlock("heading")}>
                添加标题
              </Button>
              <Button variant="outline" size="sm" onClick={() => addContentBlock("text")}>
                添加文本
              </Button>
              <Button variant="outline" size="sm" onClick={() => addContentBlock("image")}>
                添加图片
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto pb-20">
        {content.length === 0 ? (
          <div className="text-center p-10 border border-dashed rounded-lg">
            <p className="text-gray-500 mb-4">当前页面没有内容</p>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => addContentBlock("heading")}>
                添加标题
              </Button>
              <Button variant="outline" size="sm" onClick={() => addContentBlock("text")}>
                添加文本
              </Button>
              <Button variant="outline" size="sm" onClick={() => addContentBlock("image")}>
                添加图片
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {content.map((block) => (
              <div 
                key={block.id} 
                className={`
                  relative rounded-lg transition-all
                  ${editMode ? "p-4 hover:shadow-md" : ""}
                  ${editMode && selectedBlock === block.id ? "ring-2 ring-[#00CED1] shadow-md" : ""}
                `}
                onClick={() => editMode && setSelectedBlock(block.id)}
              >
                {/* 编辑模式下的控制栏 */}
                {editMode && selectedBlock === block.id && (
                  <div className="absolute -top-4 right-2 flex gap-1 bg-white rounded-md shadow-md p-1 z-10">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, "up");
                      }}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, "down");
                      }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlock(block.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )}

                {/* 内容块渲染 */}
                {renderBlock(block)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
