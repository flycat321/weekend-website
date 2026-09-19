"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Clock, CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"
import { getHouseById } from "@/lib/data"

export default function StayDetailPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? parseInt(params.id) : 0
  const house = getHouseById(id)

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  })
  const [guestCount, setGuestCount] = useState("2")

  if (!house) {
    return notFound()
  }

  const nights = date?.from && date?.to
    ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
    : 2
  const totalPrice = house.price * nights

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero image */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src={house.image}
            alt={house.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container">
              <Reveal>
                <div className="text-white">
                  <div className="flex items-center gap-2 text-white/80 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{house.region}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{house.name}</h1>
                  <div className="flex flex-wrap gap-2">
                    {house.scenery.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 md:px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <Reveal>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> 最多 {house.adults} 位客人
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> 入住 {house.checkInTime || "15:00"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> 退房 {house.checkOutTime || "11:00"}
                    </span>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {house.longDescription || house.description}
                  </p>
                </div>
              </Reveal>

              {/* Features */}
              <Reveal delay={0.1}>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">房屋特色</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {house.features.map((feat) => (
                      <div key={feat.text} className="flex items-center gap-3 p-3 rounded-xl bg-brand-cream">
                        <feat.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">
                          {feat.text}
                          {feat.level !== undefined && ` ${feat.level}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Explore items */}
              {house.exploreItems && house.exploreItems.length > 0 && (
                <Reveal delay={0.15}>
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-6">体验与活动</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {house.exploreItems.map((item, idx) => (
                        <div key={idx} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Getting there */}
              {house.gettingThere && (
                <Reveal delay={0.2}>
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-6">如何到达</h2>
                    <div className="bg-brand-cream rounded-2xl p-6">
                      <div className="flex flex-wrap gap-4 mb-4">
                        {house.travelTimes.map((tt) => (
                          <div key={tt.city} className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">从{tt.city}出发：{tt.time}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{house.gettingThere}</p>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* FAQ */}
              {house.faqs && house.faqs.length > 0 && (
                <Reveal delay={0.25}>
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-6">常见问题</h2>
                    <Accordion type="single" collapsible className="w-full">
                      {house.faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`faq-${idx}`}>
                          <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Reveal direction="right" delay={0.2}>
                  <div className="rounded-2xl border shadow-lg p-6 space-y-6 bg-white">
                    <div>
                      <div className="text-3xl font-bold">
                        ¥{house.price.toLocaleString()}
                        <span className="text-base font-normal text-muted-foreground">/晚</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">入住日期</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date?.from ? (
                                date.to ? (
                                  <>
                                    {format(date.from, "MM/dd")} - {format(date.to, "MM/dd")}
                                  </>
                                ) : (
                                  format(date.from, "yyyy-MM-dd")
                                )
                              ) : (
                                "选择日期"
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">入住人数</label>
                        <Select value={guestCount} onValueChange={setGuestCount}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: house.adults }, (_, i) => i + 1).map((n) => (
                              <SelectItem key={n} value={String(n)}>
                                {n} 位客人
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>¥{house.price.toLocaleString()} x {nights} 晚</span>
                        <span>¥{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>总计</span>
                        <span>¥{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-full text-base">
                      立即预订
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">预订确认后可免费取消</p>

                    {/* Host info */}
                    {house.hostName && (
                      <div className="border-t pt-4">
                        <div className="text-sm">
                          <span className="font-medium">房东：{house.hostName}</span>
                          {house.hostDescription && (
                            <p className="text-muted-foreground mt-1">{house.hostDescription}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
