import Header from './header'
import Footer from './footer'

export default function Content({ children }) {
  const routes = [
    { path: '/', name: 'Home', Element: '' },
    // { path: '/works', name: 'Works', Element: Works },
    { path: '/about', name: 'About', Element: '' },
    { path: '/contact', name: 'Contact', Element: '' },
  ]
  return (
    <>
    <Header routes={routes} />
    <div className="container">
      { children }
    </div>
    <Footer />
    </>
  )
}