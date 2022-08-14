import Head from 'next/head'
import { useRouter } from "next/router";

export default function Meta(props) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const titleJa = "株式会社Ketchup";
  const titleEn = "Ketchup Inc.";
  const title = props.title !== '' ? `${props.title} | ${titleEn}` : titleEn;
  const description = titleEn;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`} />
      <meta name="twitter:card" content="summary_large_image"/>
      <link rel="icon" href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
    </Head>
  )
}