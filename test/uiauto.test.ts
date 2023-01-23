
import { chromium,Page } from 'playwright';
import { spec } from "pactum"
import { RootObj } from "./root"

describe('festival test suite', () => {
  test("verify band name ", async () => {
    // calling the api using pactum js library
    const res = await requestHandler()
    // converting response into the models
    const resObj: RootObj = <RootObj>res.body
    const browser = await chromium.launch({
          headless: false
      })
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('http://localhost:4200/festivals');
      await page.waitForLoadState('networkidle');
      
      const items = await page.$$('//app-festivals/ol/li')

      for (let i = 1; i <= items.length; i++) {
        page.locator("//ol/li["+i+"]").waitFor
        const valobj =  await page.$("//ol/li["+i+"]")

        const cc: string[] | undefined  = (await valobj?.innerText())?.split("\n")
        console.log(cc?.[0])
        console.log(cc?.[1])
        //Verifying th UI content with data which we got it in the intial call
        const re = await verifyBandNames(resObj,cc?.[0])
        expect(re).toBeTruthy()
        const rew = await verifyParentNames(resObj,cc?.[1])
        expect(rew).toBeTruthy()
        }
  })
})

async function requestHandler():Promise<any> {
  var res;
  try {
      res =   await spec()
        .get("https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals")
        .withRequestTimeout(10000)
        .withHeaders("content-type", "application/json")
        .toss()
    
} catch (error){ 
 
  console.log("Error=>",error)

}
        return res
} 

async function verifyBandNames(resObj:any,bandName:any):Promise<any> {
    let isPresent: boolean =false
    console.log("length=>",resObj.length)
    for(let i=0;i<=resObj.length;i++) {

        try {
            for(let j=0;j<=resObj[i].bands.length;j++){
                if(resObj[i].bands[j].name===bandName){
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

async function verifyParentNames(resObj:any,bandName:any):Promise<any> {
    let isPresent: boolean =false
    for(let i=0;i<=resObj.length;i++) {

        try {
       
                if(resObj[i].name===bandName){
                    isPresent = true
                    break
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