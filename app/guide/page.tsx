"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BedDouble, ShowerHead, Flame, UtensilsCrossed, Wifi, Car,
  Snowflake, Sun, Baby, Dog, ChevronLeft, ChevronRight,
  Shirt, Thermometer, CloudRain, CheckCircle2, Sparkles
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

const cabinFeatures = [
  {
    icon: BedDouble,
    title: "卧室",
    description: "舒适的大床配备高品质床品和保暖毯。根据房型不同，可容纳2位成人（及1-2名幼儿）。窗外就是自然，是最好的安眠曲。",
    image: "/house5.avif",
  },
  {
    icon: UtensilsCrossed,
    title: "厨房",
    description: "配备电磁炉、冰箱、水壶、法压壶、茶壶、餐具和基本调料。咖啡和茶已为您准备好。部分房源提供过滤水，口感可能因地而异。",
    image: "/house6.avif",
  },
  {
    icon: ShowerHead,
    title: "浴室",
    description: "配备淋浴、洗手台和毛巾。洗发水、沐浴露和香皂已就位。我们使用环保洗浴产品，对皮肤和自然都温和友好。",
    image: "/house7.avif",
  },
  {
    icon: Flame,
    title: "壁炉",
    description: "寒冷的夜晚，在燃木壁炉前让自己暖起来。柴火、引火物和所需工具已在现场准备好。初次使用？别担心，我们有详细的生火指南。",
    image: "/house8.avif",
  },
]

const seasonTips = [
  {
    season: "冬季",
    icon: Snowflake,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    tips: [
      "房屋由燃木壁炉供暖——需要一点耐心和技巧来保持室内温暖",
      "请带足保暖衣物：厚毛衣、羽绒服、帽子、手套",
      "周边草地和田野可能湿滑泥泞，请穿防滑靴",
      "我们提供热水袋、厚毛毯和热茶，帮你度过寒冷夜晚",
    ],
  },
  {
    season: "夏季",
    icon: Sun,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    tips: [
      "阳光直射时房内可能偏暖，到达后请打开所有窗户通风",
      "遮阳伞/遮阳帆和风扇已准备就绪",
      "带上轻便衣物、防晒霜、太阳帽和泳衣",
      "附近通常有适合消暑的湖泊或溪流",
    ],
  },
]

const alwaysIncluded = [
  { icon: Car, text: "免费停车", description: "附近设有停车位，行李可用小推车运送" },
  { icon: Wifi, text: "Wi-Fi", description: "虽然我们鼓励你断网，但所有房屋都配备Wi-Fi。偏远地区网速可能较慢" },
  { icon: Flame, text: "柴火", description: "每次入住提供至少一篮柴火。冬季额外提供木炭砖" },
  { icon: CheckCircle2, text: "专业清洁", description: "入住前后均进行专业卫生清洁" },
]

const packingList = {
  essential: ["身份证件", "充电器", "常用药品", "现金（部分地区无移动支付）"],
  winter: ["厚羽绒服", "保暖内衣", "防滑登山靴", "帽子手套围巾", "暖宝宝"],
  summer: ["防晒霜SPF50+", "太阳帽", "泳衣", "驱蚊喷雾", "轻便徒步鞋"],
  optional: ["望远镜/相机", "喜欢的书", "棋牌桌游", "红酒和零食", "瑜伽垫"],
}

