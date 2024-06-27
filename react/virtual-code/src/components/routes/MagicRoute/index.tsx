import { Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IPageParams } from '@/types';
import { IMagicRouteProps } from '@/types';

const MagicRoute: React.FC<IMagicRouteProps> = ({
  route: Component,
  keepAlive = false,
  name,
  history,
}: IMagicRouteProps) => {
  const location = useLocation();
  const params = useParams();
  // if (keepAlive) {
  //   const cacheKey = history?.location.search;
  //   return (
  //       <KeepAlive name={name} saveScrollPosition={true} id={name} key={cacheKey}>
  //         <Component location={location} params={params as unknown as IPageParams} />
  //       </KeepAlive>
  //   );
  // }
  return (
    <Suspense>
      <Component
        key={location.hash}
        location={location}
        params={params as unknown as IPageParams}
      />
    </Suspense>
  );
};

export default MagicRoute;
