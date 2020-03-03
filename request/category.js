import request from './netwrok';

export function getGoods(params) {
    return request({
        url: '/categories'
    })
}
