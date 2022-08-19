import { AnimatePresence } from 'framer-motion'

export default function AnimatedPage({children}) {
  return(
    <AnimatePresence
      exitBeforeEnter onExitComplete={() => {
window.scrollTo(0, 0)
      }}
    >
      {children}
    </AnimatePresence>
  )
} ;