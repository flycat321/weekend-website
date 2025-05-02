"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

// 模拟的内容数据
const mockPages = [
  { id: 1, title: "首页", path: "/" },
  { id: 2, title: "森林秘境小屋", path: "/stay/1" },
  { id: 3, title: "湖光山色别墅", path: "/stay/2" },
  { id: 4, title: "关于我们", path: "/about" },
]

export default function ContentManagerPage() {
  const [activeTab, setActiveTab] = useState("pages")
  const router = useRouter()
  
  // 处理编辑页面跳转
  const handleEditPage = (pageId: number) => {
    console.log(`跳转到编辑页面: /admin/content-manager/edit/${pageId}`)
    router.push(`/admin/content-manager/edit/${pageId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar activeItem="content-manager" />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">内容管理</h1>
            <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              新建页面
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pages">页面</TabsTrigger>
              <TabsTrigger value="templates">模板</TabsTrigger>
              <TabsTrigger value="components">组件</TabsTrigger>
            </TabsList>

            <TabsContent value="pages">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockPages.map((page) => (
                  <Card key={page.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{page.title}</CardTitle>
                      <CardDescription className="text-xs truncate">{page.path}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-4">点击编辑页面内容</div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleEditPage(page.id)}
                        >
                          <Pencil className="h-4 w-4" /> 编辑
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>页面模板</CardTitle>
                  <CardDescription>管理可重用的页面模板</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">暂无可用模板</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components">
              <Card>
                <CardHeader>
                  <CardTitle>共享组件</CardTitle>
                  <CardDescription>管理可在多个页面使用的组件</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">暂无共享组件</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
