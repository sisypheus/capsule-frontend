import '@/app.css'
import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PrimaryFeatures } from '@/components/Features';
import { Faqs } from '@/components/Faq';
import { Pricing } from '@/components/Pricing';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}