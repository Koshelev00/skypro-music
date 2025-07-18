
'use client';
import { useState,useEffect, useRef } from 'react';
import styles from './ceneterBlock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Track from '../Track/Track';
import FilterItem from '../FilterItem/FilterItem';
import FilterModal from '../Filter/Filter';
import { data } from '../../data';
import { TrackType } from '../../app/sharedTypes/sharedTypes';
import { getUniqueValueByKey } from '@/utils/helper';

export default function Centerblock() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement | null>(null);
   const [values, setValues] = useState<string[]>([]);
 
  const updatePosition = () => {
  if (buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    const zoomLevel = window.visualViewport?.scale || 1;
    
    setPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX - 38,
    });
  }
};

   const handleFilterClick = (label: string, ref: HTMLDivElement | null) => {
    if (activeFilter === label) {
      setActiveFilter(null);
      return;
    }
    if (ref) buttonRef.current = ref;
    updatePosition();
     if (label === 'исполнителю') {
      setValues(getUniqueValueByKey(data, 'author'));
    } else if (label === 'жанру') {
      setValues(getUniqueValueByKey(data, 'genre'));
    } else if (label === 'году выпуска') {
      setValues(['По умолчанию', 'Сначала новые', 'Сначала старые']);
    }
    setActiveFilter(label);
  };
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setActiveFilter(null);
  }
  
   useEffect(() => {
  if (!activeFilter) return;

  const onScrollOrResizeOrZoom = () => {
    updatePosition();
  };

  window.addEventListener('scroll', onScrollOrResizeOrZoom);
  window.addEventListener('resize', onScrollOrResizeOrZoom);
  
  // Добавляем обработчик изменения масштаба
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onScrollOrResizeOrZoom);
  }

  return () => {
    window.removeEventListener('scroll', onScrollOrResizeOrZoom);
    window.removeEventListener('resize', onScrollOrResizeOrZoom);
    
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', onScrollOrResizeOrZoom);
    }
  };
}, [activeFilter]);

  
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <FilterItem
          label="исполнителю"
          isActive={activeFilter === 'исполнителю'}
          count={activeFilter === 'исполнителю' ? values.length : undefined}
          onClick={handleFilterClick}
        />
        <FilterItem
          label="году выпуска"
          isActive={activeFilter === 'году выпуска'}
          onClick={handleFilterClick}
        />
        <FilterItem
          label="жанру"
          isActive={activeFilter === 'жанру'}
          onClick={handleFilterClick}
          count={activeFilter === 'жанру' ? values.length : undefined}
        />
      </div>

    
      {activeFilter && (
        <FilterModal
          values={values}
          selectedValue={selectedValue}
          onSelect={handleSelect}
          onClose={() => setActiveFilter(null)}
          position={position}
        />
      )}

      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((track: TrackType) => (
            <Track key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

