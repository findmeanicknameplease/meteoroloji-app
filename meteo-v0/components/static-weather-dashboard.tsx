import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudLightning,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Activity,
  Sunrise,
  Sunset,
  Search,
  MapPin,
} from "lucide-react"

export default function StaticWeatherDashboard() {
  // Static data
  const city = "Istanbul"
  const date = "Cuma, 26 Nisan"
  const time = "14:30"
  const temp = 21
  const feelsLike = 19
  const description = "Parçalı Bulutlu"
  const icon = "02d"

  const weatherData = {
    uv_index: 4,
    wind_speed: 5.2,
    wind_direction: "Kuzey-Batı",
    humidity: 65,
    visibility: 10,
    pressure: 1015,
    aqi: 2,
    sunrise: "06:32",
    sunset: "19:45",
  }

  const forecast = [
    { day: "Pzt", date: "24 Nis", temp_max: 22, temp_min: 14, icon: "01d" },
    { day: "Sal", date: "25 Nis", temp_max: 23, temp_min: 15, icon: "02d" },
    { day: "Çar", date: "26 Nis", temp_max: 21, temp_min: 14, icon: "03d" },
    { day: "Per", date: "27 Nis", temp_max: 20, temp_min: 13, icon: "10d" },
    { day: "Cum", date: "28 Nis", temp_max: 19, temp_min: 12, icon: "10d" },
    { day: "Cmt", date: "29 Nis", temp_max: 21, temp_min: 13, icon: "02d" },
    { day: "Paz", date: "30 Nis", temp_max: 22, temp_min: 14, icon: "01d" },
  ]

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode.substring(0, 2)) {
      case "01":
        return <Sun className="h-24 w-24 text-yellow-300" />
      case "02":
      case "03":
      case "04":
        return <Cloud className="h-24 w-24 text-white" />
      case "09":
      case "10":
        return <CloudRain className="h-24 w-24 text-white" />
      case "11":
        return <CloudLightning className="h-24 w-24 text-white" />
      case "13":
        return <CloudSnow className="h-24 w-24 text-white" />
      default:
        return <Cloud className="h-24 w-24 text-white" />
    }
  }

  const getForecastIcon = (iconCode: string) => {
    switch (iconCode.substring(0, 2)) {
      case "01":
        return <Sun className="h-10 w-10 text-yellow-300" />
      case "02":
      case "03":
      case "04":
        return <Cloud className="h-10 w-10 text-white" />
      case "09":
      case "10":
        return <CloudRain className="h-10 w-10 text-white" />
      case "11":
        return <CloudLightning className="h-10 w-10 text-white" />
      case "13":
        return <CloudSnow className="h-10 w-10 text-white" />
      default:
        return <Cloud className="h-10 w-10 text-white" />
    }
  }

  const getUVDescription = (value: number) => {
    if (value <= 2) return "Düşük"
    if (value <= 5) return "Orta"
    if (value <= 7) return "Yüksek"
    if (value <= 10) return "Çok Yüksek"
    return "Aşırı"
  }

  const getAQIDescription = (value: number) => {
    if (value === 1) return "İyi"
    if (value === 2) return "Orta"
    if (value === 3) return "Hassas Gruplar İçin Sağlıksız"
    if (value === 4) return "Sağlıksız"
    if (value === 5) return "Çok Sağlıksız"
    return "Tehlikeli"
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2069&auto=format&fit=crop')",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 py-4">
          <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 flex items-center justify-between px-4 py-2 rounded-xl">
            <h1 className="text-xl md:text-2xl font-bold text-white font-montserrat">meteoroloji.com</h1>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Şehir ara..."
                  className="w-full bg-white/20 border border-white/30 rounded-md py-2 px-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="absolute right-0 top-0 h-full px-3 bg-transparent hover:bg-white/20 rounded-r-md">
                  <Search className="h-4 w-4 text-white" />
                  <span className="sr-only">Ara</span>
                </button>
              </div>
            </div>

            <button className="text-white hover:bg-white/20 p-2 rounded-full">
              <MapPin className="h-5 w-5" />
              <span className="sr-only">Konumumu bul</span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-6 py-6">
          {/* Current Weather Card */}
          <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-6 md:p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat">{city}</h2>
                <p className="text-white/80 mt-1">{date}</p>
                <p className="text-white/80">{time}</p>
              </div>

              <div className="mt-6 md:mt-0 flex items-center">
                {getWeatherIcon(icon)}
                <div className="ml-4">
                  <div className="text-5xl md:text-7xl font-bold text-white font-montserrat">{temp}°</div>
                  <p className="text-white/80 mt-1">{description}</p>
                  <p className="text-white/80 text-sm">Hissedilen: {feelsLike}°</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* UV Index */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Sun className="h-8 w-8 text-yellow-300 mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.uv_index}</div>
              <p className="text-white/80 text-sm">{getUVDescription(weatherData.uv_index)}</p>
              <p className="text-white/60 text-xs mt-1">UV İndeksi</p>
            </div>

            {/* Wind */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Wind className="h-8 w-8 text-white mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.wind_speed}m/s</div>
              <p className="text-white/80 text-sm">{weatherData.wind_direction}</p>
              <p className="text-white/60 text-xs mt-1">Rüzgar</p>
            </div>

            {/* Humidity */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Droplets className="h-8 w-8 text-blue-300 mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.humidity}%</div>
              <p className="text-white/80 text-sm">
                {weatherData.humidity < 30 ? "Düşük" : weatherData.humidity > 70 ? "Yüksek" : "Normal"}
              </p>
              <p className="text-white/60 text-xs mt-1">Nem</p>
            </div>

            {/* Visibility */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Eye className="h-8 w-8 text-white mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.visibility} km</div>
              <p className="text-white/80 text-sm">
                {weatherData.visibility >= 10 ? "Mükemmel" : weatherData.visibility >= 5 ? "İyi" : "Kısıtlı"}
              </p>
              <p className="text-white/60 text-xs mt-1">Görüş Mesafesi</p>
            </div>

            {/* Pressure */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Gauge className="h-8 w-8 text-white mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.pressure} hPa</div>
              <p className="text-white/80 text-sm">
                {weatherData.pressure > 1013 ? "Yüksek" : weatherData.pressure < 1013 ? "Düşük" : "Normal"}
              </p>
              <p className="text-white/60 text-xs mt-1">Basınç</p>
            </div>

            {/* AQI */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Activity className="h-8 w-8 text-green-300 mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.aqi}</div>
              <p className="text-white/80 text-sm">{getAQIDescription(weatherData.aqi)}</p>
              <p className="text-white/60 text-xs mt-1">Hava Kalitesi</p>
            </div>

            {/* Sunrise */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Sunrise className="h-8 w-8 text-yellow-300 mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.sunrise}</div>
              <p className="text-white/80 text-sm">Gün Doğumu</p>
              <p className="text-white/60 text-xs mt-1">&nbsp;</p>
            </div>

            {/* Sunset */}
            <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-xl flex flex-col items-center justify-center">
              <Sunset className="h-8 w-8 text-orange-300 mb-2" />
              <div className="text-2xl font-bold text-white">{weatherData.sunset}</div>
              <p className="text-white/80 text-sm">Gün Batımı</p>
              <p className="text-white/60 text-xs mt-1">&nbsp;</p>
            </div>
          </div>

          {/* Forecast Scroller */}
          <div className="backdrop-blur-2xl backdrop-saturate-[180%] bg-white/15 border border-white/30 p-4 rounded-2xl">
            <div className="flex space-x-2 mb-4">
              <button className="bg-[#047481] hover:bg-[#047481]/90 rounded-full px-4 py-2 text-white">2 Gün</button>
              <button className="rounded-full px-4 py-2 text-white hover:bg-white/20">10 Gün</button>
              <button className="rounded-full px-4 py-2 text-white hover:bg-white/20">30 Gün</button>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-4 min-w-max">
                {forecast.map((day, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-md backdrop-saturate-[180%] bg-white/10 border border-white/20 p-4 rounded-xl flex flex-col items-center min-w-[100px]"
                  >
                    <p className="text-white font-medium">{day.day}</p>
                    <p className="text-white/70 text-xs mb-2">{day.date}</p>
                    {getForecastIcon(day.icon)}
                    <div className="mt-2 flex justify-between w-full">
                      <span className="text-white font-medium">{day.temp_min}°</span>
                      <span className="text-white font-medium">{day.temp_max}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-20 bg-[#047481] hover:bg-[#047481]/90 flex items-center justify-center">
          <span className="sr-only">Hava Asistanı</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
