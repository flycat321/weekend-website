"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, FileVideo, MessageSquare, Users, Home } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar activeItem="dashboard" />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">管理员仪表盘</h1>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>访问网站</span>
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-[#00CED1]/10 p-3 rounded-full mb-4">
                  <ImageIcon className="h-6 w-6 text-[#00CED1]" />
                </div>
                <h3 className="text-2xl font-bold">128</h3>
                <p className="text-sm text-muted-foreground">图片素材</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-[#8B7355]/10 p-3 rounded-full mb-4">
                  <FileVideo className="h-6 w-6 text-[#8B7355]" />
                </div>
                <h3 className="text-2xl font-bold">32</h3>
                <p className="text-sm text-muted-foreground">视频素材</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">256</h3>
                <p className="text-sm text-muted-foreground">论坛帖子</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold">1,024</h3>
                <p className="text-sm text-muted-foreground">注册用户</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="recent">最近活动</TabsTrigger>
              <TabsTrigger value="stats">统计数据</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>系统概览</CardTitle>
                  <CardDescription>查看系统整体运行状况和关键指标</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">系统状态</h4>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span>正常运行中</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">存储空间</h4>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#00CED1] w-[35%]"></div>
                          </div>
                          <span className="text-sm">35%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">最近更新</h4>
                      <ul className="space-y-2">
                        <li className="text-sm flex justify-between">
                          <span>首页背景图片更新</span>
                          <span className="text-gray-500">今天 10:24</span>
                        </li>
                        <li className="text-sm flex justify-between">
                          <span>产品展示视频上传</span>
                          <span className="text-gray-500">昨天 15:36</span>
                        </li>
                        <li className="text-sm flex justify-between">
                          <span>论坛新增置顶帖</span>
                          <span className="text-gray-500">2天前</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle>最近活动</CardTitle>
                  <CardDescription>查看系统最近的操作记录</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-[#00CED1] pl-4 py-1">
                      <p className="text-sm font-medium">管理员 (admin) 登录系统</p>
                      <p className="text-xs text-gray-500">今天 10:15</p>
                    </div>
                    <div className="border-l-2 border-[#00CED1] pl-4 py-1">
                      <p className="text-sm font-medium">更新首页背景图片</p>
                      <p className="text-xs text-gray-500">今天 10:24</p>
                    </div>
                    <div className="border-l-2 border-[#8B7355] pl-4 py-1">
                      <p className="text-sm font-medium">上传产品展示视频</p>
                      <p className="text-xs text-gray-500">昨天 15:36</p>
                    </div>
                    <div className="border-l-2 border-red-500 pl-4 py-1">
                      <p className="text-sm font-medium">删除违规论坛帖子</p>
                      <p className="text-xs text-gray-500">昨天 16:42</p>
                    </div>
                    <div className="border-l-2 border-green-500 pl-4 py-1">
                      <p className="text-sm font-medium">新增论坛置顶帖</p>
                      <p className="text-xs text-gray-500">2天前</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>统计数据</CardTitle>
                  <CardDescription>查看网站访问和使用数据</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">图表数据加载中...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
