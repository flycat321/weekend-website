"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Gift, Heart, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"

const amounts = [500, 1000, 1500, 2000, 3000]

export default function GiftPage() {
  const [selectedAmount, setSelectedAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const activeAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative h-[45vh] min-h-[340px] bg-brand-forest overflow-hidden">
          <Image
            src="/house1.avif"
            alt="Gift"
            fill
            className="object-cover opacity-30"
          />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <Reveal>
              <Gift className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">礼品卡</h1>
              <p className="text-white/70 text-lg max-w-xl">
                送一个零碳周末给你关心的人——最好的礼物是陪伴自然的时光
              </p>
            </Reveal>
          </div>
        </section>

        {/* Gift card builder */}
        <section className="py-20">
          <div className="container px-4 md:px-6 max-w-5xl">
            {submitted ? (
              <Reveal>
                <div className="text-center py-20">
                  <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-3">礼品卡已创建</h2>
                  <p className="text-muted-foreground text-lg mb-2">
                    价值 ¥{activeAmount.toLocaleString()} 的礼品卡已发送至收件人邮箱。
                  </p>
                  <p className="text-muted-foreground mb-8">他/她将在24小时内收到一封来自 WEEKEND 的精美邮件。</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full px-6">
                    再送一张
                  </Button>
                </div>
              </Reveal>
            ) : (
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Preview */}
                <Reveal direction="left">
                  <div className="sticky top-24">
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-forest to-primary">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                        <Gift className="h-8 w-8 mb-4 opacity-80" />
                        <p className="text-sm tracking-widest uppercase opacity-70 mb-2">WEEKEND 礼品卡</p>
                        <p className="text-5xl font-serif font-bold mb-2">¥{activeAmount.toLocaleString()}</p>
                        <p className="text-sm opacity-60">可用于预订任意 Weekend House 住宿体验</p>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-6 right-6 w-16 h-16 border border-white/20 rounded-full" />
                      <div className="absolute bottom-6 left-6 w-10 h-10 border border-white/20 rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">礼品卡自购买日起 12 个月内有效</p>
                  </div>
                </Reveal>

                {/* Form */}
                <Reveal direction="right" delay={0.15}>
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">选择金额</h2>
                      <p className="text-muted-foreground text-sm mb-4">选择预设金额或输入自定义金额</p>
                      <div className="flex flex-wrap gap-3 mb-4">
                        {amounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => {
                              setSelectedAmount(amount)
                              setCustomAmount("")
                            }}
                            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                              selectedAmount === amount && !customAmount
                                ? "bg-primary text-white border-primary"
                                : "border-gray-200 hover:border-primary"
                            }`}
                          >
                            ¥{amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <Label className="text-sm whitespace-nowrap">自定义</Label>
                        <Input
                          type="number"
                          placeholder="输入金额"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-32"
                          min={100}
                          max={10000}
                        />
                        <span className="text-sm text-muted-foreground">元 (100-10,000)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">收件人信息</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipientName">收件人姓名</Label>
                          <Input id="recipientName" placeholder="TA的名字" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipientEmail">收件人邮箱</Label>
                          <Input id="recipientEmail" type="email" placeholder="TA的邮箱" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">留言 (可选)</Label>
                        <Textarea
                          id="message"
                          placeholder="写几句话给TA..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">你的信息</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="senderName">你的姓名</Label>
                          <Input id="senderName" placeholder="你的名字" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="senderEmail">你的邮箱</Label>
                          <Input id="senderEmail" type="email" placeholder="你的邮箱" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand-cream rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground">礼品卡金额</span>
                        <span className="text-2xl font-bold">¥{activeAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">可用于预订任意 Weekend House 住宿及体验</p>
                    </div>

                    <Button
                      onClick={() => setSubmitted(true)}
                      className="w-full bg-primary hover:bg-primary/90 rounded-full h-12 text-base"
                      disabled={activeAmount < 100}
                    >
                      购买礼品卡 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
