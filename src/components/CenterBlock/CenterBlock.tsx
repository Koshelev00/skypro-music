import styles from './ceneterBlock.module.css';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import Tracks from '../Tracks/Tracks';
import TrackItem from '../TrackItem/TrackItem';
export default function CenterBlock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <TrackItem />
        <Tracks />
      </div>
    </div>
  );
}
