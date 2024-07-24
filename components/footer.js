import Link from 'next/link'
import Arrow from './svg/arrow'
import Ketchup from './svg/ketchup'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const pathname = router.asPath;
  const changeMode = (e) => {
    const elm = e.currentTarget;

    if (!elm.classList.contains('light')) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  useEffect(() => {
    let animation = gsap.timeline();
    gsap.registerPlugin(ScrollTrigger)
    // setTimeout(() => {
      ScrollTrigger.create({
        animation: animation,
        trigger: `#footer`,
        start: `top bottom`,
        end: `bottom bottom+=${document.getElementById('footer').clientHeight*.25}`,
        // start: `top bottom+=${document.getElementById('footer').clientHeight*2}`,
        // end: `bottom bottom`,
        scrub: 1,
        invalidateOnRefresh: true,
        // markers: true
      });
      animation.to(`.footer-inner`, {y: -document.getElementById('footer').clientHeight*.25},0)
      // console.log(9)
    // }, 5000)
  },[])
  return(
    <footer id="footer" className='section'>
      <div className='ruler'>
        <div className='section-line bg-red absolute top'></div>
        <p className='address roc-grotesk medium red'>
        Ketchup Inc.<br/>
        152-0003<br/>
        Dynacity Himonya #416, <br/>
        5-15-6 Himonya Meguro, Tokyo
        </p>
        <div id="switcher" className='flex flex-sp'>
          <div className='switcher light bg-white' onClick={changeMode}>
            <Ketchup color="bg-red fill" />
          </div>
          <div className='switcher dark bg-red' onClick={changeMode}>
            <Ketchup color="bg-white fill" />
          </div>
        </div>
        <p className='copy roc-grotesk medium red'>
        © 2024 Ketchup Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}