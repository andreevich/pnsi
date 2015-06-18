  var express = require('express');
  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');
  var mymodule = require('./mymodule.js')();

var app = express();
    app.use('/css', express.static(__dirname + '/css'));
    app.use('/js', express.static(__dirname + '/js'));
    app.use(express.static(__dirname + '/html'));
    app.use('/info',express.static(__dirname + '/info'));

app.get('/o', function(req, res){
	var arr=[]
	var obj = new mymodule.LineObj()
		obj.MANAG_NO ='21'
		obj.LIST_NO='059'
	var obj2 = new mymodule.LineObj()
		obj2.STA_NO='138507'
	var obj3 = Object.create(obj);
		obj3.STA_NO='150208'
	var obj4 = Object.create(obj3);
		obj4.LIST_NO='999'
		arr.push(obj,obj2,obj3,obj4)
	//%5B%7B%22MANAG_NO%22%3A%2221%22%2C%22P_SIGN_NO%22%3A%22%22%2C%22V_KIND_NO%22%3A%22%22%2C%22V_TYPE_NO%22%3A%22%22%2C%22OWN_NO%22%3A%22%22%2C%22CARGO%22%3A%22%22%2C%22MANAG_NO_1%22%3A%22%22%
  res.send('<pre>'+mymodule.V_BAN_PERMIT("Д тест",arr)+'</pre><br/>'+escape(JSON.stringify(arr)));
});

app.get('/mail/:id?', function(req, res){
  t = 	req.query
  /*
  res.send('mail ' + req.params.id
					+ " <br/> "
					+ JSON.stringify(t))
					+ " <br/> "
					+ t + " <br/> "
					+ JSON.parse(unescape(t))*/
					
res.send(unescape(t));				
});

app.post('/scope', function(req, res){
 var bodyStr = '';
    req.on("data",function(chunk){
        bodyStr += chunk.toString();
    });
    req.on("end",function(){
    	d = JSON.parse(bodyStr)
		//console.log(d)
		res.send(mymodule.V_BAN_PERMIT(d));
    });	
});

app.get('/m/', function(req, res){

 var transporter = nodemailer.createTransport({
    service: 'gmail',
	tls: {
        rejectUnauthorized: false
    },
	 host: 'smtp.gmail.com',
     port: 465,
     secure: true,
    auth: {
        user: '5316552@gmail.com',
        pass: '1simon86'
    }
});
transporter.sendMail({
    from: '5316552@gmail.com',
    to: '2254577@gmail.com',
    subject: 'Проверка Nodemailer',
    text: 'hello world!',
	attachments: [
        {   // utf-8 string as an attachment
            filename: 'insert_.txt',
            content: 
'---\n'+
'table: V_BAN_PERMIT   # название таблицы\n'+
'date: 2014-10-26      # дата изменения в формате ГГГГ-ММ-ДД\n'+
'reason: Д 2014-10-26  # причина\n'+
'\n'+
'insert:                                # записи для вставки\n'+
'- ["21","4","","","","","20","","138507","","059","2012-06-20","2030-06-20","61219846","2014-10-26","2014-10-27","",""]   # данные в двойных ковычках через зпт.\n'+
'- ["21","4","","","","","20","","138507","","059","2012-06-20","2030-06-20","60949211","2014-10-26","2014-10-27","",""]   # данные в двойных ковычках через зпт.\n'+
'- ["21","4","","","","","20","","138507","","059","2012-06-20","2030-06-20","61188512","2014-10-26","2014-10-27","",""]   # данные в двойных ковычках через зпт.\n'+
'- ["21","4","","","","","20","","138507","","059","2012-06-20","2030-06-20","60980372","2014-10-26","2014-10-27","",""]   # данные в двойных ковычках через зпт.\n'
        }]
}, function(error,response){
	if(error){
         res.send(JSON.stringify(error)+"\n "+error);
		 console.log('error')
		 console.log(error)
    }else{
         res.send("Message sent: " + response. response);
		 console.log('response')
		 console.log(response)
    }
});

/*

  var transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: { user: '5316552@gmail.com',
        pass: '1simon86' }
  }));

  transporter.sendMail({
    from: '5316552@gmail',
    to: '2254577@gmail.com',
    subject: 'Test sujet',
    text: 'test text',
    html: '<b>Test text</b>'
  }, function (error, response) {
    //Email not sent
    if (error) {
      res.end(JSON.stringify(error));
    }
    //email send sucessfully
    else {
      res.send(JSON.stringify(response));
    }
  });
  */
});


app.listen(3000)


//var wellknown = require('nodemailer-wellknown');
//var config = wellknown('Gmail');
/*
var transporter = nodemailer.createTransport({
     service: 'postmark' // <- resolved as 'Postmark' from the wellknown info
     auth: {...}
});
*/



//https://github.com/andris9/Nodemailer
