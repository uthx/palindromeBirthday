function reverseStr(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    var reverse=reverseStr(str);
    return str===reverse
}

function convertDateToStr(date){
    var dateStr={day:'',month:'',year:''};

    if(date.day<10){
        dateStr.day='0'+date.day;
    }else{
        dateStr.day=date.day.toString();
    }

    if(date.month<10){
        dateStr.month='0'+date.month;
    }else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr;
}


function allDateFormat(date){
    var dateStr=convertDateToStr(date);

    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllFormat(date){
    var formatList=allDateFormat(date);

    var flag=false;

    for(var i=0;i<formatList.length;i++){
        if(isPalindrome(formatList[i])){
            return true;
        }else{
            return flag;
        }
    }
}

function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }
    return false;
}


function getNextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;

    var daysInAMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===2){
        if(isLeapYear(date)){
            if(day>29){
                day=1;
                month=month+1;
            }
        }else{
            if(day>28){
                day=1;
                month=month+1;
            }
        }
    }else{
        if(day>daysInAMonth[month-1]){
            day=1;
            month=month+1;
        }
    }
    if(month>12){
        month=1;
        year=year+1;
    }
    return{
        day:day,
        month:month,
        year:year
    }
}


function getNextPalindromeDate(date){
    var count=0;
    var nextDate=getNextDate(date);
    while(1){
        count++;
        var isPalindrome=checkPalindromeForAllFormat(nextDate)
        if(isPalindrome){
            break;
        }
        nextDate=getNextDate(nextDate);
    }
    return [count,nextDate];
}

var date={
    day:23,
    month:2,
    year:2020
}

var birthInput=document.querySelector("#birthday-input");
var button=document.querySelector(".btn");
var outputMessage=document.querySelector(".output");

function clickListener(e){
   var dateString=birthInput.value;
   if(dateString!==''){
       var listOfDate=dateString.split("-");

       var date={
           day:Number(listOfDate[2]),
           month:Number(listOfDate[1]),
           year:Number(listOfDate[0])
       }
       
       var isPalindrome=checkPalindromeForAllFormat(date);
       if(isPalindrome){
           outputMessage.innerText="YAY!! your birthday is a Palindrome.."
       }else{
           var [count,nextDate]=getNextPalindromeDate(date);
           outputMessage.innerText=`the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. you missed the date by ${count} days..`;
       }
   }
}

button.addEventListener("click",clickListener);