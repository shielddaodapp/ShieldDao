import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import MimIcon from "../../assets/tokens/MIM.svg";
import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import AvaxTimeIcon from "../../assets/tokens/TIME-AVAX.svg";

import { StableBondContract, LpBondContract, WavaxBondContract, StableReserveContract, LpReserveContract } from "../../abi";

// export const mim = new StableBond({
//     name: "mim",
//     displayName: "MIM",
//     bondToken: "MIM",
//     bondIconSvg: MimIcon,
//     bondContractABI: StableBondContract,
//     reserveContractAbi: StableReserveContract,
//     networkAddrs: {
//         [Networks.RINKEBY]: {
//             bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
//             reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
//         },
//     },
//     tokensInStrategy: "60500000000000000000000000",
// });

export const mim = new StableBond({
    name: "dai",
    displayName: "DAI",
    bondToken: "DAI",
    bondIconSvg: MimIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.RINKEBY]: {
            bondAddress: "0xCaC53103E23E53A5BE72Fd62f7bc0cD25A668D0e",
            reserveAddress: "0x4019D3C6b9c0f65A615b08BaDb06e22D59795f10",
        },
    },
    tokensInStrategy: "60500000000000000000000000",
});

export const wavax = new CustomBond({
    name: "wavax",
    displayName: "wAVAX",
    bondToken: "AVAX",
    bondIconSvg: AvaxIcon,
    bondContractABI: WavaxBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.RINKEBY]: {
            bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
            reserveAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const mimTime = new LPBond({
    name: "dai_sdd_lp",
    displayName: "SDD-DAI LP",
    bondToken: "SDD",
    bondIconSvg: MimTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.RINKEBY]: {
            //bonddeposit
            bondAddress: "0xa3FBc084995453CCe38c969402C62152c3d4356e",

            //lp
            reserveAddress: "0xaB05Cf82B23B4c047Ee67e72C9859Ae62F03B19d",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export const avaxTime = new CustomLPBond({
    name: "avax_time_lp",
    displayName: "TIME-AVAX LP",
    bondToken: "AVAX",
    bondIconSvg: AvaxTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.RINKEBY]: {
            bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
            reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export default [mimTime, mim];
// export default [mimTime];
