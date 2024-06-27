import React from 'react';
import styles from './index.module.scss';
import { SearchOutline } from 'antd-mobile-icons';
import { INormalSearchBarProps } from '@/types';
import { Input } from 'antd-mobile';
import { ImageAssets } from '@/assets';

const NormalSearchBar: React.FC<INormalSearchBarProps> = ({
  onSearch,
  onSet,
  searchInputValue,
  onClear,
  showClear = true,
  placeholder = '请输入',
  readOnly = false,
  onGotoPage,
  showSearchIcon = true,
  children,
  showSearchText,
  showScanIcon,
  onScan,
  inputRef,
}) => {
  return (
    <>
      <div className={styles.searchWrap}>
        <div
          className={styles.inputWrap}
          onClick={() => {
            readOnly && onGotoPage && onGotoPage();
          }}
        >
          {children}
          {showSearchIcon && <SearchOutline className={styles.searchIcon} onClick={onSearch} />}
          <Input
            placeholder={placeholder}
            className={styles.input}
            onChange={(value: string) => onSet(value)}
            value={searchInputValue}
            maxLength={20}
            onEnterPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              onSet(searchInputValue);
            }}
            onClear={onClear}
            clearable={showClear}
            readOnly={readOnly}
            {...(inputRef ? { ref: inputRef } : {})}
          />
          {showScanIcon && (
            <img src={ImageAssets.common.icon_scan} className={styles.scanImage} onClick={onScan} />
          )}
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

export default NormalSearchBar;
