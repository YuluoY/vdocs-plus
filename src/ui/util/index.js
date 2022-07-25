import * as core from './core'
import * as dom from './dom'
import * as env from './env'
import * as events from './event'

const utils = {
    core,
    dom,
    env,
    events
}
window.$hUtils = window.$hUtils || utils;

export default utils;