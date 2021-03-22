var models =[
    {
        name : 'Bmw 418d',
        image : 'img/bmw.jpg',
        link : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.bmw.com.tr%2Fcontent%2Fdam%2Fbmw%2Fcommon%2Fall-models%2F7-series%2Fsedan%2F2019%2Finform%2Fbmw-7series-sedan-inform-line-02-slide-01.jpg.asset.1593080576181.jpg&imgrefurl=https%3A%2F%2Fwww.bmw.com.tr%2Ftr%2Fall-models%2Fthe7%2Fsedan%2F2019%2Fbmw-7-serisi-detaylari-kesfedin.html&tbnid=7y2ZOP9mv4s3-M&vet=12ahUKEwjbpcOC4O3sAhUS_4UKHTxyBEsQMygFegUIARC0AQ..i&docid=MxHix9oufnF0iM&w=1960&h=1102&q=bmw&ved=2ahUKEwjbpcOC4O3sAhUS_4UKHTxyBEsQMygFegUIARC0AQ'
    },
    {
        name : 'Mazda CX3',
        image : 'img/mazda.jpg',
        link : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.euroncap.com%2Ftr%2Fresults%2Fmazda%2Fcx-3%2F20856&psig=AOvVaw3xA2mF0mTC5bhqjY-lz8W4&ust=1604746410531000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLD9hrTg7ewCFQAAAAAdAAAAABAD'
    },
    {
        name : 'Volvo S60',
        image : 'img/volvo.jpg',
        link : 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.ciplakoto.com%2Fnelere-dikkat-edilmeli%2Fbagaj-hacmi-en-genis-olan-d-ssegmenti-arabalar%2F&psig=AOvVaw30owEJmnz73H1zFtcWmQvu&ust=1604746512556000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJD9s-fg7ewCFQAAAAAdAAAAABAJ'
    },
    {
        name : 'Skoda Superb',
        image : 'img/skoda.jpg',
        link : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.teyitlibilgi.com%2F2020%2F08%2Fskoda-2020-agustos-fiyat-listesi.html&psig=AOvVaw38lV4hc8yZ5yAj88FML_wa&ust=1604746620414000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCTh5jh7ewCFQAAAAAdAAAAABAN'
    },
    {
        name : 'Honda Civic',
        image : 'img/honda.png',
        link : 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.arabavakti.com%2Faraba%2F2019-honda-civic-1-6-i-dtec-elegance-at%2F&psig=AOvVaw06t--Z__SSwuDg-yrbxoBH&ust=1604746721631000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjQi8rh7ewCFQAAAAAdAAAAABAJ'
    }
];
var index=2;
var slaytCount=models.length-1;
var interval;
var settings={
    duration : '1000',
    random : false
};


init(settings);
document.querySelector('.fa-arrow-circle-left').addEventListener('click',function(){

    if(index==0)
    {
        index=slaytCount;
        showSlide(index);
    }
    else
    {
        index--;
        showSlide(index);
    }
});

document.querySelector('.fa-arrow-circle-right').addEventListener('click',function(){

    if(index==slaytCount)
    {
        index=0;
        showSlide(index);
    }
    else
    {
        index++;
        showSlide(index);
    }
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseenter',function()
    {
        clearInterval(interval);
    })
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        init(settings);
    })
});

// setTimeout ; süre sonunda belirlenen işlemi bir kes tekrar eder durur.
// setInterval ; süre sonunda işlemi sürekli tekrar eder.Durdurmak için 'clearInterval'  kullanılmalıdır.

function init (settings)
{
    var prev;
    interval=setInterval(function(){

        if(settings.random)
        {
            // random index
            do{
            index = Math.floor(Math.random() * (slaytCount+1));
                
            }
            while(index==prev)
            {
                prev=index;
            }
        }
        else
        {
            // artan index
            if(slaytCount==index)
            {
                index=0;
            }
            index++;
            
        }
        showSlide(index);


    },settings.duration);
    
}

function showSlide(index)
{
document.querySelector('.card-title').textContent = models[index].name;
document.querySelector('#resim').setAttribute('src',models[index].image);
document.querySelector('.card-link').setAttribute('href',models[index].link);
}


