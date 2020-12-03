import Vue from "vue"
import { 
    Container, Header, Aside, Main,
    Button,
    Form, FormItem,
    Input, Radio, Checkbox,
    Select, 
    Message,
    Popover, Tooltip,
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 2 };
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Popover)
Vue.use(Tooltip)

Vue.prototype.$message = Message

Vue.config.productionTip = false
