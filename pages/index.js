import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts`, fetcher)
  //エラー
  if (error) return <div>failed to load</div>
  //ロード中
  if (!data) return <div>loading...</div>
  //成功
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
