import About from './components/About'
import AIWorkflow from './components/AIWorkflow'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  return (
    <div className="site-root">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AIWorkflow />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
