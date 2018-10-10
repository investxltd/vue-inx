import Vue from 'vue';
import Vuex from 'vuex';

import Eth from 'ethjs';
import ethjsUnit from 'ethjs-unit';

import firebase from 'firebase';

import { db } from './main';

Vue.use(Vuex);

const tokenAbi = require('./assets/abi/tokenAbi');

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
            paused: null
        },
        db: {
            crowdsaleAbi: null,
            crowdsaleAddress: null,
            tokenAbi: null,
            tokenAddress: null
        },
        network: 'ropsten',
        userData: null
    },
    mutations: {
        ['commit-token-smart-contract'] (state, tokenData) {
            state.tokenData = {...tokenData};
        },
        ['commit-crowdsale-smart-contract'] (state, crowdsaleData) {
            state.crowdsaleData = {...crowdsaleData};
        },
        ['commit-db'] (state, db) {
            state.db = {...db};
        },
        ['commit-user-data'] (state, userData) {
            state.userData = userData;
        }
    },
    actions: {
        async ['bootstrap'] ({commit, dispatch, state, rootState}) {
            await dispatch('load-db');
            dispatch('load-token-smart-contract');
            dispatch('load-crowdsale-smart-contract');
            if (firebase.auth().currentUser) {
                dispatch('load-user-data', firebase.auth().currentUser.uid);
            }

            // Every 5 seconds check if the main account has changed
            setInterval(() => {
                dispatch('load-token-smart-contract');
                dispatch('load-crowdsale-smart-contract');
            }, 5000);
        },
        async ['load-token-smart-contract'] ({commit, dispatch, state, rootState}) {

            const eth = new Eth(new Eth.HttpProvider(`https://${state.network}.infura.io`));
            const contract = eth.contract(tokenAbi).at(state.db.tokenAddress);

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
            const contract = eth.contract(crowdsaleAbi).at(state.db.crowdsaleAddress);

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
            await db.ref(`network/${state.network}`).once('value',
                (snapshot) => commit('commit-db', snapshot.val()),
                (errorObject) => console.error('The read failed: ' + errorObject.code)
            );
        },
        async ['load-user-data'] ({commit, dispatch, state, rootState}, uid) {
            // FIXME can we call this multiple times - handle listeners?
            const userDb = db.ref(`users/${uid}`);
            userDb.on('value',
                (snapshot) => {
                    commit('commit-user-data', {
                        ...snapshot.val(),
                        ...firebase.auth().currentUser
                    });
                },
                (errorObject) => console.error('The read failed: ' + errorObject.code)
            );
        },
        async ['contribute'] ({commit, dispatch, state, rootState}, valInEth) {

            // FIXME this will work for now
            if (typeof web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                window.web3 = new Web3(web3.currentProvider);
                const eth = new Eth(window.web3.currentProvider);
                const contract = eth.contract(crowdsaleAbi).at(state.db.crowdsaleAddress);

                const coinbase = await eth.coinbase();

                const valInWei = ethjsUnit.toWei(valInEth, 'ether');
                console.log(valInEth);
                console.log(valInWei.toString(10));

                const tx = await contract.buyTokens(coinbase, {value: valInWei, from: coinbase})
                console.log(tx);
            } else {

            }
        },
    },
    getters: {
        currentRate: (state) => () => {
            if (state.crowdsaleData.preSaleRate && state.crowdsaleData.inPreSale) {
                return state.crowdsaleData.preSaleRate;
            } else if (state.crowdsaleData.rate) {
                return state.crowdsaleData.rate;
            }
            return null;
        }
    }
});
