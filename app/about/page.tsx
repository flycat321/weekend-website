import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"
import { Leaf, Globe, Users, Award } from "lucide-react"

const values = [
  { icon: Leaf, title: "零碳承诺", description: "每一栋Weekend House都实现全生命周期零碳排放" },
  { icon: Globe, title: "全球视野", description: "融合全球最前沿的可持续建筑技术与设计理念" },
  { icon: Users, title: "社区共建", description: "与每一位用户共同构建可持续生活方式的社区" },
  { icon: Award, title: "品质保证", description: "10年质保承诺，100年使用寿命的建筑标准" },
]

const milestones = [
  { year: "2020", event: "WEEKEND品牌创立，首个零碳房屋原型完成" },
  { year: "2021", event: "获得国际被动房认证，首批产品交付" },
  { year: "2022", event: "Weekend Stay度假体验上线" },
  { year: "2023", event: "社区成员突破5000人，拓展6大目的地" },
  { year: "2024", event: "第二代产品发布，社区成员突破10000人" },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[360px] bg-brand-forest">
          <Image
            src="/house8.avif"
            alt="WEEKEND Team"
            fill
            className="object-cover opacity-30"
          />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">关于 WEEKEND</h1>
              <p className="text-white/70 text-lg max-w-xl">
                源于一群科学家与设计师的共同愿景 — 将可持续理念融入日常生活
              </p>
            </Reveal>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal direction="left">
                <div className="space-y-6">
                  <h2 className="text-3xl font-serif font-bold">我们的使命</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    WEEKEND 致力于通过创新设计和技术，让零碳生活方式成为可能。我们相信，每一个周末的选择都可以成为改变世界的力量。
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    从北极科考获取的灵感，到前沿材料科学的应用，我们将全球最先进的可持续建筑技术融入每一栋 Weekend House。不是苦行式的环保，而是让零碳生活本身变得令人向往。
                  </p>
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.2}>
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/house7.avif"
                    alt="Nature"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold text-center mb-12">核心价值</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <v.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container px-4 md:px-6 max-w-3xl">
            <Reveal>
              <h2 className="text-3xl font-serif font-bold text-center mb-12">发展历程</h2>
            </Reveal>
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="text-2xl font-bold text-primary w-16 flex-shrink-0">{m.year}</div>
                    <div className="flex-1 pb-8 border-l-2 border-primary/20 pl-6 relative">
                      <div className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
                      <p className="text-muted-foreground">{m.event}</p>
                    </div>
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
