
import ReactDOM from 'react-dom/client';
import { useState, type FC, type PropsWithChildren, useEffect, useCallback } from 'react';
import { AliveScope } from 'react-activation';
import 'antd-mobile/es/global';
import { Toast } from 'antd-mobile';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { RouteUtil, UrlUtil, SetupUtil, WeixinUtil } from '@/utils';
import { IMainProps, IRouteConfig } from '@/types';
import { ErrorBoundary, Loading, MagicRoute } from '@/components';
import reportWebVitals from './reportWebVitals';
import { AppState } from './stores';
import { router } from './routes';
import './index.scss';

/** 防止所有表单提交导致页面刷新 */
document.addEventListener('submit', (e: Event) => {
  e.preventDefault();
});

SetupUtil.init(RouteUtil.history);

const useApp = () => {
  const [loading, setLoading] = useState(true);
  const setStoreWxWork = useSetRecoilState(AppState.storeWxWork);

  const init = useCallback(async () => {
    console.log('app init');
    setLoading(true);
    try {
      const params = UrlUtil.parseUrlParams(window.location.href);
      console.log('获取到页面查询参数 -> ', params);
      setLoading(false);
    } catch (error) {
      Toast.show((error as any)?.message ?? '系统错误');
    }
  }, []);

  const initWxwork = useCallback(() => {
    // 全局初始化一次，注入企微配置信息
    WeixinUtil.init().then((res) => {
      console.log('wxReady', res);
      setStoreWxWork({
        wxReady: res,
      });
    });
  }, [setStoreWxWork]);

  useEffect(() => {
    init();
    // initWxwork();
  }, [init, initWxwork]);

  return {
    loading,
  };
};

const App: FC<PropsWithChildren<any>> = ({ children }) => {
  const { loading } = useApp();

  return loading ? <Loading /> : children;
};

const Main: FC<IMainProps> = ({ history }) => {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <App>
          <HistoryRouter history={history as any}>
            <AliveScope>
              <Routes>
                {router.map((page: IRouteConfig) => (
                  <Route
                    path={page.path}
                    element={
                      <MagicRoute
                        key={page.path}
                        route={page.component}
                        history={history}
                        keepAlive={page.keepAlive}
                        name={page.path}
                      />
                    }
                    key={page.path}
                  />
                ))}
              </Routes>
            </AliveScope>
          </HistoryRouter>
        </App>
      </RecoilRoot>
    </ErrorBoundary>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // {/* <React.StrictMode> */}
  <Main history={RouteUtil.history} />
  // {/* </React.StrictMode> */}
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
