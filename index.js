const request = require("request");
postData();
async function postData() {


    var options = {
        headers: {'content-type' : 'application/json'},
        url: "http://localhost/regularApi/index.php",
        method: "POST",
        json: {
            'name':'asghar',
            'hamid': 'rezad'
        }
    }

        
    request(options, function (err, res,body) {
        if (err) {
                console.log("error: " + err);
            };
        console.log( res);
        console.log("body: "+ body );
    })

    
}
// request.post('http://localhost/regularApi/', {form:{key:'value'}},(error, response, body)=>{
//     console.log(`error: ${error}`);
//     console.log(`response: ${response}`);
//     console.log(response);
    
//     console.log(`body: ${body}`);
// })