var url = "https://finans.truncgil.com/today.json";
var alis=[];
var satis=[];

var data = fetch (url)
.then(res => {
    return res.json();
})
.then(data =>{

const keys = Object.keys(data);
const values = Object.values(data);


var countResponse = values.length;

for(let i=1;i<countResponse;i++)
{
    values[i].Alış=parseFloat(values[i].Alış);
    values[i].Satış=parseFloat(values[i].Satış);
    alis[i]=values[i].Alış;
    satis[i]=values[i].Satış;
}
    createLıne(keys,values);
});


 setInterval(()=>{
console.log("poa");
var data = fetch (url)
.then(res => {
    return res.json();
})
.then(data =>{


const keys = Object.keys(data);
const values = Object.values(data);


var countResponse = values.length;

for(let i=1;i<countResponse;i++)
{
    values[i].Alış=parseFloat(values[i].Alış);
    values[i].Satış=parseFloat(values[i].Satış);

    alis[i]=values[i].Alış;
    satis[i]=values[i].Satış; 

    // Ücretsiz olarak kullandığım api'de günlük veriler yer aldığı ve anlık olarak artış azalış 
    // durumlarında nasıl renk değişimi yapılabileceğini göstermek amaçlı ;
    // Artış için yeşil renk dönüşümü 
    // Azalış için kırmızı renk dönüşümü
    // uygulanması için test amalı tazılmıştır.

    // *********** Test Kodu Başlangıcı *****************
    var a= Math.floor(Math.random()*3);
    var b= Math.floor(Math.random()*3);


    if(a%3==0)
    {
        alis[i]=values[i].Alış+1;
    }
    else if(a%3==1)
    {
        alis[i]=values[i].Alış;

    }
    else
    {
        alis[i]=values[i].Alış-1;      
    }

    if(b%3==0)
    {
        satis[i]=values[i].Satış+1;
    }

    else if(b%3==1)
    {
        satis[i]=values[i].Satış;  
    }
    else
    {
        satis[i]=values[i].Satış-1;      
    }
    // *********** Test Kodu Bitişi *****************

}
    createLıne(keys,values);
});
 },2000);

function createLıne(keys,values)
{   
    var count=values.length;
    let html ="";

    for(let i=1;i<count;i++)
    {
        if(values[i].Alış<alis[i] && values[i].Satış<satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td bgcolor="red"> ${values[i].Alış} </td>
                <td bgcolor="red"> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;
        }

        else if(values[i].Alış<alis[i] && values[i].Satış==satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td bgcolor="red"> ${values[i].Alış} </td>
                <td> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;
        }

        else if(values[i].Alış>alis[i] && values[i].Satış==satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td bgcolor="#00ea13"> ${values[i].Alış} </td>
                <td> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;
        }

        else if(values[i].Alış==alis[i] && values[i].Satış<satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td> ${values[i].Alış} </td>
                <td bgcolor="red"> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;
        }

        else if(values[i].Alış==alis[i] && values[i].Satış>satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td> ${values[i].Alış} </td>
                <td bgcolor="#00ea13"> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;
        }


        else if(values[i].Alış>alis[i] && values[i].Satış>satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td bgcolor="#00ea13"> ${values[i].Alış} </td>
                <td bgcolor="#00ea13"> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;
            
        }
        else if(values[i].Alış>alis[i] && values[i].Satış<satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td bgcolor="#00ea13"> ${values[i].Alış} </td>
                <td bgcolor="red"> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;
            
        }
        else if(values[i].Alış<alis[i] && values[i].Satış>satis[i])
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td bgcolor="red"> ${values[i].Alış} </td>
                <td bgcolor="#00ea13"> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;       
        }
        else
        {
            html += 
            `
                <tr>
                <td> ${keys[i]} </td>
                <td> ${values[i].Alış} </td>
                <td> ${values[i].Satış} </td>
                <td> ${values[i].Tür} </td>
                </tr>
            `;

        }
        alis[i]=values[i].Alış;
        satis[i]=values[i].Satış;
    }
    document.getElementById('tbody').innerHTML = html;
}