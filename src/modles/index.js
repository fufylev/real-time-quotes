import { Quotes } from "./Quotes";
import { QuoteItemList } from './QuoteItemList'
import { SingleQuote } from './SingleQuote'

const quotes = Quotes.create();
const quoteItemList = QuoteItemList.create();
const singleQuote = SingleQuote.create();

export const store = {
    quotes,
    quoteItemList,
    singleQuote
};

