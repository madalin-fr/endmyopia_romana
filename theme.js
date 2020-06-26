var fileName;
var timp;




function update_time_vizita(timp, p_vizite,fileName)
{
    p_vizite.textContent = "Timp petrecut pe " + fileName + " este de " + timp.minute + " minute " + timp.secunde + " secunde ";
    timp.secunde += 1;
    if(timp.secunde >=60)
    {
        timp.secunde = 0;
    timp.minute += 1;
    }
}

function myVisitCounter()
{
// localStorage.clear();
fileName fileName = location.href.split("/").slice(-1); // pagina~.html 
timp = JSON.parse(localStorage.getItem(fileName+"timp")); 
if(timp==null)
   timp = {minute: 0, secunde: 0};
var p_vizite = document.getElementById("vizite");
setInterval(function(){update_time_vizita(timp,p_vizite,fileName)},1000);
}


function removeZeroLengthElements(arrayName)
{
    var newArray = [];
    for(var i=0;i<arrayName.length;i++)
    {
        if (arrayName[i].length > 0)
            { newArray.push(arrayName[i]); }
    }
    return newArray;
}


var nrcuvinte;
function countWordsjunior(myNode)
{
    if(myNode.childNodes === undefined)
        return;
    else
    {
        for(var i=0;i<myNode.childNodes.length;i++)
            {
                var child = myNode.childNodes[i];
                if(child.textContent.trim().length == 0)        // blank content
                    continue;
                var text = child.textContent.trim().split(" ");
                text = removeZeroLengthElements(text);
                nrcuvinte += text.length;
            }
    }
}
function countWords()
{
    nrcuvinte = 0;
    for(var i=0;i<document.body.childNodes.length;i++)
    {
        var myNode = document.body.childNodes[i];
        countWordsjunior(myNode);
    }
    document.getElementById("nrcuvinte").textContent = "Numarul de cuvinte in " + fileName +
    " este de " + nrcuvinte + " cuvinte.";

}

function stopCtrlS()
{
    document.addEventListener("keydown",function(e){            // 83 - litera 'S'
    if((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
        e.preventDefault();
        alert("Nu ai voie sa salvezi pagina noastra secreta.");
    }
    }, false);
}

prev_handler = window.onload;
window.onload = function()
{
if(prev_handler)
    prev_handler();
myVisitCounter();  
setInterval(countWords,1000);
stopCtrlS();
}


function Save2()
{
    localStorage.setItem(fileName+"timp",JSON.stringify(timp));
}

var prev_handler2 = window.onunload;
window.onunload = function () {
            if(prev_handler2)
                prev_handler2();
            
            Save2();
    }

















