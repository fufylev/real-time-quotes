import { types, flow, getSnapshot, getRoot } from 'mobx-state-tree';
import { QuoteItem } from './QuoteItem'
import { remove } from 'mobx';
import axios from 'axios'


export const QuoteItemList = types.model("QuoteItemList", {
    quoteItemMainList: types.optional(types.array(QuoteItem), []),
    quoteItemList: types.optional(types.array(QuoteItem), []),
    firstIndex: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false)

})

    .actions((self) => ({
        quoteListApiCall() {

            console.log("KKKKmmm", getRoot(self).SingleQuote);
            self.quoteItemList = []
            self.fetchQuoteList()

        },
        fetchQuoteList: flow(function* () {

            try {
                const response = yield axios.get('https://quotes.instaforex.com/api/quotesList')
                const quotes = response.data.quotesList.sort((a, b) => a.symbol > b.symbol ? 1 : -1);
                self.quoteItemMainList = quotes
                // self.quoteItemList = quotes.slice(0, 5)

                self.quoteSlice(0, 5)
                self.loading = true

            } catch (e) {
                self.error = true
                console.log('Error', e);
            }
        }),
        quoteSlice: flow(function* (firstIndex, lastIndex) {

            let quotes = self.quoteItemMainList
            self.quoteItemList = getSnapshot(self.quoteItemMainList).slice(firstIndex, lastIndex)
            self.firstIndex = firstIndex


        }),
        pagination(text) {
            if (text == 'next') {
                self.quoteSlice(self.firstIndex + 5, self.firstIndex + 10)
            }
            else {
                self.quoteSlice(self.firstIndex - 5, self.firstIndex)
            }
        },
        searchQuote(text) {
            let quoteAll = getSnapshot(self.quoteItemMainList)
            let filteredQuote = quoteAll.filter(item => item.symbol.includes(text.toUpperCase()))
            self.quoteItemList = filteredQuote.length >= 5 ? filteredQuote.slice(0, 5) : filteredQuote
            console.log("KKKKKGGGG", self.quoteItemList);


        }
    }))

    // .actions((self) => ({

    //     function quoteListApiCall() {
    //         console.log("KKKKKKK", self);
    //         // self.fetchQuoteList()

    //     }

    //     fetchQuoteList: flow(function* () {
    //         try {
    //             const response = yield axios.get('https://quotes.instaforex.com/api/quotesList')
    //             const quotes = response.data.quotesList.sort((a, b) => a.symbol > b.symbol ? 1 : -1);
    //             console.log("KKKKKQue", quotes);


    //         } catch (e) {

    //             console.log('Error', e);
    //         }
    //     })



    //     return { quoteListApiCall }

    // }))