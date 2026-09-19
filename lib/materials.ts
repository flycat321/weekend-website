export type MaterialCategory = "外立面" | "能源系统" | "室内与保温" | "水系统"

export interface Material {
  id: string
  name: string
  category: MaterialCategory
  description: string
  carbonNote: string
  certification: string
  unit: string
  referencePrice: string
  image: string
}

// 示例目录：接入供应商资料后，在此替换名称、认证、价格和图片即可。
export const sampleMaterials: Material[] = [
  { id: "wood-cladding", name: "FSC 认证热改性木外墙板", category: "外立面", description: "耐候、防潮的天然木饰面，适用于小屋和民宿立面。", carbonNote: "可再生木材，支持项目碳核算", certification: "FSC", unit: "㎡", referencePrice: "¥380–520 / ㎡", image: "/house5.avif" },
  { id: "zinc-panel", name: "再生铝镁锌立边咬合板", category: "外立面", description: "轻量、耐久，适合高雨量与复杂气候地区。", carbonNote: "含再生金属成分", certification: "EPD 可提供", unit: "㎡", referencePrice: "¥460–680 / ㎡", image: "/house1.avif" },
  { id: "solar", name: "高效单晶光伏组件", category: "能源系统", description: "适配屋顶与地面安装，支持离网或并网方案。", carbonNote: "预计年发电量可抵消日常用电", certification: "TÜV / CE", unit: "kW", referencePrice: "¥3,800–5,200 / kW", image: "/house-new1.png" },
  { id: "battery", name: "磷酸铁锂储能一体机", category: "能源系统", description: "为周末住宅提供夜间与阴雨天备用电力。", carbonNote: "长循环寿命，支持模块化扩容", certification: "UN38.3", unit: "套", referencePrice: "¥32,000 起 / 套", image: "/house2.avif" },
  { id: "insulation", name: "再生纤维素保温填充", category: "室内与保温", description: "利用回收纤维制成，兼顾隔热、吸音与透湿。", carbonNote: "低隐含碳保温选择", certification: "环保产品认证", unit: "㎡", referencePrice: "¥95–140 / ㎡", image: "/house4.avif" },
  { id: "water", name: "雨水收集与净化模块", category: "水系统", description: "用于冲洗、灌溉等非饮用水场景，可按屋面面积配置。", carbonNote: "降低自来水消耗", certification: "食品级管路可选", unit: "套", referencePrice: "¥8,600 起 / 套", image: "/house6.avif" },
]

export const materialCategories: Array<MaterialCategory | "全部"> = ["全部", "外立面", "能源系统", "室内与保温", "水系统"]
