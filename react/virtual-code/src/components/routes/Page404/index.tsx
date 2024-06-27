import { Result } from 'antd-mobile';
import { FrownOutline } from 'antd-mobile-icons';

// 404视图
const Page404 = () => (
  <div style={{ width: '100%', height: '100%', paddingTop: '30%' }}>
    <Result
      icon={<FrownOutline />}
      status="warning"
      title="404"
      description="404"
    />
  </div>
);

export default Page404;
