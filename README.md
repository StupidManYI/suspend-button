# suspend-button

a react suspend button
以前有位老兄很早发布了一这个组件(- [原作地址](https://github.com/kkfor/suspend-button)),很好用. 但是是基于移动端的,所以我把pc端也补上,顺便支持ts;

- [demo](https://stupidmanyi.github.io/suspend-button/)
- [github](https://github.com/StupidManYI/suspend-button)

## 安装
npm i suspend-button-luckytree -S

## 使用

```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SuspendButton from 'suspend-button'

class App extends Component {
  render() {
    return (
      <SuspendButton></SuspendButton>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
)
```

## 属性

| 属性名 | 类型 | 说明 |
| - | - | - |
| img| String | 图片地址 |
| style | obj | 样式 |