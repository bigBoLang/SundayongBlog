---
author: 大波浪
pubDatetime: 2026-01-02T22:00:00Z
title: VMware 中 CentOS Stream 扩容指南
postSlug: expand-centos-stream-in-vmware
featured: false
draft: false
tags:
  - vmware
  - centos
  - expansion
description: 在 VMware 虚拟机中为 CentOS Stream 系统进行磁盘扩容的详细步骤和注意事项。
---
### 首先检查是否存在devices文件：

```
ls -l /etc/lvm/devices/
```

### 如果该目录存在，我们可以尝试重新生成devices文件：

```
rm -f /etc/lvm/devices/*

vgimportdevices -a
```

### 检查

```
[root@localhost devices]# pvscan
  Please remove the lvm.conf filter, it is ignored with the devices file.
  PV /dev/nvme0n1p3   VG cs   lvm2 [<249.00 GiB / 0    free]
  Total: 1 [<249.00 GiB] / in use: 1 [<249.00 GiB] / in no VG: 0 [0   ]
[root@localhost devices]# vgscan
  Please remove the lvm.conf filter, it is ignored with the devices file.
  Found volume group "cs" using metadata type lvm2
[root@localhost devices]# pvs
  Please remove the lvm.conf filter, it is ignored with the devices file.
  PV             VG Fmt  Attr PSize    PFree
  /dev/nvme0n1p3 cs lvm2 a--  <249.00g    0 
[root@localhost devices]# 

```

![image-20250606121738555](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20250606121738555.png)

### 让我们检查一下分区情况：

```
[root@localhost devices]# parted /dev/nvme0n1 print 

型号：VMware Virtual NVMe Disk (nvme) 磁盘 /dev/nvme0n1：290GB 扇区大小 (逻辑/物理)：512B/512B 分区表：gpt 磁盘标志：pmbr_boot

编号  起始点  结束点  大小    文件系统  名称  标志 1    1049kB  2097kB  1049kB                  bios_grub 2    2097kB  1076MB  1074MB  xfs             bls_boot 3    1076MB  268GB   267GB                   lvm
```

### 使用parted扩展分区到磁盘末尾：

```
parted /dev/nvme0n1 resizepart 3 100%
```

### 使用parted扩展分区到磁盘末尾：

```
[root@localhost devices]# parted /dev/nvme0n1 resizepart 3 100%
信息: 你可能需要 /etc/fstab。

[root@localhost devices]# partprobe /dev/nvme0n1                          
[root@localhost devices]# pvresize /dev/nvme0n1p3
  Please remove the lvm.conf filter, it is ignored with the devices file.
  Physical volume "/dev/nvme0n1p3" changed
  1 physical volume(s) resized or updated / 0 physical volume(s) not resized
[root@localhost devices]# 

```

### 很好，物理卷已经成功调整大小。现在让我们继续扩展逻辑卷：

```
lvextend -l +100%FREE /dev/cs/root
```

### 扩展文件系统：

```
xfs_growfs /dev/cs/root
```

### 验证

```
df -h
```

