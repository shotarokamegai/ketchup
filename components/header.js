import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'
import Link from 'next/link'
import Logo from './svg/logo'

export default function Header(props) {
  const router = useRouter();
  const pathname = router.pathname;
  const [isOpen, setIsOpen] = useState(false)
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

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    setIsOpen(false)
    checkLocation()
  }, [pathname])
  return(
    <header id="header" className={`${isOpen && 'show'} ${pathname === '/' && 'hide'}`}>
      <h1>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-sp flex-end">
          {props.routes.map(route => (
            <li key={route.path} className={`menu-link futura`} data-pathname={route.path}>
              <Link href={route.path}>
                <a className="ketchup">
                  <Image layout="fill" src="/img/common/ketchup.png" alt="" />
                </a>
              </Link>
              <div>
                <span>{route.name}</span>
                <span>{route.name}</span>
              </div>
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
        {/* <div></div>
        <div></div>
        <div></div> */}
        <span className="ketchup sp" onClick={handleClick}>
          <Image layout="fill" src="/img/common/ketchup.png" alt="" />
        </span>
      </div>
    </header>
  )
}