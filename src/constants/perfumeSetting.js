const longArr = ['super short', 'short', 'normal', 'long', 'super long']
const genderArr = ['super male', 'male', 'unisex', 'female', 'super female']
const silageArr = ['intimate', 'moderate', 'strong', 'enormous']
const recommendArr = [
  {id:'spring', name:"春"}, 
  {id:'summer', name:"夏"},
  {id:'fall', name:"秋"},
  {id:'winter', name:"冬"},
  {id:'day', name:"日"},
  {id:'night', name:"夜"}
]

const handleItemNameTranslate = (string) => {
  let name
  let describe
  switch (string) {
    case 'super long': {
      name = '超久'
      describe ='12hr+'
      break;
    }
    case 'long': {
      name = '偏久'
      describe ='7~12hr'
      break;
    }
    case 'normal': {
      name = '中度'
      describe ='3~6hr'
      break;
    }
    case 'short': {
      name = '偏短'
      describe ='1~2hr'
      break;
    }
    case 'super short': {
      name = '超短'
      describe ='0~1hr'
      break;
    }
    case 'super male': {
      name = '男性'
      break;
    }
    case 'male': {
      name = '偏男性'
      break;
    }
    case 'unisex': {
      name = '中性'
      break;
    }
    case 'female': {
      name = '偏女性'
      break;
    }
    case 'super female': {
      name = '女性'
      break;
    }
    case 'intimate': {
      name = '柔和'
      describe ='需要很靠近'
      break;
    }
    case 'moderate': {
      name = '普通'
      describe ='一隻手臂的距離內'
      break;
    }
    case 'strong': {
      name = '濃郁'
      describe ='兩公尺內'
      break;
    }
    case 'enormous': {
      name = '強烈'
      describe ='充滿整個房間'
      break;
    }
    case '香檸檬': {
      name = ''
      describe ='不是佛手柑!' //'(Bergamot)'
      break;
    }

    default: {
      break;
    }
  }
 
  return { name, describe }
}

export { 
  longArr, 
  genderArr,
  silageArr,
  recommendArr,
  handleItemNameTranslate
}