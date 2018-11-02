import Vue from 'vue';
import Vuex from 'vuex';

import Eth from 'ethjs';
import ethjsUnit from 'ethjs-unit';

import firebase from 'firebase';
import { db } from './main';

import _ from 'lodash';

Vue.use(Vuex);

const tokenAbi = require('./assets/abi/tokenAbi');
const crowdsaleAbi = require('./assets/abi/crowdsaleAbi');

const bnToString = (bn) => bn[0].toString(10);
const bnToEther = (bn) => Eth.fromWei(bn[0], 'ether');

/* global web3, Web3 */

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
            rate: 203,
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
        userData: null,
        accountBalance: null,
        accountKyc: null,
        contributeInfo: null
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
            
            db.ref(`users/${userData.uid}/email`).set(userData.email);
            db.ref(`users/${userData.uid}/emailVerified`).set(userData.emailVerified);
        },
        ['commit-account-balance'] (state, accountBalance) {
            state.accountBalance = accountBalance;
        },
        ['commit-account-kyc'] (state, accountKyc) {
            state.accountKyc = accountKyc;
        },
        ['commit-contribute-message'] (state, contributeInfo) {
            state.contributeInfo = contributeInfo;
        }
    },
    actions: {
        async ['bootstrap'] ({commit, dispatch, state, rootState}) {
            await dispatch('load-db'); // include one time load of userData

            // dispatch('load-token-smart-contract');
            // dispatch('load-crowdsale-smart-contract');
            // dispatch('load-account-balance');
            // dispatch('load-account-kyc');

            if (firebase.auth().currentUser) {
                dispatch('load-user-data', firebase.auth().currentUser.uid);
            }

            // Every 5 seconds check if the main account has changed
            // setInterval(() => {
                // dispatch('load-token-smart-contract');
                // dispatch('load-crowdsale-smart-contract');
                // dispatch('load-account-balance');
                // dispatch('load-account-kyc');
            // }, 5000);
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
        async ['load-account-balance'] ({commit, dispatch, state, rootState}) {
            if (state.userData) {
                const eth = new Eth(new Eth.HttpProvider(`https://${state.network}.infura.io`));
                const contract = eth.contract(tokenAbi).at(state.db.tokenAddress);

                // use the registered eth address
                const myBalance = await contract.balanceOf(state.userData.ethAccount);
                commit('commit-account-balance', bnToEther(myBalance));
            }
        },
        async ['load-account-kyc'] ({commit, dispatch, state, rootState}) {
            if (state.userData) {
                const eth = new Eth(new Eth.HttpProvider(`https://${state.network}.infura.io`));
                const contract = eth.contract(crowdsaleAbi).at(state.db.crowdsaleAddress);

                // use the registered eth address
                const myKyc = await contract.kyc(state.userData.ethAccount);
                commit('commit-account-kyc', myKyc[0]);
            }
        },
        async ['load-db'] ({commit, dispatch, state, rootState}) {
            await db.ref(`network/${state.network}`).once('value',
                (snapshot) => commit('commit-db', snapshot.val()),
                (errorObject) => console.error('The read failed: ' + errorObject.code)
            );

            if (firebase.auth().currentUser) {
                await db.ref(`users/${firebase.auth().currentUser.uid}`).once('value',
                    (snapshot) => {
                        commit('commit-user-data', {
                            ...snapshot.val(),
                            ...firebase.auth().currentUser
                        });
                    },
                    (errorObject) => console.error('The read failed: ' + errorObject.code)
                );
            }
        },
        async ['load-user-data'] ({commit, dispatch, state, rootState}, uid) {
            // FIXME can we call this multiple times - handle listeners?
            db.ref(`users/${uid}`).on('value',
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
            if (window.web3 && state.userData) {
                // Use MetaMask's (or similar) provider
                const eth = new Eth(window.web3.currentProvider);
                const contract = eth.contract(crowdsaleAbi).at(state.db.crowdsaleAddress);

                const valInWei = ethjsUnit.toWei(valInEth, 'ether');

                const tx = await contract.buyTokens(
                    state.userData.ethAccount,
                    {value: valInWei, from: state.userData.ethAccount}
                );

                commit('commit-contribute-message', {
                    message: 'You transaction has been submitted',
                    tx: tx,
                    state: 'info'
                });

                const txPoller = setInterval(async function () {
                    let receipt = await eth.getTransactionReceipt(tx);

                    if (receipt) {
                        console.log(receipt);
                        commit('commit-contribute-message', {
                            message: 'You transaction has been confirmed',
                            tx: tx,
                            receipt: receipt,
                            state: 'success'
                        });

                        clearInterval(txPoller);
                        setTimeout(() => commit('commit-contribute-message', null), 30000);
                    }
                }, 500);
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
