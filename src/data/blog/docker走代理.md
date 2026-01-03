---
author: 孙大勇
pubDatetime: 2026-01-02T13:00:00Z
title: Docker 走代理配置指南
postSlug: docker-proxy-configuration
featured: false
draft: false
tags:
  - docker
  - proxy
  - configuration
description: 详细介绍如何为 Docker 配置代理服务器，包括守护进程代理和容器代理的设置方法。
---

# Docker配置代理

我来帮您配置 Docker 使用代理。主要有两种方法

1. 配置 Docker 守护进程代理

创建或编辑 Docker 守护进程配置文件

```bash
sudo mkdir -p etc/system.d/system/docker.service.d
sudo vi etc/system/d/system/docker.service.d/http-proxy.conf
```

添加以下内容

```ini
[Service]
Environment="HTTP_PROXY=http://192.168.1.12:10808"
Environment="HTTPS_PROXY=http://192.168.1.12:10808"
Environment="NO_PROXY=localhost,127.0.0.1"
```

重启 Docker 服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

2. 配置 Docker 客户端代理

创建或编辑 `~/docker/config.json`

```json
{
  "proxies": {
    "default": {
      "httpProxy": "http://192.168.1.12:10808",
      "httpsProxy": "http://192.168.1.12:10808",
      "noProxy": "localhost,127.0.0.1"
    }
  }
}
```

需要注意
- 请将 proxyport 替换为您的实际代理地址和端口
- NO_PROXY 可以添加不需要代理的地址
- 配置完成后最好测试一下连接是否正常

您想了解哪种配置方式的更多细节吗？



# 取消代理



是的，可以通过修改文件名来禁用代理配置。这是一个简单的方法，便于以后需要时再启用。 

```
mv /etc/systemd/system/docker.service.d/http-proxy.conf   /etc/systemd/system/docker.service.d/http-proxy.conf.bak 

systemctl daemon-reload 
systemctl restart docker
```

 这样做的好处是： - 配置文件还在，只是不生效了 - 如果将来需要重新启用代理，只需要改回原文件名 - 不用重新编写配置文件 记得重启 Docker 服务让更改生效。





# 查看代理是否生效

有几个命令可以检查 Docker 是否使用代理： 

查看 Docker 信息中的代理设置： 

```
docker info | grep -i proxy
```

检查 Docker 守护进程配置： 

```
systemctl show --property=Environment docker
```

查看配置文件是否存在： 

```
ls /etc/systemd/system/docker.service.d/http-proxy.conf 
```

查看 Docker 客户端配置： 

```
cat ~/.docker/config.json | grep -i proxy 
```

 如果这些命令没有输出代理相关信息，说明 Docker 没有使用代理。如果显示了代理地址，则说明正在使用代理。
