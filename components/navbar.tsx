"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 添加自定义CSS样式来覆盖NavigationMenuTrigger的默认样式
const navMenuTriggerStyle = {
  backgroundColor: 'transparent',
  padding: '0',
  ':hover': {
    backgroundColor: 'transparent'
  },
  ':focus': {
    backgroundColor: 'transparent'
  },
  '&[data-state=open]': {
    backgroundColor: 'transparent'
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      // 只要有一点滚动就立即改变状态
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled 
          ? "bg-white border-b" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="菜单" className={scrolled ? "text-black" : "text-white hover:bg-transparent"}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className={`flex items-center gap-2 font-bold text-lg ${scrolled ? "text-black" : "text-white"}`} onClick={() => setIsOpen(false)}>
                  <span className="text-[#00CED1]">WEEKEND</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">产品与服务</div>
                    <Link
                      href="/house"
                      className="text-muted-foreground hover:text-foreground pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      零碳房屋
                    </Link>
                    <Link
                      href="/stay"
                      className="text-muted-foreground hover:text-foreground pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Weekend Stay
                    </Link>
                    <Link
                      href="/materials"
                      className="text-muted-foreground hover:text-foreground pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      建材商城
                    </Link>
                    <Link
                      href="/design"
                      className="text-muted-foreground hover:text-foreground pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      家居设计
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">可持续社区</div>
                    <Link
                      href="/events"
                      className="text-muted-foreground hover:text-foreground pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      活动日历
                    </Link>
                    <Link
                      href="/stories"
                      className="text-muted-foreground hover:text-foreground pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      用户故事
                    </Link>
                    <Link
                      href="/charity"
                      className="text-muted-foreground hover:text-foreground pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      公益合作
                    </Link>
                  </div>
                  <Link href="/about" className="font-semibold" onClick={() => setIsOpen(false)}>
                    关于WEEKEND
                  </Link>
                </nav>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 drop-shadow-md" 
                    onClick={() => { 
                      router.push('/search'); 
                      setIsOpen(false); 
                    }}
                  >
                    预订体验
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                    会员登录
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className={`flex items-center gap-2 font-bold text-lg ${scrolled ? "text-black" : "text-white"}`}>
            <span className="text-[#00CED1]">WEEKEND</span>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-0 ${
                    scrolled ? "text-black hover:text-gray-700" : "text-white hover:text-gray-200"
                  }`}
                  style={navMenuTriggerStyle}
                >
                  产品与服务
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-transparent p-6 no-underline outline-none focus:shadow-md"
                          href="/house"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">weekend house</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            探索我们的零碳房屋技术与定制服务
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/stay" title="Weekend Stay">
                      精选全球度假地点，体验零碳周末生活
                    </ListItem>
                    <ListItem href="/materials" title="建材商城">
                      专业绿色建材一站式采购平台
                    </ListItem>
                    <ListItem href="/design" title="家居设计">
                      可持续家居产品与AR预览功能
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-0 ${
                    scrolled ? "text-black hover:text-gray-700" : "text-white hover:text-gray-200"
                  }`}
                  style={navMenuTriggerStyle}
                >
                  可持续社区
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-transparent p-6 no-underline outline-none focus:shadow-md"
                          href="/community"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">零碳社区</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            加入WEEKEND社区，与志同道合的环保先锋一起探索可持续生活方式
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/events" title="活动日历">
                      线上碳中和讲座与线下房屋体验日
                    </ListItem>
                    <ListItem href="/stories" title="用户故事">
                      分享您的"零碳周末"生活体验
                    </ListItem>
                    <ListItem href="/charity" title="公益合作">
                      每笔订单对应种植一棵树，追踪您的环保贡献
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`px-0 py-2 text-sm transition-colors ${
                      scrolled 
                        ? "text-black hover:text-gray-700" 
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    关于WEEKEND
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={`hover:bg-transparent ${scrolled ? "text-black" : "text-white"}`}>
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>中文</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>日本語</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden sm:flex items-center gap-6">
            <Button 
              variant="ghost" 
              className={`px-0 hover:bg-transparent ${scrolled ? "text-black hover:text-gray-700" : "text-white hover:text-gray-200"}`}
            >
              会员登录
            </Button>
            <Button 
              className={`rounded-sm px-4 ${scrolled ? "bg-[#00CED1] hover:bg-[#00CED1]/90 text-white" : "bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"}`}
              onClick={() => router.push('/search')}
            >
              预订体验
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
