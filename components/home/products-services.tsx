"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sun, Droplets, Wind } from "lucide-react"
import Reveal from "@/components/motion/reveal"

export default function ProductsServices() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary/3 to-white" />
      <div className="container px-4 md:px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">产品与服务</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              探索WEEKEND的创新零碳产品与服务，开启可持续的未来生活方式
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Tabs defaultValue="house" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-10 h-auto p-1">
              <TabsTrigger value="house" className="py-3 text-sm md:text-base">零碳房屋</TabsTrigger>
              <TabsTrigger value="stay" className="py-3 text-sm md:text-base">Weekend Stay</TabsTrigger>
              <TabsTrigger value="materials" className="py-3 text-sm md:text-base">建材商城</TabsTrigger>
              <TabsTrigger value="design" className="py-3 text-sm md:text-base">家居设计</TabsTrigger>
            </TabsList>

            <TabsContent value="house" className="mt-0">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <h3 className="text-2xl font-bold">零碳房屋技术</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Weekend House 采用前沿零碳技术，从设计到建造全程遵循可持续原则，为您打造真正的零碳生活空间。
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Sun className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>一体化太阳能屋顶系统</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>雨水收集与循环利用系统</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Wind className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>被动式通风与保温设计</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/house/order">
                      <Button className="bg-brand-earth hover:bg-brand-earth/90 rounded-full px-6">
                        定制订购 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src="/house-new1.png"
                    alt="零碳房屋"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stay" className="mt-0">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src="/house3.avif"
                    alt="Weekend Stay"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-5">
                  <h3 className="text-2xl font-bold">Weekend Stay 度假体验</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    在精心挑选的自然环境中，体验 Weekend House 带来的零碳周末度假生活，远离城市喧嚣，亲近自然与科技的完美融合。
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="font-semibold">精选地点</div>
                        <p className="text-sm text-muted-foreground">6大目的地</p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="font-semibold">专属体验</div>
                        <p className="text-sm text-muted-foreground">定制可持续工作坊</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="pt-2">
                    <Link href="/stay">
                      <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
                        探索度假地点 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="mt-0">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <h3 className="text-2xl font-bold">绿色建材商城</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    精选全球顶级可持续建材，为建筑师、开发商和环保爱好者提供一站式绿色建材采购平台。
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="font-semibold">B2B采购通道</div>
                        <p className="text-sm text-muted-foreground">支持大宗询价与定制</p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="font-semibold">绿色认证</div>
                        <p className="text-sm text-muted-foreground">全球权威认证查询</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="pt-2">
                    <Button className="bg-brand-earth hover:bg-brand-earth/90 rounded-full px-6">
                      即将上线 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src="/house5.avif"
                    alt="绿色建材"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-0">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src="/house7.avif"
                    alt="家居设计"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-5">
                  <h3 className="text-2xl font-bold">可持续家居设计</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    由顶尖设计师打造的可持续家居产品，100%可回收或可降解材料，设计师定制服务。
                  </p>
                  <ul className="space-y-2">
                    {["100%可回收或可降解材料", "设计师定制服务", "3D预览功能"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
                      即将上线 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}
