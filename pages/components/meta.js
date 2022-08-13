import Head from 'next/head'

export default function Meta(props) {
  const titleJa = "株式会社Ketchup";
  const titleEn = "Ketchup Inc.";
  const title = props.title ? `${props.title} | ${titleEn}` : titleEn;
  const description = titleEn;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`} />
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
  )
}

// export const getStaticPaths = async () => {
// }