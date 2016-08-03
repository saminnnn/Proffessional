var app = require('express')();
var http = require('http').Server(app);
var io=require('socket.io')(http);
var xml2js=require('xml2js');
var fs=require('fs');

parser=new xml2js.Parser();

app.get('/', function(req, res){
  res.sendFile(__dirname+'/client2.html');
  setTimeout(firstLoad, 2000);
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

process.on('SIGUSR2', function(){
  firstLoad();
});

function firstLoad(){
  fs.readFile('data.xml', function(err, data){
    parser.parseString(data, function(err,json){
      var name=[[]];

      for(var i=0; i<json['Data']['Company'].length; i++){
        name[i]=new Array(2);
        name[i][0]=""+json['Data']['Company'][i]['Name'];
        name[i][1]=""+json['Data']['Company'][i]['Status'];
      }

      io.emit('name', name);
      console.log(name[0]);	
    });
  });  
}
