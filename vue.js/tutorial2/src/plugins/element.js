import Vue from "vue"
import { 
    Button,
    Form, FormItem,
    Input, Radio, Checkbox,
    Select, 
    Message,
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 2 };
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)

Vue.prototype.$message = Message

Vue.config.productionTip = false
