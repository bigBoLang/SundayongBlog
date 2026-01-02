---
author: 孙大勇
pubDatetime: 2026-01-02T13:00:00Z
title: anaconda安装教程win11
postSlug: docker-proxy-guide
featured: false
draft: false
tags:
  - docker
  - proxy
description: 这篇文章介绍了anaconda安装教程win11。
---
### 一、下载 Anaconda

1. 打开 Anaconda 官方网站（https://www.anaconda.com/），根据 Win11 系统选择对应的.exe 安装文件进行下载。

### 二、安装 Anaconda

1. 双击下载好的.exe 安装文件，启动安装向导。
2. 选择安装路径，建议使用默认路径，若有特殊需求可自行更改。
3. 当提示 “Add Anaconda to my PATH environment variable” 时，建议勾选此项以便在命令提示符或 PowerShell 中方便使用 Anaconda 相关命令。若因系统权限等问题未勾选，后续可手动配置 PATH 环境变量。
4. 按照安装向导提示完成安装，安装完成后可能会提示是否安装一些其他相关软件（如 VS Code 等），可根据自身需求选择是否安装。

### 三、修改默认包下载地址与本地存放位置

1. 找到或生成.condarc 文件

   ：

   - 一般在`C:\Users\[用户名]`目录下查找.condarc 文件。若未找到，则打开 Anaconda Prompt，输入`conda config --set show_channel_urls yes`命令来生成。

2. 修改.condarc 文件

   ：

   - 用记事本或其他文本编辑器打开.condarc 文件，将其内容修改为如下形式：

收起



plaintext



复制

```plaintext
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - defaults
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
show_channel_urls: true
envs_dirs:
  - [你期望的环境下载路径，如 D://Anaconda//envs]
pkgs_dirs:
  - [你期望的包下载路径，如 D://Anaconda//pkgs]
```

1. 验证修改是否成功

   ：

   - 在 Anaconda Prompt 中输入`conda info`命令，查看输出信息中的默认下载路径是否已更改为你所设置的路径，并且检查创建虚拟环境和安装软件包时是否存储到指定的本地目录。例如，在 Anaconda Prompt 中运行`conda create -n test_env python=3.10`命令创建一个新的虚拟环境，然后检查`D:\Anaconda\envs`目录下是否出现了`test_env`虚拟环境文件夹；使用`conda install`命令安装软件包时，检查`D:\Anaconda\pkgs`目录下是否开始存储下载的软件包文件。

注意：修改存储位置后，要确保新的路径具有适当的读写权限。若遇到权限问题，可能需要以管理员身份运行 Anaconda Prompt 或者调整文件夹的权限设置。
