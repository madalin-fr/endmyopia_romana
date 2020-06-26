function upload_varsta(p,yyyy,mm,dd)
{

    var currentDate = new Date();
    const ore = currentDate.getHours();
    p.innerHTML = yyyy + " ani " + mm + " luni " + dd + " zile " + ore + " ore " +
    currentDate.getMinutes() + " minute " + currentDate.getSeconds() + " secunde";
	
}

var update_varsta;

function result_varsta_input()
{
   

    var form = document.getElementById("form_varsta");
    var p;
    var input;
    for(var i=0 ;i<form.childNodes.length;i++)
    {
        if(form.childNodes[i].id == "result")
            p = form.childNodes[i];
        if(form.childNodes[i].id == "varsta")
            input = form.childNodes[i].value;
    }
    alert(input);
    const splits = input.split("#",3);
    const ziua = splits[0];
    const luna = splits[1];
    const an = splits[2];
    var myDate = new Date();
    var inputDate = new Date(an, luna - 1, ziua);
    var diff = new Date(myDate.getTime() - inputDate.getTime());
    var f_an = diff.getUTCFullYear() - 1970;
    var f_luna = diff.getUTCMonth();
    var f_zi = diff.getUTCDay() - 1;
    if(f_an <= -1)
        {alert("Eroare AN prea mare!"); p.innerHTML=""; clearInterval(update_varsta); return;}
    if(f_an >= 18)
		alert("Ai peste 18 ani! Programul poate fi urmarit individual.");
	else
		alert("Nu ai peste 18 ani! Ai nevoie de sprijinul parintilor pentru a urmari programul nostru.");
    clearInterval(update_varsta);
    update_varsta = setInterval(function() { upload_varsta(p,f_an,f_luna,f_zi)}, 1000);
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


var myLoop;
var myLoop2;
function doStuff(str,active, my_h, x)
{
    if(x==str.length/2 + 3)
        {
            clearInterval(myLoop);
            return;
        }
    active[x] = active[str.length-x-1] = true;
    var newstr = new String();
    for(var i=0;i<str.length;i++)
        if(active[i] == true)
            newstr += str[i];
    my_h.textContent = newstr;
}


function myTitleTransition(my_h)
{
    var str = my_h.textContent.trim();
    my_h.textContent = "";
    var active = new Array(str.length);
    for(var i=0;i<str.length;i++)
        active[i] = false;
    var x=0;
    myLoop = setInterval(function() {doStuff(str,active,my_h,x++) }, 100); // parcurgere din stanga si dreapta pana in mijloc
}


function doStuff2(text,active,myNode,x)
{
    if(x >= text.length)
        eturn;r
    var newtext = new String();
    active[x] = true;
    for(var i=0;i<text.length;i++)
    {
        if(active[i] == true)
            newtext += text[i] + " ";
    }
    myNode.textContent = newtext;
}



function ChildrenTransition(myNode)
{
    if(myNode.childNodes === undefined)
        return;
    else
    {
        for(var i=0;i<myNode.childNodes.length;i++)
            {
                var child = myNode.childNodes[i];
                ChildrenTransition(child);
                if(child.textContent.trim().length == 0)        // blank content
                    continue;
                var text = child.textContent.split(" ");
                text = removeZeroLengthElements(text);
                var active = new Array(text.length);
                for(var i=0;i<active.length;i++)
                    active[i] = false;
                
                child.textContent = "";
                var x=0;
                myLoop2 = setInterval(function() { doStuff2(text,active,child, x++) }, 1000/3);        // functia ceruta
            }
    }
}

function myArticleTransition(myArticle)
{
    for(var i=0;i<myArticle.childNodes.length;i++)
    {
        var myNode = myArticle.childNodes[i];
        ChildrenTransition(myNode);
    }
}


window.onload = function()
{
    var target = document.getElementById("titlu");
    var myh1 = target.getElementsByTagName("h1")[0];
    var myh3 = target.getElementsByTagName("h3")[0];
    myTitleTransition(myh1);
    myTitleTransition(myh3);
    var targets2 = document.getElementsByTagName("article");
    for(var i=0;i<targets2.length;i++)
    {
        myArticleTransition(targets2[i]);
    }
}
