import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { SearchResults } from "../components/SearchResults";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!filter.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${filter}`);
    const data = await response.json();

    setResults(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Search</h1>

        <form className={styles.description} onSubmit={handleSearch}>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>

        <SearchResults results={results} />
      </main>
    </div>
  );
};

export default Home;
