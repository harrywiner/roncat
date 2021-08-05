const puppeteer = require('puppeteer');
require('dotenv').config()
const { DateTime } = require("luxon");


const UD_URL = process.env.UD_URL;

async function ReadUrbanDictionary() {
    if (!UD_URL) throw new Error("Missing environment variable")
    var options = {
        userDataDir: './scraper/ud_data'
    }

    if (process.env.NODE_ENV === 'production') {
        options = {
            args: ['--no-sandbox'],
            ...options
        }
    } else if (process.env.NODE_ENV === 'development') {
        options = {
            devtools: true,
            headless: false,
            slowMo: 250,
            ...options
        }
    }
    return puppeteer.launch(options)
        .then(async browser => {
            const page = await browser.newPage()
            await page.setRequestInterception(true)
            page.on('request', (request) => {
                // removes any css or images
                if (request.resourceType() === 'document') {
                    request.continue()
                } else {
                    request.abort()
                }
            })
            await page.goto(UD_URL)

            // find words of the day 
            let wotds = await page.evaluate(() => {
                debugger
                let results = [];
                let items = document.querySelectorAll('a.word');
                items.forEach((item) => {
                    results.push({
                        word: item.innerText,
                        link: item.href,
                        type: "UD"
                    });
                });
                return results;
            })

            // get their corresponding dates
            let dates = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('div.ribbon');
                items.forEach((item) => {
                    results.push(item.innerText);
                });
                return results;
            })

            wotds.map((wotd, i) => {
                wotd.date = UDDateToUTC(dates[i])
                return wotd
            })

            browser.close()
            return wotds
        })
        .catch(err => console.error(err))


}

const OED_URL = process.env.OED_URL
async function ReadOED() {
    if (!OED_URL) throw new Error("Missing environment variable")
    var options = {
        userDataDir: './scraper/oed_data'
    }

    if (process.env.NODE_ENV === 'production') {
        options = {
            args: ['--no-sandbox'],
            ...options
        }
    } else if (process.env.NODE_ENV === 'development') {
        options = {
            devtools: true,
            headless: false,
            slowMo: 250,
            ...options
        }
    }
    return puppeteer.launch(options)
        .then(async browser => {
            const page = await browser.newPage()
            await page.setRequestInterception(true)
            page.on('request', (request) => {
                if (request.resourceType() === 'document') {
                    request.continue()
                } else {
                    request.abort()
                }
            })
            await page.goto(OED_URL).catch(err => console.log(err))
            await page.screenshot({ path: './scraper/screenshot.png' })
            let wotd = await page.evaluate(() => {
                let word = document.querySelectorAll('span.hw')[0];
                let link = document.querySelectorAll('p.word')[0].firstChild.href;
                let result = {
                    word: word.innerText,
                    type: "OED",
                    link
                };
                return result;
            }).catch(err => {
                console.log(err)
                // browser.close()
            })



            wotd.date = new Date().getTime()


            browser.close()
            return wotd
        })
        .catch(err => console.error(err))

}

function UDDateToUTC(date) {
    // Jul 25 Word of the Day -> 42069696969
    var exp = new RegExp(/\S{3}\s\d+/)
    return DateTime.fromFormat(date.match(exp)[0], 'MMM d', { zone: "GMT" }).ts
}

// ReadOED().then((wotd) => {
//     console.log(wotd)
// })
// 
// ReadUrbanDictionary().then(wotd => {
//     console.log(wotd)
// })

module.exports = { ReadOED, ReadUrbanDictionary }