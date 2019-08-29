#### 项目介绍
grus【XXL-JOB】,主要针对离线任务调度场景（基于“<a href="https://github.com/xuxueli/xxl-job" target='_blank'>分布式任务调度平台XXL-JOB</a>”二次开发）


#### Original project
github link: https://github.com/xuxueli/xxl-job

XXL-JOB是一个轻量级分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。

XXL-JOB is a lightweight distributed task scheduling framework. 
It's core design goal is to develop quickly and learn simple, lightweight, and easy to expand. 
Now, it's already open source, and many companies use it in production environments, real "out-of-the-box".

#### Grus【XXL-JOB】主要区别于XXL-JOB
    （1）
    
    （2）选中节点时，突出当前节点以及上下游路径
    
    （3）基于bootstrap的右键菜单
    
    （4）样式调整

#### Grus功能图示

##### 任务列表
![任务列表](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/任务列表.png "任务列表")

##### 新增任务
![新增任务](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/新增任务.png "新增任务")

##### cron表达式选择器
![cron表达式选择器](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/cron表达式选择器.png "cron表达式选择器")

##### 上游任务依赖
![上游任务ID选择器-1](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/上游任务ID选择器-1.png "上游任务ID选择器-1")
![上游任务ID选择器-2](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/上游任务ID选择器-2.png "上游任务ID选择器-2")

##### 查看任务DAG
![查看任务DAG-1](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/查看任务DAG-1.png "查看任务DAG-1")
![查看任务DAG-2](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/查看任务DAG-2.png "查看任务DAG-2")

##### 调度日志列表
新增“待运行”状态，当加任务添加上游任务依赖后，等到所依赖的任务最后一次运行的状态为“成功”后本任务才会开始运行，如果上游任务经重试后还是失败，需手动执行至成功后本任务才会继续运行。
![调度任务运行状态](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/调度任务运行状态.png "调度任务运行状态")

