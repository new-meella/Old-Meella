doneFunction=()=>{
    document.getElementById("grayBox2").style.visibility="visible";
}

clearRating=()=>{
    var grayStar = ["grayStar1","grayStar2","grayStar3","grayStar4","grayStar5"];
    var goldStar = ["goldStar1","goldStar2","goldStar3","goldStar4","goldStar5"];
    for (let i = 0;i < goldStar.length;i++) {
        document.getElementById(grayStar[i]).style.display="block";
        document.getElementById(goldStar[i]).style.display="none";
    }
}
 
awfulRate=()=>{
    clearRating();
    document.getElementById("grayStar1").style.display="none";
    document.getElementById("goldStar1").style.display="block";
}

badRate=()=>{
    awfulRate();
    document.getElementById("grayStar2").style.display="none";
    document.getElementById("goldStar2").style.display="block";
}

mediumRate=()=>{
    badRate();
    document.getElementById("grayStar3").style.display="none";
    document.getElementById("goldStar3").style.display="block";
}

goodRate=()=>{
    mediumRate();
    document.getElementById("grayStar4").style.display="none";
    document.getElementById("goldStar4").style.display="block";
}

excellentRate=()=>{
    goodRate();
    document.getElementById("grayStar5").style.display="none";
    document.getElementById("goldStar5").style.display="block";
}