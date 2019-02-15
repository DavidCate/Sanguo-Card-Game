package cn.edu.tute.fastdfs;

import org.csource.common.MyException;
import org.csource.common.NameValuePair;
import org.csource.fastdfs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class FastDFSUtils {
    public static String upLoadPic(UploadFileVo uploadFileVo) throws IOException, MyException {
        Logger logger= LoggerFactory.getLogger(FastDFSUtils.class);
        String path=null;
        ClientGlobal.initByProperties("fastdfs-client.properties");
        logger.info("ClientGlobal.configInfo(): " + ClientGlobal.configInfo());
        TrackerClient trackerClient=new TrackerClient();
        TrackerServer trackerServer=trackerClient.getConnection();

        StorageClient1 storageClient1=new StorageClient1(trackerServer,null);
        String ext=FileStringUtils.getFileExt(uploadFileVo.getFileName());
        if (ext!=null){
            NameValuePair[] mata_list=new NameValuePair[3];

        }
        return path;
    }
}
