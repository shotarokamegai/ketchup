import Head from 'next/head'
import Image from 'next/image'
import Header from './components/header'
import List from './components/list'
import Arrow from './components/svg/arrow'
import useSWR from 'swr'


function fetcher(...urls) {
  const f = url => fetch(url).then(r => r.json())
  return Promise.all(urls.map(f))
}


function getDataFromWp() {
  const { data, error } = useSWR([
    `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed`,
    `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/categories`
  ],
  fetcher,
  )
  return {
    data: data ? data : [],
    isLoading: !data && !error,
    isError: error,
  }
}

function returnClassName (i) {
  let className = '';
  switch(i) {
      case 0:
          className = ''
          break
      case 1:
          className = 'medium'
          break
      case 2:
          className = 'large'
          break
      case 3:
          className = 'mn'
          break
      case 4:
          className = 'medium'
          break
      case 5:
          className = 'medium'
          break
      default:
          className = ''
          break
  }
  return className;
}

export default function Home() {
  const { data, isLoading, isError } = getDataFromWp()
  const routes = [
    { path: '/', name: 'Home', Element: '' },
    // { path: '/works', name: 'Works', Element: Works },
    { path: '/about', name: 'About', Element: '' },
    { path: '/contact', name: 'Contact', Element: '' },
  ]
  let i = 0
  //エラー
  if (isError) return <div>failed to load</div>
  //ロード中
  if (isLoading) return <div>loading...</div>
  //成功
  return(
    <>
    <Header routes={routes} />
    <main id="home" className="main_">
      <section id="top">
          <div className="ruler flex space-between">
              <div>
                  <h1 className="logo">
                      <Image layout="fill" src="/img/common/logo.svg" alt="Ketchup" />
                  </h1>
              </div>
              <div>
                  <h2 className="slogan roc">
                      We know the internet and people in equal measure. 
                  </h2>
              </div>
          </div>
      </section>
      <section className="works-wrapper">
          <p className="vertical rocextrawideLight">
              WORKS
          </p>
          <div className="inner">
              {(data[0].length !== 0 && data[1].length !== 0) ?
              <ul className="flex">
                  {data[0].map((item, index) => {
                      let datum = {
                          thisCategories: ''
                      };
                      datum.index = index;
                      datum.item = item;
                      for (let i = 0; i < item.categories.length; i++) {
                          for (let j = 0; j < data[1].length; j++) {
                              if (item.categories[i] === data[1][j].id && data[1][j].name !== 'Works') {
                                  datum.thisCategories += ` ${data[1][j].name} /` 
                              }
                          }
                      }
                      datum.className = returnClassName(i);
                      if (i === 5) {
                          i = 0;
                      } else {
                          i++;
                      }
                      return(
                        <List key={index} {...datum} />
                      )
                  })}
              </ul>
              :
              <></>
              }
              {/* {maxPage === page && <div className="btn flex flex-sp space-between align-center" onClick={loadWorks}>
                <span className="text rocextrawideLight">LOAD MORE</span>
                <Arrow className="white" />
              </div>} */}
          </div>
      </section>
    </main>
    </>
  )
}
