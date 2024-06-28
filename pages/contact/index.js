import React, { useEffect, useState } from "react";
import Script from 'next/script'
import Head from 'next/head'
import {init,sendForm,send} from 'emailjs-com';
import Arrow from '../../components/svg/arrow'
import styles from '../../styles/Home.module.css'
import { motion } from "framer-motion";
import Content from '../../components/content'
// import adobeLoader from "../../components/adobeLoader";

export default function Contact() {
    const [company, setCompany] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('')
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [tel, setTel] = useState('');
    const [telError, setTelError] = useState('')
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [contentError, setContentError] = useState('')
    const [sent, setSent] = useState(false);

    const arry = ['company', 'email', 'tel', 'content']

    const handleSubmit = () => {
        for (let i = 0; i < arry.length; i++) {
            checkValue(arry[i], document.getElementsByName(arry[i])[0].value);
        }
        if (tel !== '' && name !== '' && email !== '' && content !== '') {
            const user_id = process.env.NEXT_PUBLIC_PORTFOLIO_EMAILJS_USER_ID;
            const service_id = process.env.NEXT_PUBLIC_PORTFOLIO_EMAILJS_SERVICE_ID;
            const template_id = process.env.NEXT_PUBLIC_PORTFOLIO_EMAILJS_TEMPLATE_ID;
            init(user_id );

            const template_param = {
                to_name: 'Ketchup Inc.',
                from_name: name,
                tel: tel,
                email: email,
                message: content
            };
            send(service_id,template_id,template_param).then(() => {
                console.log("success to send email");
            })

            setSent(true);

            window.scrollTo(0, 0);

            // alert('送信')
            axios
            // .post("https://getform.io/f/5e54e38e-f647-4a27-b27a-ea140781df50", {
            //     message: "Hello, World",
            // })
            // .then(response => console.log(response))
            // .catch(error => console.log(error))
        } else {
            window.scrollTo(0, document.getElementsByClassName('error')[0].offsetTop);
        }
    }
    const checkValue = (name, value) => {
        let pattern

        switch(name) {
            case 'name':
                if (!value) {
                  setNameError('入力してください')
                } else {
                  setNameError()
                  setName(value)
                }
                break;
            case 'tel':
                pattern = /^\(?\d{2,5}\)?[-(\.\s]{0,2}\d{1,4}[-)\.\s]{0,2}\d{3,4}$/;
                if (!value) {
                  setTelError('入力してください')
                } else if (!pattern.test(value)) {
                  setTelError('電話番号をご確認ください')
                } else {
                  setTelError()
                  setTel(value)
                }
                break;
            case 'email':
                pattern = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ui;
                if (!value) {
                  setEmailError('入力してください')
                } else if (!pattern.test(value)) {
                  setEmailError('メールアドレスをご確認ください')
                } else {
                  setEmailError()
                  setEmail(value)
                }
                break;
            case 'content':
                if (!value) {
                  setContentError('入力してください')
                } else {
                  setContentError()
                  setContent(value)
                }
                break;
            default:
                break;
        }
    }
    const handleBlur = (e) => {
        const target = e.target
        const value = target.value
        const name = target.getAttribute('name')

        checkValue(name, value)
    }
    useEffect(() => {
      // adobeLoader(document)
    }, [])
    return (
        <>
    <Head>
        <title>CONTACT | Ketchup Inc.</title>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/contact/`} />
        <meta property="og:type" content="website" />
        <meta property="description" content="Ketchup Inc." />
        <meta property="og:title" content="CONTACT | Ketchup Inc." />
        <meta property="og:description" content="Ketchup Inc." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`} />
        <meta name="twitter:card" content="summary_large_image"/>
<link rel="icon" href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
    </Head>
        <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${parseInt(process.env.NEXT_PUBLIC_GTAG)});
        `}
      </Script>
        <div className={styles.container}>
            <Content>
                <main id="contact" className="common main_">
                    <section id="top">
                        <div className="ruler">
                            <h2 className="section-title red fixed">
                              <span className="borax italic">Contact</span>
                            </h2>
                            {sent &&
                                <div className="thank-you">
                                    <p className="roc red">Thanks for reaching out.<br />
                                    We will get back soon.
                                    </p>
                                </div>
                            }
                          <form
                            action="https://getform.io/f/5e54e38e-f647-4a27-b27a-ea140781df50"
                            method="POST"
                          >
                            <div className="form">
                              <label htmlFor="company" className="red">貴社名</label>
                              <input 
                              className="red"
                              name="company" 
                              type="text" 
                              placeholder="株式会社Ketchup"
                              value={company}
                              onChange={(e) => {
                                setCompany(e.target.value)
                              }}
                              />
                              <div className="section-line bg-red absolute bottom"></div>
                            </div>
                            <div className="form">
                              <label htmlFor="name" className="red">ご担当者名※</label>
                              <input 
                                  className="red"
                                  name="name" 
                                  type="text" 
                                  value={name}
                                  placeholder="姓名"
                                  onChange={(e) => {
                                    setName(e.target.value)
                                  }}
                                  onBlur={handleBlur}
                                  required
                              />
                              {nameError && <p className="error">{nameError}</p>}
                              <div className="section-line bg-red absolute bottom"></div>
                            </div>
                            <div className="form">
                              <label htmlFor="email" className="red">メールアドレス※</label>
                              <input 
                                  className="red"
                                  name="email" 
                                  type="email" 
                                  value={email}
                                  placeholder="XXXX@ketchup.jp"
                                  onChange={(e) => {
                                    setEmail(e.target.value)
                                  }}
                                  onBlur={handleBlur}
                                  required
                              />
                              {emailError && <p className="error">{emailError}</p>}
                              <div className="section-line bg-red absolute bottom"></div>
                            </div>
                            <div className="form">
                              <label htmlFor="tel" className="red">電話番号※</label>
                              <input
                                  className="red"
                                  name="tel"
                                  type="tel"
                                  value={tel}
                                  placeholder="00000000000"
                                  onChange={(e) => {
                                    setTel(e.target.value)
                                  }}
                                  onBlur={handleBlur}
                                  required
                              />
                              {telError && <p className="error">{telError}</p>}
                              <div className="section-line bg-red absolute bottom"></div>
                            </div>
                            <div className="form">
                              <label htmlFor="subject" className="red">件名</label>
                              <input 
                                  className="red"
                                  name="subject" 
                                  type="text" 
                                  placeholder="件名をご記入ください"
                                  value={subject}
                                  onChange={(e) => {
                                    setSubject(e.target.value)
                                  }}
                              />
                              <div className="section-line bg-red absolute bottom"></div>
                            </div>
                            <div className="form">
                              <label htmlFor="content" className="red">お問い合わせ内容※</label>
                              <textarea 
                                  className="red"
                                  name="content" 
                                  type="text" 
                                  rows="10" 
                                  placeholder="ご依頼や採用についてなどお問い合わせ内容をご記入ください"
                                  value={content}
                                  onChange={(e) => {
                                    setContent(e.target.value)
                                  }}
                                  required
                              ></textarea>
                              {contentError && <p className="error">{contentError}</p>}
                              <div className="section-line bg-red absolute bottom"></div>
                            </div>
                          </form>
                          <div className="text-center">
                            <div className="submit mix-text red" onClick={handleSubmit}>
                              <div className="mix-text__inner">
                                <span className="roc-grotesk-wide">SEND</span>
                                <span className="borax italic">Message</span>
                                <span className='icon'>
                                    <Arrow color="bg-red stroke" />
                                </span>
                                <span className='mix-text-line bg-red'></span>
                              </div>
                            </div>
                          </div>
                        </div>
                    </section>
                </main>
            </Content>
        </div>
        </>
    )
}