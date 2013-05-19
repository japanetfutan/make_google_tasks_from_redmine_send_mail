
#1. What's this.

This code is make google tasks from redmine send mail.


#2. How to use.

* This code uploading for your google script.

* Add redmine mail address in code line 1.


>
`
var FROM ='exsample.redmine@mailaddress.com';
`


* gmail address setting for redmine setting.


#3. Rules & Attention

* redmine project title is not including '[' and ']'.

* redmine ticket title is not including '#','[' and ']'.

* redmine ticket body is not includeing URL address.(Only http*)

* Get permission and setting Google APIs from google tasks API.
>
[https://code.google.com/apis/console/](https://code.google.com/apis/console/)

* Get permission from gmail.

* Get permissoin from google tasks.


#4. Image

>
    [Redmine Project Title] <- TaskList Name
          [ticket title] <- Task Name
                [ticket URL] <-Task Note
          
#5. Future

* redmine ticket status reflects for google tasks.

* redmine ticket release date reflects for google tasks.




Thank you for reading.
