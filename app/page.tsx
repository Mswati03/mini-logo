import Link from "next/link"
import { Zap, Palette, Download } from "lucide-react"

import HeroGeometric from "@/components/geometric-background"

export default function LandingPage() {
  return (
    <div className="min-h-screen  bg-[#030303] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <HeroGeometric />
        
      </section>

      {/* Features Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Our Logo Maker?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-400" />}
              title="Lightning Fast"
              description="Create a minimal logo in minutes, not hours."
            />
            <FeatureCard
              icon={<Palette className="h-8 w-8 text-green-400" />}
              title="Customizable"
              description="Tailor every aspect of your logo to match your brand."
            />
            <FeatureCard
              icon={<Download className="h-8 w-8 text-blue-400" />}
              title="Easy Export"
              description="Download your logo in  PNG format for any use."
            />
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 sm:px-6 lg:px-8">
          © 2025 MiniLogo. All rights reserved. Developed by <Link href="htpps://mswati.netlify.app" className="hover:text-blue-400" target="_blank">Mswati Tshabalala</Link>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg bg-gray-800 p-6 text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

