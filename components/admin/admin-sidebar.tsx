import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ImageIcon, MessageSquare, Users, Settings, FileText, Home } from "lucide-react"

interface AdminSidebarProps {
  activeItem: string
}

export default function AdminSidebar({ activeItem }: AdminSidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      name: "仪表盘",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "media",
      name: "媒体管理",
      href: "/admin/media",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      id: "forum",
      name: "论坛管理",
      href: "/admin/forum",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "users",
      name: "用户管理",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "content",
      name: "内容管理",
      href: "/admin/content",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "settings",
      name: "系统设置",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white">
      <div className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              activeItem === item.id ? "bg-[#00CED1]/10 text-[#00CED1]" : "text-gray-500 hover:bg-gray-100",
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        <div className="mt-auto pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
          >
            <Home className="h-5 w-5" />
            <span>返回网站</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
