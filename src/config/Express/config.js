module.exports = {
    port: 3001,
    hostname: "localhost",
    callback: () => {
        console.log(`Express API Gateway Server Running on port ${this.port}`);
        return
    }
}