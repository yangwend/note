import { FC } from 'react';
import { SearchOutline } from 'antd-mobile-icons';
import { Input } from 'antd-mobile';
import { ISearchBarProps } from '@/types';
import styles from './index.module.scss';

const SearchBar: FC<ISearchBarProps> = ({
  onSearch,
  onSet,
  searchInputValue,
  onClear,
  showClear = true,
  placeholder = '请输入',
  maxLength,
  showSearchIcon = true,
  children,
  showSearchText,
  inputRef,

  clientWidth,
  isLandscape,
}) => {
  return (
    <>
      <div className={`${styles.searchWrap}`}>
        <div className={styles.inputWrap}>
          {children}
          {showSearchIcon && <SearchOutline className={styles.searchIcon} onClick={onSearch} />}
          <Input
            placeholder={placeholder}
            className={styles.input}
            onChange={(value: string) => onSet(value)}
            value={searchInputValue}
            maxLength={maxLength}
            onEnterPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              onSet(searchInputValue);
            }}
            onClear={onClear}
            clearable={showClear}
            {...(inputRef ? { ref: inputRef } : {})}
          />
        </div>
        {(searchInputValue || showSearchText) && (
          <span onClick={onSearch} className={styles.searchBtn}>
            搜索
          </span>
        )}
      </div>
    </>
  );
};

export default SearchBar;
