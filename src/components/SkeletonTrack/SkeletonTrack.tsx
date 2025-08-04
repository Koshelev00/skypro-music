import styles from './skeletontrack.module.css';

export default function Skeleton() {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <div
              className={`${styles.skeleton}`}
              style={{ width: 51, height: 51 }}
            />
          </div>
          <div className={styles.track__titleLink}>
            <div
              className={`${styles.skeleton}`}
              style={{ width: 306, height: 19 }}
            />
          </div>
        </div>
        <div className={styles.track__author}>
          <div
            className={`${styles.skeleton}`}
            style={{ width: 251, height: 19 }}
          />
        </div>
        <div className={styles.track__album}>
          <div
            className={`${styles.skeleton}`}
            style={{ width: 256, height: 19 }}
          />
        </div>
      </div>
    </div>
  );
}
