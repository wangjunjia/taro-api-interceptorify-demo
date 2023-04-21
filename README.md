# taro-api-interceptorify-demo

本项目是这个 [taro interceptorify pr](https://github.com/NervJS/taro/pull/13676) 的使用 demo

## setup


### 启用 pr 中的功能

```
git clone --depth=1 git@github.com:wangjunjia/nervjs_taro.git -b feat/interceptorify
cd nervjs_taro
pnpm install
pnpm run build
pnpm link --global --dir packages/taro
pnpm link --global --dir packages/api
```

### 本项目

```
git clone --depth=1 git@github.com:wangjunjia/taro-api-interceptorify-demo.git
cd taro-api-interceptorify-demo
pnpm install
pnpm link --global @tarojs/taro
pnpm link --global @tarojs/api
pnpm run dev:weapp
```

### 微信开发者工具

使用 **微信开发者工具** 打开 `taro-api-interceptorify-demo` 项目的 __dist__ 目录即可看到效果

1. appId 使用测试号即可
2. 项目获取 IP 地址示例需要忽略域名校验，开启方式：微信开发者工具右上角 - 详情 - 本地设置 - 勾选不校验合法域名


### end

(ps: pnpm unlink 总是不成功，有些郁闷～
