import Vue from 'vue';
import Vuex from 'vuex';

import Eth from 'ethjs';

import { db } from './main';

Vue.use(Vuex);

const tokenAddress = '0xdd23064be80B47BB725774CA11aAD2dd56AF2884';
const tokenAbi = require('./assets/abi/tokenAbi');

const crowdsaleAddress = '0x2E9102f2f13EF6401B6D6E5D459D007037A7883C';
const crowdsaleAbi = require('./assets/abi/crowdsaleAbi');

const bnToString = (bn) => bn[0].toString(10);
const bnToEther = (bn) => Eth.fromWei(bn[0], 'ether');

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

            const eth = new Eth(new Eth.HttpProvider(`https://${state.network}.infura.io`));
            const contract = eth.contract(tokenAbi).at(tokenAddress);

            console.log(await contract.decimals());

            commit('commit-token-smart-contract', {
                name: (await contract.name())[0],
                symbol: (await contract.symbol())[0],
                decimals: bnToString(await contract.decimals()),
                founderTokensLockedUntil: bnToString(await contract.founderTokensLockedUntil()),
                totalSupply: bnToEther(await contract.totalSupply()),
                transfersEnabled: (await contract.transfersEnabled())[0],
                investxPlatform: (await contract.investxPlatform())[0]
            });
        },
        async ['load-crowdsale-smart-contract'] ({commit, dispatch, state, rootState}) {
            const eth = new Eth(new Eth.HttpProvider(`https://${state.network}.infura.io`));
            const contract = eth.contract(crowdsaleAbi).at(crowdsaleAddress);

            commit('commit-crowdsale-smart-contract', {
                openingTime: bnToString(await contract.openingTime()),
                token: (await contract.token())[0],
                wallet: (await contract.wallet())[0],
                raisedInEther: bnToEther(await contract.weiRaised()),
                rate: bnToString(await contract.rate()),
                minContributionInEther: bnToEther(await contract.minContribution()),
                inPreSale: bnToString(await contract.inPreSale()),
                preSaleRate: bnToString(await contract.preSaleRate()),
                isCrowdsaleOpen: (await contract.isCrowdsaleOpen())[0],
                closingTime: bnToString(await contract.closingTime()),
                owner: (await contract.owner())[0],
                paused: (await contract.paused())[0]
            });
        },
        async ['load-db'] ({commit, dispatch, state, rootState}) {
            console.log(db.ref(`network/ropsten`));
        }
    }
});
