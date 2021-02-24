import Head from 'next/head';

import { ExperienceBar } from '../components/ExperienceBar';

function Home() {
  return (
    <div className="container">
      <ExperienceBar />

      <section>
        <article></article>
        <article></article>
      </section>
    </div>
  )
}

export default Home;
