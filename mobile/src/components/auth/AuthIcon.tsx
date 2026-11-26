import { Image, type ImageSourcePropType } from 'react-native';
import { colors } from '../../theme/colors';

const icons = {
  back: require('../../../assets/icons/back.png'),
  calendar: require('../../../assets/icons/calendar.png'),
  check: require('../../../assets/icons/check.png'),
  eye: require('../../../assets/icons/eye.png'),
  lock: require('../../../assets/icons/lock.png'),
  mail: require('../../../assets/icons/mail.png'),
  mailCheck: require('../../../assets/icons/mailCheck.png'),
  plane: require('../../../assets/icons/plane.png'),
  restaurant: require('../../../assets/icons/restaurant.png'),
  sparkles: require('../../../assets/icons/sparkles.png'),
  user: require('../../../assets/icons/user.png'),
};

export type IconName = keyof typeof icons;

export function AuthIcon({ name, size = 22, tint = colors.primary }: {
  name: IconName;
  size?: number;
  tint?: string;
}) {
  return <Image source={icons[name]} accessible={false} style={{ width: size, height: size, tintColor: tint }} />;
}

export function BrandIcon({ size, source = require('../../../assets/images/chronos-icon.png') }: {
  size: number;
  source?: ImageSourcePropType;
}) {
  return <Image source={source} accessible={false}
    resizeMode="contain" style={{ width: size, height: size }} />;
}
