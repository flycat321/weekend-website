"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Mountain, UtensilsCrossed, Sparkles, Wifi, WifiOff, TreePine } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

const activities = [
  {
    title: "原始森林徒步",
    description: "跟随专业向导深入千年古木林，沿途探寻珍稀植物和野生动物踪迹。适合所有体能水平。",
    image: "/house1.avif",
    location: "川西·阿坝 / 长白山",
    tag: "户外探索",
  },
  {
    title: "星空观测之夜",
    description: "在零光污染的环境中，由天文爱好者带领，用肉眼和望远镜识别星座、观察银河。",
    image: "/house2.avif",
    location: "川西·阿坝 / 内蒙古",
    tag: "夜间体验",
  },
  {
    title: "草原骑马体验",
    description: "在专业牧民带领下骑马穿越辽阔草原，感受游牧民族的自由与豪迈。",
    image: "/house3.avif",
    location: "内蒙古·呼伦贝尔",
    tag: "户外探索",
  },
  {
    title: "漓江竹筏漂流",
    description: "从私人码头出发，竹筏漂流漓江最精华河段，两岸喀斯特山水如画卷般展开。",
    image: "/house4.avif",
    location: "广西·阳朔",
    tag: "水上活动",
  },
  {
    title: "竹林正念冥想",
    description: "在万亩竹海深处，由专业导师指导正念冥想。竹叶沙沙声是最好的白噪音。",
    image: "/house5.avif",
    location: "浙江·莫干山",
    tag: "正念疗愈",
  },
  {
    title: "喀斯特攀岩",
    description: "在专业教练指导下挑战石灰岩峭壁，阳朔是中国最好的户外攀岩目的地之一。",
    image: "/house6.avif",
    location: "广西·阳朔",
    tag: "户外探索",
  },
]

const culinaryExperiences = [
  {
    title: "藏式早餐体验",
    description: "品尝地道酥油茶、糌粑和高原野菜，了解藏族饮食文化。食材全部来自当地牧民家庭。",
    image: "/house4.avif",
    partner: "本地牧民家庭",
  },
  {
    title: "白族三道茶",
    description: "体验千年白族待客最高礼仪——一苦、二甜、三回味。在苍山洱海间品味人生哲学。",
    image: "/house2.avif",
    partner: "大理茶道师",
  },
  {
    title: "篝火烤全羊",
    description: "围坐篝火旁，品尝现烤呼伦贝尔草原羊。配以牧民自酿奶酒，听长调入眠。",
    image: "/house3.avif",
    partner: "草原牧场",
  },
  {
    title: "莫干山采茶制茶",
    description: "亲手采摘莫干黄芽，跟茶农学习从炒青到揉捻的全过程。带走自己制作的茶叶。",
    image: "/house6.avif",
    partner: "莫干山茶园",
  },
]

const goodies = [
  {
    title: "本地有机食材篮",
    description: "入住时已备好当地农场的新鲜有机蔬果、鸡蛋和手工面包，足够整个假期享用。",
    icon: UtensilsCrossed,
  },
  {
    title: "时令鲜花",
    description: "一束来自周边山野的应季鲜花，将自然的芬芳从户外延伸到房间内。",
    icon: Sparkles,
  },
  {
    title: "Digital Detox 套装",
    description: "瑜伽垫、手帐本、精选书籍和冥想引导音频。关闭Wi-Fi，与自己重新连接。",
    icon: WifiOff,
  },
  {
    title: "户外野餐套装",
    description: "精致的野餐篮、毯子和本地食材组合，找一处草地享受阳光下的午餐。",
    icon: TreePine,
  },
]

export default function ExperiencePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[380px] bg-brand-forest overflow-hidden">
          <Image
            src="/house3.avif"
            alt="Experiences"
            fill
            className="object-cover opacity-40"
          />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <Reveal>
              <p className="text-primary text-sm tracking-widest uppercase mb-3">Extras & Experiences</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
                体验，让周末不止于住
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                活动、美食与小惊喜——为你的零碳周末增添更多可能
              </p>
            </Reveal>
          </div>
        </section>

        {/* Activities */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex items-center gap-3 mb-2">
                <Mountain className="h-5 w-5 text-primary" />
                <p className="text-primary text-sm tracking-widest uppercase font-medium">Activities</p>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-3">探索你身边的自然</h2>
              <p className="text-muted-foreground mb-10 max-w-2xl">
                远离屏幕，用身体感受世界。每一项活动都由当地专业伙伴提供，安全而难忘。
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="group cursor-pointer">
                    <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full">
                        {item.tag}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                    <p className="text-xs text-primary font-medium">{item.location}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Culinary */}
        <section className="py-20 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex items-center gap-3 mb-2">
                <UtensilsCrossed className="h-5 w-5 text-brand-earth" />
                <p className="text-brand-earth text-sm tracking-widest uppercase font-medium">Culinary</p>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-3">在地风味，从农场到餐桌</h2>
              <p className="text-muted-foreground mb-10 max-w-2xl">
                与本地农场和手艺人合作，将最新鲜的食材和最地道的风味送到你的房间。
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {culinaryExperiences.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="group flex gap-5 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-1/3 min-h-[200px] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 py-5 pr-5">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                      <p className="text-xs text-brand-earth font-medium">合作伙伴: {item.partner}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Goodies */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-primary text-sm tracking-widest uppercase font-medium">Goodies</p>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-3">让住宿更有仪式感</h2>
              <p className="text-muted-foreground mb-10 max-w-2xl">
                预订时可添加的小惊喜——为自己或同行的人。
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {goodies.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Detox Feature */}
        <section className="py-20 bg-[#0a0a0a] text-white">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal direction="left">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <WifiOff className="h-5 w-5 text-primary" />
                    <span className="text-primary text-sm tracking-widest uppercase font-medium">Digital Detox</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold">关掉屏幕，重新连接自己</h2>
                  <p className="text-gray-400 leading-relaxed">
                    说实话，你上一次有意识地不看手机是什么时候？在部分房源，你可以预订 Digital Detox 体验——真正地断开连接，字面意义上的。
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    我们的房屋天生就适合离线体验：置身自然，回归本质。瑜伽垫、书籍、桌游和精心策划的 Offline Kit 在等着你——帮你慢下来，重新发现自己。
                  </p>
                  <Link href="/stay">
                    <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
                      探索可断网房源 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.2}>
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="/house5.avif"
                    alt="Digital Detox"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-brand-earth/10">
          <div className="container px-4 md:px-6 text-center">
            <Reveal>
              <h2 className="text-2xl font-serif font-bold mb-3">找到适合你的零碳周末</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                活动和体验可在预订房源时一并选择，也可入住后随时添加。
              </p>
              <Link href="/stay">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 h-11">
                  浏览所有房源 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
