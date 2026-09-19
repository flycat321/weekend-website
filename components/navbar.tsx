"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import Logo from "@/components/brand/logo"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinkClass = scrolled
    ? "text-foreground hover:text-foreground/80"
    : "text-white hover:text-white/80"

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="菜单"
                className={cn("hover:bg-transparent", scrolled ? "text-foreground" : "text-white")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Logo variant="dark" />
                </Link>
                <nav className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">产品与服务</div>
                    <Link href="/house" className="text-muted-foreground hover:text-foreground pl-2" onClick={() => setIsOpen(false)}>
                      零碳房屋
                    </Link>
                    <Link href="/stay" className="text-muted-foreground hover:text-foreground pl-2" onClick={() => setIsOpen(false)}>
                      Weekend Stay
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">探索</div>
                    <Link href="/experience" className="text-muted-foreground hover:text-foreground pl-2" onClick={() => setIsOpen(false)}>
                      体验活动
                    </Link>
                    <Link href="/guide" className="text-muted-foreground hover:text-foreground pl-2" onClick={() => setIsOpen(false)}>
                      住宿指南
                    </Link>
                    <Link href="/journal" className="text-muted-foreground hover:text-foreground pl-2" onClick={() => setIsOpen(false)}>
                      Journal
                    </Link>
                    <Link href="/gift" className="text-muted-foreground hover:text-foreground pl-2" onClick={() => setIsOpen(false)}>
                      礼品卡
                    </Link>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground pl-2" onClick={() => setIsOpen(false)}>
                      关于我们
                    </Link>
                  </div>
                </nav>
                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      router.push("/stay")
                      setIsOpen(false)
                    }}
                  >
                    预订体验
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/">
            <Logo variant={scrolled ? "dark" : "light"} />
          </Link>
        </div>

        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                    navLinkClass
                  )}
                >
                  产品与服务
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          href="/house"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Weekend House</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            探索我们的零碳房屋技术与定制服务
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/stay" title="Weekend Stay">
                      精选度假地点，体验零碳周末生活
                    </ListItem>
                    <ListItem href="/house/order" title="定制设计">
                      打造专属于您的零碳生活空间
                    </ListItem>
                    <ListItem href="/about" title="品牌故事">
                      了解WEEKEND的使命与愿景
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/stay" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("px-4 py-2 text-sm transition-colors", navLinkClass)}>
                    住宿预订
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/experience" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("px-4 py-2 text-sm transition-colors", navLinkClass)}>
                    体验活动
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/guide" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("px-4 py-2 text-sm transition-colors", navLinkClass)}>
                    住宿指南
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/journal" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("px-4 py-2 text-sm transition-colors", navLinkClass)}>
                    Journal
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("hover:bg-transparent", scrolled ? "text-foreground" : "text-white")}
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="font-medium">中文</DropdownMenuItem>
              <DropdownMenuItem className="text-muted-foreground">English (即将上线)</DropdownMenuItem>
              <DropdownMenuItem className="text-muted-foreground">日本語 (即将上线)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden sm:flex items-center gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              <Link href="/stay">预订体验</Link>
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
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"
