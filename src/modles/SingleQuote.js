import { types, flow, getSnapshot } from 'mobx-state-tree';
import { SingleQuoteObj } from './SingleQuoteObj'
import axios from 'axios'


export const SingleQuote = types.model('SingleQuote', {
    singleQuote: types.optional(types.array(SingleQuoteObj), []),
})
    .actions((sefl => ({
        fetchSingleQuote: flow(function* (quoteId) {
            const query = quoteId.replace('#', '%23');
            try {
                const response = yield axios.get(`https://quotes.instaforex.com/api/quotesTick?q=${query}`);


                const quote = response.data;
                sefl.singleQuote = quote
                // self.symbol = quote.symbol
                // self.bid = quote.bid
                // self.change = quote.change
                // self.digits = quote.digits
                // self.ask = quote.ask
                // self.lasttime = quote.lasttime

                console.log('KKKKKSingle', sefl.singleQuote);

            } catch (e) {

                console.log('Error', e);
            }
        })
    })))


