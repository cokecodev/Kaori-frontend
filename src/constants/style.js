export const COLOR = {
  color1:'#f6f5e8', // 超淺棕色 - 背景
  color2:'#b5a988', // 淡 #B4A582 => Nippon 113 立休白茶
  color3:'#d2c9b1', // 深
  color4:'#89916B', // => Nippon 137 梅幸茶
  color5:'#808F7C', // => Nippon 148 柳鼠 顏色跟137滿接近的 相較之下偏藍
  
  white:'#fffef2',
  text_light:'#ffffff',
  text_dark:'#333',
  text_dark2:'#252525',
  
  gray_background:'#ebeade',
  gray_light:'#c5c4b6',
}

const size = {
  mobile: '414px',
  desktop: '768px'
}

export const MEDIA_QUERY = {
  desktop: `@media screen and (min-width: ${size.desktop})`,
  mobile: `@media screen and (max-width: ${size.desktop})`,
  small_mobile:`@media screen and (max-width: ${size.mobile})`,
  middle_breakpoint:`@media screen and (max-width: 545px)`
}
