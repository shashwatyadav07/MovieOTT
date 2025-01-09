const fs = window.require('fs')


const $_FILE_NAME = 'profileData.json';

const data = fs.readFileSync($_FILE_NAME);
const jsonData = JSON.parse(data)

console.log('Before adding data', data);


jsonData.profiles.push({
    id:123,
    name:'venkat',
    age:18,
    pass:1234
})

fs.writeFileSync($_FILE_NAME,JSON.stringify(jsonData),'utf-8',(err)=>{
    if (err) throw err;
    console.log('Data added to file');
})


const update_data = fs.readFileSync($_FILE_NAME);
const updated_jsonData = JSON.parse(update_data);
console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));