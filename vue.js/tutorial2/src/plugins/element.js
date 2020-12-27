import Vue from "vue"
import { 
    Container, Header, Aside, Main,
    Button,
    Form, FormItem,
    Input, Radio, Checkbox, CheckboxGroup, CheckboxButton,
    Select, Option, OptionGroup,
    Message,
    Popover, Tooltip,
    Card, Divider,
    Table, TableColumn, Tag,
    Switch,
    Dialog,
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
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Switch)
Vue.use(Dialog)

Vue.prototype.$message = Message

Vue.config.productionTip = false
