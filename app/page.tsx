import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Leaf, Home, Calendar, ShoppingBag, Users, Globe, Sun, Droplets, Wind } from "lucide-react"
import HeroSection from "@/components/hero-section"
import ProductShowcase from "@/components/product-showcase"
import CarbonCalculator from "@/components/carbon-calculator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* 价值主张部分 */}
        <section className="py-16 bg-gradient-to-b from-[#f8f9fa] to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  重新定义零碳周末生活方式
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  WEEKEND是全球首个以"零碳周末生活"为核心的未来生活方式平台，通过创新产品与生态服务重构城市郊区度假场景。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#00CED1]/10 p-2 rounded-full">
                      <Leaf className="h-6 w-6 text-[#00CED1]" />
                    </div>
                    <div className="font-semibold">1间房 = 每年减少12吨CO₂</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#8B7355]/10 p-2 rounded-full">
                      <Home className="h-6 w-6 text-[#8B7355]" />
                    </div>
                    <div className="font-semibold">100%可再生能源供应</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080"
                  alt="零碳生活场景"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm">
                  weekend house 零碳生活体验
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 产品与服务部分 */}
        <section className="py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%'
            }}
          ></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">产品与服务</h2>
              <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
                探索WEEKEND的创新零碳产品与服务，开启可持续的未来生活方式
              </p>
            </div>

            <Tabs defaultValue="house" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="house" className="text-sm md:text-base">
                  零碳房屋
                </TabsTrigger>
                <TabsTrigger value="stay" className="text-sm md:text-base">
                  Weekend Stay
                </TabsTrigger>
                <TabsTrigger value="materials" className="text-sm md:text-base">
                  建材商城
                </TabsTrigger>
                <TabsTrigger value="design" className="text-sm md:text-base">
                  家居设计
                </TabsTrigger>
              </TabsList>

              <TabsContent value="house" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">零碳房屋技术</h3>
                    <p className="text-muted-foreground">
                      weekend house采用前沿零碳技术，从设计到建造全程遵循可持续原则，为您打造真正的零碳生活空间。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Sun className="h-5 w-5 text-[#00CED1]" />
                        <span>一体化太阳能屋顶系统</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-[#00CED1]" />
                        <span>雨水收集与循环利用系统</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-[#00CED1]" />
                        <span>被动式通风与保温设计</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <Link href="/house/order/page">
                        <Button className="bg-[#8B7355] hover:bg-[#8B7355]/90">
                          定制订购 <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="relative h-[350px] rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
                      alt="零碳房屋"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stay" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[350px] rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070"
                      alt="Weekend Stay"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Weekend Stay 度假体验</h3>
                    <p className="text-muted-foreground">
                      在精心挑选的自然环境中，体验weekend
                      house带来的零碳周末度假生活，远离城市喧嚣，亲近自然与科技的完美融合。
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="font-semibold">全球精选地点</div>
                          <p className="text-sm text-muted-foreground">15个国家，50+目的地</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="font-semibold">专属体验活动</div>
                          <p className="text-sm text-muted-foreground">定制可持续生活工作坊</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="pt-4">
                      <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
                        探索度假地点 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">绿色建材商城</h3>
                    <p className="text-muted-foreground">
                      精选全球顶级可持续建材，为建筑师、开发商和环保爱好者提供一站式绿色建材采购平台。
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="font-semibold">B2B采购通道</div>
                          <p className="text-sm text-muted-foreground">支持大宗询价与定制</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="font-semibold">绿色认证数据库</div>
                          <p className="text-sm text-muted-foreground">全球权威认证查询</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="pt-4">
                      <Button className="bg-[#8B7355] hover:bg-[#8B7355]/90">
                        进入商城 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-[350px] rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
                      alt="绿色建材"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[350px] rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070"
                      alt="家居设计"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">可持续家居设计</h3>
                    <p className="text-muted-foreground">
                      由顶尖设计师打造的可持续家居产品，结合AR预览功能，让您在购买前就能体验产品在家中的效果。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                        <span>100%可回收或可降解材料</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                        <span>AR预览功能，上传房间照片即可体验</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                        <span>设计师定制服务</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
                        探索设计产品 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 3D展示部分 */}
        <ProductShowcase />

        {/* 碳足迹计算器 */}
        <CarbonCalculator />

        {/* 可持续社区 */}
        <section className="py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%'
            }}
          ></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">可持续社区</h2>
              <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
                加入WEEKEND社区，与志同道合的环保先锋一起探索可持续生活方式
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070"
                    alt="活动日历"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-[#00CED1]" />
                    <h3 className="font-semibold text-lg">活动日历</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    参与线上碳中和讲座与线下房屋体验日，与专家和同好交流互动。
                  </p>
                  <Button variant="outline" className="w-full">
                    查看近期活动
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=2070"
                    alt="用户故事"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-[#00CED1]" />
                    <h3 className="font-semibold text-lg">用户故事</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    分享您的"零碳周末"故事，展示个人减碳成果，激励更多人加入可持续生活。
                  </p>
                  <Button variant="outline" className="w-full">
                    浏览用户故事
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074"
                    alt="公益合作"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="h-5 w-5 text-[#00CED1]" />
                    <h3 className="font-semibold text-lg">公益合作</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">每笔订单对应种植一棵树，在实时地图上追踪您的环保贡献。</p>
                  <Button variant="outline" className="w-full">
                    探索植树计划
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 品牌故事 */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">关于 WEEKEND</h2>
                <p className="text-muted-foreground">
                  WEEKEND源于一群科学家与设计师的共同愿景——将可持续理念融入日常生活。从北极科考到产品研发，我们致力于通过创新设计和技术，让零碳生活方式成为可能。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#8B7355] hover:bg-[#8B7355]/90">观看品牌纪录片</Button>
                  <Button variant="outline">下载ESG报告</Button>
                </div>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070"
                  alt="品牌故事"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 快捷入口 */}
        <section className="py-16 bg-gradient-to-b from-[#00CED1]/10 to-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">开启您的零碳周末</h2>
              <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
                选择您感兴趣的服务，立即开始可持续生活方式的探索
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-[#8B7355] text-white hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Home className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">房屋预订</h3>
                  <p className="mb-4">体验weekend house的零碳度假生活</p>
                  <Button variant="secondary" className="mt-auto">
                    立即预订
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#00CED1] text-white hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <ShoppingBag className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">定制设计</h3>
                  <p className="mb-4">打造专属于您的零碳生活空间</p>
                  <Link href="/house/order/page">
                    <Button variant="secondary" className="mt-auto">
                      开始定制
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-[#8B7355] to-[#00CED1] text-white hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Leaf className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">建材采购</h3>
                  <p className="mb-4">专业绿色建材一站式解决方案</p>
                  <Button variant="secondary" className="mt-auto">
                    进入商城
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
