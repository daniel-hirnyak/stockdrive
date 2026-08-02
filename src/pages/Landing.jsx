import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Problema from '../sections/Problema'
import ComoFunciona from '../sections/ComoFunciona'
import WebConectada from '../sections/WebConectada'
import Comparativa from '../sections/Comparativa'
import Onboarding from '../sections/Onboarding'
import FAQ from '../sections/FAQ'
import CTAFinal from '../sections/CTAFinal'

export default function Landing() {
  return (
    <main className="font-[Manrope]">
      <Navbar />
      <Hero />
      <Problema />
      <ComoFunciona />
      <WebConectada />
      <Comparativa />
      <Onboarding />
      <FAQ />
      <CTAFinal />
    </main>
  )
}
