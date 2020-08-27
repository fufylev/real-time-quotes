import { types, flow, getSnapshot } from 'mobx-state-tree';

import axios from 'axios'

export const SingleQuoteObj = types.model('SingleQuoteObj', {
    symbol: types.optional(types.string, ''),
    bid: types.optional(types.number, 0),
    change: types.optional(types.number, 0),
    digits: types.optional(types.number, 0),
    ask: types.optional(types.number, 0),
    lasttime: types.optional(types.number, 0),
    change24h: types.optional(types.number, 0),
})



