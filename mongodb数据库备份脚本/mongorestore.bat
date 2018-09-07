@echo off

rem --dir后面是数据库所在目录
mongorestore -h 127.0.0.1 -d wcx2020%date:~0,4%-%date:~5,2%-%date:~8,2% --dir D:\WEB_DEVELOPMENT\project\my_blog_origin\my_blog2\mongodbBackup\2018-09-05\wcx2020
pause