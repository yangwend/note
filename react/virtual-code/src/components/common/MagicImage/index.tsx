import { FC, useState, useEffect } from 'react';
import { Image } from 'antd-mobile';
import { ImageAssets } from '@/assets';
import { ImageProps } from 'antd-mobile/es/components/image';

interface IMagicImageProps extends Omit<ImageProps, 'src' | 'fallback' | 'onError'> {
  src: string;
  fallback?: string;
  className?: string;
}

const MagicImage: FC<IMagicImageProps> = ({
  src,
  fallback = ImageAssets.common.icon_goods_default,
  className,
  ...restProps
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const onError = () => {
    setImgSrc(fallback);
  };

  return <Image className={className} src={imgSrc} fit="cover" onError={onError} {...restProps} />;
};

export default MagicImage;
