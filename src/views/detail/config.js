import { getEdu, getMarital, getSex } from '@/utils'

export const descConfigs = [
  {
    label: '姓名:', prop: 'name', formatter(item) {
      return item[this.prop]
    }
  },
  {
    label: '学历:', prop: 'education', formatter: (item) => {
      return getEdu(item)
    }
  },
  {
    label: '性别:', prop: 'sex', formatter: (item) => {
      return getSex(item)
    }
  },
  // {
  //   label: '属相:', prop: 'zodiacSign', formatter(item) {
  //     return item[this.prop]
  //   }
  // },
  {
    label: '年龄:', prop: 'age', formatter(item) {
      return item[this.prop]
    }
  },
  // {
  //   label: '星座:', prop: 'starSign', formatter(item) {
  //     return item[this.prop]
  //   }
  // },
  {
    label: '身高:', prop: 'height', formatter(item) {
      return `${item[this.prop]}cm`
    }
  },
  {
    label: '婚姻状况:', prop: 'maritalStatus', formatter: (item) => {
      return getMarital(item)
    }
  },
  {
    label: '体重:', prop: 'weight', formatter(item) {
      return `${item[this.prop]}kg`
    }
  },
  {
    label: '从业年限:', prop: 'serviceYears', formatter(item) {
      return item[this.prop]
    }
  },
  {
    label: '民族:', prop: 'nation', formatter(item) {
      return item[this.prop]
    }
  },
  {
    label: '服务数量:', prop: 'serviceNum', formatter(item) {
      return item[this.prop]
    }
  },
]