"use client"

import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import { Check, Leaf, Mail, Minus, Plus, Send, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Reveal from "@/components/motion/reveal"
import { materialCategories, sampleMaterials, type MaterialCategory } from "@/lib/materials"

export default function MaterialsPage() {
  const [category, setCategory] = useState<MaterialCategory | "全部">("全部")
  const [selection, setSelection] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  const visibleMaterials = useMemo(
    () => sampleMaterials.filter((material) => category === "全部" || material.category === category),
    [category]
  )
  const selectedMaterials = sampleMaterials.filter((material) => selection.includes(material.id))

  const toggleMaterial = (id: string) => {
    setSelection((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
    setSent(false)
  }
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream/30">
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="bg-brand-forest py-16 text-white">
          <div className="container px-4 md:px-6">
            <Badge className="mb-4 border-white/20 bg-white/10 text-white">示例建材目录</Badge>
            <h1 className="max-w-3xl font-serif text-4xl font-bold md:text-5xl">为低碳空间，选择看得见的材料</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">面向自建房、民宿主、设计师与开发团队。浏览示例材料，将意向加入询价单，我们会依据项目所在地、用量和交付计划提供配置建议。</p>
          </div>
        </section>

        <section className="container grid gap-10 px-4 py-12 lg:grid-cols-[1fr_340px] md:px-6">
          <div>
            <div className="mb-8 flex flex-wrap gap-2">
              {materialCategories.map((item) => (
                <Button key={item} variant={category === item ? "default" : "outline"} className="rounded-full" onClick={() => setCategory(item)}>{item}</Button>
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {visibleMaterials.map((material, index) => {
                const selected = selection.includes(material.id)
                return (
                  <Reveal key={material.id} delay={index * 0.05}>
                    <article className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${selected ? "border-primary shadow-md" : "hover:shadow-md"}`}>
                      <div className="relative aspect-[16/9]"><Image src={material.image} alt={material.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" /></div>
                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between gap-3"><Badge variant="secondary">{material.category}</Badge><span className="text-sm font-semibold text-primary">{material.referencePrice}</span></div>
                        <h2 className="text-lg font-bold">{material.name}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{material.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Leaf className="h-4 w-4 text-primary" />{material.carbonNote}</div>
                        <div className="mt-1 text-xs text-muted-foreground">认证：{material.certification} · 单位：{material.unit}</div>
                        <Button className="mt-5 w-full" variant={selected ? "outline" : "default"} onClick={() => toggleMaterial(material.id)}>{selected ? <><Check className="mr-2 h-4 w-4" />已加入询价单</> : <><Plus className="mr-2 h-4 w-4" />加入询价单</>}</Button>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-xl font-bold"><ShoppingBag className="h-5 w-5 text-primary" />项目询价单</h2><Badge>{selection.length}</Badge></div>
            <p className="mt-2 text-sm text-muted-foreground">示例价格仅用于前期预算，提交后由顾问按项目情况报价。</p>
            <div className="my-5 space-y-3 border-y py-4">
              {selectedMaterials.length ? selectedMaterials.map((material) => <div key={material.id} className="flex items-start justify-between gap-3 text-sm"><span>{material.name}</span><button aria-label={`移除 ${material.name}`} onClick={() => toggleMaterial(material.id)}><X className="h-4 w-4 text-muted-foreground" /></button></div>) : <p className="text-sm text-muted-foreground">从左侧目录选择建材加入询价单。</p>}
            </div>
            {sent ? <div className="rounded-xl bg-primary/10 p-4 text-sm text-primary"><Check className="mb-2 h-5 w-5" />需求已记录。演示版本不会真实发送数据；接入表单服务或 CRM 后即可启用。</div> : <form className="space-y-3" onSubmit={submitInquiry}><Input required name="name" placeholder="姓名 / 公司名称" /><Input required name="contact" placeholder="手机或邮箱" /><Textarea name="project" placeholder="项目地点、预计用量、交付时间（选填）" /><Button type="submit" className="w-full" disabled={!selection.length}><Send className="mr-2 h-4 w-4" />提交询价需求</Button></form>}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
