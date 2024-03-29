# arc-text

实现文字平滑弯曲弧形效果的 js

# 安装

`npm install arc-text-js`

# 使用

```
import { createArtElement } from 'arc-text-js';

createArtElement('测试文案', dom, { startDeg: 180, r: 100, fontSize: 20, color: '#fff'})
```

![](https://github.com/qwerUser/arc-text/blob/main/src/assets/111.jpg)

## 参数

createArtElement(str, dom, options)
str: 展示的文字
dom: 展示文字的容器元素/元素 id
options:
| 字段 | 默认值 | 备注 |
|----------|--------|----------------|
| startDeg | 0 | 开始的角度 |
| r | 50 | 文字圆弧的半径 |
| fontSize | 14 | 字体大小 |
| color | #333 | 字体颜色 |
| clockwise | true | 是否顺时针 |
| hasBg | false | 是否有背景颜色 |
| backgroundColor | #409EFF | 背景颜色 |
| backgroundClassName | arc-text-bg | 背景元素的 class |
