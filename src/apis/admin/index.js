import * as Article from "@/apis/admin/articleApi";
import * as Category from '@/apis/admin/categoryApi'
import * as Comment from '@/apis/admin/commentApi'
import * as Log from '@/apis/admin/logApi'

export default {
    ...Article,
    ...Category,
    ...Comment,
    ...Log,
}