"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ImageCarousel } from "@/components/image-carousel"
import { FaqItem } from "@/components/faq-item"
import { DatePicker } from "@/components/date-picker"
import { GuestSelector } from "@/components/guest-selector"

// 图片数据
const cabinImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%B1%8F2025-05-01%2002.08.26.png-ksOvUvhJofUlSbJcrMtsZDMODvaI92.jpeg",
    alt: "步辰航小屋外观",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Cabin+Interior",
    alt: "小屋内部",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Cabin+Bedroom",
    alt: "小屋卧室",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Cabin+Kitchen",
    alt: "小屋厨房",
  },
]

const environmentImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%B1%8F2025-05-01%2002.08.32.png-tJT4gAfDyd3iZgZiKs5WrGSPL8Q8hs.jpeg",
    alt: "环境图片1",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Environment+2",
    alt: "环境图片2",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Environment+3",
    alt: "环境图片3",
  },
]

const foodImages = [
  {
    src: "/placeholder.svg?height=400&width=600&text=Food+1",
    alt: "食物图片1",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Food+2",
    alt: "食物图片2",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Food+3",
    alt: "食物图片3",
  },
]

// FAQ数据
const faqData = [
  {
    question: "小木屋适合带孩子入住吗？",
    answer:
      "是的，我们的小木屋非常适合家庭入住。我们提供额外的床铺和儿童友好的设施。请注意，由于小木屋位于自然环境中，建议家长随时照看好孩子。对于2岁以下的婴儿，我们可以提供婴儿床，请在预订时告知我们。",
  },
  {
    question: "如何理解&quot;冒险&quot;的分类？",
    answer:
      "&quot;冒险&quot;分类表示这个小木屋位于较为原始的自然环境中，可能需要一定的户外经验。这类小木屋通常提供更加贴近自然的体验，可能包括使用柴火炉、干燥厕所等设施。如果您喜欢户外活动和自然体验，这将是一个理想的选择。",
  },
  {
    question: "住宿价格包含哪些内容？",
    answer:
      "基本住宿价格包括小木屋的使用、床单和毛巾、基本厨房用品、一篮柴火、停车位和WiFi。最终清洁费也已包含在价格中。额外服务如早餐套餐、额外的柴火、自行车租赁等需要额外付费。详细的价格明细将在预订过程中显示。",
  },
  {
    question: "入住和退房时间是什么时候？",
    answer:
      "入住时间为下午3点，退房时间为上午11点。如果您需要提前入住或延迟退房，请提前与我们联系，我们将尽力满足您的需求，但可能会收取额外费用。",
  },
  {
    question: "小木屋有电和自来水吗？",
    answer:
      "是的，我们的小木屋配备了电力和自来水。然而，作为我们可持续发展理念的一部分，我们鼓励客人节约用电和用水。部分小木屋使用太阳能电池板和雨水收集系统，可能在某些情况下供应有限。",
  },
]

