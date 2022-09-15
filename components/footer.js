import Link from 'next/link'
import Arrow from './svg/arrow'

export default function Footer() {
  return(
    <footer id="footer">
      <div className="footer-inner">
        <p className="vertical rocextrawideLight white">
            CONTACT
        </p>
        <Link href="/contact">
          <a className="btn flex flex-sp space-between align-center white">
            <span className="text rocextrawideLight">CONTACT US</span>
            <Arrow />
          </a>
        </Link>
        <div className="ruler flex flex-sp space-between">
          <p className="copy futura">©Ketchup Inc.</p>
          <p className="address futura">29-8-3 Sanno Omori, Ota, Tokyo 143-0023</p>
        </div>
      </div>
    </footer>
  )
}