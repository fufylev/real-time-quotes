import { types, flow } from 'mobx-state-tree';
import { Quete } from './Quote'
import { remove } from 'mobx';
import io from "socket.io-client";
let newArray;
let newData = [];
export const Quotes = types.model('Quotes', {
    quotesList: types.optional(types.array(Quete), []),
})
    // .views((self) => ({
    //     get quotesAllData() {

    //         // console.log("Dddddmmmmm", self.quotesList[0])

    //         // if (newData.length <= 0) {
    //         //     newData.push(newArray)
    //         // } else {
    //         //     newData.forEach((element, index) => {
    //         //         if (newArray.symbol == element.symbol) {

    //         //             newData.splice(index, 1, newArray)
    //         //         } else {
    //         //             // newData.push(data)
    //         //             // newData.push(newArray)
    //         //         }
    //         //     })
    //         // }

    //         console.log('HHHHHH', newData);
    //         return self.quotesList
    //     }
    // }))
    .actions((self) => ({
        updateQuotes(data) {
            newArray = data
            let exists = false
            for (let index = 0; index < self.quotesList.length; index++) {
                if (data.symbol == self.quotesList[index].symbol) {
                    self.quotesList.splice(index, 1, data)
                    exists = true
                }
            }
            if (!exists) {
                self.quotesList.push(data)
            }
        },

        afterCreate() {
            self.socketIoConnection();
        },
        socketIoConnection: flow(function* () {
            let socket;
            try {
                socket = io("https://qrtm1.ifxid.com:8443", {
                    forceNew: true,
                })
            } catch (error) {

            }
            socket.on('connect', () => {
                socket.emit('subscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD',
                    'AUDCAD', 'GBPCHF', 'GBPCAD', 'USDRUR', 'NZDDKK', 'AUDHKD'])
            });
            socket.on('quotes', (data) => {


                let newUpdatedData = {
                    symbol: data.msg.symbol,
                    bid: data.msg.bid,
                    change: data.msg.change,
                    percentage: data.msg.change,
                };
                self.updateQuotes(newUpdatedData)
            });
        })
    }))
