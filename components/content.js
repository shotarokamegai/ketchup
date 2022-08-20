import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import Footer from './footer'

export default function Content({ children }) {
  const checkLocation = () => {
    const menuLink = document.getElementsByClassName('menu-link');
    for (let i = 0; i < menuLink.length; i++) {
        let thisMenuLink = menuLink[i]
        if (thisMenuLink.getAttribute('data-pathname') === location.pathname) {
            thisMenuLink.classList.add('active');
        } else {
            thisMenuLink.classList.remove('active');
        }
    }
  }
  useEffect(() => {
    checkLocation()
  }, [])
  return (
    <motion.div
      onAnimationStart={() => {
      }}
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}    // アンマウント時
      transition={{
        duration: .5,
      }}
    >
      <div className="container">
        { children }
        <Footer />
      </div>
    </motion.div>
  )
}