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