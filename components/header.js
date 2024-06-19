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
              <Logo />
            </a>
          </Link>
        </h1>
        <nav>
          <ul className="flex flex-sp flex-end">
            {props.routes.map(route => (
              <li key={route.path} className={`menu-link futura`} data-pathname={route.path}>
                <Link href={route.path} scroll={false}>
                <span className="flex align-center">
                  <span className="ketchup">
                    <Ketchup />
                  </span>
                  <span className="text">
                    <span className="roc-grotesk-wide">{route.name}</span>
                    <span className="borax">{route.name}</span>
                  </span>
                </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="ketchup-back">
          </div>
        </nav>
        <div className="menu-trigger futura">
          <div className="text-wrapper sp">
            <p>Menu</p>
            <p>Close</p>
          </div>
          <span className="ketchup sp" onClick={handleClick}>
            <Image layout="fill" src="/img/common/ketchup.png" alt="" />
          </span>
        </div>
      </div>
    </header>
  )
}