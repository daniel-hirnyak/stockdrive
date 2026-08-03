import { lazy, Suspense } from 'react'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'

const Problema = lazy(() => import('../sections/Problema'))
const ComoFunciona = lazy(() => import('../sections/ComoFunciona'))
const WebConectada = lazy(() => import('../sections/WebConectada'))
const Comparativa = lazy(() => import('../sections/Comparativa'))
const Onboarding = lazy(() => import('../sections/Onboarding'))
const FAQ = lazy(() => import('../sections/FAQ'))
const CTAFinal = lazy(() => import('../sections/CTAFinal'))

export default function Landing() {
  return (
    <main className="font-[Manrope]">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Problema />
        <ComoFunciona />
        <WebConectada />
        <Comparativa />
        <Onboarding />
        <FAQ />
        <CTAFinal />
      </Suspense>
    </main>
  )
}
