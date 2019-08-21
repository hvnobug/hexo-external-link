# hexo-external-link

[![NPM version](https://badge.fury.io/js/hhexo-external-link.svg)](https://www.npmjs.com/package/hexo-external-link)

跳转外链相关插件。自动为所有`html`文件中外链的`a`标签生成对应的属性。
比如 设置 `target='_blank'`, `rel='external nofollow noopener noreferrer'` 告诉搜索引擎这是外部链接,不要将该链接计入权重。
同时自动生成外链跳转页面,默认在根目录下`go.html`;

## 安装插件

``` bash
$ npm install hexo-external-link --save
```

- Hexo 3: 1.x


## 配置插件

在`Hexo`根目录的`_config.yml`文件中添加如下配置。

``` yaml
hexo_external_link:
  enable: true
  enable_base64_encode: true
  url_param_name: 'u'
  html_file_name: 'go.html'
```

- **enable** - 是否开启`hexo_external_link`插件 - 默认 false
- **enable_base64_encode** - 是否对跳转`url`使用`base64编码` - 默认 fasle
- **url_param_name** - url参数名,在跳转到外链传递给`html_file_name`的参数名 - 默认 ‘u’
- **html_file_name** - 跳转到外链的页面文件路径 - 默认 'go.html'
