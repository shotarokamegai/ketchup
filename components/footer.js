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
    <footer id="footer">
      <div className="footer-inner">
        <p className="vertical rocextrawideLight white">
            CONTACT
        </p>
        <Link href="/contact" scroll={false}>
          <a className="btn flex flex-sp space-between align-center white">
            <span className="text rocextrawideLight">CONTACT US</span>
            <Arrow />
          </a>
        </Link>
        <div className="ruler flex flex-sp space-between">
          <p className="copy futura">©Ketchup Inc.</p>
          <p className="address futura">B Miura Terrace House 3-23-20 Nozawa Setagaya, Tokyo 154-0003</p>
        </div>
      </div>
    </footer>
  )
}