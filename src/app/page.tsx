'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import Bar from '../components/Bar/Bar';
import Nav from '../components/Navigation/Navigation';
import CenterBlock from '../components/CenterBlock/CenterBlock';
import SideBar from '../components/SideBar/SideBar';
import { useAppSelector } from '@/store/store';


export default function Home() {
   const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
      (state) => state.tracks,
    );
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <CenterBlock data={allTracks} isLoading={fetchIsLoading} errorRes={fetchError} title={'Треки'} />
          <SideBar />
          <Bar />
        </main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
}
