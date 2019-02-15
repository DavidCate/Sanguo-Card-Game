package spingboot;


import cn.edu.tute.fastdfs.FileStringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class MyTest {



    @Test
    public void test() {
        String string="xxx.aaa";

        System.out.println(FileStringUtils.getFileExt(string));
        System.out.println(FileStringUtils.getFileNameWithoutExt(string));
    }


}
