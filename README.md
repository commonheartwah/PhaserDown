1. 初始化安装

- 执行 sodu npm install

2. 关于初始化项目目录

- 执行完 1 后 执行 gulp init --name=demo demo为项目目录 新建在 scr/app 目录下

3. 关于开发调试

- 运行 npm run dev demo demo为要运行的项目（游戏）
- 注意：这里控制台汇报一个 
```js
ERROR in Entry module not found: Error: Can't resolve 'ppp' in '/Users/wangahai/work-dev/项目/phaser-es6-webpack
```
- 类似的错误 不用管他 

4. 打包部分

- 运行 npm run cordova demo demo为项目目录 会报一个
```js
npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! commonheartwah@1.0.0 cordova: `webpack --config webpack.cordova.config.js "stars"`
npm ERR! Exit status 2
```
- 类似的错误 不用管 

5. 错误说明

- 正常情况我们输入一个命令的时候 例如 npm install 这样就可以了 这里 强制加上了 例如 npm install demo ，在解析的时候 webpack 会获取到这个命令 同时去找相应的配置文件 但是， 由于 demo 导致webpack无法识别了 不知道这是个啥就会报错， 说 module 中找不到 demo ，这不会影响开发，仅仅是 webpack 解析的失误 ，知道就好不必深究 水太深 水太深 水太深，重要的事说三遍

6. 项目结构说明

- _tp
  - 初始化生成模版文件目录
- assets
  - 我们在写项目时，所有的静态文件资源
  - 注意：例如我们做泡泡案例时，在assets文件夹下新建一个叫paopao的文件夹 ，里面放置 images audio vedio文件夹 在之后放置文件
- build
  - 构建模版使用的gulp配置文件
- dist
  - 打包时使用的文件
- pack
  - 打包后生成的目录
- src
  - api
    - 接口 统一规范 首先新建一个游戏目录 之后在里面写
  - app
    - 所有的项目都在这里面写
  - components
    - 公共组建
  - server
    - 服务 包括
  - index.html
    - 入口文件
  - path.js
    - 路径文件 开发打包使用
- 外部 .babelrc .eslintrc .gitignore webpack 等配置文件