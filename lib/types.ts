import type React from "react"

export interface Feature {
  icon: React.ElementType
  text: string
  level?: number
}

export interface TravelTime {
  city: string
  time: string
}

export interface ExploreItem {
  title: string
  description: string
  image: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface EquipmentItem {
  icon: React.ElementType
  name: string
}

export interface House {
  id: number
  name: string
  region: string
  lat: number
  lng: number
  available: number
  adults: number
  dogsAllowed: boolean
  hasSauna: boolean
  isLakeNearby: boolean
  isSecluded: boolean
  description: string
  longDescription?: string
  scenery: string[]
  activities: string[]
  features: Feature[]
  travelTimes: TravelTime[]
  price: number
  image: string
  checkInTime?: string
  checkOutTime?: string
  hostName?: string
  hostDescription?: string
  exploreItems?: ExploreItem[]
  faqs?: FAQItem[]
  gettingThere?: string
}
