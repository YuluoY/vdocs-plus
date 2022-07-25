# vdocs2

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 组件使用说明/示例

## Button

- 属性
    - type(String)：primary、success、info、danger
    - size(String)：large、small、middle、default
    - radius(String)：circle、round、semicircle-right、semicircle-left

```js
<h-button type="primary" size="large">测试按钮</h-button>
<h-button type="success" size="small" radius="circle"></h-button>
<h-button type="info" size="middle" radius="round">测试按钮</h-button>
<h-button type="danger" size="default" disabled>测试按钮</h-button>
```

## Card

- 属性
    - title(String)
    - shadowOpportunity(String)：hover、default。
        - hover：在鼠标移至卡片上时显示阴影。
        - default：始终显示阴影

```js
   <h-card ref="card2" style="width: 800px" shadowOpportunity="hover">
    // ...
</h-card>
```

## Loading

- 属性
    - text(String)
    - visible(Boolean)
    - background(String)
    - dom(Object，节点实例，如：document.body)
    - borderRadius(String)

```js
 const load = this.$loading({
    text: 'loading...',
    visible: false,
    background: 'rgba(0,0,0, .3)',
    dom: document.body,
    borderRadius: 'unset'
});
load.close(2);  // 两秒后关闭
```

## Notification

- 属性
    - text(String)
    - type(String)
    - color(String)
    - duration(Number, 显示时间)
    - background(String)
    - verticalGap(Number, 通知节点间的垂直间隔)
    - isAutomaticExit(Boolean, 是否自动退出)

```js
 this.$notify({
    type: 'warning',
    text: '测试warning',
    isAutomaticExit: false
})
this.$notify({
    type: 'error',
    text: '测试error',
    isAutomaticExit: false
})
this.$notify({
    type: 'info',
    isAutomaticExit: false
})
const success = this.$notify({
    type: 'success',
    isAutomaticExit: false
})
```

## Tag
- 属性
  - text(String, 显示文本)
  - type(String, 默认:primary, 背景颜色类型)
    - success：绿色
    - info：灰色
    - danger：红色
    - primary：蓝色
    - warning：黄色
    - base：灰色
  - num(Number, 是否需要在文本右边显示数字)
  - isShowIcon(Boolean, 是否需要显示标签图标)
  - hollow(Boolean, 空心标签，即没有背景色)
  - radius(String, 默认为空字符串, 控制标签是否为圆角)
    - default：矩形 
    - plain：圆角矩形
  - href(String, 链接，可根据链接判断是否为外链)
  - tag(String, 标签类型，如果是内链，则是以router-link为标签，可设置标签类型)
  - iconType(String, 默认为biaoqian1)
    - 值一：biaoqian
    - 值二：biaoqian1
  - title(String, title属性，与原始标签属性功能一致)
```js
       <h-tag v-for="(c, i) in categoryTag.skills" :key="i"
                       :text="c.label"
                       :num="i"
                       type="primary"
                       :title="c.label"
                       icon-type="biaoqian"
                       radius:'plain'
                       is-show-icon
                       :href="c.href"></h-tag>
```