import {
    Button,
    Notification,
    Message,
    Aside,
    Container,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Input,
    Form,
    FormItem,
    Upload,
    DatePicker,
    InputNumber,
    MessageBox,
    Table,
    TableColumn,
    Select,
    Option,
    Dialog,
    Tag,
    Link,
    Avatar,
    Card,
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
const components = [
    Button,
    Aside,
    Container,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Input,
    Form,
    FormItem,
    Upload,
    DatePicker,
    InputNumber,
    Table,
    TableColumn,
    Select,
    Option,
    Dialog,
    Tag,
    Link,
    Avatar,
    Card,
]

import Vue from "vue";
components.forEach(c => Vue.use(c))

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;