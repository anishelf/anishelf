const dns = require("dns");
const net = require("net");

const host = "ep-restless-bonus-ax5grc3p-pooler.c-4.us-east-2.aws.neon.tech";

dns.lookup(host, (err, address) => {
    if (err) {
        console.error("DNS failed:", err);
        return;
    }

    console.log("Resolved IP:", address);

    const socket = new net.Socket();

    socket.setTimeout(10000);

    socket.on("connect", () => {
        console.log("✅ Port 5432 is reachable");
        socket.destroy();
    });

    socket.on("timeout", () => {
        console.log("❌ Connection timed out");
        socket.destroy();
    });

    socket.on("error", (err) => {
        console.log("❌ Socket error:", err.message);
    });

    socket.connect(5432, host);
});