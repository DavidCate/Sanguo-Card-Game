package cn.edu.tute.entities;

import java.io.Serializable;

public class Task implements Serializable {
    private String taskName;
    private String taskContent;

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskContent() {
        return taskContent;
    }

    public void setTaskContent(String taskContent) {
        this.taskContent = taskContent;
    }
}
