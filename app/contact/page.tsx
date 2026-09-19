"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="text-center mb-14">
                <h1 className="text-4xl font-serif font-bold mb-4">联系我们</h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  无论您有任何问题或合作意向，都欢迎与我们取得联系
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
              <Reveal direction="left">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">联系方式</h2>
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">办公地址</div>
                          <div className="text-muted-foreground text-sm">中国·北京市朝阳区建国路88号</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">客服热线</div>
                          <div className="text-muted-foreground text-sm">400-888-9999</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">电子邮箱</div>
                          <div className="text-muted-foreground text-sm">info@weekend.com</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-cream rounded-2xl p-6">
                    <h3 className="font-medium mb-2">工作时间</h3>
                    <p className="text-sm text-muted-foreground">周一至周五 9:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground">周末及节假日 10:00 - 16:00</p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center bg-primary/5 rounded-2xl p-10">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">消息已发送</h3>
                    <p className="text-muted-foreground">感谢您的留言，我们将在24小时内回复您。</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">姓名</Label>
                        <Input id="name" placeholder="您的姓名" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">电话</Label>
                        <Input id="phone" placeholder="联系电话" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱</Label>
                      <Input id="email" type="email" placeholder="电子邮箱" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">主题</Label>
                      <Input id="subject" placeholder="咨询主题" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">留言内容</Label>
                      <Textarea id="message" placeholder="请输入您的留言..." rows={5} required />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 rounded-full h-11">
                      发送留言
                    </Button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
