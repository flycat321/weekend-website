import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

type Article = {
  id: number
  title: string
  excerpt: string
  category: "用户故事" | "自然笔记" | "正念生活" | "零碳知识"
  image: string
  date: string
  readTime: string
  featured?: boolean
}

const articles: Article[] = [
  {
    id: 1,
    title: "在川西森林中找回呼吸的节奏",
    excerpt: "城市里的我习惯了快节奏，直到在海拔2800米的小屋里，听到了自己的心跳声。三天两夜的独处，改变了我对'休息'的理解。",
    category: "用户故事",
    image: "/house1.avif",
    date: "2024-12-15",
    readTime: "5分钟",
    featured: true,
  },
  {
    id: 2,
    title: "洱海边的三道茶：一苦二甜三回味",
    excerpt: "在白族茶道师的指导下，我第一次理解了为什么一杯茶可以是一堂人生课。苍山的风从窗外吹进来，带着山茶花的香气。",
    category: "用户故事",
    image: "/house2.avif",
    date: "2024-11-28",
    readTime: "4分钟",
    featured: true,
  },
  {
    id: 3,
    title: "零碳建筑如何改变我们的度假方式",
    excerpt: "从被动式通风到太阳能屋顶，Weekend House 的每一个技术细节都在回答同一个问题：如何在不伤害自然的前提下享受自然？",
    category: "零碳知识",
    image: "/house3.avif",
    date: "2024-11-10",
    readTime: "7分钟",
  },
  {
    id: 4,
    title: "银河下的对话：草原观星指南",
    excerpt: "在呼伦贝尔的草原上，肉眼可见的星星数量会让你怀疑自己以前看到的是不是同一片天空。这是一份实用的草原观星指南。",
    category: "自然笔记",
    image: "/house4.avif",
    date: "2024-10-20",
    readTime: "6分钟",
  },
  {
    id: 5,
    title: "竹海中的正念冥想：身体扫描练习",
    excerpt: "莫干山的竹叶声是天然的白噪音。在这篇文章中，我们的冥想导师分享了一套适合在自然中练习的身体扫描冥想方法。",
    category: "正念生活",
    image: "/house5.avif",
    date: "2024-10-05",
    readTime: "5分钟",
  },
  {
    id: 6,
    title: "一间房减少12吨碳排放意味着什么？",
    excerpt: "12吨CO₂ 是一个抽象的数字。我们把它翻译成你能感受的事物：相当于600棵树一年的吸碳量，或者一辆汽车绕地球1.5圈的排放。",
    category: "零碳知识",
    image: "/house6.avif",
    date: "2024-09-18",
    readTime: "4分钟",
  },
  {
    id: 7,
    title: "带着宠物去度假：一位金毛主人的体验",
    excerpt: "麦兜第一次看到草原的反应是——疯跑。作为一位带狗旅行的老手，这是我住过的最宠物友好的地方。",
    category: "用户故事",
    image: "/house7.avif",
    date: "2024-09-01",
    readTime: "4分钟",
  },
  {
    id: 8,
    title: "森林浴：为什么树木能治愈我们",
    excerpt: "日本人称之为'森林浴'（Shinrin-yoku），科学研究证实，在森林中行走2小时可以显著降低皮质醇水平和血压。",
    category: "正念生活",
    image: "/house8.avif",
    date: "2024-08-15",
    readTime: "6分钟",
  },
]

const categoryColors: Record<string, string> = {
  "用户故事": "bg-primary/10 text-primary",
  "自然笔记": "bg-green-50 text-green-700",
  "正念生活": "bg-purple-50 text-purple-700",
  "零碳知识": "bg-amber-50 text-amber-700",
}

export default function JournalPage() {
  const featured = articles.filter((a) => a.featured)
  const rest = articles.filter((a) => !a.featured)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-16 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <Reveal>
              <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">Journal</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">自然中的思考</h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                用户故事、自然观察和零碳生活的灵感——来自 WEEKEND 社区的声音。
              </p>
            </Reveal>
          </div>
        </section>

        {/* Featured articles */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {featured.map((article, i) => (
                <Reveal key={article.id} delay={i * 0.1}>
                  <article className="group cursor-pointer">
                    <div className="aspect-[16/10] relative rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <Badge className={`${categoryColors[article.category]} border-0 mb-3`}>
                          {article.category}
                        </Badge>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                          {article.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}阅读</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* All articles grid */}
        <section className="py-16 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <Reveal>
              <h2 className="text-2xl font-serif font-bold mb-8">全部文章</h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((article, i) => (
                <Reveal key={article.id} delay={i * 0.08}>
                  <article className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <Badge className={`${categoryColors[article.category]} border-0 mb-3 text-xs`}>
                        {article.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime}阅读</span>
                      </div>
                    </div>
                  </article>
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
