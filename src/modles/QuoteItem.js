import { types } from 'mobx-state-tree'

export const QuoteItem = types.model('QuoteItem', {
    symbol: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    digits: types.optional(types.number, 0),
    trade: types.optional(types.number, 0),
    type: types.optional(types.number, 0),
});


