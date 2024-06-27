import { atom } from 'recoil';
import { IUser } from '@/types';

export default class AppState {
  // 存储 user 信息
  static user = atom<IUser>({
    key: 'appUser',
    default: undefined,
  });

  // 存储 wxwork 初始化信息
  static storeWxWork = atom<{
    wxReady: boolean;
  }>({
    key: 'storeWxWork',
    default: {
      wxReady: false, // 是否注册成功
    },
  });
}
