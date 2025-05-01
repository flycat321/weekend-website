"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Trash2, FileText, Home, ShoppingBag, Calendar } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

// 模拟页面内容数据
const mockPages = [
  {
    id: 1,
    title: "首页",
    path: "/",
    lastUpdated: "2025-04-28",
    status: "已发布",
  },
  {
    id: 2,
    title: "零碳房屋",
    path: "/house",
    lastUpdated: "2025-04-26",
    status: "已发布",
  },
  {
    id: 3,
    title: "房屋订购",
    path: "/house/order",
    lastUpdated: "2025-04-25",
    status: "已发布",
  },
  {
    id: 4,
    title: "关于我们",
    path: "/about",
    lastUpdated: "2025-04-20",
    status: "草稿",
  },
]

// 模拟产品数据
const mockProducts = [
  {
    id: 1,
    name: "Weekend House 基础款",
    price: 350000,
    category: "房屋",
    status: "在售",
    stock: "可定制",
  },
  {
    id: 2,
    name: "深灰色钛锌板外立面",
    price: 30000,
    category: "配件",
    status: "在售",
    stock: "充足",
  },
  {
    id: 3,
    name: "13kWh 储能系统",
    price: 50000,
    category: "能源",
    status: "在售",
    stock: "有限",
  },
]

// 模拟活动数据
const mockEvents = [
  {
    id: 1,
    title: "零碳生活体验日",
    date: "2025-05-15",
    location: "上海展示中心",
    status: "即将开始",
    participants: 24,
  },
  {
    id: 2,
    title: "可持续建筑研讨会",
    date: "2025-06-20",
    location: "线上直播",
    status: "报名中",
    participants: 156,
  },
  {
    id: 3,
    title: "Weekend House 新品发布会",
    date: "2025-07-10",
    location: "北京设计中心",
    status: "筹备中",
    participants: 0,
  },
]

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("pages")
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤页面
  const filteredPages = mockPages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.path.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 过滤产品
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 过滤活动
  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar activeItem="content" />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">内容管理</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
                  <Plus className="mr-2 h-4 w-4" /> 新建内容
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>创建新内容</DialogTitle>
                  <DialogDescription>选择要创建的内容类型</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-type">内容类型</Label>
                    <Select defaultValue="page">
                      <SelectTrigger>
                        <SelectValue placeholder="选择内容类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="page">页面</SelectItem>
                        <SelectItem value="product">产品</SelectItem>
                        <SelectItem value="event">活动</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-title">标题</Label>
                    <Input id="content-title" placeholder="输入标题" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">取消</Button>
                  <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">创建</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜索内容..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pages" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>页面</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>产品</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>活动</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pages">
              <Card>
                <CardHeader>
                  <CardTitle>网站页面</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>标题</TableHead>
                        <TableHead>路径</TableHead>
                        <TableHead>最后更新</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {page.path === "/" ? (
                                <Home className="h-4 w-4 text-gray-500" />
                              ) : (
                                <FileText className="h-4 w-4 text-gray-500" />
                              )}
                              <span>{page.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>{page.path}</TableCell>
                          <TableCell>{page.lastUpdated}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                page.status === "已发布"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {page.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredPages.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到页面</h3>
                      <p className="text-gray-500">尝试更改搜索条件或创建新页面</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>产品管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>产品名称</TableHead>
                        <TableHead>价格 (元)</TableHead>
                        <TableHead>分类</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>库存</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.price.toLocaleString()}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                product.status === "在售"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到产品</h3>
                      <p className="text-gray-500">尝试更改搜索条件或添加新产品</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>活动管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>活动名称</TableHead>
                        <TableHead>日期</TableHead>
                        <TableHead>地点</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>参与人数</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                event.status === "即将开始"
                                  ? "bg-blue-100 text-blue-800"
                                  : event.status === "报名中"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{event.participants}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到活动</h3>
                      <p className="text-gray-500">尝试更改搜索条件或创建新活动</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
