import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Content from '../components/content'

export default function About() {
  return (
    <div className={styles.container}>
      <Content>
        <h1>About</h1>
      </Content>
    </div>
  )
}