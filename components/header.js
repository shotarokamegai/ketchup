import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import Logo from './svg/logo'
import Ketchup from './svg/ketchup'
import Instagram from './svg/instagram'

export default function Header(props) {
  const router = useRouter();
  const ref = useRef();
  const pathname = router.pathname;
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  const splitText = (els, className) => {//--①
    const els_ = els.split('');
    let result = "";
    for (let j = 0; j < els.length; j++) { // --④
      let c = els[j].replace(" ", "&nbsp;");// --⑤
      result += `<span class="${className}">${c}</span>`;// --⑥
    }
    return result;
  }
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false)
    }, 1500)
    if (pathname === '/') {
      ref.current.classList.add('reset')
      ref.current.classList.remove('hide')
      setTimeout(() => {
        ref.current.classList.remove('reset')
      }, 500)
    }
  }, [])
  
  return(
    <header id="header" className={`${isOpen ? 'show': ''}`} ref={ref}>
      <div className="inner">
        <h1>
          <Link href="/" scroll={false}>
            <a>
              <Logo color="bg-red fill" />
            </a>
          </Link>
        </h1>
        <nav>
          <div className="nav-cover"></div>
          <div>
          <ul className="flex flex-end">
            <span className="section-line bottom bg-white sp absolute"></span>
            {props.routes.map(route => (
              <li key={route.path} className={`menu-link futura`} data-pathname={route.path}>
                <Link href={route.path} scroll={false}>
                  <span className="flex flex-sp align-center">
                    <span className="ketchup">
                      <Ketchup color="bg-red fill" />
                    </span>
                    <span className="text">
                      <span className="text-wrap red roc-grotesk-wide" dangerouslySetInnerHTML={{__html: splitText(route.name, '')}}></span>
                      <span className="text-wrap red borax" dangerouslySetInnerHTML={{__html: splitText(route.name, '')}}></span>
                    </span>
                    <span className="section-line top bg-white sp absolute"></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

            <div className='text-center sp'>
              <Link href='https://www.instagram.com' scroll={false} rel="noopener noreferrer" target="_blank">
                  <a className='mix-text white'>
                      <div className="mix-text__inner">
                          <span className='roc-grotesk-wide'>INSTA</span>
                          <span className='borax italic no-m'>Gram</span>
                          <span className='icon instagram'>
                              <Instagram color="bg-white stroke" />
                          </span>
                          <span className='mix-text-line bg-white'></span>
                      </div>
                  </a>
              </Link>
            </div>
          </div>
        </nav>
        <div className="sp">
          <div className="menu-trigger" onClick={handleClick}>
            <div className="text-wrapper">
              <p className="roc-grotesk-wide white" dangerouslySetInnerHTML={{__html: splitText('Menu', '')}}></p>
              <p className="borax white" dangerouslySetInnerHTML={{__html: splitText('Close', '')}}></p>
            </div>
            <span className="ketchup">
    					<img width="" height="" src="/img/common/tomato.png" alt="" />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}