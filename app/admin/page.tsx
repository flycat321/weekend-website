"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, User } from "lucide-react"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // 简单的验证逻辑，实际应用中应使用安全的身份验证系统
    if (username === "admin" && password === "weekend123") {
      router.push("/admin/dashboard")
    } else {
      setError("用户名或密码错误")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#00CED1]/10 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">WEEKEND 管理系统</CardTitle>
          <CardDescription>请登录以访问管理后台</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="username"
                  placeholder="输入管理员用户名"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="输入密码"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90">
              登录
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
