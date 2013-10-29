exports.name = 'kabamPluginLoggerHttpMongo';

exports.model = {
  'httpLog': function (kabam) {

    var httpLogSchema = new kabam.mongoose.Schema({
      "timestamp": {type: Date, default: new Date()},
      "duration": {type: Number, min: 1},
      "statusCode": {type: Number, min: 1, max: 1000},
      "method": {type: String, match: /GET|POST|PUT|DELETE|OPTIONS/i},
      "ip": String,
      "uri": {type: String, match: /\/.*/},
      "username": {type: String, default: null},
      "email": {type: String, default: null}
    });

    httpLogSchema.index({
      timestamp: 1,
      ip: 1,
      uri: 1,
      username: 1
    });

    return httpLogSchema;
  }
};

//the middleware for logging
exports.middleware = function (kabam) {
  return function (request, response, next) {
    response.on('finish', function () {
      request.model.httpLog.create({
        'startTime': request._startTime,
        'duration': (new Date - request._startTime),
        'statusCode': response.statusCode,
        'method': request.method,
        'ip': request.ip,
        'uri': request.originalUrl,
        'username': (request.user ? request.user.username : null),
        'email': (request.user ? request.user.email : null)
      }, function (err, dataSaved) {
        if (err) throw err;
        //console.log(dataSaved);
      });
    });

    next();
  };
};

