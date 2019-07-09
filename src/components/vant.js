import {
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Icon,
  Row,
  Col,
  Popup,
  Field,
  List,
  Tag,
  Tab,
  Tabs,
  NavBar,
  Swipe,
  SwipeItem,
  RadioGroup,
  Radio,
  Actionsheet,
  GoodsAction, GoodsActionMiniBtn,GoodsActionBigBtn,
  DatetimePicker,
  Uploader,
  Loading,
  Picker,
  CouponCell,
  CouponList,
  Checkbox, CheckboxGroup,
  Dialog
} from 'vant'

const components = [
  Button,
  Tabbar, 
  TabbarItem,
  Cell,
  CellGroup,
  Icon,
  Row,
  Col,
  Popup,
  Field,
  List,
  Tag,
  Tab,
  Tabs,
  NavBar,
  Swipe, SwipeItem,
  RadioGroup, Radio,
  Actionsheet,
  GoodsAction, GoodsActionMiniBtn,GoodsActionBigBtn,
  DatetimePicker,
  Uploader,
  Loading,
  Picker,
  CouponCell,
  CouponList,
  Checkbox, CheckboxGroup,
  Dialog
]

const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }

  components.forEach(component => {
    component.name && Vue.component(component.name, component)
  })
}

export default {
  install
}
