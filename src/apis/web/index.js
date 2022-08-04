import * as Login from "@/apis/web/loginApi";
import * as Article from '@/apis/web/articleApi'
import * as Log from '@/apis/web/logApi'

export default {
    ...Login,
    ...Article,
    ...Log,
}