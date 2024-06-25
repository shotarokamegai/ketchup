import Link from 'next/link'
import Mail from './svg/mail'
import Ketchup from './svg/ketchup'
import Instagram from './svg/instagram'

export default function WorkTogether(props) {
  return (
    <section id="work-together" className="section">
        <div className="ruler">
            <h2 className="section-title borax red">LET’S WORK TOGETHER</h2>
            <div className='text-center'>
            <Link href='/contact' scroll={false}>
                <a className='mix-text red'>
                    <div className="mix-text__inner">
                        <span className='roc-grotesk-wide'>CONTACT</span>
                        <span className='borax italic'>Us</span>
                        <span className='icon mail'>
                            <Mail color="bg-red stroke" />
                        </span>
                        <span className='mix-text-line bg-red'></span>
                    </div>
                </a>
            </Link>
            </div>
            <Link href='/' scroll={false}>
                <a className='ketchup-icon'>
                    <Ketchup color="bg-red fill" />
                </a>
            </Link>
            <div className='text-center'>
                <Link href='https://www.instagram.com' scroll={false} rel="noopener noreferrer" target="_blank">
                    <a className='mix-text red'>
                        <div className="mix-text__inner">
                            <span className='roc-grotesk-wide'>INSTA</span>
                            <span className='borax italic no-m'>Gram</span>
                            <span className='icon instagram'>
                                <Instagram color="bg-red stroke" />
                            </span>
                            <span className='mix-text-line bg-red'></span>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    </section>
  )
}