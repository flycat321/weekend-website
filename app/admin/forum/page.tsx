"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Trash2, MessageSquare, CheckCircle, XCircle } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

// 模拟论坛帖子数据
const mockPosts = [
  {
    id: 1,
    title: "零碳生活体验分享",
    author: "绿色先锋",
    category: "经验分享",
    status: "已发布",
    comments: 24,
    reports: 0,
    date: "2025-04-28",
  },
  {
    id: 2,
    title: "如何选择合适的weekend house配置？",
    author: "可持续生活",
    category: "产品咨询",
    status: "已发布",
    comments: 18,
    reports: 0,
    date: "2025-04-27",
  },
  {
    id: 3,
    title: "太阳能系统使用问题",
    author: "阳光之家",
    category: "技术支持",
    status: "已发布",
    comments: 12,
    reports: 0,
    date: "2025-04-26",
  },
  {
    id: 4,
    title: "违规内容测试",
    author: "测试账号",
    category: "其他",
    status: "已屏蔽",
    comments: 3,
    reports: 5,
    date: "2025-04-25",
  },
  {
    id: 5,
    title: "周末活动招募",
    author: "社区管理员",
    category: "活动",
    status: "置顶",
    comments: 42,
    reports: 0,
    date: "2025-04-24",
  },
]

// 模拟评论数据
const mockComments = [
  {
    id: 1,
    postId: 1,
    author: "环保达人",
    content: "非常感谢分享，我也有类似的体验！",
    status: "已发布",
    reports: 0,
    date: "2025-04-28",
  },
  {
    id: 2,
    postId: 1,
    author: "新手小白",
    content: "请问具体如何操作太阳能系统？",
    status: "已发布",
    reports: 0,
    date: "2025-04-28",
  },
  {
    id: 3,
    postId: 4,
    author: "测试账号",
    content: "这是一条违规评论",
    status: "已屏蔽",
    reports: 3,
    date: "2025-04-25",
  },
]

export default function AdminForumPage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // 过滤帖子
  const filteredPosts = mockPosts.filter(
    (post) =>
      (selectedStatus === "all" || post.status === selectedStatus) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 过滤评论
  const filteredComments = mockComments.filter(
    (comment) =>
      (selectedStatus === "all" || comment.status === selectedStatus) &&
      (comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.author.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar activeItem="forum" />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">论坛管理</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
                  <Plus className="mr-2 h-4 w-4" /> 新建帖子
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>创建新帖子</DialogTitle>
                  <DialogDescription>创建一个新的论坛帖子</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">标题</Label>
                    <Input id="post-title" placeholder="输入帖子标题" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-category">分类</Label>
                    <Select defaultValue="experience">
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="experience">经验分享</SelectItem>
                        <SelectItem value="product">产品咨询</SelectItem>
                        <SelectItem value="tech">技术支持</SelectItem>
                        <SelectItem value="activity">活动</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-content">内容</Label>
                    <textarea
                      id="post-content"
                      className="w-full min-h-[150px] p-3 border rounded-md"
                      placeholder="输入帖子内容..."
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="post-pinned" />
                    <Label htmlFor="post-pinned">置顶帖子</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">取消</Button>
                  <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">发布</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索帖子或评论..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="已发布">已发布</SelectItem>
                <SelectItem value="置顶">置顶</SelectItem>
                <SelectItem value="已屏蔽">已屏蔽</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>帖子 ({mockPosts.length})</span>
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>评论 ({mockComments.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>论坛帖子</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>标题</TableHead>
                        <TableHead>作者</TableHead>
                        <TableHead>分类</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>评论</TableHead>
                        <TableHead>举报</TableHead>
                        <TableHead>日期</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                post.status === "已发布"
                                  ? "bg-green-100 text-green-800"
                                  : post.status === "置顶"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{post.comments}</TableCell>
                          <TableCell>
                            {post.reports > 0 ? <Badge variant="destructive">{post.reports}</Badge> : post.reports}
                          </TableCell>
                          <TableCell>{post.date}</TableCell>
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

                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到帖子</h3>
                      <p className="text-gray-500">尝试更改搜索条件或创建新帖子</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <CardTitle>评论管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>内容</TableHead>
                        <TableHead>作者</TableHead>
                        <TableHead>帖子ID</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>举报</TableHead>
                        <TableHead>日期</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredComments.map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell className="font-medium max-w-[200px] truncate">{comment.content}</TableCell>
                          <TableCell>{comment.author}</TableCell>
                          <TableCell>{comment.postId}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                comment.status === "已发布" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {comment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {comment.reports > 0 ? (
                              <Badge variant="destructive">{comment.reports}</Badge>
                            ) : (
                              comment.reports
                            )}
                          </TableCell>
                          <TableCell>{comment.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <XCircle className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredComments.length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到评论</h3>
                      <p className="text-gray-500">尝试更改搜索条件</p>
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
