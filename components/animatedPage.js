import { AnimatePresence } from 'framer-motion'

export default function AnimatedPage({children}) {
  return(
    <AnimatePresence
      initial={false}
      exitBeforeEnter onExitComplete={() => {
        // window.scrollTo(0, 0)
      }}
    >
      {children}
    </AnimatePresence>
  )
} ;