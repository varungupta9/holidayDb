var search = document.getElementById('search')
const HOLIDAY_URL = "https://holidayapi.com/v1/countries?key=73685e64-826d-4b6b-bf1c-3316c025d7a5"
search.addEventListener('keyup', ()=>serachCountry(search.value))
const HOLIDAY_BY_COUNTRY_URL = "https://holidayapi.com/v1/holidays?key=73685e64-826d-4b6b-bf1c-3316c025d7a5"

// navigate to home page
var back =document.getElementById('back')
back.addEventListener('click',routeBack)

function routeBack(){
    let showList = document.getElementById('ses')
    showList.style.display="block"
    let showHoliday = document.getElementById('ses2')
    showHoliday.style.display="none"
    let showButton = document.getElementById('back')
    showButton.style.display="none"
}

// fetch data via api and show results on basis of serach key words
async function serachCountry(searchValue){
try {
    document.getElementById('tbody').innerHTML=""
    if(searchValue.length>1){  
    var res = await fetch(HOLIDAY_URL+ "&search=" +searchValue)
    var result = await res.json()
    
    for(let i=0 ; i <result.countries.length ; i++){
        let countryCode = result.countries[i].code
        let countryName = result.countries[i].name
        let language = result.countries[i].languages[0]
        let flag = result.countries[i].flag
       createTable(countryCode,countryName,language,flag)
     
    }
    // create dynamic tables
    function createTable(code,country,language,organization){
         let tr = document.createElement('tr')
         let th = document.createElement('th')
         th.setAttribute('scope',"row")
         let td2 = document.createElement('td') 
         let td3 = document.createElement('td') 
         let image = document.createElement('img')
         image.setAttribute('src',organization) 
         let td4 = document.createElement('td') 
         td4.append(image)
         let button = document.createElement('button')
         button.setAttribute("type","button")
         button.setAttribute('class','btn btn-success')
         button.setAttribute('id','viewinfo')
         button.addEventListener('click', ()=>{viewinfo(code)})
         th.innerHTML=code
         td2.innerHTML=country 
         td3.innerHTML=language
         button.innerHTML="View Info"
         tr.append(th,td2,td3,td4,button)
         let tbody = document.getElementById('tbody')
         tbody.append(tr)
     }
     // show holiday list of selected country
     async function viewinfo(code){
       
        try {
            var info = await fetch(HOLIDAY_BY_COUNTRY_URL+ "&country=" + code +"&year=2020")
            var dataInfo = await info.json()
            let showList = document.getElementById('ses')
            showList.style.display="none"
            let showHoliday = document.getElementById('ses2')
            showHoliday.style.display="block"
            let showButton = document.getElementById('back')
            showButton.style.display="block"
            for(let i=0 ; i <dataInfo.holidays.length ; i++){
                let publicDay = "Yes"
                let holidayDate = dataInfo.holidays[i].observed
                let holidayWeek = dataInfo.holidays[i].weekday.date.name
                let holidayName = dataInfo.holidays[i].name
                let holidayPublic = dataInfo.holidays[i].public
                if(holidayPublic==="false"){publicDay="No"}
        
               createHolidayTable(holidayDate,holidayWeek,holidayName,holidayPublic)
             
            }
            // create holiday list table
        function createHolidayTable(holidayDate,holidayWeek,holidayName,holidayPublic){

            let tr = document.createElement('tr')
            let th = document.createElement('th')
            th.setAttribute('scope',"row")
            let td2 = document.createElement('td') 
            let td3 = document.createElement('td') 
            let td4 = document.createElement('td')
            th.innerHTML=holidayDate
            td2.innerHTML=holidayWeek 
            td3.innerHTML=holidayName
            td4.innerHTML=holidayPublic
            tr.append(th,td2,td3,td4)
            let tbodyList = document.getElementById('tbody-list')
            tbodyList.append(tr) 

        }
        } catch (error) {
            console.log(error)
        }

     }
}
}
 catch (error) {
    console.log(error)
}
}


