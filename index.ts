
import executor from "./lib/executor"
import { Flow } from "./lib/types/flow"
import getDriver from "./lib/driver/driver" 

getDriver().then(driver => {
    const flow: Flow = {
        name: "test-run",
        actions: [
            {
                type: "NAVIGATE",
                parameters: {
                    url: "https://aap.nl"
                }
            },
            {
                type: "GET_DATA",
                parameters: {
                    xpath: '//*[@id="main"]/div/div/section/div/div/div/div/div/div/div/div/div/div/section[3]/div/div/div/div/div/div/div/h2',
                    dataKey: "message"
                },
                returnsData: true
            },
            {
                type: "CLOSE",
            },

        ]
    }
    
    executor(driver, flow).then(result => {
        console.info(JSON.stringify(result, null, 2))
    })
})

