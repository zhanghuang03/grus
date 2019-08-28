package com.xxl.job.admin.core.model;

public class XxlJobLnLog {


    private String id;

    // job info
    private int jobId;

    // trigger info
    private String triggerCode;
    // handle info
    private String handleCode;

    // alarm info
    private String jobName;
    private String upStreamJobList;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getTriggerCode() {
        return triggerCode;
    }

    public void setTriggerCode(String triggerCode) {
        this.triggerCode = triggerCode;
    }

    public String getHandleCode() {
        return handleCode;
    }

    public void setHandleCode(String handleCode) {
        this.handleCode = handleCode;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getUpStreamJobList() {
        return upStreamJobList;
    }

    public void setUpStreamJobList(String upStreamJobList) {
        this.upStreamJobList = upStreamJobList;
    }
}
