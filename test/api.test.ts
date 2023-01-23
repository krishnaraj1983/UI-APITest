import { spec } from "pactum"
import { RootObj } from "./root"
import * as bandnameobj from './data.json'


describe("Validate festivals  tests", () => {
    beforeAll(async () => {})

    test("T1 test create deliveryid", async () => {
      const res =   await spec()
      .get("https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals")
      .withRequestTimeout(8000)
      .expectStatus(200)
      .withHeaders("content-type", "application/json")
      .toss()
     console.log("response body",JSON.stringify(res.body[0]))
     console.log(JSON.stringify(res.body))
    const resObj: RootObj = <RootObj>res.body
    
    console.log("Verify Response=>"+JSON.stringify(resObj))

    console.log("resObj.length=>",resObj.length)

    for (var i = 0; i < bandnameobj.bandname.length; i++) {
       console.log(bandnameobj.bandname[i])
       const val = verifyBandNames(resObj,bandnameobj.bandname[i])
       expect(val).toBeTruthy

     }

 
    })
})

async function verifyBandNames(resObj:any,bandNmae:string):Promise<any> {
    let isPresent: boolean =false
    for(let i=0;i<=resObj.length;i++) {

        try {
            for(let j=0;j<=resObj[i].bands.length;j++){
                if(bandnameobj.bandname[i]===bandNmae){
                    isPresent = true
                    break
                   }
            }
            if( isPresent === true)
              break
            
          } catch (error) {
            continue
            console.log("Error=>",error)
          }
    
        }
    
    
        return isPresent
} 


