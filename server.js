var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
        throw Error("A command must be specified");
            
   
   
    var result = {};
    if (query['cmd'] == 'Calcdistance')
    {
      result = distance(query);
    }
    else if (query['cmd'] == 'CalcCost')
    {
        result = cost(query);
    }
    else 
    {
        throw Error("Invalid command: " + query['cmd']);
    }
    
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function calcdistance(query)
{
    var dbudget = query['budget'];
    var dmpg = query['mpg']; 
    var dfuel = query['fuel']; 
    var distance = dbudget*dmpg/dfuel;
    
    var result = {'distance' : distance};
    return result;
}

function calcCost(query)
{
    var dbudget = query['budget'];
    var dmpg = query['mpg']; 
    var dfuel = query['fuel']; 
    var cost1 = distance*fuel
    var cost = cost1/dmpg;
    
    var result = {'cost' : cost};
    return result;

  
    }






}