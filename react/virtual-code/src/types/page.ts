/* eslint-disable @typescript-eslint/no-explicit-any */
import { History } from 'history';
import { CSSProperties } from 'react';
import { Location } from 'react-router-dom';

export interface IMainProps {
  history: History;
}

export interface IPageComponentProps<PS> {
  pageStore?: PS;
  props?: unknown;
}

export interface IBaseProps {
  location: Location;
  params: IPageParams;
}

export interface IPageParams {
  hashParams: any;
  urlParams: Dictionary<string>;
}

export interface IPageProps {
  location: Location;
  params?: IPageParams;
}

export enum PageStatus {
  loading = 'loading',
  success = 'success',
  error = 'error',
  empty = 'empty',
}

export interface IPageScaffoldProps {
  className?: string;
  pageStatus?: PageStatus;
  pageTitle?: string;
  navbar?: React.ReactNode | (() => React.ReactNode) | null;
  content?: string | boolean | number | React.ReactNode | (() => React.ReactNode);
  onRetry?: () => void;
  emptyImg?: string | React.ReactNode | (() => React.ReactNode);
  emptyTip?: string | React.ReactNode | (() => React.ReactNode);
  errorImg?: string | React.ReactNode | (() => React.ReactNode);
  errorTip?: string | React.ReactNode | (() => React.ReactNode);
  safeAreaStyle?: CSSProperties;
}
