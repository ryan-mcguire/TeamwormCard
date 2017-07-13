// GetDataAsync.js
import axios from 'axios';

const getDataAsync = (url, component, dataProcessor)  => {
    console.log("getDataAsync(" + url + ", dataProcessor)");

    axios
        .get(url, 
             {headers: {
                 "Authorization": "Basic dHdwX1NWa0c4MGprZmJXa0E4UE4xb1VWRXBYT2JLOTU6",
                 "Accept": "text/plain",
                 "Content-Type": "text/plain"
             }} )
        .then(function(httpresponse) { 
            dataProcessor(httpresponse, component); 
        }) 
        .catch(function(httpresponse) {
            // TODO: Handle 307 - Temporarily Redirected return code
            if (httpresponse instanceof Error) {
                console.log("getDataAsync: URL: " + url + ", Error with ajax call:", httpresponse.message);
            } else {
                console.log("getDataAsync: URL: " + url + ", request problem, response is: " + httpresponse.status);
            }
            dataProcessor(null, component); 
        });
}

export default getDataAsync;