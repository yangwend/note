import { History } from 'history';
import { IBaseProps } from '.';

/**
 * 路由属性
 */
export interface IMagicRouteProps {
  route: React.ComponentClass | React.FunctionComponent<IBaseProps>;
  keepAlive?: boolean;
  name?: string;
  history?: History;
}

/**
 * 路由配置
 */
export interface IRouteConfig {
  path: string;
  component: React.ComponentClass | React.FunctionComponent<IBaseProps>;
  keepAlive?: boolean;
  name?: string;
}
