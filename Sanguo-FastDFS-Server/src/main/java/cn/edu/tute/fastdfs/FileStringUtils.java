package cn.edu.tute.fastdfs;

public class FileStringUtils {
    public static String getFileExt(String fileName){
        String ext=null;
        String[] name=fileName.split(".");
        if (".".equals(fileName)){
            return null;
        }
        if (name.length==1){
            return null;
        }
        if (name.length>1){
            ext=name[name.length];
        }
        return ext;
    }

    public static String getFileNameWithoutExt(String fileName){
        String res=null;
        String ext=getFileExt(fileName);
        if (ext!=null){
            int index=fileName.indexOf(ext);
            res=fileName.substring(0,index-2);
        }
        return res;
    }
}
