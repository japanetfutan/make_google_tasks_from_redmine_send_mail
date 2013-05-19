var FROM='redmine@hogehoge.co.jp';  // redmine mail address

function gettask1(){
  var thds = GmailApp.getInboxThreads();
  //var row = 1;
  for(var n in thds){
    var thd = thds[n];
    var msgs = thd.getMessages();
    for(m in msgs){
      var msg = msgs[m];
      var from = msg.getFrom();

      if(from===FROM){
        // tasklistのtitle部として使う
        var subject = msg.getSubject();
        var title=subject.match(/\[.*\]/)+'';
        title=title.replace(/\s-\s.*\]/,'').replace('[','');

        // sub:taskのtitleとして使う
        var s=subject.indexOf('#');
        var sub=subject;
        sub=sub.substring(s,200);
        sub=sub.replace(']','');
        sub=sub.replace(/\(.*.\)/,'');  // status delete

        // body内のlink:taskの内容に記載する
        var body = msg.getBody();
        var link=body.replace(/<br\s\/>/ig,'');
        link=link.match(/http:.*\n/ig)+'';
        link=link.replace(/\n/ig,'');

        gettask(title,sub,link);
      }
      //row++;
    }
  }
}

function gettask(title,sub,link){
  var listitems = Tasks.Tasklists.list().getItems();
  //Logger.log('TaskLists length : '+listitems.length);  // 11.0みたいに表示される。これは個数
  var l=listitems.length;
  for(j=0;j<l;j++){
    var item = listitems[j];
    //Logger.log('TaskList Title : '+item.getTitle());

    if(title==item.getTitle()){
      // 同じtasklistがあれば、その中のtaskへ
      var id = item.getId();
      var taskitems = Tasks.Tasks.list(id);
      var items = taskitems.getItems();

      var ll=items.length;
      var ii=1;

      for(var i in items){
        if(sub==items[i].getTitle()){
          // 同名のtaskがある場合は何もしない
          return false;
        }else if(ii==ll){
          // 最後まで舐めたけど、taskがなかった場合は新規登録
          var obj = Tasks.newTask();
          obj.setTitle(sub);
          obj.setNotes(link);
          var id=item.getId();
          Tasks.Tasks.insert(obj,id);
          return false;
        }
        var itemid = items[i].getId();
        var title = items[i].getTitle();
        var note = items[i].getNotes();
        var status = items[i].getStatus();
        var due = items[i].getDue();
        var comp = items[i].getCompleted();
        //Logger.log(due + "::" + title + " " + note + " [" + status + "]" + comp);
        ii=ii+1;
      }
    }else if(j+1==l){
      // 最後まで舐めたけど、tasklistがなかった場合は新規登録
      var obj = Tasks.newTaskList();
      obj.setTitle(title);
      Tasks.Tasklists.insert(obj);
    }
  }
}
