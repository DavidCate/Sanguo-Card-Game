package cn.edu.tute.fastdfs;

import org.csource.common.MyException;
import org.csource.fastdfs.ClientGlobal;

import java.io.IOException;

public class FastDFS {
    public static void main(String[] args) throws IOException, MyException {
        ClientGlobal.initByProperties("fastdfs-client.properties");
        System.out.println("ClientGlobal.configInfo(): " + ClientGlobal.configInfo());
//        ClientGlobal.initByProperties("config/fastdfs-client.properties");
    }
}
