const http = require("http");
const app = require("./App");

const nomaPort = val=>{
    const port = parseInt(val,10);
    if (isNaN(port)) {
        return val;
    }
    if (port>0) {
        return port;
    }
    return false;
}
const Valport = nomaPort (process.env.PORT || "3000");
app.set("port",Valport);
const server = http.createServer(app);
server.on("listening", ()=>{
    const address = server.address();
    const bin = typeof address === "string"? "pipe"+ address : "port"+Valport;
    console.log("listening on "+ bin);
});
server.listen(Valport);
