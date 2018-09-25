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
        }
    },
    mutations: {
        ['commit-token-smart-contract'] (state, tokenData) {
            state.tokenData = {...tokenData};
        },
    },
    actions: {
        async ['load-token-smart-contract'] ({commit, dispatch, state, rootState}) {
            console.log('load-token-smart-contract');

            const provider = new ethers.providers.InfuraProvider('ropsten'); // set-up to point at test net
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
        }
    }
});
