import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, User } from "lucide-react"

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="WEEKEND Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-bold text-xl">
            <span className="text-[#00CED1]">WEEKEND</span> 管理系统
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="管理员" />
                  <AvatarFallback>管理</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>管理员账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>个人资料</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>设置</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                <LogOut className="h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
