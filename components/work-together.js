import Link from 'next/link'
import Mail from './svg/mail'
import Ketchup from './svg/ketchup'
import Instagram from './svg/instagram'

export default function WorkTogether(props) {
  return (
    <section id="work-together" className="section">
        <div className="ruler">
            <h2 className="section-title borax red">LET’S WORK TOGETHER</h2>
            <Link href='/contact' scroll={false}>
                <a className='mix-text red'>
                    <span className='roc-grotesk-wide'>CONTACT</span>
                    <span className='borax italic'>Us</span>
                    <span className='icon mail'>
                        <Mail />
                    </span>
                </a>
            </Link>
            <Link href='/' scroll={false}>
                <a className='ketchup-icon'>
                    <Ketchup />
                </a>
            </Link>
            <Link href='https://www.instagram.com' scroll={false} rel="noopener noreferrer" target="_blank">
                <a className='mix-text red'>
                    <span className='roc-grotesk-wide'>INSTA</span>
                    <span className='borax italic no-m'>Gram</span>
                    <span className='icon instagram'>
                        <Instagram />
                    </span>
                </a>
            </Link>
        </div>
    </section>
  )
}