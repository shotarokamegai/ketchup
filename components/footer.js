import Link from 'next/link'
import Arrow from './svg/arrow'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const pathname = router.asPath;
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
        <p className='copy roc-grotesk medium red'>
        © 2024 Ketchup Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}