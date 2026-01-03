---
author: 孙大勇
pubDatetime: 2026-01-02T13:00:00Z
title: Git 大文件上传失败解决方案
postSlug: git-large-file-upload-failure
featured: false
draft: false
tags:
  - git
  - large-files
  - troubleshooting
description: 解决 Git 上传大文件失败的问题，包括 LFS 配置和清理历史记录的方法。
---
### git大文件上传失败：

参考 https://blog.csdn.net/mch2869253130/article/details/101767300

![image-20250413234015665](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20250413234015665.png)

git bash 执行以下命令，查看和删除大文件

查看

git 

```shell
git rev-list --all | xargs -rL1 git ls-tree -r --long | sort -uk3 | sort -rnk4
```

删除

```shell
git filter-branch -f --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch build/dahao_controller/dahao_controller.pkg' --tag-name-filter cat -- --all
```





