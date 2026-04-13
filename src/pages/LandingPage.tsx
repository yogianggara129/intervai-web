/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Zap,
  BarChart3,
  CheckCircle2,
  Brain,
  Target,
  MessageSquare,
  ShieldCheck,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">IntervAI</span>
        </div>
        <div className="hidden gap-8 text-sm md:flex">
          <a href="#features" className="hover:text-primary">
            Fitur
          </a>
          <a href="#how" className="hover:text-primary">
            Cara Kerja
          </a>
          <a href="#benefits" className="hover:text-primary">
            Manfaat
          </a>
          <a href="#faq" className="hover:text-primary">
            FAQ
          </a>
        </div>
        <Button className="rounded-full" onClick={() => navigate("/chat")}>
          Coba Gratis
        </Button>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <Badge className="mb-4 rounded-full px-4 py-1">
          AI Interview Simulator
        </Badge>

        <h1 className="mb-6 text-5xl leading-tight font-extrabold md:text-7xl">
          Latihan Interview Jadi
          <span className="text-primary"> Lebih Percaya Diri</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
          IntervAI membantu kamu simulasi interview kerja dengan AI realistis,
          lengkap dengan feedback, scoring, dan analisis performa.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="h-12 px-8 text-lg"
            onClick={() => navigate("/chat")}
          >
            Mulai Sekarang
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-lg"
            asChild
          >
            <a href="#features">Pelajari Lebih Lanjut</a>
          </Button>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-6 pb-20 text-center">
        <p className="mb-6 text-sm text-slate-500">
          Dipercaya oleh kandidat dari berbagai perusahaan
        </p>
        <div className="flex flex-wrap justify-center gap-8 font-semibold text-slate-400">
          <span>Startup</span>
          <span>Fintech</span>
          <span>Tech Company</span>
          <span>Consulting</span>
          <span>Enterprise</span>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-linear-to-b from-white to-slate-100 px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Interview Itu Sulit & Menegangkan
          </h2>
          <p className="mb-12 text-slate-600">
            Banyak kandidat gagal bukan karena tidak kompeten, tapi karena tidak
            siap menghadapi interview.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <ProblemCard text="Tidak tahu pertanyaan apa yang akan keluar" />
            <ProblemCard text="Gugup saat menjawab di depan interviewer" />
            <ProblemCard text="Tidak pernah dapat feedback setelah interview" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Fitur Powerful IntervAI</h2>
            <p className="text-slate-600">
              Dirancang untuk bantu kamu lolos interview
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Brain />}
              title="AI Adaptif"
              description="Pertanyaan menyesuaikan posisi & pengalaman kamu."
            />
            <FeatureCard
              icon={<BarChart3 />}
              title="Analisis Performa"
              description="Dapatkan skor dan insight dari setiap jawaban."
            />
            <FeatureCard
              icon={<Zap />}
              title="Latihan Cepat"
              description="Simulasi singkat sebelum interview asli."
            />
            <FeatureCard
              icon={<MessageSquare />}
              title="Chat Real-time"
              description="Seperti interview sungguhan dengan HR."
            />
            <FeatureCard
              icon={<Target />}
              title="Targeted Practice"
              description="Fokus ke role spesifik: dev, PM, data, dll."
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="Private & Aman"
              description="Data kamu tidak disimpan sembarangan."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold">
            Cara Kerja IntervAI
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            <Step
              number="01"
              title="Pilih Role"
              desc="Tentukan posisi yang ingin kamu latih."
            />
            <Step
              number="02"
              title="Mulai Interview"
              desc="AI akan mulai sesi interview secara interaktif."
            />
            <Step
              number="03"
              title="Dapatkan Feedback"
              desc="Lihat analisis dan tingkatkan performamu."
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Kenapa Harus IntervAI?</h2>
            <ul className="space-y-4">
              <Benefit text="Latihan tanpa batas kapan saja" />
              <Benefit text="Feedback instan & objektif" />
              <Benefit text="Meningkatkan confidence" />
              <Benefit text="Simulasi realistis seperti HR asli" />
            </ul>
          </div>

          <Card className="p-6">
            <h3 className="mb-4 text-xl font-bold">
              10.000+ Kandidat Terbantu
            </h3>
            <p className="text-slate-600">
              Banyak pengguna berhasil meningkatkan peluang diterima kerja
              setelah latihan rutin dengan IntervAI.
            </p>
          </Card>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-12 text-3xl font-bold">Apa Kata Mereka?</h2>

          <div className="grid items-stretch gap-6 md:grid-cols-3">
            <Testimonial name="Andi" text="Lebih pede pas interview!" />
            <Testimonial name="Sinta" text="Feedback-nya detail banget." />
            <Testimonial name="Rizky" text="Bener-bener kayak HR asli." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-6 py-24 text-center text-white">
        <h2 className="mb-6 text-4xl font-bold">Siap Lolos Interview?</h2>
        <p className="mb-10 text-white/80">
          Mulai latihan sekarang dan tingkatkan peluangmu.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="h-14 px-10 text-lg"
          onClick={() => navigate("/chat")}
        >
          Mulai Gratis Sekarang
        </Button>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">FAQ</h2>

          <div className="space-y-6">
            <FAQ
              q="Apakah gratis?"
              a="Ya, tersedia versi gratis dengan fitur dasar."
            />
            <FAQ
              q="Apakah bisa untuk semua role?"
              a="Bisa, mulai dari tech hingga non-tech."
            />
            <FAQ
              q="Apakah datanya aman?"
              a="Kami menjaga privasi pengguna dengan ketat."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 py-12 text-center text-sm text-slate-500">
        © 2026 IntervAI — Built for future professionals. Powered by YogiCodes
      </footer>
    </div>
  )
}

/* COMPONENTS */

function FeatureCard({ icon, title, description }: any) {
  return (
    <Card className="bg-white transition hover:shadow-md">
      <CardHeader>
        <div className="mb-3">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-600">{description}</CardContent>
    </Card>
  )
}

function ProblemCard({ text }: any) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-linear-to-br from-white to-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-500">
          !
        </div>
        <p className="leading-relaxed text-slate-700">{text}</p>
      </div>
    </div>
  )
}

function Step({ number, title, desc }: any) {
  return (
    <div>
      <p className="mb-2 font-bold text-primary">{number}</p>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  )
}

function Benefit({ text }: any) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="text-primary" />
      <span>{text}</span>
    </div>
  )
}

function Testimonial({ name, text }: any) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary to-indigo-500" />

      <div className="flex flex-col gap-4">
        {/* Stars */}
        <div className="flex gap-1 text-yellow-400">★★★★★</div>

        {/* Quote */}
        <p className="leading-relaxed text-slate-600 italic">"{text}"</p>

        {/* User */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-indigo-500 font-bold text-white">
            {name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-slate-400">Candidate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FAQ({ q, a }: any) {
  return (
    <div>
      <h4 className="mb-1 font-semibold">{q}</h4>
      <p className="text-slate-600">{a}</p>
    </div>
  )
}
