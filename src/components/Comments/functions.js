import { COLOR } from '../../constants/style'

export const handelAvatarName = (number) => {
    const remainder = number % 12
  
    switch(remainder){
      case 1 :
        return 'quagga'
        break;
      case 2:
        return 'liger'
        break;
      case 3 :
        return 'koala'
        break;
      case 4:
        return 'lemur'
        break;
      case 5 :
        return 'orangutan'
        break;
      case 6:
        return 'elephant'
        break;
      case 7 :
        return 'raccoon'
        break;
      case 8:
        return 'dolphin'
        break;
      case 9:
        return 'mink'
        break;
      case 10:
        return 'hippo'
        break;
      case 11:
        return 'liger'
        break;
      default:
        return 'alligator'
    }
  }
  
  export const handelAvatarColor = (number) => {
    const remainder = number % 9
    switch(remainder) {
      case 1 :
        return '#98893e' // 121 海松茶 微調
        break;
      case 2:
        return '#939650' // 130 柳茶
        break;
      case 3 : 
        return '#B1B479' // 131 麴塵
        break;
      case 4 :
        return '#A5A051' // 129 鶸茶
        break;
      case 5 :
        return '#9db298'
        break;
      case 6 :
        return COLOR.color3
        break;
      case 7 :
        return COLOR.color2
        break;
      default:
        return COLOR.color5
    }
  }
  