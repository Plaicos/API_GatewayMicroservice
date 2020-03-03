module.exports = {
    port: 80,
    hostname: "localhost",
    callback: () => {
        console.log(`Express API Gateway Server Running on port ${this.port}`);
        return
    }
}