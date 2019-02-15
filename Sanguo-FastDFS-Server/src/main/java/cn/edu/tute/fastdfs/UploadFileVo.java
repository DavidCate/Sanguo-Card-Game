package cn.edu.tute.fastdfs;

import java.io.*;

public class UploadFileVo {
    private String fileName;
    private String uploadTime;
    private File file;

    public File getFile() {
        return file;
    }

    public byte[] getBytes() {
        if (this.file != null) {
            byte[] res = null;
            try {
                FileInputStream inputStream = new FileInputStream(this.file);
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                byte[] bytes = new byte[1024 * 3];
                int n = 0;
                while ((n = inputStream.read(bytes)) != -1) {
                    outputStream.write(bytes, 0, n);
                }
                res = outputStream.toByteArray();
                inputStream.close();
                outputStream.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return res;
        }else {
            return null;
        }
    }

    public void setFile(File file) {
        this.file = file;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(String uploadTime) {
        this.uploadTime = uploadTime;
    }
}