export default function CabinDetail() {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f0]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf9f0] border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-black">
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-black hover:text-[#006241] text-sm font-medium">
              预订客舱
            </Link>
            <Link href="#" className="text-black hover:text-[#006241] text-sm font-medium">
              入住我们
            </Link>
            <Link href="#" className="text-black hover:text-[#006241] text-sm font-medium">
              额外
            </Link>
            <Link href="#" className="text-black hover:text-[#006241] text-sm font-medium">
              成为房东
            </Link>
            <Link href="#" className="text-black hover:text-[#006241] text-sm font-medium">
              店
            </Link>
            <Link href="#" className="text-black hover:text-[#006241] text-sm font-medium">
              登录
            </Link>
            <button className="border border-gray-300 rounded px-2 py-1 text-sm">中文 ▾</button>
          </nav>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* 主页部分 */}
        <div id="main" className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-2 overflow-x-auto">
            <div className="rounded-full bg-gray-200 px-3 py-1 text-sm whitespace-nowrap">0：56 汉诺威西南</div>
            <div className="rounded-full bg-gray-200 px-3 py-1 text-sm whitespace-nowrap">2：00 多特蒙德东北部</div>
            <div className="rounded-full bg-gray-200 px-3 py-1 text-sm whitespace-nowrap">2：15 汉堡西南</div>
          </div>

          <h1 className="text-5xl font-light mb-8">步辰航</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-base mb-6">
                位于一望无际的山毛榉林中心的艺术家驻地上，您的目光漂
                浮在都郊葱茏的草地上，周围环绕着一条小溪，接骨木果和 榛子树。
              </p>

              <p className="text-lg font-medium mb-4">每晚每 € 128 起</p>

              <p className="text-sm mb-6">包括包括：最后清洁、停车位、Wifi、1个篝子柴火</p>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span className="text-sm">入住时间 下午 3 点</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span className="text-sm">退房时间 11 AM</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <span className="text-sm">2 名成人</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <span className="text-sm">靠近农场/物业</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                    <span className="text-sm">允许携带宠物</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <span className="text-sm">定期消毒</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <span className="text-sm">自行车和远足路线</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <span className="text-sm">噪音 2 级</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px]">
              <ImageCarousel images={cabinImages} className="h-full" />
            </div>
          </div>
        </div>

        {/* 食物和活动部分 */}
        <div id="food" className="container mx-auto px-4 py-8 border-t border-gray-200 mt-8">
          <h1 className="text-3xl font-light mb-8">食物和活动</h1>

          <div className="h-[400px] mb-12">
            <ImageCarousel images={foodImages} className="h-full" />
          </div>

          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">RAUS X ARCHIPEL公司</h2>
            <p className="mb-4">
              在床上享用早餐，您的地开始新的一天。 Archipel x Raus 的丰盛早餐套餐包括来自
              精心挑选的生产商的美味面包、干脆浆 果酱、鸡蛋、格兰诺拉麦片、新鲜水 果汁。
            </p>
            <div className="flex items-center justify-between">
              <span>1 页, 共 6 页</span>
              <div className="flex space-x-2">
                <button className="border border-gray-300 rounded-full p-1">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="border border-gray-300 rounded-full p-1">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 环境部分 */}
        <div id="environment" className="container mx-auto px-4 py-8 border-t border-gray-200">
          <h1 className="text-3xl font-light mb-8">环境</h1>

          <div className="h-[400px] mb-12">
            <ImageCarousel images={environmentImages} className="h-full" />
          </div>

          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">远征</h2>
            <p className="mb-4">
              坐落在平缓起伏的草地上，您会发现自己 位于一座古老的乡村校舍的场地上。该校
              舍一直在进行翻修，很快就会被发出崭新 的辉煌。一条小溪从您的小屋旁边流淌，
              两边是灌木、接骨木树和榛子树。地主偶 尔会在草地上创作他们的艺术品，您 可能会在工作中遇到他们，并欣赏
              他们的作品。
            </p>
            <div className="flex items-center justify-between">
              <span>1 页, 共 3 页</span>
              <div className="flex space-x-2">
                <button className="border border-gray-300 rounded-full p-1">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="border border-gray-300 rounded-full p-1">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <button className="bg-white rounded-full px-4 py-2 text-sm">地区</button>
          </div>
        </div>

        {/* 设备部分 */}
        <div id="facilities" className="container mx-auto px-4 py-8 border-t border-gray-200">
          <h1 className="text-3xl font-light mb-8">设备</h1>

          <div className="mb-8">
            <p className="mb-6">
              在我们的小屋中，您可以找到在大自然中逗留所需的一切。小屋配有柴
              火炉、舒适的毯子和床，即使在寒冷的日子里也能让您保持温
              暖。我们建议带上保暖的衣服，如舒适的袜子、厚毛衣和雨衣，
              不使用。此外，记得带上鞋子和鞋子和橡胶靴，因为在适度的月份
              周围的草地和田野可能会潮湿和泥泞。您可以添加额外的便利设施，例 如自行车、烧烤架或火锅（取决于位置）。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>毛巾和床单</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                  <span>手电筒</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span>瑜伽垫</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                  <span>蓝牙音箱</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.21 13.89L7 23l9-9-8.99-9L7.2 13.9"></path>
                    <path d="M14.83 15.28c.2-1.37-1.64-2.84-2.36-3.73-.22-.28-.48-.53-.79-.7l-2.52-1.35"></path>
                  </svg>
                  <span>厨具</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>百叶窗</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>卷帘屏风</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <span>书籍和游戏</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                    <polygon points="12 15 17 21 7 21 12 15"></polygon>
                  </svg>
                  <span>洗发水和沐浴露</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                  <span>茶&咖啡</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <span>扇</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                  <span>柴火炉</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>淋浴和干燥马桶</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                  <span>燃气灶和冰箱</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                  </svg>
                  <span>盐、胡椒、油和醋</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ部分 */}
        <div id="faq" className="container mx-auto px-4 py-8 border-t border-gray-200">
          <h1 className="text-3xl font-light mb-8">常见问题</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {faqData.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%B1%8F2025-05-01%2002.08.38-MWdHrDVDFNp5wL46nYuc9sHf6rTzD0.png"
                alt="Illustration"
                width={300}
                height={300}
                className="object-contain ml-auto"
              />
            </div>
          </div>
        </div>

        {/* Booking Widget - Fixed at bottom */}
        <div className="sticky bottom-0 w-full bg-[#faf9f0] py-4">
          <div className="container mx-auto px-4">
            <div className="bg-[#ffb81c] rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs mb-1">到达和离开</p>
                  <div className="flex items-center justify-between">
                    <DatePicker date={checkInDate} setDate={setCheckInDate} label="选择入住日期" />
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <DatePicker date={checkOutDate} setDate={setCheckOutDate} label="选择退房日期" />
                  </div>
                </div>
                <div>
                  <p className="text-xs mb-1">客人</p>
                  <GuestSelector adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} />
                </div>
                <div>
                  <button className="w-full bg-[#faf9f0] text-black py-2 rounded-lg">现在就预订</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t border-gray-200 bg-[#faf9f0] py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-around">
            <a href="#main" className="text-center text-black">
              <span className="block text-sm">步辰航</span>
            </a>
            <a href="#food" className="text-center text-gray-500 hover:text-black">
              <span className="block text-sm">食物和活动</span>
            </a>
            <a href="#environment" className="text-center text-gray-500 hover:text-black">
              <span className="block text-sm">环境</span>
            </a>
            <a href="#facilities" className="text-center text-gray-500 hover:text-black">
              <span className="block text-sm">设备</span>
            </a>
            <a href="#faq" className="text-center text-gray-500 hover:text-black">
              <span className="block text-sm">常见问题</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
