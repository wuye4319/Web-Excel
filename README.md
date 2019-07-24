# components-ts

先讲新的目录结构
1.角色分工，架构者，组件开发者，业务开发者
将底层基础技术架构，组件架构，业务开发，层级化
2.趋向敏捷迭代式的技术框架，项目碎片化管理
3.代码复用性高，高度的抽象化
4.文件规范，基础代码规范，自动生成
5.文件目录命名规范，结构规范等，自动化治理
6.组件的版本控制，文档库系统后，组件的传播
7.状态审查，类型生成，aop层

### 目录说明
```
public  // HTML和网站icon
dist
src  // 源码目录
  common  // 公共资源
    assets  // 静态文件
    config  // 配置文件，环境变量等
    styles  // 公共的样式库
    typings  // 公共的类型申明
    utils  // 公共的函数库
  from  // 项目功能单元
    components  // 组件碎片
    pages  // 页面
    router  // 页面路由
    service  // 页面接口层
    store  // 状态库
    typings  // 类型申明库
  wrapper  // 容器，aop层
    router  // 路由入口
    store  // 公共状态管理
    Layout  // 容器布局

``` 
