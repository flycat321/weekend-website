'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation'; // Use hooks for client components
import Link from 'next/link';
import dynamic from 'next/dynamic'; // Import dynamic for map

// --- Copying necessary imports, types, and data --- 
// (Ideally, move types/data to shared files like lib/types.ts, lib/data.ts later)
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock, PawPrint, Star, Sun, Tent, Heater, Waves, Sailboat, CalendarIcon, TreePine, MountainSnow, Droplet, Wind, BedDouble, ShowerHead, CookingPot, Utensils, Snowflake, Sofa, BookOpen, Wifi, Layers, ParkingSquare, Menu } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator"; // For visual separation
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Feature type
type Feature = {
  icon: React.ElementType;
  text: string;
  level?: number;
};

// Equipment item type
type EquipmentItem = {
  icon: React.ElementType;
  text: string;
};

// FAQ item type
type FAQItem = {
  question: string;
  answer: string;
};

// Type for generic content sections (now combined)
type ExploreItem = {
  category: '环境' | '美食' | '活动' | '额外服务'; // Add category
  title: string;
  description: string;
  image: string;
};

// Updated House type with new fields
type House = {
  id: number;
  name: string;
  region: string;
  province?: string;
  lat: number;
  lng: number;
  available: number;
  adults: number;
  checkInTime: string; // e.g., "下午 3:00"
  checkOutTime: string; // e.g., "上午 11:00"
  dogsAllowed: boolean;
  hasSauna: boolean;
  isLakeNearby: boolean;
  isSecluded: boolean;
  description: string;
  longDescription?: string; // Optional longer description
  scenery: string[];
  activities: string[];
  features: Feature[];
  keyInfo: Feature[]; // Specific key info section icons/text
  travelTimes: { city: string; time: string }[];
  hostName?: string;
  hostDescription?: string;
  hostImage?: string;
  equipment?: EquipmentItem[];
  gettingThere?: string; // Text for getting there section
  galleryImages?: string[];
  exploreItems?: ExploreItem[]; // Combined array for Surroundings, Cuisine, Activities, Extras
  faqs?: FAQItem[];
  price: number;
  image: string; // Main image
};

