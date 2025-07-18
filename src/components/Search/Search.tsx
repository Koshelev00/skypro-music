'use client'
import { useState, ChangeEvent } from 'react';
import styles from './search.module.css';


export default function Search() {
    const [searchInput, setSearchInput] = useState('')
    const onSearchInput = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}