import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="py-16">
          <div className="container px-4 md:px-6 max-w-3xl">
            <Reveal>
              <h1 className="text-4xl font-serif font-bold mb-8">隐私政策</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
                <p>最后更新日期：2024年1月1日</p>

                <h2 className="text-xl font-bold text-foreground">1. 信息收集</h2>
                <p>
                  我们收集您在注册、预订和使用服务过程中主动提供的个人信息，包括姓名、联系方式、支付信息等。我们也会自动收集设备信息、浏览记录等技术数据。
                </p>

                <h2 className="text-xl font-bold text-foreground">2. 信息使用</h2>
                <p>
                  我们使用收集的信息用于：提供和改进服务、处理预订和支付、发送服务通知、个性化用户体验、确保平台安全。
                </p>

                <h2 className="text-xl font-bold text-foreground">3. 信息共享</h2>
                <p>
                  我们不会出售您的个人信息。仅在以下情况下可能共享您的信息：获得您的明确同意、法律法规要求、与服务提供商合作（如支付处理）。
                </p>

                <h2 className="text-xl font-bold text-foreground">4. 数据安全</h2>
                <p>
                  我们采用行业标准的安全措施保护您的个人信息，包括加密传输、访问控制和定期安全审计。
                </p>

                <h2 className="text-xl font-bold text-foreground">5. Cookie 使用</h2>
                <p>
                  我们使用Cookie和类似技术来改善用户体验、分析网站使用情况。您可以通过浏览器设置管理Cookie偏好。
                </p>

                <h2 className="text-xl font-bold text-foreground">6. 您的权利</h2>
                <p>
                  您有权访问、更正或删除您的个人信息。如需行使这些权利，请通过 info@weekend.com 联系我们。
                </p>

                <h2 className="text-xl font-bold text-foreground">7. 政策更新</h2>
                <p>
                  我们可能会不时更新本隐私政策。更新后的政策将在本页面公布，重大变更会通过邮件通知您。
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
