"use client"

import React, { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StickyHeaderProps {
  onSearch: (city: string) => void
  onGeolocate: () => void
}

export default function StickyHeader({ onSearch, onGeolocate }: StickyHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = searchValue.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <header className="sticky top-0 bg-transparent z-20 p-4">
      <div className="max-w-4xl mx-auto flex items-center space-x-4">
        <form onSubmit={handleSubmit} className="flex flex-1">
          <Input
            id="citySearch"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Şehir ara..."
            className="flex-1 bg-white/30 placeholder-white/70 text-white focus:bg-white/50"
          />
          <Button
            id="btnSearch"
            type="submit"
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Ara</span>
          </Button>
        </form>
        <Button
          id="btnGeo"
          variant="ghost"
          size="icon"
          onClick={onGeolocate}
          className="text-white hover:bg-white/20"
        >
          <MapPin className="h-5 w-5" />
          <span className="sr-only">Konumumu bul</span>
        </Button>
      </div>
    </header>