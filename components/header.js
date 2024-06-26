import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'
import Link from 'next/link'
import Logo from './svg/logo'
import Ketchup from './svg/ketchup'

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
          <ul className="flex flex-end">
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
                </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="ketchup-back">
          </div>
        </nav>
        <div className="sp">
          <div className="menu-trigger" onClick={handleClick}>
            <div className="text-wrapper">
              <p className="roc-grotesk-wide white">Menu</p>
              <p className="borax white">Close</p>
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