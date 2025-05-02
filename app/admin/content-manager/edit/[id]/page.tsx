"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import SimpleEditor from "@/components/admin/simple-editor"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, Smartphone, Tablet, Laptop, ExternalLink, Save, AlertCircle
} from "lucide-react"
import Link from "next/link"
import { ContentBlock, PageData, PagesMap } from "@/types/content"

// 模拟页面数据
const mockPages: PagesMap = {
  "1": {
    id: 1,
    title: "首页",
    path: "/",
    content: [
      { 
        type: "heading", 
        content: "发现难忘的周末度假胜地", 
        level: 1, 
        id: "heading-1" 
      },
      { 
        type: "text", 
        content: "WEEKEND提供精选的设计感住宿，让您拥有难忘的自然度假体验。无论您是寻找宁静的森林小屋、湖畔别墅还是山间度假屋，我们都能满足您的需求。", 
        id: "text-1" 
      },
      { 
        type: "image", 
        src: "/placeholder-forest-1.jpg", 
        alt: "森林小屋", 
        caption: "我们的森林小屋提供完美的自然环境", 
        id: "image-1" 
      }
    ]
  },
  "2": {
    id: 2,
    title: "森林秘境小屋",
    path: "/stay/1",
    content: [
      { 
        type: "heading", 
        content: "川西·森林秘境小屋", 
        level: 1, 
        id: "heading-1" 
      },
      { 
        type: "text", 
        content: "坐落在川西高原的原始森林边缘，露台外即是壮丽山景，时有野生动物出没。体验远离尘嚣的宁静。", 
        id: "text-1" 
      },
      { 
        type: "image", 
        src: "/placeholder-forest-1.jpg", 
        alt: "森林小屋外观", 
        id: "image-1" 
      },
      { 
        type: "heading", 
        content: "设施与服务", 
        level: 2, 
        id: "heading-2" 
      },
      { 
        type: "features", 
        items: [
          { title: "全景森林视野", description: "通过大窗户欣赏四季变化的森林景色" },
          { title: "舒适地暖系统", description: "在寒冷的季节也能保持室内温暖舒适" },
          { title: "无光污染观星", description: "夜晚可以清晰看到银河和繁星" }
        ],
        id: "features-1"
      }
    ]
  },
  "3": {
    id: 3,
    title: "湖光山色别墅",
    path: "/stay/2",
    content: [
      { 
        type: "heading", 
        content: "洱海·湖光山色别墅", 
        level: 1, 
        id: "heading-1" 
      },
      { 
        type: "text", 
        content: "位于洱海湖畔的现代别墅，宽敞的落地窗将湖景尽收眼底。享受日落时分的绝美景色，体验当地文化。", 
        id: "text-1" 
      },
      { 
        type: "gallery", 
        images: [
          { src: "/placeholder-lake-1.jpg", alt: "湖景" },
          { src: "/placeholder-interior-1.jpg", alt: "室内" },
          { src: "/placeholder-view-1.jpg", alt: "景观" }
        ],
        id: "gallery-1"
      }
    ]
  }
}

export default function EditContentPage() {
  const params = useParams()
  const router = useRouter()
  const pageId = params?.id as string
  
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("desktop")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 加载页面数据
  useEffect(() => {
    console.log("正在加载页面数据，ID:", pageId);
    if (pageId) {
      setLoading(true)
      setError(null)
      
      try {
        // 模拟API调用
        setTimeout(() => {
          const pageData = mockPages[pageId]
          console.log("获取到页面数据:", pageData);
          
          if (pageData) {
            setPage(pageData)
            setLoading(false)
          } else {
            // 页面不存在，设置错误
            console.error("找不到页面数据:", pageId);
            setError(`找不到ID为 ${pageId} 的页面数据`)
            setLoading(false)
          }
        }, 500)
      } catch (err) {
        console.error("加载页面时出错:", err);
        setError("加载页面时出错")
        setLoading(false)
      }
    }
  }, [pageId])
  
  // 返回内容管理页面
  const handleGoBack = () => {
    router.push("/admin/content-manager")
  }
  
  // 保存内容更新
  const handleSaveContent = (updatedContent: ContentBlock[]) => {
    if (!page) return;
    
    console.log("保存内容:", updatedContent);
    setIsSaving(true)
    
    // 模拟保存API调用
    setTimeout(() => {
      try {
        // 更新本地状态
        setPage({
          ...page,
          content: updatedContent
        })
        
        // 提示成功
        alert("内容已成功保存！")
      } catch (err) {
        console.error("保存内容时出错:", err);
        alert("保存失败，请重试")
      } finally {
        setIsSaving(false)
      }
    }, 500)
  }
  
  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        
        <div className="flex">
          <AdminSidebar activeItem="content-manager" />
          
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00CED1] mx-auto mb-4"></div>
              <p className="text-lg">正在加载页面内容...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  // 如果出错，显示错误状态
  if (error || !page) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        
        <div className="flex">
          <AdminSidebar activeItem="content-manager" />
          
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center text-red-500 mb-4">
                <AlertCircle size={32} />
              </div>
              <p className="text-lg mb-4">{error || "加载页面时出错"}</p>
              <Button onClick={handleGoBack}>
                返回内容管理
              </Button>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar activeItem="content-manager" />
        
        <main className="flex-1">
          {/* 顶部操作栏 */}
          <div className="sticky top-0 z-20 bg-white border-b px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleGoBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
              <div>
                <h1 className="font-medium">{page.title}</h1>
                <p className="text-xs text-gray-500">{page.path}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* 设备视图切换 */}
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === "mobile" ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-none h-8 px-2"
                  onClick={() => setViewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "tablet" ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-none h-8 px-2"
                  onClick={() => setViewMode("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "desktop" ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-none h-8 px-2"
                  onClick={() => setViewMode("desktop")}
                >
                  <Laptop className="h-4 w-4" />
                </Button>
              </div>
              
              {/* 预览链接 */}
              <Link href={page.path} target="_blank">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  预览页面
                </Button>
              </Link>
              
              {/* 保存按钮 */}
              <Button 
                className="bg-[#00CED1] hover:bg-[#00CED1]/90" 
                size="sm"
                onClick={() => handleSaveContent(page.content)}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "保存中..." : "发布更改"}
              </Button>
            </div>
          </div>
          
          {/* 编辑器容器 */}
          <div className={`py-6 px-4 transition-all ${
            viewMode === "mobile" 
              ? "max-w-[375px]" 
              : viewMode === "tablet" 
                ? "max-w-[768px]" 
                : "max-w-full"
          } mx-auto`}>
            {/* 设备框架 */}
            {viewMode !== "desktop" && (
              <div className={`
                border-8 border-gray-800 rounded-[40px] ${
                  viewMode === "mobile" ? "w-[375px]" : "w-[768px]"
                } mx-auto overflow-hidden shadow-xl relative
              `}>
                {/* 设备顶部状态栏 */}
                <div className="bg-gray-800 text-white text-xs py-1 px-4 flex justify-between">
                  <span>WEEKEND</span>
                  <span>预览模式</span>
                </div>
                <div className="bg-white">
                  <SimpleEditor initialContent={page.content} onSave={handleSaveContent} />
                </div>
              </div>
            )}
            
            {/* 桌面视图直接显示 */}
            {viewMode === "desktop" && (
              <SimpleEditor initialContent={page.content} onSave={handleSaveContent} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
