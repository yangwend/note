
import { lazy } from 'react';
import { IRouteConfig } from '@/types';
import { Page404 } from '@/components';

export const router: Array<IRouteConfig> = [
  {
    path: '/newGoodAuditCompare',
    component: lazy(() => import('../pages/NewGoodAuditCompareNew')),
    keepAlive: false,
    name: 'newGoodAuditCompare',
  },
  {
    path: '/newGoodAuditGoodsType',
    component: lazy(() => import('../pages/NewGoodAuditGoodsType')),
    keepAlive: false,
    name: 'newGoodAuditGoodsType',
  },
  {
    path: '/goodsRuleConfigApprove',
    component: lazy(() => import('../pages/GoodsRuleConfigApprove')),
    keepAlive: false,
    name: 'goodsRuleConfigApprove',
  },
  // 404 放在最后
  { path: '*', component: Page404 },
];
