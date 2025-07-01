import { atom , selector } from 'recoil'

export const counterAtom = atom({
    default:0,
    key:'counter'
})

export const eventSelector = selector({
    key:'isEvenSelector',
    get: function({ get }){
        const currentCount = get(counterAtom);
        return currentCount%2 == 0;
    }
})