#### 项目介绍
Grus,主要针对离线任务调度场景（基于“<a href="https://github.com/xuxueli/xxl-job" target='_blank'>分布式任务调度平台XXL-JOB</a>”二次开发）


#### Original project
github link: https://github.com/xuxueli/xxl-job

XXL-JOB是一个轻量级分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。

XXL-JOB is a lightweight distributed task scheduling framework. 
It's core design goal is to develop quickly and learn simple, lightweight, and easy to expand. 
Now, it's already open source, and many companies use it in production environments, real "out-of-the-box".

#### Grus与XXL-JOB的主要区别
    （1）Grus基于XXL-JOB二次开发，从页面上新增任务，默认只有“GLUE模式(Shell)”，隐藏并简化任务的增加/修改。
    
    （2）Grus任务运行时不判断超时时间，不管任务运行多久，不因超时kill掉，XXL-JOB有超时时间限制，必须手动传入运行时间，默认0时会因任务运行时间长些而kill掉。
    
    （3）Grus任务依赖是监控上游任务当日最后一次运行的状态判断本任务是等待执行还是开始执行（注：必须是Cron方式触发的任务才生效），XXL-JOB任务依赖是主动触发一次子任务的执行。
    
    （4）【操作界面】Grus已支持任务依赖选择器
    
    （5）【操作界面】Grus已支持Cron表达式选择器（暂不支持根据Cron表达式反向选中，后边会支持）
    
    （6）【操作界面】Grus已通过dagre-d3绘画，以图示查看任务依赖，默认展示每日每个任务的最后一次运行的状态。
    
    （7）Grus手动kill掉任务一次性kill掉，XXL-JOB如果设置“失败重试次数”，需要手动kill掉多次。

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
新增“待运行”状态，当加任务添加上游任务依赖后，等到所依赖的任务当日最后一次运行的状态为“成功”后本任务才会开始运行，如果上游任务经重试后还是失败，需手动执行至成功后本任务才会继续运行。
![调度任务运行状态](https://raw.githubusercontent.com/wiki/zhanghuang03/grus/images/调度任务运行状态.png "调度任务运行状态")

#### 调度数据库初始化SQL脚本
位置为:<a href="https://github.com/zhanghuang03/grus/blob/master/doc/db/tables_xxl_job.sql" target="_blank">/grus/doc/db/tables_xxl_job.sql</a>

#### TODO LIST
    （1）被依赖中的任务不能删除
    
    （2）增加“重跑功能”，以便非Cron方式触发的任务也可以使任务依赖生效。
    
    （3）增加检测执行器上任务存活机制，在执行器down掉重启后，调度中心对其任务状态做出修改。
    
    （4）修复调度日志太大时无法查看：使用分页方式查看。
