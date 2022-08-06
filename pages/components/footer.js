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
          <p className="address futura">2-2-5 301 Shimouma, Setagaya, Tokyo 154-0002</p>
        </div>
      </div>
    </footer>
)
}