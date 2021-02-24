import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar />

      <section>
        <article>
          <Profile />
        </article>
        <article></article>
      </section>
    </div>
  )
}

export default Home;
