Kabam-Plugin-Logger-Mongo
===========================

Kabam plugin to log http requests with mongo database.

This plugin binds to Kabam event emmiter of channel 'http'
[http://ci.monimus.com/docs/#/api/kabamKernel.on](http://ci.monimus.com/docs/#/api/kabamKernel.on)
and it put down to log information about every http request served by this kabam application

Log format
===========================
```javascript
{
  startTime: Wed Aug 21 2013 01:52:34 GMT+0400 (MSK),
  duration: 49, //request duration in ms
  statusCode: 200,
  method: 'GET',
  ip: '127.0.0.1',
  uri: '/',
  username:'johndoe', //if user is authorized, his/her username is put here
  email:'email' //if user is authorized his/her email is put here
}
```

Accessing logs from application build on kabam
===========================
```javascript

    kabam.model.httpLog.find({'username':'johndoe'},
      function(err, actionsLogged){
        console.log('User "johndoe" accessed site '+actionsLogged.lenght()+ ' times!');
      }
    );

```



Accessing logs in route controller
===========================

```javascript

    kabam.extendRoutes(function(kernel){
      kernel.app.get('/api/log/:username',function(request,response){
        request.model.httpLog.find({'username':request.params.username},
          function(err, actionsLogged){
            if(err) throw err;
            response.json(actionsLogged);
          }
        );
      });
    });

```
