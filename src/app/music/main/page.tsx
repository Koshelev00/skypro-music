'use client';

import Centerblock from '@/components/CenterBlock/CenterBlock';
import { useAppSelector } from '@/store/store';
export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );
  return (
    <>
      <Centerblock
        data={allTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        title={'Треки'}
      />
    </>
  );
}
