@echo off
rem 先cd到数据库的备份目录
cd ..
cd ..
cd ..
cd project
cd my_blog_origin
cd my_blog2
cd mongodbBackup
rem 建立以时间命名的文件夹
md %date:~0,4%-%date:~5,2%-%date:~8,2%

mongodump -h 127.0.0.1 -d wcx2020 -o D:\WEB_DEVELOPMENT\project\my_blog_origin\my_blog2\mongodbBackup\%date:~0,4%-%date:~5,2%-%date:~8,2%
pause