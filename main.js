console.log("JavaScript connected!");

async function loadCryptoPrices() {
    try {
        const responses = await Promise.all([
            fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
            fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"),
            fetch("https://api.binance.com/api/v3/ticker/price?symbol=USDTUSDT")
        ]);

        const data = await Promise.all(responses.map(r => r.json()));

        const btc = parseFloat(data[0].price).toFixed(2);
        const eth = parseFloat(data[1].price).toFixed(2);
        const usdt = "1.00";

        const tickerHTML = `
            <img class="crypto-logo" src="https://cryptoicons.org/api/icon/btc/50" alt="BTC Logo">
            Bitcoin: $${btc}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img class="crypto-logo" src="https://cryptoicons.org/api/icon/eth/50" alt="ETH Logo">
            Ethereum: $${eth}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img class="crypto-logo" src="https://cryptoicons.org/api/icon/usdt/50" alt="USDT Logo">
            USDT: $${usdt}
        `;

        document.getElementById("ticker-content").innerHTML = tickerHTML;

    } catch (error) {
        document.getElementById("ticker-content").textContent =
            "Unable to load crypto prices";
        console.error("Error loading prices:", error);
    }
}

loadCryptoPrices();
setInterval(loadCryptoPrices, 20000);