// Mock Data (Copied from search page - refactor later)
const mockHouses: House[] = [
  {
    id: 1,
    name: '川西·森林秘境小屋',
    region: '四川·阿坝',
    province: '四川',
    lat: 31.8, lng: 103.5,
    available: 1, adults: 2,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
    dogsAllowed: true, hasSauna: false, isLakeNearby: false, isSecluded: true,
    description: '坐落在川西高原的原始森林边缘，露台外即是壮丽山景，时有野生动物出没。体验远离尘嚣的宁静。',
    longDescription: '这间小屋专为寻求深度自然沉浸和绝对隐私的旅客设计。采用可持续材料建造，配备地暖和全景窗户，让您在舒适中欣赏四季变换的山林景色。夜晚，无光污染的环境是观星的绝佳场所。',
    scenery: ['森林', '高山', '僻静'],
    activities: ['徒步', '观星', '放松', '野生动物观察'],
    features: [
      { icon: TreePine, text: '全景森林视野' },
      { icon: Wifi, text: '高速无线网络' },
      { icon: Heater, text: '舒适地暖系统' },
      { icon: PawPrint, text: '允许携带宠物入住' },
      { icon: Wind, text: '新风与空气净化' },
      { icon: Star, text: '冒险等级', level: 2 }
    ],
    keyInfo: [
      { icon: Clock, text: '入住: 下午 3:00' },
      { icon: Clock, text: '退房: 上午 11:00' },
      { icon: Users, text: '最多 2 位成人' },
      { icon: PawPrint, text: '允许携带宠物' },
      { icon: Sun, text: '僻静之所' },
      { icon: Star, text: '冒险等级 2' }
    ],
    travelTimes: [ { city: '成都', time: '约3.5小时车程' } ],
    hostName: "阿明",
    hostDescription: "阿明是土生土长的本地向导，熟悉这里的每一条小径和动植物。他热衷于分享他对这片土地的热爱，并乐于为您的探险提供建议。",
    hostImage: "/placeholder-host.jpg",
    equipment: [
      { icon: BedDouble, text: '舒适大床及床品' }, { icon: ShowerHead, text: '淋浴设施' },
      { icon: CookingPot, text: '基础厨房用具' }, { icon: Utensils, text: '餐具' },
      { icon: Snowflake, text: '冰箱' }, { icon: Wifi, text: '无线网络' },
      { icon: Heater, text: '地暖' }, { icon: Layers, text: '毛巾与浴巾' },
      { icon: Sofa, text: '舒适沙发' }, { icon: BookOpen, text: '精选读物' },
      { icon: Wind, text: '新风系统' }, { icon: ParkingSquare, text: '免费停车位' }
    ],
    gettingThere: "建议自驾前往。从成都出发，沿G4217高速行驶至汶川，后转S303省道，根据导航指引即可抵达。冬季部分路段可能需要防滑链。",
    galleryImages: ['/placeholder-forest-1.jpg', '/placeholder-interior-1.jpg', '/placeholder-view-1.jpg'],
    exploreItems: [
      { category: '环境', title: "原始森林环抱", description: "小屋被数千公顷的原始森林环绕，空气清新，富含负氧离子。", image: "/placeholder-surrounding-forest.jpg" },
      { category: '环境', title: "高山草甸风光", description: "附近有广阔的高山草甸，季节性开放各种野花，是徒步和摄影的好去处。", image: "/placeholder-surrounding-meadow.jpg" },
      { category: '美食', title: "本地牦牛肉火锅", description: "选用当地牧场的新鲜牦牛肉，搭配特色藏式香料锅底，风味独特。", image: "/placeholder-cuisine-yak.jpg" },
      { category: '美食', title: "酥油茶与糌粑", description: "体验地道的藏式早点或下午茶，感受高原人民的饮食文化。", image: "/placeholder-cuisine-tea.jpg" },
      { category: '活动', title: "森林徒步探险", description: "跟随向导深入森林，探寻稀有植物和动物踪迹。", image: "/placeholder-activity-hiking.jpg" },
      { category: '活动', title: "星空摄影", description: "远离光污染的绝佳地点，指导您拍摄震撼的星空照片。", image: "/placeholder-activity-stars.jpg" },
      { category: '活动', title: "野生菌采摘 (季节性)", description: "在雨季，体验采摘新鲜野生菌的乐趣（需向导陪同）。", image: "/placeholder-activity-mushroom.jpg" },
      { category: '额外服务', title: "本地牦牛肉烧烤套餐", description: "包含新鲜本地牦牛肉、蔬菜和烧烤工具。", image: "/placeholder-bbq.jpg"},
      { category: '额外服务', title: "向导徒步服务", description: "由房东阿明带领，探索周边绝美路线。", image: "/placeholder-hiking.jpg"}
    ],
    faqs: [
      { question: "小屋适合带小孩入住吗？", answer: "由于地处偏远且更注重宁静体验，我们通常不建议年龄较小的儿童入住。具体情况请与我们联系。" },
      { question: "手机信号和网络怎么样？", answer: "小屋提供稳定的无线网络。手机信号方面，移动和电信覆盖较好，联通可能稍弱。" },
      { question: "包含早餐吗？", answer: "房价不包含早餐，但厨房设施齐全，您可自备食材烹饪。我们也可应要求提供付费的本地特色早餐篮。" }
    ],
    price: 1350, 
    image: '/placeholder-forest-1.jpg',
  },
  {
    id: 2,
    name: '洱海·湖光山色别墅',
    region: '云南·大理',
    province: '云南',
    lat: 25.7, lng: 100.1,
    available: 2, adults: 4,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
    dogsAllowed: false, hasSauna: true, isLakeNearby: true, isSecluded: false,
    description: '直面洱海，全景落地窗将苍山洱海尽收眼底。配备私人桑拿房，享受极致的放松体验。',
    scenery: ['湖畔', '山景'],
    activities: ['环湖骑行', '皮划艇', '桑拿', '品茶'],
    features: [
      { icon: Waves, text: '一线湖景' },
      { icon: Heater, text: '配备桑拿' },
      { icon: Waves, text: '靠近水域' },
      { icon: Star, text: '冒险等级', level: 1 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 3:00' }, { icon: Clock, text: '退房: 上午 11:00' }, { icon: Users, text: '最多 4 位成人' }, { icon: Heater, text: '有桑拿' }],
    travelTimes: [ { city: '大理古城', time: '约30分钟车程' } ],
    price: 1800,
    image: '/placeholder-lake-1.jpg',
    exploreItems: [
       { category: '环境', title: "洱海生态廊道", description: "出门即可漫步或骑行于风景优美的生态廊道。", image: "/placeholder-surrounding-erhai.jpg" },
       { category: '环境', title: "苍山国家地质公园", description: "距离苍山入口不远，可乘坐索道或徒步探索。", image: "/placeholder-surrounding-cangshan.jpg" },
       { category: '美食', title: "白族特色三道茶", description: "体验白族待客的最高礼仪，品味\"头苦、二甜、三回味\"。", image: "/placeholder-cuisine-tea3.jpg" },
       { category: '美食', title: "酸辣鱼与饵块", description: "品尝大理本地特色菜肴，如酸辣鱼、烤饵块等。", image: "/placeholder-cuisine-fish.jpg" },
       { category: '活动', title: "环洱海骑行", description: "提供自行车租赁，轻松享受洱海风光。", image: "/placeholder-activity-cycling.jpg" },
       { category: '活动', title: "皮划艇体验", description: "在平静的湖面上体验皮划艇的乐趣。", image: "/placeholder-activity-kayak.jpg" }
    ],
  },
  {
    id: 3,
    name: '内蒙·草原星空帐篷',
    region: '内蒙古·呼伦贝尔',
    province: '内蒙古',
    lat: 49.2, lng: 119.7,
    available: 3, adults: 2,
    checkInTime: "下午 2:00", checkOutTime: "中午 12:00",
    dogsAllowed: true, hasSauna: false, isLakeNearby: false, isSecluded: false,
    description: '豪华草原帐篷，夜晚可在私人露台上仰望璀璨星河。体验牧民生活，感受草原的辽阔与自由。',
    scenery: ['草原', '星空'],
    activities: ['骑马', '篝火晚会', '体验牧民生活'],
    features: [
      { icon: PawPrint, text: '允许携带宠物' },
      { icon: Tent, text: '特色帐篷体验' },
      { icon: Star, text: '冒险等级', level: 1 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 2:00' }, { icon: Clock, text: '退房: 中午 12:00' }, { icon: Users, text: '最多 2 位成人' }, { icon: PawPrint, text: '允许携带宠物' }],
    travelTimes: [ { city: '海拉尔', time: '约2小时车程' } ],
    price: 980,
    image: '/placeholder-grassland-1.jpg'
  },
  {
    id: 4,
    name: '长白山·林海雪原木屋',
    region: '吉林·长白山',
    province: '吉林',
    lat: 42.5, lng: 128.0,
    available: 1, adults: 3,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
    dogsAllowed: true, hasSauna: true, isLakeNearby: false, isSecluded: true,
    description: '隐藏在长白山深处的林海雪原中，冬季可体验滑雪乐趣。室内壁炉和桑拿带来温暖舒适。',
    scenery: ['森林', '雪山', '僻静'],
    activities: ['滑雪', '徒步雪林', '壁炉夜话', '桑拿'],
    features: [
       { icon: PawPrint, text: '允许携带宠物' },
       { icon: MountainSnow, text: '邻近雪场' },
       { icon: Heater, text: '配备桑拿' },
       { icon: Sun, text: '僻静之所' },
       { icon: Star, text: '冒险等级', level: 3 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 3:00' }, { icon: Clock, text: '退房: 上午 11:00' }, { icon: Users, text: '最多 3 位成人' }, { icon: PawPrint, text: '允许携带宠物' }, { icon: Heater, text: '有桑拿' }, { icon: Sun, text: '僻静之所' }],
    travelTimes: [ { city: '长白山机场', time: '约1小时车程' } ],
    price: 1600,
    image: '/placeholder-snow-1.jpg'
  },
   {
    id: 5,
    name: '莫干山·竹海幽居',
    region: '浙江·湖州',
    province: '浙江',
    lat: 30.6, lng: 119.8,
    available: 2, adults: 2,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
    dogsAllowed: false, hasSauna: false, isLakeNearby: false, isSecluded: true,
    description: '隐于莫干山竹海深处的设计师小屋，极简风格与自然融为一体。适合寻求宁静和创作灵感的旅客。',
    scenery: ['森林', '竹海', '僻静'],
    activities: ['徒步', '瑜伽冥想', '阅读'],
    features: [
       { icon: TreePine, text: '竹海环绕' },
       { icon: Sun, text: '僻静之所' },
       { icon: Star, text: '冒险等级', level: 1 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 3:00' }, { icon: Clock, text: '退房: 上午 11:00' }, { icon: Users, text: '最多 2 位成人' }, { icon: Sun, text: '僻静之所' }],
    travelTimes: [ { city: '杭州', time: '约1.5小时车程' } ],
    price: 1100,
    image: '/placeholder-bamboo-1.jpg'
  },
   {
    id: 6,
    name: '阳朔·漓江画境',
    region: '广西·桂林',
    province: '广西',
    lat: 24.7, lng: 110.4,
    available: 1, adults: 4,
    checkInTime: "下午 2:30", checkOutTime: "中午 12:00",
    dogsAllowed: true, hasSauna: false, isLakeNearby: true, isSecluded: false,
    description: '坐落于漓江精华段，推窗即是喀斯特山水画卷。可在私人码头乘竹筏游览，或在露台品茗赏景。',
    scenery: ['河畔', '山景', '喀斯特地貌'],
    activities: ['竹筏漂流', '攀岩体验', '乡村骑行'],
    features: [
       { icon: PawPrint, text: '允许携带宠物' },
       { icon: Waves, text: '靠近水域' },
       { icon: Sailboat, text: '私人码头' },
       { icon: Star, text: '冒险等级', level: 2 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 2:30' }, { icon: Clock, text: '退房: 中午 12:00' }, { icon: Users, text: '最多 4 位成人' }, { icon: PawPrint, text: '允许携带宠物' }, { icon: Waves, text: '靠近水域' }],
    travelTimes: [ { city: '阳朔县城', time: '约20分钟车程' } ],
    price: 1500,
    image: '/placeholder-river-1.jpg'
  }
];
// --- End of updated data/types ---

// --- Dynamically import Map Component ---
const MapComponent = dynamic(() => import('@/components/search/map-component'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">地图加载中...</div>
});

// Helper function to render a carousel section
  // Helper function to render a carousel section
  const renderCarouselSection = (title: string, items: ExploreItem[] | undefined) => {
    if (!items || items.length === 0) return null;

    // Determine how many items per view approx. for button logic
    const itemsPerView = 3; // Target 3 items on larger screens

    return (
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-900">{title}</h2>
        <Carousel
          opts={{
            align: "start",
            loop: items.length > itemsPerView, // Loop if more items than visible
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4"> {/* Keep consistent negative margin */}
            {items.map((item, index) => (
              <CarouselItem key={`${item.category}-${item.title}-${index}`} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"> {/* Full width on smallest, 1/2 on small, 1/3 on large+ */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg group h-full"> {/* Use 4/3 aspect ratio */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Adjusted sizes
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div> {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 p-4 md:p-5 text-white w-full"> {/* Slightly smaller padding */}
                    <span className="inline-block bg-[#00CED1] text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-1.5">{item.category}</span> {/* Added category badge back, smaller */}
                    <h3 className="text-base md:text-lg font-bold mb-1 line-clamp-2">{item.title}</h3> {/* Adjusted text size */}
                    <p className="text-xs md:text-sm text-gray-200 line-clamp-2">{item.description}</p> {/* Adjusted line clamp */}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {items.length > itemsPerView && ( // Show arrows if items exceed target per view
             <>
                {/* Use standard shadcn button positioning */}
                <CarouselPrevious className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
                <CarouselNext className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
             </>
          )}
        </Carousel>
      </section>
    );
  }

export default function StayDetailPage() {
  const params = useParams();
  const id = params?.id;
  const house = mockHouses.find(h => h.id.toString() === id);

  const [selectedGuests, setSelectedGuests] = useState<string>('1'); // Initialize with 1, will update in useEffect
  const [date, setDate] = useState<DateRange | undefined>(); 

  // Initialize selectedGuests based on found house capacity using useEffect
  useEffect(() => {
    if (house) {
      setSelectedGuests(house.adults >= 2 ? '2' : house.adults.toString());
    }
  }, [house]);

  if (!house) {
    notFound(); 
  }

  const calculateNights = (from?: Date, to?: Date): number => {
    if (from && to) {
      const diffTime = Math.abs(to.getTime() - from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1; 
    } 
    return 0;
  };

  const numberOfNights = calculateNights(date?.from, date?.to);
  const totalPrice = numberOfNights * house.price;

  return (
    <div className="bg-[#FAF8F5]"> {/* Match reference background color */}
       {/* Header - Can be replaced with the actual Navbar component */}
       <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Replace with actual logo if available */}
             <span className="font-bold text-xl text-[#00CED1]">WEEKEND</span> 
          </Link>
          {/* Reference header has more links - replicate if needed */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/search" className="hover:text-gray-900">预订小屋</Link>
            <Link href="/staying-with-us" className="hover:text-gray-900">入住体验</Link>
            <Link href="/extras" className="hover:text-gray-900">额外服务</Link>
            <Link href="/become-a-host" className="hover:text-gray-900">成为房东</Link>
            <Link href="/shop" className="hover:text-gray-900">商店</Link>
            <Link href="/login" className="hover:text-gray-900">登录</Link>
            <Button variant="outline" size="sm" className="rounded-full">EN</Button>
          </nav>
           {/* Add Mobile Menu Trigger here if needed */}
           <Button variant="ghost" size="icon" className="md:hidden"> <Menu className="h-6 w-6" /> </Button>
        </div>
      </header>

      {/* Main Content Area - Adjusted padding and structure */} 
      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* --- Top Section: Gallery Placeholder + Header Info --- */}
        <section className="mb-12 md:mb-16">
          {/* Image Gallery Placeholder - Use aspect-w-16 aspect-h-9 or similar for consistent ratio */}
           <div className="aspect-video w-full overflow-hidden rounded-lg relative shadow-lg mb-8">
              <Image
                src={house.image} 
                alt={house.name}
                fill
                className="object-cover"
                priority 
              />
              {/* Add gallery controls/thumbnails later */}
           </div>
           {/* Header Content */} 
           <div className="max-w-3xl mx-auto text-center space-y-4">
               {/* Travel times */} 
               <div className="flex flex-wrap gap-2 justify-center">
                  {house.travelTimes.map(tt => (
                    <Badge key={tt.city} variant="outline" className="rounded-full px-3 py-1 text-xs border-gray-300">
                      <Clock className="h-3 w-3 mr-1" /> {tt.time} 来自 {tt.city}
                    </Badge>
                  ))}
                </div>
                {/* Title */} 
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">{house.name}</h1>
                {/* Short Description */} 
                <p className="text-lg text-gray-700 leading-relaxed">
                  {house.description}
                </p>
                 {/* Price & Included Info */} 
                <p className="text-md text-gray-600">每晚 ¥{house.price} 起</p>
                <p className="text-xs text-gray-500">包含: 最终清洁费, 停车费, Wifi, 基础木柴</p>
           </div>
           {/* Key Info Grid - Centered */} 
           <div className="max-w-2xl mx-auto mt-8">
               <Separator className="my-6"/>
               <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  {(house.keyInfo ?? []).map(info => (
                    <div key={info.text} className="flex items-center">
                      <info.icon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" />
                      <span className="text-gray-800">{info.text}</span>
                    </div>
                  ))}
                </div>
                <Separator className="mt-6"/>
            </div>
        </section>

        {/* --- Detailed Description Section (Optional) --- */}
        {house.longDescription && (
            <section className="max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">关于小屋</h2>
                <p className="text-gray-700 leading-relaxed">{house.longDescription}</p>
            </section>
        )}

        {/* --- Equipment Section (Adjusted Layout/Styling slightly) --- */}
        {house.equipment && house.equipment.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">设施详情</h2>
            {/* Reference uses 3 columns - adjust grid-cols */} 
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 text-sm">
              {house.equipment.map(item => (
                <div key={item.text} className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0 text-gray-700" /> 
                  <span className="text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Host Section --- */}
        {house.hostName && (
          <section className="bg-white rounded-lg shadow-md overflow-hidden mb-12 md:mb-16 flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex-shrink-0">
              {house.hostImage && (
                <div className="aspect-square w-full relative">
                   <Image src={house.hostImage} alt={house.hostName} fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="p-6 md:p-8 flex-grow">
               <h2 className="text-xl font-semibold mb-3 text-gray-900">遇见房东 {house.hostName}</h2>
               <p className="text-sm text-gray-600 leading-relaxed">{house.hostDescription}</p>
            </div>
          </section>
        )}

         {/* --- Getting There Section (Adjusted Layout slightly) --- */}
         <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">抵达与位置</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"> {/* Increased gap */}
              <div className="text-sm text-gray-700 space-y-4"> {/* Increased spacing */} 
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">地址区域</h3>
                  <p>{house.region}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">交通方式</h3>
                  <p className="leading-relaxed">{house.gettingThere}</p>
                </div>
              </div>
              <div className="h-72 md:h-80 rounded-lg overflow-hidden shadow-sm">
                 <MapComponent houses={[{ ...house, province: house.region }]} /> 
              </div>
            </div>
         </section>

        {/* --- Explore Surrounding Area (New Big Image Layout) --- */}
        {house.exploreItems && house.exploreItems.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-900">探索周边：活动、美食与环境</h2>
            <div className="space-y-10 md:space-y-16">
              {house.exploreItems.map((item, index) => (
                <div key={`${item.category}-${item.title}-${index}`} className="relative w-full aspect-video md:aspect-[16/7] rounded-lg overflow-hidden shadow-lg group">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 80vw" // Optimize image loading
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div> {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-xl">
                    <span className="inline-block bg-[#00CED1] text-white text-xs font-semibold px-2 py-1 rounded mb-2">{item.category}</span>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-200 line-clamp-3">{item.description}</p>
                  </div>
                   {/* Optional: Add pagination indicator if needed later e.g., (index + 1) / house.exploreItems.length */}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Get Ready Section --- */}
        <section className="text-center border-t border-b py-12 mb-12 md:mb-16 bg-white shadow-sm rounded-lg">
           <h2 className="text-xl font-semibold mb-4 text-gray-900">准备好您的旅程了吗？</h2>
           <ul className="space-y-2 text-sm">
             <li><Link href="/packing-list" className="text-[#00CED1] hover:underline">查看建议打包清单</Link></li>
             <li><Link href="/faq" className="text-[#00CED1] hover:underline">还有疑问？查看常见问题解答</Link></li>
             <li><Link href="/contact" className="text-[#00CED1] hover:underline">需要帮助？联系我们的客服团队</Link></li>
           </ul>
        </section>

         {/* --- FAQs Section --- */}
        {house.faqs && house.faqs.length > 0 && (
           <section className="max-w-3xl mx-auto mb-12 md:mb-16">
             <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">常见问题解答</h2>
              <Accordion type="single" collapsible className="w-full">
                 {house.faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left hover:no-underline text-gray-800 font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                 ))}
               </Accordion>
           </section>
        )}

      </main>

      {/* --- Floating Bottom Booking Bar (Yellow like reference) --- */}
      {/* Ensure enough bottom padding/margin on the main content or footer to avoid overlap */} 
      <div style={{ paddingBottom: '80px' }}> {/* Add padding to body/main content parent to prevent overlap */} 
        <div className="fixed bottom-0 left-0 right-0 w-full z-30 ">
          <div className="bg-[#FFD700] shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.1)] p-3 md:p-4"> {/* Yellow background, top shadow */}
             <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 max-w-3xl"> {/* Centered and max width */}
                {/* Date Picker */} 
                <div className="flex-grow w-full md:w-auto">
                   <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-booking-bar"
                          variant={"ghost"} 
                          className={cn(
                            "w-full justify-start text-left font-medium bg-white hover:bg-gray-50 px-3 py-2 rounded-md border border-gray-300", // Added border
                            !date && "text-gray-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                          {date?.from ? (
                            date.to ? (
                              <span className="text-sm text-gray-900">{format(date.from, "MM/dd/yy")} - {format(date.to, "MM/dd/yy")}</span>
                            ) : (
                              <span className="text-sm text-gray-900">{format(date.from, "MM/dd/yy")}</span>
                            )
                          ) : (
                            <span className="text-sm text-gray-500">入住日期 → 退房日期</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 mb-2" align="center" side="top"> 
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={1} 
                          disabled={(day) => day < new Date(new Date().setHours(0,0,0,0))}
                        />
                      </PopoverContent>
                    </Popover>
                </div>
                
                {/* Vertical Separator - Optional */} 
                {/* <div className="hidden md:block h-6 border-l border-gray-400 mx-2"></div> */}

                 {/* Guest Selector */} 
                 <div className="flex-shrink-0 w-full md:w-auto">
                   <Select value={selectedGuests} onValueChange={setSelectedGuests} defaultValue={house.adults.toString()}>
                     <SelectTrigger className="w-full md:w-auto bg-white hover:bg-gray-50 px-3 py-2 rounded-md text-sm border border-gray-300 font-medium"> 
                       <Users className="mr-2 h-4 w-4 inline-block text-gray-600" />
                       <SelectValue placeholder="人数" />
                     </SelectTrigger>
                     <SelectContent side="top"> 
                       {Array.from({ length: house.adults }, (_, i) => i + 1).map(num => (
                         <SelectItem key={num} value={num.toString()} className="text-sm">{num} 位</SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                </div>
                
                {/* Book Button */} 
                <div className="flex-shrink-0 w-full md:w-auto">
                   <Button 
                     size="lg" 
                     className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white px-8 py-2.5 rounded-md font-semibold" 
                     disabled={!date?.from || !date?.to}
                     onClick={() => alert(`预订 ${house.name} 从 ${date?.from?.toLocaleDateString()} 到 ${date?.to?.toLocaleDateString()} 共 ${numberOfNights} 晚，人数 ${selectedGuests}`)}
                     // Price calculation removed from button text/logic here
                   >
                     立即预订
                   </Button>
                </div>
             </div>
          </div>
        </div>
       </div>

       {/* --- Large Footer Placeholder --- */}
       <footer className="bg-[#EAE8E4] text-gray-700 pt-16 pb-8">
         <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
           {/* Column 1: Logo/Signup */}
           <div className="col-span-2 lg:col-span-1 space-y-4">
             <span className="text-4xl font-bold text-[#00CED1]">WEEKEND</span>
             <p className="text-sm">注册获取更新、特别优惠，下次入住享九折。</p>
             <Button className="bg-transparent border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-full text-xs px-4 py-2">
               订阅 Newsletter →
             </Button>
           </div>
           {/* Column 2: Help & Contact */}
           <div className="text-sm">
             <h4 className="font-semibold mb-3">帮助 & 联系</h4>
             <ul className="space-y-2">
               <li><Link href="/faq" className="hover:underline">常见问题</Link></li>
               <li><Link href="/contact" className="hover:underline">联系我们</Link></li>
               <li><Link href="/packing-list" className="hover:underline">打包清单</Link></li>
               <li><Link href="/waiting-list" className="hover:underline">等待列表</Link></li>
             </ul>
           </div>
           {/* Column 3: Your Stay */}
           <div className="text-sm">
             <h4 className="font-semibold mb-3">您的入住</h4>
             <ul className="space-y-2">
               <li><Link href="/locations" className="hover:underline">所有地点</Link></li>
               <li><Link href="/experiences" className="hover:underline">餐饮与体验</Link></li>
               <li><Link href="/last-minute" className="hover:underline">最后召集</Link></li>
               <li><Link href="/cabins/dogs" className="hover:underline">允许宠物的小屋</Link></li>
               <li><Link href="/cabins/farm" className="hover:underline">农场小屋</Link></li>
                <li><Link href="/cabins/lake" className="hover:underline">湖畔小屋</Link></li>
                <li><Link href="/cabins/forest" className="hover:underline">森林小屋</Link></li>
             </ul>
           </div>
            {/* Column 4: Info */}
           <div className="text-sm">
             <h4 className="font-semibold mb-3">信息</h4>
             <ul className="space-y-2">
               <li><Link href="/newsletter" className="hover:underline">Newsletter</Link></li>
               <li><Link href="/about" className="hover:underline">关于我们</Link></li>
               <li><Link href="/media" className="hover:underline">媒体</Link></li>
               <li><Link href="/partnerships" className="hover:underline">合作伙伴</Link></li>
               <li><Link href="/become-a-host" className="hover:underline">成为房东</Link></li>
                <li><Link href="/sustainability" className="hover:underline">可持续承诺</Link></li>
             </ul>
           </div>
            {/* Column 5: More */}
           <div className="text-sm">
             <h4 className="font-semibold mb-3">更多</h4>
             <ul className="space-y-2">
               <li><Link href="/gift-cards" className="hover:underline">礼品卡</Link></li>
               <li><Link href="/journal" className="hover:underline">日志</Link></li>
               <li><Link href="/careers" className="hover:underline">工作机会</Link></li>
               <li><Link href="/students" className="hover:underline">实习生</Link></li>
             </ul>
           </div>
         </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-400/50 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>© 2025 WEEKEND. 保留所有权利。</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/imprint" className="hover:underline">版本说明</Link>
              <Link href="/privacy" className="hover:underline">隐私政策</Link>
              <Link href="/terms" className="hover:underline">服务条款</Link>
            </div>
          </div>
       </footer>
    </div>
  );
} 