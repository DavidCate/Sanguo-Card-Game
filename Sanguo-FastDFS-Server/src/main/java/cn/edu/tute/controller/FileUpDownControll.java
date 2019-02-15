package cn.edu.tute.controller;

import cn.edu.tute.entities.Constans;
import cn.edu.tute.fastdfs.FastDFSUtils;
import cn.edu.tute.fastdfs.UploadFileVo;
import cn.edu.tute.service.FileStorageService;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;


@Controller
public class FileUpDownControll {
    Logger logger= LoggerFactory.getLogger(FileUpDownControll.class);

    @Autowired
    FileStorageService fileStorageService;

    @RequestMapping("upload/uploadPic")
    public void uploadFile(MultipartFile pic, HttpServletResponse response, HttpServletRequest request){
        HttpSession httpSession=request.getSession();
        //尚未开发用户session登录  暂时模拟
        int userId=Integer.parseInt(httpSession.getId()) ;
        UploadFileVo uploadFileVo=new UploadFileVo();
        try {
            uploadFileVo.setFileBytes(pic.getBytes());
            uploadFileVo.setFileName(pic.getOriginalFilename());
            uploadFileVo.setSize(String.valueOf(pic.getSize()));
            //拿到了存储到fdfs的原始文件位置  后面还需要回写到mysql记录文件 名称和文件信息
            String path= FastDFSUtils.upLoadPic(uploadFileVo);
            //图片的访问url
            String url= Constans.FDFS_URL+"/"+path;
            JSONObject jsonObject=new JSONObject();
            if (StringUtils.isNotBlank(path)){
                Date now=new Date();
                SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy年MM月dd日 hh时mm分ss秒 EE", Locale.CHINA);
                fileStorageService.fileStorage(uploadFileVo.getFileName(),url,simpleDateFormat.format(now),userId);
                jsonObject.put("url",url);
                jsonObject.put("isSuccess",true);
            }else {
                jsonObject.put("isSuccess",false);
                jsonObject.put("errorMsg","上传图片失败");
            }
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(jsonObject.toJSONString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
