import axios, { AxiosResponse } from 'axios';

async function run() {

    console.log(`get request`);

    let getResult = <AxiosResponse>await axios({
        method: 'GET',
        url: `https://dso2yf67fd.execute-api.us-east-1.amazonaws.com/dev/tshandler/test`
    }).catch((err) => {
        console.log(`err : ${err}`);
    });


    console.log(`getResult : ${JSON.stringify(getResult.data, null, 4)}`);

    console.log(`posting`);

    let postResult = <AxiosResponse>await axios.post(
        `https://dso2yf67fd.execute-api.us-east-1.amazonaws.com/dev/posthandler/post`,
        { testValue: 1, testStringValue: "testString" })
        .catch((err) => {
            console.log(`err : ${err}`);
        });

    console.log(`postResult : ${JSON.stringify(postResult.data, null, 4)}`);

}

run();