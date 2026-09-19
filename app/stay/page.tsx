"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, PawPrint, Sun, Heater, Waves, CalendarIcon, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"
import { mockHouses, allRegions } from "@/lib/data"

const filterTags = {
  dogsAllowed: false,
  hasSauna: false,
  isLakeNearby: false,
  isSecluded: false,
}

export default function StayPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [selectedGuests, setSelectedGuests] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState(filterTags)

  const toggleFilterTag = (tag: keyof typeof filterTags) => {
    setActiveFilters((prev) => ({ ...prev, [tag]: !prev[tag] }))
  }

  const filteredHouses = useMemo(() => {
    return mockHouses.filter((house) => {
      if (selectedRegion && selectedRegion !== "all" && house.region !== selectedRegion) return false
      if (selectedGuests && selectedGuests !== "any" && house.adults < parseInt(selectedGuests)) return false
      if (activeFilters.dogsAllowed && !house.dogsAllowed) return false
      if (activeFilters.hasSauna && !house.hasSauna) return false
      if (activeFilters.isLakeNearby && !house.isLakeNearby) return false
      if (activeFilters.isSecluded && !house.isSecluded) return false
      return true
    })
  }, [selectedRegion, selectedGuests, activeFilters])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero banner */}
        <div className="relative h-[280px] bg-brand-forest overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("/house3.avif")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="container relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Weekend Stay</h1>
            <p className="text-lg text-white/80 max-w-xl">在自然深处，找到属于你的零碳周末</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white py-4 border-b sticky top-16 z-40 shadow-sm">
          <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 md:px-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-[220px] justify-start text-left font-normal", !date && "text-muted-foreground")}
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
                    <span>选择日期</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
              </PopoverContent>
            </Popover>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="选择区域" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部区域</SelectItem>
                {allRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGuests} onValueChange={setSelectedGuests}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="入住人数" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">不限</SelectItem>
                <SelectItem value="1">至少1人</SelectItem>
                <SelectItem value="2">至少2人</SelectItem>
                <SelectItem value="3">至少3人</SelectItem>
                <SelectItem value="4">至少4人</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2">
              <Button variant={activeFilters.dogsAllowed ? "default" : "outline"} size="sm" onClick={() => toggleFilterTag("dogsAllowed")} className="rounded-full">
                <PawPrint className="h-3.5 w-3.5 mr-1" /> 宠物
              </Button>
              <Button variant={activeFilters.hasSauna ? "default" : "outline"} size="sm" onClick={() => toggleFilterTag("hasSauna")} className="rounded-full">
                <Heater className="h-3.5 w-3.5 mr-1" /> 桑拿
              </Button>
              <Button variant={activeFilters.isLakeNearby ? "default" : "outline"} size="sm" onClick={() => toggleFilterTag("isLakeNearby")} className="rounded-full">
                <Waves className="h-3.5 w-3.5 mr-1" /> 近水
              </Button>
              <Button variant={activeFilters.isSecluded ? "default" : "outline"} size="sm" onClick={() => toggleFilterTag("isSecluded")} className="rounded-full">
                <Sun className="h-3.5 w-3.5 mr-1" /> 僻静
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-muted-foreground"
              onClick={() => {
                setSelectedRegion("")
                setSelectedGuests("")
                setActiveFilters(filterTags)
              }}
            >
              重置
            </Button>
          </div>
        </div>

        {/* House grid */}
        <div className="container mx-auto py-10 px-4 md:px-8">
          {filteredHouses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHouses.map((house, index) => (
                <Reveal key={house.id} delay={index * 0.1} direction="up">
                  <Link href={`/stay/${house.id}`} className="group block">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4 relative">
                      <Image
                        src={house.image}
                        alt={house.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={house.id <= 3}
                      />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-medium">
                        ¥{house.price.toLocaleString()}/晚
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{house.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{house.region}</span>
                      <span className="mx-1">·</span>
                      <span>最多{house.adults}人</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{house.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {house.travelTimes.map((tt) => (
                        <Badge key={tt.city} variant="secondary" className="rounded-full text-xs font-normal">
                          <Clock className="h-3 w-3 mr-1" />
                          {tt.city} {tt.time}
                        </Badge>
                      ))}
                      {house.dogsAllowed && (
                        <Badge variant="secondary" className="rounded-full text-xs font-normal">
                          <PawPrint className="h-3 w-3 mr-1" /> 可带宠物
                        </Badge>
                      )}
                      {house.hasSauna && (
                        <Badge variant="secondary" className="rounded-full text-xs font-normal">
                          <Heater className="h-3 w-3 mr-1" /> 桑拿
                        </Badge>
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg mb-2">没有找到符合条件的 Weekend House</p>
              <p className="text-sm">请尝试调整筛选条件</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
