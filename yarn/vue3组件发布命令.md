## vue3组件发布命令

yarn version：管理当前项目的版本号 
* --new-version：直接记录版本号；
* --no-git-tag-version：不生成git标签；
```shell
yarn version --no-git-tag-version
```

yarn publish：将包发布到npm
* --tag：版本标签；
* --access：公开（public）还是限制的（restricted）
```shell
yarn publish --registry https://registry.npmjs.org/ --tag=beta
```