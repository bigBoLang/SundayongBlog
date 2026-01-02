---
author: 孙大勇
pubDatetime: 2026-01-02T13:00:00Z
title: RocketMQ问题排查指南
postSlug: docker-proxy-guide
featured: false
draft: false
tags:
- docker
- proxy
description: 这篇文章介绍了RocketMQ问题排查指南。
--- 

# RocketMQ 问题排查指南

## 1. 网络配置检查

### 1.1 端口映射检查
```bash
docker port rmqbroker
```

### 1.2 Docker网络配置检查
```bash
docker network inspect docker-rocketmq_rmq
```

### 1.3 网络连通性检查
- 确保Broker和NameServer在同一个网络中
- 检查防火墙设置
- 使用telnet测试连接：`telnet 192.168.161.151 10911`

## 2. Broker配置修改

### 2.1 broker.conf配置
```properties
# 添加外部IP配置
brokerIP1 = 192.168.161.151
brokerIP2 = 192.168.161.151

# 确保NameServer地址配置正确
namesrvAddr = 192.168.161.151:9876
```

## 3. 生产者代码配置

### 3.1 基本配置
```java
// 设置NameServer地址
producer.setNamesrvAddr("192.168.161.151:9876");

// 设置客户端IP
producer.setClientIP("192.168.161.151");

// 禁用VIP通道
producer.setVipChannelEnabled(false);

// 设置超时时间
producer.setSendMsgTimeout(30000);

// 设置重试次数
producer.setRetryTimesWhenSendFailed(3);
```

### 3.2 系统属性配置
```java
// 日志配置
System.setProperty("rocketmq.client.logUseSlf4j", "true");
System.setProperty("rocketmq.client.logLevel", "DEBUG");

// 网络配置
System.setProperty("rocketmq.client.channel.maxIdleTimeMillis", "120000");
System.setProperty("rocketmq.client.channel.idleTimeoutMillis", "120000");
System.setProperty("rocketmq.client.channel.connectTimeoutMillis", "3000");
```

## 4. 日志配置

### 4.1 日志级别设置
```java
// 启用详细日志
System.setProperty("rocketmq.client.logLevel", "DEBUG");

// 使用SLF4J日志
System.setProperty("rocketmq.client.logUseSlf4j", "true");
```

### 4.2 关键日志输出
```java
logger.info("生产者启动成功，NameServer地址: {}", producer.getNamesrvAddr());
logger.info("生产者实例名称: {}", producer.getInstanceName());
logger.info("生产者客户端IP: {}", producer.getClientIP());
logger.info("消息发送结果: {}", sendResult);
```

## 5. 问题排查方法

### 5.1 日志检查
```bash
# 检查Broker日志
docker logs rmqbroker

# 检查NameServer日志
docker logs rmqnamesrv
```

### 5.2 Topic检查
```bash
# 检查Topic是否存在
docker exec -it rmqbroker sh -c "sh mqadmin topicList -n 192.168.161.151:9876"
```

## 6. 版本兼容性

### 6.1 注意事项
- 确保使用的API与RocketMQ版本兼容
- 移除不支持的API调用
- 使用正确的依赖版本

### 6.2 常见问题
- 检查API版本兼容性
- 确认依赖版本正确
- 避免使用已废弃的API

## 7. 关键检查点

1. 网络配置正确
   - 端口映射
   - 网络连通性
   - 防火墙设置

2. IP地址配置正确
   - Broker外部IP
   - 客户端IP
   - NameServer地址

3. 端口映射正确
   - Broker端口
   - NameServer端口
   - 客户端端口

4. 日志配置详细
   - 日志级别
   - 日志输出
   - 错误追踪

5. 使用正确的API
   - 版本兼容性
   - API可用性
   - 配置正确性

## 8. 最佳实践

1. 始终启用详细日志
2. 使用正确的网络配置
3. 定期检查服务状态
4. 保持版本兼容性
5. 做好错误处理
6. 使用合适的超时设置
7. 配置合理的重试策略