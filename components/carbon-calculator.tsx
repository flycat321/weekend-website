"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { TreePine, Zap, Car } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import Reveal from "@/components/motion/reveal"

export default function CarbonCalculator() {
  const [distance, setDistance] = useState(200)
  const [days, setDays] = useState(3)
  const [people, setPeople] = useState(2)

  // Carbon emission calculation (kg CO2)
  // Transport: car ~0.15 kg/km per person
  const transportEmission = distance * 0.15 * people
  // Accommodation: hotel ~25 kg/night/person, traditional ~15, weekend house ~3 (solar-powered)
  const hotelEmission = transportEmission + days * people * 25
  const traditionalEmission = transportEmission + days * people * 15
  const weekendEmission = transportEmission + days * people * 3

  const savings = hotelEmission - weekendEmission

  const chartData = [
    { name: "星级酒店", value: Math.round(hotelEmission), fill: "#ef4444" },
    { name: "传统民宿", value: Math.round(traditionalEmission), fill: "#f59e0b" },
    { name: "Weekend House", value: Math.round(weekendEmission), fill: "hsl(174, 100%, 40%)" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-brand-cream">
      <div className="container px-4 md:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 font-serif">碳足迹计算器</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              对比不同住宿方式的碳排放差异，了解您的环保贡献
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal direction="left" delay={0.1}>
            <div className="space-y-8 bg-white rounded-2xl p-8 shadow-sm border">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">出行距离</Label>
                  <span className="text-sm text-primary font-semibold">{distance} 公里</span>
                </div>
                <Slider
                  value={[distance]}
                  min={20}
                  max={500}
                  step={10}
                  onValueChange={(v) => setDistance(v[0])}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">停留天数</Label>
                  <span className="text-sm text-primary font-semibold">{days} 天</span>
                </div>
                <Slider
                  value={[days]}
                  min={1}
                  max={14}
                  step={1}
                  onValueChange={(v) => setDays(v[0])}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">出行人数</Label>
                  <span className="text-sm text-primary font-semibold">{people} 人</span>
                </div>
                <Slider
                  value={[people]}
                  min={1}
                  max={8}
                  step={1}
                  onValueChange={(v) => setPeople(v[0])}
                />
              </div>

              {/* Summary card */}
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  选择 Weekend House，此次旅行将比酒店减少{" "}
                  <span className="font-bold text-primary">{Math.round(savings)} kg</span>{" "}
                  碳排放，相当于种植{" "}
                  <span className="font-bold text-primary">{Math.max(1, Math.round(savings / 20))}</span>{" "}
                  棵树一年的吸碳量。
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <div className="space-y-6">
              {/* Recharts bar chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-sm font-medium text-muted-foreground mb-6 tracking-wider uppercase">碳排放对比 (kg CO₂)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} barSize={48}>
                    <XAxis dataKey="name" tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip
                      formatter={(value: number) => [`${value} kg CO₂`, "碳排放"]}
                      contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Impact metrics */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <TreePine className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-xl font-bold">{Math.max(1, Math.round(savings / 20))}</div>
                    <div className="text-xs text-muted-foreground">棵树年吸碳量</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <Car className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-xl font-bold">{Math.round(savings * 4)}</div>
                    <div className="text-xs text-muted-foreground">公里汽车排放</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-xl font-bold">{Math.round(savings * 1.5)}</div>
                    <div className="text-xs text-muted-foreground">度电节约</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
