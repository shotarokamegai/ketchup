import React, { useEffect, useState } from "react";
import '../styles/scss/style.scss'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <Component {...pageProps} /> : <div/>;
}

export default MyApp;
