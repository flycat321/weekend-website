"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, FileVideo, MessageSquare, Users, Home, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

const visitData = [
  { date: "03/01", uv: 420 },
  { date: "03/05", uv: 680 },
  { date: "03/10", uv: 950 },
  { date: "03/15", uv: 780 },
  { date: "03/20", uv: 1200 },
  { date: "03/25", uv: 1050 },
  { date: "03/30", uv: 1400 },
]

const sourceData = [
  { name: "搜索引擎", value: 45, color: "hsl(174, 100%, 40%)" },
  { name: "社交媒体", value: 25, color: "#8B7355" },
  { name: "直接访问", value: 20, color: "#6366f1" },
  { name: "其他渠道", value: 10, color: "#94a3b8" },
]

const kpis = [
  { icon: ImageIcon, label: "图片素材", value: "128", color: "bg-primary/10 text-primary" },
  { icon: FileVideo, label: "视频素材", value: "32", color: "bg-brand-earth/10 text-brand-earth" },
  { icon: MessageSquare, label: "预订数量", value: "256", color: "bg-green-50 text-green-600" },
  { icon: Users, label: "注册用户", value: "1,024", color: "bg-purple-50 text-purple-600" },
]

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar activeItem="dashboard" />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">仪表盘</h1>
              <p className="text-sm text-muted-foreground">WEEKEND 管理后台概览</p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>访问网站</span>
              </Button>
            </Link>
          </div>

          {/* KPI cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {kpis.map((kpi) => (
              <Card key={kpi.label}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${kpi.color}`}>
                    <kpi.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{kpi.value}</h3>
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="recent">最近活动</TabsTrigger>
              <TabsTrigger value="stats">统计数据</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">系统状态</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">运行状态</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                          <span className="text-sm text-green-600 font-medium">正常</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span>存储空间</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full w-[35%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span>CDN 带宽</span>
                          <span className="font-medium">62%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-earth rounded-full w-[62%]" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">最近更新</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        { text: "首页背景图片更新", time: "今天 10:24" },
                        { text: "新增2处度假目的地", time: "昨天 15:36" },
                        { text: "用户反馈处理完成", time: "2天前" },
                        { text: "碳计算器算法优化", time: "3天前" },
                      ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center text-sm">
                          <span>{item.text}</span>
                          <span className="text-muted-foreground text-xs">{item.time}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">操作记录</CardTitle>
                  <CardDescription>系统最近的操作日志</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { text: "管理员 (admin) 登录系统", time: "今天 10:15", color: "border-primary" },
                      { text: "更新首页背景图片", time: "今天 10:24", color: "border-primary" },
                      { text: "上传产品展示视频", time: "昨天 15:36", color: "border-brand-earth" },
                      { text: "新增度假地点：丽江·雪山秘境", time: "昨天 16:42", color: "border-green-500" },
                      { text: "处理用户预订 #2048", time: "2天前", color: "border-purple-500" },
                    ].map((item, i) => (
                      <div key={i} className={`border-l-2 ${item.color} pl-4 py-1.5`}>
                        <p className="text-sm font-medium">{item.text}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      网站访问量趋势
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={260}>
                      <LineChart data={visitData}>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={35} />
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }} />
                        <Line type="monotone" dataKey="uv" stroke="hsl(174, 100%, 40%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(174, 100%, 40%)" }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">流量来源</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-8">
                      <ResponsiveContainer width={180} height={180}>
                        <PieChart>
                          <Pie data={sourceData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                            {sourceData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-3">
                        {sourceData.map((s) => (
                          <div key={s.name} className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ background: s.color }} />
                            <span className="text-sm">{s.name}</span>
                            <span className="text-sm font-semibold ml-auto">{s.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