export default function GuidePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % cabinFeatures.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + cabinFeatures.length) % cabinFeatures.length)
  const current = cabinFeatures[activeSlide]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative h-[45vh] min-h-[340px] bg-brand-forest overflow-hidden">
          <Image
            src="/house2.avif"
            alt="Guide"
            fill
            className="object-cover opacity-30"
          />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <Reveal>
              <p className="text-primary text-sm tracking-widest uppercase mb-3">Staying with us</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">住宿指南</h1>
              <p className="text-white/70 text-lg max-w-xl">
                关于你的零碳周末，这里有你需要知道的一切
              </p>
            </Reveal>
          </div>
        </section>

        {/* Cabin Features Carousel */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold mb-2">房屋设施</h2>
              <p className="text-muted-foreground mb-10">我们的房屋虽小但一应俱全，每一处细节都为你的舒适而设计。</p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover transition-all duration-500"
                />
                {/* Navigation */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    {activeSlide + 1} / {cabinFeatures.length}
                  </span>
                  <button
                    onClick={nextSlide}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <current.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{current.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">{current.description}</p>

                {/* Dots */}
                <div className="flex gap-2 pt-4">
                  {cabinFeatures.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-2 rounded-full transition-all ${i === activeSlide ? "w-8 bg-primary" : "w-2 bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Always Included */}
        <section className="py-16 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold mb-2">始终包含</h2>
              <p className="text-muted-foreground mb-10">无论你选择哪个房源，以下设施和服务始终为你准备好。</p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {alwaysIncluded.map((item, i) => (
                <Reveal key={item.text} delay={i * 0.08}>
                  <Card className="border-0 shadow-sm h-full">
                    <CardContent className="p-5">
                      <item.icon className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{item.text}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Season Tips */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold mb-2">季节提醒</h2>
              <p className="text-muted-foreground mb-10">我们的房屋在每个季节都有独特的魅力——也有需要注意的地方。</p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {seasonTips.map((season, i) => (
                <Reveal key={season.season} delay={i * 0.1}>
                  <div className={`${season.bgColor} rounded-2xl p-8`}>
                    <div className="flex items-center gap-3 mb-5">
                      <season.icon className={`h-6 w-6 ${season.color}`} />
                      <h3 className="text-xl font-bold">{season.season}</h3>
                    </div>
                    <ul className="space-y-3">
                      {season.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-3">
                          <CheckCircle2 className={`h-4 w-4 ${season.color} mt-0.5 flex-shrink-0`} />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Special Notes */}
        <section className="py-16 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold mb-2">坦诚相告</h2>
              <p className="text-muted-foreground mb-10">以下是一些你应该提前了解的事情——这些不是缺点，而是在自然中生活的一部分。</p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Wifi,
                  title: "信号可能不佳",
                  text: "部分房源位于偏远地区，移动信号和Wi-Fi速度可能有限。建议提前告知亲友。把它当作 Digital Detox 的机会吧。",
                },
                {
                  icon: Baby,
                  title: "并非所有房源适合幼儿",
                  text: "由于壁炉和台阶的存在，房屋并非100%儿童安全。请根据孩子年龄判断是否适合。12岁以上通常没有问题。",
                },
                {
                  icon: Thermometer,
                  title: "温度需要你参与",
                  text: "壁炉取暖需要一点耐心和技巧，不像空调那样一键搞定。这是自然生活的一部分——也是乐趣所在。",
                },
              ].map((note, i) => (
                <Reveal key={note.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <note.icon className="h-6 w-6 text-brand-earth mb-3" />
                    <h3 className="font-semibold mb-2">{note.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{note.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Packing List */}
        <section className="py-20">
          <div className="container px-4 md:px-6 max-w-4xl">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold mb-2 text-center">打包清单</h2>
              <p className="text-muted-foreground mb-10 text-center">出发前核对一下，确保万无一失。</p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "必备物品", items: packingList.essential, icon: CheckCircle2, color: "text-primary" },
                { title: "冬季加带", items: packingList.winter, icon: Snowflake, color: "text-blue-500" },
                { title: "夏季加带", items: packingList.summer, icon: Sun, color: "text-amber-500" },
                { title: "推荐携带", items: packingList.optional, icon: Sparkles, color: "text-purple-500" },
              ].map((section, i) => (
                <Reveal key={section.title} delay={i * 0.08}>
                  <div className="bg-brand-cream rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <section.icon className={`h-5 w-5 ${section.color}`} />
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
