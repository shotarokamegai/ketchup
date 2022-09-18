import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, useIsPresent } from 'framer-motion'
import Footer from './footer'

export default function Content({ children }) {
  const router = useRouter();
  const isPresent = useIsPresent();
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
  const waveAnimation = {
    key: "wave",
    initial: {
      y: '-100%'
    },
    animate: {
      y: '100%',
    },
    exit: {
      y: '-100%',
    },
    transition: {
        duration: 1,
        ease: [0.65, 0, 0.35, 1]
    },
}
  const boxAnimation = {
    key: "box",
    initial: {
        y: 0,
    },
    animate: {
        opacity: 1,
        transition: {
          delay: 1
        },
    },
    exit: {
        opacity: 1,
        transition: {
          delay: 1
        },
    },
    transition: {
        duration: 0.2,
        ease: "easeOut"
    },
}
  useEffect(() => {
    checkLocation()
  }, [])
  return (
<>
    <motion.div
      key={router.asPath}
     {...waveAnimation}
      className="privacy-screen"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#c8102e" fillOpacity="1" d="M0,0L8.9,16C17.8,32,36,64,53,112C71.1,160,89,224,107,245.3C124.4,267,142,245,160,202.7C177.8,160,196,96,213,74.7C231.1,53,249,75,267,122.7C284.4,171,302,245,320,240C337.8,235,356,149,373,101.3C391.1,53,409,43,427,74.7C444.4,107,462,181,480,208C497.8,235,516,213,533,208C551.1,203,569,213,587,208C604.4,203,622,181,640,176C657.8,171,676,181,693,197.3C711.1,213,729,235,747,218.7C764.4,203,782,149,800,112C817.8,75,836,53,853,42.7C871.1,32,889,32,907,42.7C924.4,53,942,75,960,106.7C977.8,139,996,181,1013,213.3C1031.1,245,1049,267,1067,277.3C1084.4,288,1102,288,1120,250.7C1137.8,213,1156,139,1173,101.3C1191.1,64,1209,64,1227,74.7C1244.4,85,1262,107,1280,128C1297.8,149,1316,171,1333,176C1351.1,181,1369,171,1387,154.7C1404.4,139,1422,117,1431,106.7L1440,96L1440,320L1431.1,320C1422.2,320,1404,320,1387,320C1368.9,320,1351,320,1333,320C1315.6,320,1298,320,1280,320C1262.2,320,1244,320,1227,320C1208.9,320,1191,320,1173,320C1155.6,320,1138,320,1120,320C1102.2,320,1084,320,1067,320C1048.9,320,1031,320,1013,320C995.6,320,978,320,960,320C942.2,320,924,320,907,320C888.9,320,871,320,853,320C835.6,320,818,320,800,320C782.2,320,764,320,747,320C728.9,320,711,320,693,320C675.6,320,658,320,640,320C622.2,320,604,320,587,320C568.9,320,551,320,533,320C515.6,320,498,320,480,320C462.2,320,444,320,427,320C408.9,320,391,320,373,320C355.6,320,338,320,320,320C302.2,320,284,320,267,320C248.9,320,231,320,213,320C195.6,320,178,320,160,320C142.2,320,124,320,107,320C88.9,320,71,320,53,320C35.6,320,18,320,9,320L0,320Z"></path>
        </svg>
    </motion.div>
    <motion.div
      key={router.asPath}
     {...boxAnimation}
    >
      <div className="container">
        { children }
        <Footer />
      </div>
    </motion.div>
  </>
  )
}