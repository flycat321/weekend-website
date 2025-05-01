"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Edit, UserPlus, CheckCircle, XCircle, Users } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    role: "普通用户",
    status: "活跃",
    posts: 12,
    comments: 48,
    registerDate: "2025-01-15",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    role: "VIP用户",
    status: "活跃",
    posts: 24,
    comments: 86,
    registerDate: "2025-02-20",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    role: "管理员",
    status: "活跃",
    posts: 5,
    comments: 32,
    registerDate: "2025-03-10",
  },
  {
    id: 4,
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "普通用户",
    status: "已禁用",
    posts: 3,
    comments: 7,
    registerDate: "2025-04-05",
  },
]

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  
  // 过滤用户
  const filteredUsers = mockUsers.filter(user => 
    (selectedRole === "all" || user.role === selectedRole) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar activeItem="users" />
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">用户管理</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
                  <UserPlus className="mr-2 h-4 w-4" /> 添加用户
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加新用户</DialogTitle>
                  <DialogDescription>
                    创建一个新的用户账号
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">用户名</Label>
                    <Input id="user-name" placeholder="输入用户名" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-email">邮箱</Label>
                    <Input id="user-email" type="email" placeholder="输入邮箱地址" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-password">密码</Label>
                    <Input id="user-password" type="password" placeholder="输入密码" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-role">用户角色</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue placeholder="选择角色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">普通用户</SelectItem>
                        <SelectItem value="vip">VIP用户</SelectItem>
                        <SelectItem value="admin">管理员</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">取消</Button>
                  <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">添加</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="搜索用户..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="选择角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部角色</SelectItem>
                <SelectItem value="普通用户">普通用户</SelectItem>
                <SelectItem value="VIP用户">VIP用户</SelectItem>
                <SelectItem value="管理员">管理员</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>用户列表</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>用户</TableHead>
                    <TableHead>邮箱</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>帖子</TableHead>
                    <TableHead>评论</TableHead>
                    <TableHead>注册日期</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === "管理员" ? "bg-purple-100 text-purple-800" :
                            user.role === "VIP用户" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === "活跃" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.posts}</TableCell>
                      <TableCell>{user.comments}</TableCell>
                      <TableCell>{user.registerDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.status === "活跃" ? (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到用户</h3>
                    <p className="text-gray-500">尝试更改搜索条件或添加新用户</p>
                  </div>
                )}
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
