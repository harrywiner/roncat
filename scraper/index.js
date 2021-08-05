const upsertWotds = require('./mongo')
const { ReadOED, ReadUrbanDictionary } = require('./scimmer');

(async () => {
    var [oeds, uds] = await Promise.all([ReadOED(), ReadUrbanDictionary()])
        .catch(err => console.error(err))

    uds.push(oeds)
    upsertWotds(uds)
})()