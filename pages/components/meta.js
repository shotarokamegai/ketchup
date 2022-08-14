import Head from 'next/head'
import { DefaultSeo, NextSeo } from 'next-seo'
import { useRouter } from "next/router";

export default function Meta(props) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const title = "Ketchup Inc.";
  const description = title;

  return (
      <DefaultSeo
          defaultTitle={title}
          canonical={url}
          description={description}
          twitter={{
            cardType: "summary_large_image",
          }}
          // twitter={{
          //   handle: <アカウントID(@~の値)>,
          //   site: <アカウントID(@~の値)>,
          //   cardType: 'summary',
          // }}
          additionalLinkTags={[
            {
              rel: 'icon',
              href: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`,
            },
            // {
            //   rel: 'preload',
            //   href: '//use.typekit.net/ueg2vna.css',
            //   as: 'font',
            //   type: 'font/woff2',
            //   crossOrigin: 'anonymous'
            // }
          ]}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            site_name: title,
            url: url,
            images: [
             {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`,
              alt: title,
             }],
          }}
        />
    // <Head>
    //   <title>{title}</title>
    //   <meta property="og:url" content={url} />
    //   <meta property="og:type" content="website" />
    //   <meta property="description" content={description} />
    //   <meta property="og:title" content={title} />
    //   <meta property="og:description" content={description} />
    //   <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`} />
    //   <meta name="twitter:card" content="summary_large_image"/>
    //   <link rel="icon" href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
    // </Head>
  )
}