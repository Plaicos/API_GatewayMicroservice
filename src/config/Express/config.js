module.exports = {
    port: 3001,
    hostname: "0.0.0.0",
    callback: (port) => {
        return function () {
            console.log(`Express API Gateway Server Running on port ${port}`);
            return
        }
    }
}