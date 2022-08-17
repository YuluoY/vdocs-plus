import * as Article from '@/apis/web/articleApi'
import * as Category from "@/apis/web/categoryApi";
import * as Comment from '@/apis/web/commentApi'
import * as Count from '@/apis/web/countApi'
import * as Login from "@/apis/web/loginApi";
import * as Log from '@/apis/web/logApi'

export default {
    ...Article,
    ...Category,
    ...Comment,
    ...Count,
    ...Login,
    ...Log,
}