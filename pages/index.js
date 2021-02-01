import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  return (
    <div>
      <div>{props.date}</div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      date: Date.now()
    },
  }
}