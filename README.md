- git clone 后
- npm install /sudo npm install
- 不知道各位安装webpack没有 如果没有 请先安装 webpack --- sudo npm install webpack -g 
- 之后就可以玩耍喽

## 1. 运行服务:

Run:

```npm run dev```

## 开发构建指令:

Run:

```npm run deploy```

打包.

## 部署 for cordova:
请确保取消注释src / index.html中的cordova.js文件并使用您的信息更新config.xml. (name/description...)


## 支持三种平台 : 
- browser
- ios
- android

首次运行注意 (ios example):

```
npm run cordova
cordova platform add ios
cordova run ios
```

Update (ios example):

```
npm run cordova
cordova platform update ios
cordova run ios
```

打包