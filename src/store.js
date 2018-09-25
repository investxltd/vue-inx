import Vue from 'vue';
import Vuex from 'vuex';

import ethers from 'ethers';

Vue.use(Vuex);

const tokenAddress = '0xdd23064be80B47BB725774CA11aAD2dd56AF2884';
const tokenAbi = require('./assets/abi/tokenAbi.json');

const crowdsaleAddress = '0x2E9102f2f13EF6401B6D6E5D459D007037A7883C';
const crowdsaleAbi = require('./assets/abi/contractAbi.json');

export default new Vuex.Store({
    state: {
        tokenData: {
            name: null,
            symbol: null,
            decimals: null,
            founderTokensLockedUntil: null,
            totalSupply: null,
            transfersEnabled: null,
            investxPlatform: null
        },
        crowdsaleData: {
            openingTime: null,
            token: null,
            wallet: null,
            raisedInEther: null,
            rate: null,
            minContributionInEther: null,
            inPreSale: null,
            preSaleRate: null,
            isCrowdsaleOpen: null,
            closingTime: null,
            owner: null,
            paused: null,
        },
        network: 'ropsten'
    },
    mutations: {
        ['commit-token-smart-contract'] (state, tokenData) {
            state.tokenData = {...tokenData};
        },
        ['commit-crowdsale-smart-contract'] (state, crowdsaleData) {
            state.crowdsaleData = {...crowdsaleData};
        },
    },
    actions: {
        async ['load-token-smart-contract'] ({commit, dispatch, state, rootState}) {
            const provider = new ethers.providers.InfuraProvider(state.network); // set-up to point at test net
            const contract = new ethers.Contract(tokenAddress, tokenAbi, provider);

            commit('commit-token-smart-contract', {
                name: await contract.name(),
                symbol: await contract.symbol(),
                decimals: await contract.decimals(),
                founderTokensLockedUntil: (await contract.founderTokensLockedUntil()).toNumber() * 1000,
                totalSupply: ethers.utils.formatEther((await contract.totalSupply()).toString()),
                transfersEnabled: await contract.transfersEnabled(),
                investxPlatform: await contract.investxPlatform()
            });
        },
        async ['load-crowdsale-smart-contract'] ({commit, dispatch, state, rootState}) {
            const provider = new ethers.providers.InfuraProvider(state.network); // set-up to point at test net
            const contract = new ethers.Contract(crowdsaleAddress, crowdsaleAbi, provider);

            commit('commit-crowdsale-smart-contract', {
                openingTime: (await contract.openingTime()).toNumber() * 1000,
                token: await contract.token(),
                wallet: await contract.wallet(),
                raisedInEther: ethers.utils.formatEther((await contract.weiRaised()).toString(10)),
                rate: (await contract.rate()).toNumber(),
                minContributionInEther: ethers.utils.formatEther((await contract.minContribution()).toString(10)),
                inPreSale: await contract.inPreSale(),
                preSaleRate: (await contract.preSaleRate()).toNumber(),
                isCrowdsaleOpen: await contract.isCrowdsaleOpen(),
                closingTime: (await contract.closingTime()).toNumber() * 1000,
                owner: await contract.owner(),
                paused: await contract.paused()
            });
        }
    }
});
