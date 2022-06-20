import axios from "axios";

const cache: { [key: string]: number } = {};
let res = 0;
export const loadTokenPrices = async (token?: string) => {
    // const url = "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2,olympus,magic-internet-money&vs_currencies=usd";
    const url = `https://api.pancakeswap.info/api/v2/tokens/${token ? token : "0x55d398326f99059fF775485246999027B3197955"}`;

    const { data } = await axios.get(url);

    // cache["AVAX"] = data["avalanche-2"].usd;
    res = data.data.price;
};

export const getTokenPrice = (symbol: string): number => {
    return Number(res);
    // return 0.001;
};
