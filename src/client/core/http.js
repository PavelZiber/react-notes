function ajax(method, url, args) {
  var promise = new Promise(function(resolve, reject) {
    var client = new XMLHttpRequest();
    var uri = url;
    var isPostLikeMethod = (method === 'POST' || method === 'PUT');

    if (args && isPostLikeMethod) {
      uri = '';
      var argcount = 0;
      for (var key in args) {
        if (args.hasOwnProperty(key)) {
          if (argcount++)
            uri += '&';
          uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
        }
      }
    }
    if (isPostLikeMethod) {
      client.open(method, url);
      client.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      client.send(uri);
    }else {
      client.open(method, uri);
      client.send();
    }


    client.onload = function() {
      if (this.status >= 200 && this.status < 300)
        resolve(JSON.parse(this.response));
      else
        reject(this.statusText);
    };

    client.onerror = function() {
      reject(this.statusText);
    };

  });

  return promise;
}

export default {
  get: function(url, args) {
    return ajax('GET', url, args);
  },
  post: function(url, args) {
    return ajax('POST', url, args);
  },
  put: function(url, args) {
    return ajax('PUT', url, args);
  },
  delete: function(url, args) {
    return ajax('DELETE', url, args);
  }
};


