import { types } from 'mobx-state-tree'

export const Quete = types.model('Quote', {
    symbol: types.optional(types.string, ''),
    bid: types.optional(types.number, 0),
    change: types.optional(types.number, 0),
    percentage: types.optional(types.number, 0),
});


