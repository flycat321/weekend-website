import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HousePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* 房屋介绍头部 */}
        <section className="relative h-[60vh] min-h-[400px] bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070")',
            }}
          ></div>
          <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              <span className="text-[#00CED1]">WEEKEND HOUSE</span>
            </h1>
            <p className="mb-8 max-w-[700px] text-lg text-gray-300 md:text-xl">
              零碳生活的全新定义，可持续未来的理想之选
            </p>
            <Link href="/house/order">
              <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90 text-white" size="lg">
                立即订购 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* 简介 */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">重新定义您的生活空间</h2>
              <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
                WEEKEND HOUSE 不仅是一座房子，更是一种生活方式的革新
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#00CED1]/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00CED1]"
                  >
                    <path d="M12 2v8"></path>
                    <path d="m4.93 10.93 1.41 1.41"></path>
                    <path d="M2 18h2"></path>
                    <path d="M20 18h2"></path>
                    <path d="m19.07 10.93-1.41 1.41"></path>
                    <path d="M22 22H2"></path>
                    <path d="m8 22 4-10 4 10"></path>
                    <path d="M12 22v-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">零碳设计</h3>
                <p className="text-muted-foreground">
                  从材料选择到能源系统，每一个细节都经过精心设计，实现真正的零碳足迹
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#00CED1]/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00CED1]"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">智能系统</h3>
                <p className="text-muted-foreground">
                  先进的智能家居系统，让您的生活更加便捷、舒适，同时优化能源使用效率
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#00CED1]/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00CED1]"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">可持续生活</h3>
                <p className="text-muted-foreground">
                  不仅是一处住所，更是一种生活态度，让可持续发展成为日常生活的一部分
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/house/order">
                <Button className="bg-[#8B7355] hover:bg-[#8B7355]/90">
                  开始定制您的 WEEKEND HOUSE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
