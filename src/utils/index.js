import { levelList } from "@/components/filter/config";

export const scrollSmoothTo = (el, position) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = callback => {
      return setTimeout(callback, 17)
    }
  }
  let scrollTop = el.scrollTop
  const step = () => {
    const distance = position - scrollTop
    scrollTop = scrollTop + distance / 10
    if (Math.abs(distance) < 3) {
      el.scrollTop = scrollTop + Math.ceil(distance)
    } else {
      el.scrollTop = scrollTop
      requestAnimationFrame(step)
    }
  }
  step()
}


export const educationBackList = [
  {
    label: '小学',
    value: 0,
  },
  {
    label: '初中',
    value: 1,
  },
  {
    label: '高中',
    value: 2,
  },
  {
    label: '大专',
    value: 3,
  },
  {
    label: '本科',
    value: 4,
  },
  {
    label: '硕士',
    value: 5,
  },
]


export const getEdu = ({ education }, arr = educationBackList) => {
  return education !== '' && education !== undefined && arr.find((l) => education === l.value).label;
};

export const getLevelIcon = ({ level }) => {
  return level !== '' && level !== undefined && levelList.find((l) => level === l.value).icon;
};

export const getSex = ({ sex }) => {
  return sex === 0 ? '女' : '男'
};

export const maritalList = [
  { label: '保密', value: 0 },
  { label: '已婚', value: 1 },
  { label: '未婚', value: 2 },
  { label: '离异', value: 3 },
]

export const getMarital = ({ maritalStatus }) => {
  return maritalStatus !== undefined && maritalList.find((l) => maritalStatus === l.value).label;
};

export const hideName = (name) => {
  return `${name[0]}*${name[name.length - 1]}`
}