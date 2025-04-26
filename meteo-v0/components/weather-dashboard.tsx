"use client"

import { useState, useEffect } from "react"
import StickyHeader from "@/components/sticky-header"
import CurrentWeatherCard from "@/components/current-weather-card"
import HighlightsGrid from "@/components/highlights-grid"
import ForecastScroller from "@/components/forecast-scroller"
import HavaAsistaniChat from "@/components/hava-asistani-chat"
import LoadingSpinner from "@/components/loading-spinner"

interface GeocodingResult {
  latitude: number
  longitude: number
  name: string
}

export default function WeatherDashboard() {
  const [city, setCity] = useState<string>("Istanbul")
  const [loading, setLoading] = useState<boolean>(false)
  const [backgroundImage, setBackgroundImage] = useState<string>("")
  const [weather, setWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch weather & forecast whenever city changes
  useEffect(() => {
    if (!city) return
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Geocode city via Open-Meteo
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        )
        const geoJson = await geoRes.json()
        if (!geoJson.results || geoJson.results.length === 0) {
          throw new Error("Geocoding failed")
        }
        const { latitude, longitude, name } = geoJson.results[0] as GeocodingResult

        // Fetch current weather & daily forecast
        const meteRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FIstanbul`
        )
        const meteJson = await meteRes.json()

        // Unsplash city photo
        try {
          const resImg = await fetch(
            `https://api.unsplash.com/photos/random?query=${name}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
          )
          const imgJson = await resImg.json()
          setBackgroundImage(imgJson.urls.full)
        } catch {
          setBackgroundImage("/placeholder.jpg")
        }

        // Map Open-Meteo data
        const current = meteJson.current_weather
        setWeather({
          name,
          temp: current.temperature,
          weathercode: current.weathercode,
          wind: current.windspeed,
        })

        // Build forecast array
        const { daily } = meteJson
        const days = daily.time.map((date: string, idx: number) => ({
          date,
          max: daily.temperature_2m_max[idx],
          min: daily.temperature_2m_min[idx],
          weathercode: daily.weathercode[idx],
        }))
        setForecast(days)
      } catch {
        setError("Veri yüklenirken hata oluştu veya şehir bulunamadı.")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [city])

  // Handle search from header
  const handleSearch = (q: string) => setCity(q)

  // Handle geolocation
  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError("Tarayıcınız konum servisini desteklemiyor.")
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          // Reverse geocode to city name
          const reverseRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${coords.latitude}&longitude=${coords.longitude}&count=1`
          )
          const reverseJson = await reverseRes.json()
          if (reverseJson.results && reverseJson.results.length > 0) {
            setCity(reverseJson.results[0].name)
          }
        } catch {
          setError("Konum bulunamadı.")
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError("Konum izni reddedildi.")
        setLoading(false)
      }
    )
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {loading && <LoadingSpinner />}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10">
        <StickyHeader onSearch={handleSearch} onGeolocate={handleGeolocate} />

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {error && <div className="text-red-400">{error}</div>}
          {weather && <CurrentWeatherCard weather={weather} />}
          {weather && <HighlightsGrid {...weather} />}
          {forecast && <ForecastScroller id="forecast7" forecast={forecast} />}
        </div>

        <HavaAsistaniChat />
      </div>
    </div>