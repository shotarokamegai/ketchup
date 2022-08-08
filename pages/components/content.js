import { motion } from 'framer-motion'
import Footer from './footer'

export default function Content({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}    // アンマウント時
    >
      <div className="container">
        { children }
        <Footer />
      </div>
    </motion.div>
  )
}