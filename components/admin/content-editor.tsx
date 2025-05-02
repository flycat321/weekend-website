"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bold, Italic, AlignLeft, AlignCenter, AlignRight, 
  Image as ImageIcon, Plus, Save, Eye, EyeOff, Trash2,
  ChevronUp, ChevronDown, Move, Settings
} from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// 内容编辑器组件
export default function ContentEditor({ 
  initialContent = [],
  onSave = () => {} 
}) {
  const [editMode, setEditMode] = useState(true)
  const [content, setContent] = useState(initialContent.length > 0 ? initialContent : [
    { type: "heading", content: "标题", level: 1, id: "heading-" + Date.now() },
    { type: "text", content: "这是一段文字内容", id: "text-" + Date.now() }
  ])
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false)

  // 添加新内容块
  const addContentBlock = (type) => {
    const newBlock = { type, id: `${type}-${Date.now()}` }
    
    switch(type) {
      case "heading":
        newBlock.content = "新标题"
        newBlock.level = 2
        break
      case "text":
        newBlock.content = "输入文本内容..."
        break
      case "image":
        newBlock.src = "/placeholder-forest-1.jpg"
        newBlock.alt = "图片描述"
        newBlock.caption = "图片说明"
        break
      case "gallery":
        newBlock.images = [
          { src: "/placeholder-forest-1.jpg", alt: "图片1" },
          { src: "/placeholder-interior-1.jpg", alt: "图片2" }
        ]
        break
      case "features":
        newBlock.items = [
          { title: "功能1", description: "描述文本" },
          { title: "功能2", description: "描述文本" }
        ]
        break
    }

    // 在当前选中块后面添加，或添加到末尾
    if (selectedBlock) {
      const index = content.findIndex(block => block.id === selectedBlock)
      if (index !== -1) {
        const newContent = [...content]
        newContent.splice(index + 1, 0, newBlock)
        setContent(newContent)
        setSelectedBlock(newBlock.id)
        return
      }
    }
    
    setContent([...content, newBlock])
    setSelectedBlock(newBlock.id)
  }

  // 更新内容块
  const updateBlock = (id, updates) => {
    const newContent = content.map(block => 
      block.id === id ? { ...block, ...updates } : block
    )
    setContent(newContent)
  }

  // 删除内容块
  const deleteBlock = (id) => {
    const newContent = content.filter(block => block.id !== id)
    setContent(newContent)
    setSelectedBlock(null)
  }

  // 移动内容块
  const moveBlock = (id, direction) => {
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

  return (
    <div className="w-full">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> 添加内容块
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => addContentBlock("heading")}>
                  标题
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContentBlock("text")}>
                  文本段落
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContentBlock("image")}>
                  单图
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContentBlock("gallery")}>
                  图片组
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContentBlock("features")}>
                  特性列表
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="pb-20">
        {/* 内容编辑区域 */}
        <div className={cn(
          "max-w-4xl mx-auto",
          editMode ? "space-y-4" : "space-y-8"
        )}>
          {content.map((block) => (
            <div 
              key={block.id} 
              className={cn(
                "relative rounded-lg transition-all",
                editMode && "hover:shadow-md",
                editMode && selectedBlock === block.id && "ring-2 ring-[#00CED1] shadow-md"
              )}
              onClick={() => editMode && setSelectedBlock(block.id)}
            >
              {/* 编辑模式下的控制栏 */}
              {editMode && selectedBlock === block.id && (
                <div className="absolute -top-4 right-2 flex gap-1 bg-white rounded-md shadow-md p-1 z-10">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => moveBlock(block.id, "up")}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => moveBlock(block.id, "down")}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => deleteBlock(block.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              )}

              {/* 内容块渲染 */}
              <div className={editMode ? "p-4" : ""}>
                {renderBlock(block, {
                  editMode,
                  updateBlock,
                  setMediaDialogOpen
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 媒体选择对话框 */}
      <MediaDialog 
        open={mediaDialogOpen} 
        onOpenChange={setMediaDialogOpen} 
        onSelect={(media) => {
          if (selectedBlock) {
            updateBlock(selectedBlock, { src: media.src })
          }
        }}
      />
    </div>
  )
}

// 内容块渲染函数
function renderBlock(block, { editMode, updateBlock, setMediaDialogOpen }) {
  switch(block.type) {
    case "heading":
      return editMode ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <select 
              value={block.level} 
              onChange={(e) => updateBlock(block.id, { level: parseInt(e.target.value) })}
              className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value={1}>大标题</option>
              <option value={2}>中标题</option>
              <option value={3}>小标题</option>
            </select>
          </div>
          <Input 
            value={block.content} 
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className={cn(
              block.level === 1 && "text-3xl font-bold",
              block.level === 2 && "text-2xl font-bold",
              block.level === 3 && "text-xl font-bold"
            )}
          />
        </div>
      ) : (
        block.level === 1 ? (
          <h1 className="text-3xl md:text-4xl font-bold">{block.content}</h1>
        ) : block.level === 2 ? (
          <h2 className="text-2xl md:text-3xl font-bold">{block.content}</h2>
        ) : (
          <h3 className="text-xl md:text-2xl font-bold">{block.content}</h3>
        )
      )
    
    case "text":
      return editMode ? (
        <div className="space-y-2">
          <div className="flex gap-1 mb-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
          <Textarea 
            value={block.content} 
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed">{block.content}</p>
      )
    
    case "image":
      return editMode ? (
        <div className="space-y-4">
          <div className="aspect-video relative overflow-hidden rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            {block.src ? (
              <div className="relative w-full h-full">
                <Image 
                  src={block.src} 
                  alt={block.alt || ""}
                  fill
                  className="object-cover"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute bottom-2 right-2 bg-white/90"
                  onClick={() => setMediaDialogOpen(true)}
                >
                  更换图片
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setMediaDialogOpen(true)}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                选择图片
              </Button>
            )}
          </div>
          <div className="grid gap-2">
            <Input 
              placeholder="图片替代文本 (SEO用)" 
              value={block.alt || ""} 
              onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
            />
            <Input 
              placeholder="图片说明文字 (可选)" 
              value={block.caption || ""} 
              onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <figure className="relative">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image 
              src={block.src} 
              alt={block.alt || ""} 
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-center text-gray-500 mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    
    case "gallery":
      return editMode ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {(block.images || []).map((img, idx) => (
              <div key={idx} className="aspect-square relative rounded-md overflow-hidden border">
                <Image 
                  src={img.src} 
                  alt={img.alt || ""} 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/90"
                    onClick={() => setMediaDialogOpen(true)}
                  >
                    更换
                  </Button>
                </div>
              </div>
            ))}
            <div 
              className="aspect-square border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 cursor-pointer"
              onClick={() => {
                const newImages = [...(block.images || []), { src: "/placeholder-view-1.jpg", alt: "" }]
                updateBlock(block.id, { images: newImages })
              }}
            >
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(block.images || []).map((img, idx) => (
            <div key={idx} className="aspect-square relative rounded-lg overflow-hidden">
              <Image 
                src={img.src} 
                alt={img.alt || ""} 
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )

    case "features":
      return editMode ? (
        <div className="space-y-4">
          {(block.items || []).map((item, idx) => (
            <Card key={idx} className="relative">
              <CardContent className="pt-6">
                <div className="grid gap-2">
                  <Input 
                    placeholder="特性标题" 
                    value={item.title} 
                    onChange={(e) => {
                      const newItems = [...block.items]
                      newItems[idx].title = e.target.value
                      updateBlock(block.id, { items: newItems })
                    }}
                    className="font-medium"
                  />
                  <Textarea 
                    placeholder="特性描述" 
                    value={item.description} 
                    onChange={(e) => {
                      const newItems = [...block.items]
                      newItems[idx].description = e.target.value
                      updateBlock(block.id, { items: newItems })
                    }}
                    className="min-h-[80px]"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => {
                    const newItems = block.items.filter((_, i) => i !== idx)
                    updateBlock(block.id, { items: newItems })
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              const newItems = [...(block.items || []), { title: "新特性", description: "特性描述" }]
              updateBlock(block.id, { items: newItems })
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            添加特性项
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {(block.items || []).map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-bold text-xl">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )

    default:
      return <div>未知内容块类型</div>
  }
}

// 媒体选择对话框
function MediaDialog({ open, onOpenChange, onSelect }) {
  // 模拟的媒体库数据
  const mediaItems = [
    { id: 1, src: "/placeholder-forest-1.jpg", type: "image", title: "森林景观" },
    { id: 2, src: "/placeholder-interior-1.jpg", type: "image", title: "室内设计" },
    { id: 3, src: "/placeholder-view-1.jpg", type: "image", title: "风景" },
    { id: 4, src: "/placeholder-lake-1.jpg", type: "image", title: "湖景" },
    { id: 5, src: "/placeholder-river-1.jpg", type: "image", title: "河景" },
    { id: 6, src: "/placeholder-surrounding-forest.jpg", type: "image", title: "森林环境" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>媒体库</DialogTitle>
          <DialogDescription>
            选择媒体或上传新文件
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="library">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">媒体库</TabsTrigger>
            <TabsTrigger value="upload">上传</TabsTrigger>
          </TabsList>
          
          <TabsContent value="library" className="min-h-[400px]">
            <div className="grid grid-cols-3 gap-3 py-4">
              {mediaItems.map((item) => (
                <div 
                  key={item.id}
                  className="aspect-square relative rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    onSelect(item)
                    onOpenChange(false)
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 p-12 rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <Button>选择文件</Button>
                  <p className="mt-2 text-xs text-gray-500">或拖放文件到此处</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
