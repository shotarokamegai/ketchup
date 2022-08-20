import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Script from 'next/script'
// import Meta from "../components/meta";
import { useRouter } from "next/router";
import Header from '../components/header'
import AnimatedPage from '../components/animatedPage';
import '../styles/scss/style.scss'

const routes = [
  { path: '/', name: 'Home', Element: '' },
  // { path: '/works', name: 'Works', Element: Works },
  { path: '/about', name: 'About', Element: '' },
  { path: '/contact', name: 'Contact', Element: '' },
]

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    setMounted(true);
  }, []);

  return(
    <>
      {/* <Script>
        {`(function(d) {
          var config = {
            kitId: 'tqg3wio',
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);`}
      </Script> */}
      <Header routes={routes} />
      <AnimatedPage>
        <Component {...pageProps} /> 
      </AnimatedPage>
    </>
  )
  // return mounted ? 
  //   <>
  //     {/* <Meta /> */}
  //     <Header routes={routes} />
  //     <AnimatedPage>
  //       <Component {...pageProps} /> 
  //     </AnimatedPage>
  //   </>
  //   : <div/>;
}

export default MyApp;
