import request from './netwrok';

export function getSwiperList(params) {
    return request({
        url: '/home/swiperdata'
    })
}

export function getNavigator(params) {
    return request({
        url: '/home/catitems'
    })
}

export function getFloorData(params) {
    return request({
        url: '/home/floordata'
    })
}