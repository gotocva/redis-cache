const axios = require('axios');

let totalRespTime = 0;
const limit = 3;

for (let i = 1; i <= limit; i++) {

    const startHrTime = process.hrtime();

    axios.get('http://127.0.0.1:3001/search-user?email=Rolando_Boehm@gmail.com').then(resp => {

        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        console.log(elapsedTimeInMs);
        //console.dir(resp);
        totalRespTime = totalRespTime + elapsedTimeInMs;

        if (i === limit) {
            let avgRespTime = totalRespTime / limit;
            console.log("average resp time " + avgRespTime);
        }
    });
};

console.dir(process.argv)