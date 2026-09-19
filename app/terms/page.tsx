import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="py-16">
          <div className="container px-4 md:px-6 max-w-3xl">
            <Reveal>
              <h1 className="text-4xl font-serif font-bold mb-8">使用条款</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
                <p>最后更新日期：2024年1月1日</p>

                <h2 className="text-xl font-bold text-foreground">1. 服务说明</h2>
                <p>
                  WEEKEND（以下简称"我们"）提供零碳房屋定制、度假体验预订等服务。使用我们的网站和服务即表示您同意遵守本使用条款。
                </p>

                <h2 className="text-xl font-bold text-foreground">2. 用户账户</h2>
                <p>
                  您在注册账户时需提供准确、完整的信息。您有责任保管好自己的账户凭证，并对通过您账户进行的所有活动负责。
                </p>

                <h2 className="text-xl font-bold text-foreground">3. 预订与支付</h2>
                <p>
                  所有预订均须经过确认后方才生效。价格以预订时显示的价格为准。我们保留因特殊原因取消预订的权利，并在此情况下提供全额退款。
                </p>

                <h2 className="text-xl font-bold text-foreground">4. 取消政策</h2>
                <p>
                  入住前7天可免费取消预订。入住前3-7天取消将收取50%的费用。入住前3天内取消将收取全额费用。
                </p>

                <h2 className="text-xl font-bold text-foreground">5. 知识产权</h2>
                <p>
                  网站上的所有内容，包括但不限于文字、图片、设计、标识等，均受知识产权法律保护。未经许可，不得复制、修改或分发。
                </p>

                <h2 className="text-xl font-bold text-foreground">6. 免责声明</h2>
                <p>
                  我们尽力确保网站信息的准确性，但不对信息的完整性和及时性做出保证。对于因使用本网站而产生的任何间接损失，我们不承担责任。
                </p>

                <h2 className="text-xl font-bold text-foreground">7. 联系我们</h2>
                <p>
                  如对本条款有任何疑问，请通过 info@weekend.com 或 400-888-9999 与我们联系。
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
