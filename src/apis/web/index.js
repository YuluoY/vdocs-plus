import * as Article from '@/apis/web/articleApi'
import * as comment from '@/apis/web/commentApi'
import * as Login from "@/apis/web/loginApi";
import * as Log from '@/apis/web/logApi'

export default {
    ...Article,
    ...comment,
    ...Login,
    ...Log,
}