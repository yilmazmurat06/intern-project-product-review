import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// Geniş ekranlarda (tablet) ölçeklemenin aşırı büyümesini engellemek için
// maksimum bir genişlik faktörü belirliyoruz.
const scaleWidth = width > 500 ? 500 : width;

const scale = size => scaleWidth / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
