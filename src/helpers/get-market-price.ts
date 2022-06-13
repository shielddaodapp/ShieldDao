import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { mimTime } from "../helpers/bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const mimTimeAddress = mimTime.getAddressForReserve(networkID);

    const pairContract = new ethers.Contract(mimTimeAddress, LpReserveContract, provider);

    const reserves = await pairContract.getReserves();
    console.log(reserves[0]);
    console.log(reserves[1]);

    const marketPrice = reserves[0] / reserves[1];
    console.log(marketPrice);

    return marketPrice;
}
