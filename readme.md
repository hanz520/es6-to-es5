## ES6代码自动编译为ES5代码

### 适用场景  

在老的项目中，非脚手架构建的项目中，html文件直接引用编写的js文件，如果使用ES6的新特性和语法，某些浏览器将无法兼容（尤其ie），ES6相对ES5写起来便捷，因此构思是：使用ES6编写代码，通过babel将ES6编译为ES5，解决不兼容的问题，然后通过core-js进行polyfill。

## core-js

用于JavaScript标准库的 polyfill（垫片/补丁）, 新功能的es'api'转换为大部分现代浏览器都可以支持运行的一个'api' 补丁包集合

## 实时编译

```json
"scripts": {
    "build": "babel src --out-dir dist -w --skip-initial-build --no-comments --out-file-extension .c.js --compact true"
  },
```

将src目录下的文件编译到dist目录

- `-w`  实时监听文件的保存并编译
- `-skip-initial-build` 仅在文件发生改变后编译
- `--no-comments`   编译后的文件忽略注释
- `--out-file-extension`  编译文件后缀名修改
- `--compact`   是否压缩编译文件

## vscode task

通过vscode的任务，在启动编辑器的时候，自动调用脚本，而无需手动启动脚本
