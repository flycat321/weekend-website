import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sun, Settings, BadgeCheck, Ruler, Truck, Hammer, Key } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

const features = [
  {
    icon: Sun,
    title: "零碳设计",
    description: "从材料选择到能源系统，每一个细节都经过精心设计，实现真正的零碳足迹",
  },
  {
    icon: Settings,
    title: "智能系统",
    description: "先进的智能家居系统，让您的生活更加便捷、舒适，同时优化能源使用效率",
  },
  {
    icon: BadgeCheck,
    title: "可持续生活",
    description: "不仅是一处住所，更是一种生活态度，让可持续发展成为日常生活的一部分",
  },
]

const steps = [
  { icon: Ruler, title: "方案设计", description: "与设计师沟通需求，定制专属零碳方案" },
  { icon: Hammer, title: "工厂制造", description: "模块化工厂精密制造，质量严格把控" },
  { icon: Truck, title: "整体运输", description: "整体运输至项目现场，减少现场施工" },
  { icon: Key, title: "安装交付", description: "专业团队快速安装，90天即可入住" },
]

export default function HousePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] bg-black">
          <Image
            src="/house-new1.png"
            alt="Weekend House"
            fill
            className="object-contain opacity-80 bg-gradient-to-b from-gray-900 to-black"
          />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <Reveal>
              <h1 className="mb-4 text-4xl font-serif font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="text-primary">WEEKEND HOUSE</span>
              </h1>
              <p className="mb-8 max-w-[600px] text-lg text-white/70 md:text-xl mx-auto">
                零碳生活的全新定义，可持续未来的理想之选
              </p>
              <Link href="/house/order">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base" size="lg">
                  立即定制 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                  重新定义您的生活空间
                </h2>
                <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                  WEEKEND HOUSE 不仅是一座房子，更是一种生活方式的革新
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-10">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.15}>
                  <div className="text-center group">
                    <div className="bg-primary/10 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                      <f.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Product showcase */}
        <section className="py-20 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal direction="left">
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/house-new1.png"
                    alt="Weekend House Product"
                    fill
                    className="object-contain bg-gradient-to-b from-gray-100 to-gray-200"
                  />
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.2}>
                <div className="space-y-6">
                  <h2 className="text-3xl font-serif font-bold">基础配置</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "建筑面积", value: "60 m²" },
                      { label: "交付周期", value: "90 天" },
                      { label: "起步价", value: "¥350,000" },
                      { label: "质保期", value: "10 年" },
                    ].map((spec) => (
                      <div key={spec.label} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-sm text-muted-foreground">{spec.label}</div>
                        <div className="text-lg font-bold">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    包含主体结构、基础装修、基础家具、智能家居系统和被动式通风设计。可选配太阳能系统、高端外立面材料和更多个性化升级。
                  </p>
                  <Link href="/house/order">
                    <Button className="bg-brand-earth hover:bg-brand-earth/90 rounded-full px-6">
                      开始定制 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl mb-4">定制流程</h2>
                <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">
                  从设计到交付，全程透明高效
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                        <step.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-brand-forest to-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold mb-4">准备好开始您的零碳之旅了吗？</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                立即定制您的 Weekend House，让每一个周末都成为与自然和谐共处的美好时光
              </p>
              <Link href="/house/order">
                <Button size="lg" variant="secondary" className="rounded-full px-8 h-12 text-base">
                  开始定制 <ArrowRight className="ml-2 h-4 w-4" />
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
