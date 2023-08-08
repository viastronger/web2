import icon1 from "@/assets/images/search/01.png";
import icon2 from "@/assets/images/search/02.png";
import icon3 from "@/assets/images/search/03.png";
import icon4 from "@/assets/images/search/04.png";
import icon5 from "@/assets/images/search/05.png";

export const educationList = [
  {
    label: '不限',
    value: '',
  },
  {
    label: '初中',
    value: 1,
  },
  {
    label: '高中(中专)',
    value: 2,
  },
  {
    label: '大专以上',
    value: 3,
  },
]

export const levelList = [
  {
    label: '不限',
    value: '',
  },
  {
    label: '黄金级',
    value: 0,
    icon: icon5
  },
  {
    label: '白金级',
    value: 1,
    icon: icon1
  },
  {
    label: '黑金级',
    value: 2,
    icon: icon2
  },
  {
    label: '钻石级',
    value: 3,
    icon: icon3,
    className: 'diamond'
  },
  {
    label: '尊享级',
    value: 4,
    icon: icon4
  },
]

export const selectArr = ({ level = '' }) => {
  return [
    {
      label: '籍贯',
      activeIndex: '',
      prop: 'nativePlaceArea',
      list: [
        {
          label: '不限',
          value: '',
        },
        {
          label: '南方',
          value: 1,
        },
        {
          label: '北方',
          value: 2,
        },
        {
          label: '江浙沪',
          value: 3,
        },
      ]
    },
    {
      label: '年龄',
      activeIndex: '',
      prop: 'ageRange',
      list: [
        {
          label: '不限',
          value: '',
        },
        {
          label: '30岁-40岁',
          value: 1,
        },
        {
          label: '35岁-40岁',
          value: 2,
        },
        {
          label: '40岁-50岁',
          value: 3,
        },
      ]
    },
    {
      label: '学历',
      activeIndex: '',
      prop: 'education',
      list: educationList
    },
    {
      label: '等级',
      activeIndex: level,
      prop: 'level',
      list: levelList
    },
  ]
}