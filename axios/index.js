const axios = require('axios');

/**
 * 发起一个GET请求
 */
axios.get('/user?id=10000').then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

// or
axios.get('/user', {
    params: {
        id: '10000'
    }
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});


/**
 * 发起一个POST请求
 */
axios.post('/user', {
    id: '10000',
    name: 'xxx'
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});


/**
 * 同时发起多个
 */
function getUserAccount() {
    return axios.get('/user/1234');
}

function getUserPermissions() {
    return axios.get('/user/12334343/2e23e23e');
}

axios.all([getUserAccount(), getUserPermissions()])
.then(axios.spread((acct, perms) => {
    //
}));