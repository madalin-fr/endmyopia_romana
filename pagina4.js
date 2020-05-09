var intrebare1;
var intrebare2;
var intrebare3;
var first_time_visit;
var current_intrebare;
var myFieldSets = document.querySelectorAll("fieldset");
var Timp = {zile: new Date().getDay(), ore : new Date().getHours(), minute : new Date().getMinutes(), secunde : new Date().getSeconds()};
var start;
var nrAccesari;
window.onload = function()
{
    
    if((start !== undefined && start.zile - Date().getDay) >= 1)
    {
        alert("A trecut mai mult de o zi de la salvarea formularului curent. Vom reseta totul, din pacate!");
        localStorage.clear();
    }
    if(localStorage.length == 0)
    {
        Reset();
        first_time_visit = true;
        alert("OK");
    }
    else
    {
        first_time_visit = false;
        Load();
    }
    this.document.getElementById("dropdown").addEventListener("click", function(e){e.preventDefault();alert("Nu ai voie sa schimbi subiectul!")});
    document.getElementById("submit").style.display = "none";
    this.document.getElementById("submit").addEventListener("click",submit);
    document.getElementById("reset").onclick=Reset;
    for(var i=0;i<this.myFieldSets.length;i++)
    {
        this.myFieldSets[i].addEventListener('auxclick', helper, false);
        this.myFieldSets[i].addEventListener('click', helper, false);
    }
    for(var i=0;i<this.myFieldSets.length;i++)
    {
        var myInputs = this.myFieldSets[i].getElementsByTagName("input");
        var myLabels = this.myFieldSets[i].getElementsByTagName("label");
        var myTextInputs = this.myFieldSets[i].getElementsByTagName("textarea");
        for(var j=0;j<myInputs.length;j++)
        {
            myInputs[j].addEventListener("click",stop_propagate,true);
            myLabels[j].addEventListener("click",stop_propagate,true);
        }
        for(var j=0;j<myTextInputs.length;j++)
            myTextInputs[j].addEventListener("click",stop_propagate,true);
    }
    current_intrebare = this.parseInt(localStorage.getItem("s_current"));
    for(var i=0;i<=this.current_intrebare;i++)
    {
        this.myFieldSets[i].style.display = "block";
    }
    for(var i=0;i<this.myFieldSets.length;i++)
    {
        var btn = this.myFieldSets[i].children.namedItem("b_inainte");
        btn.classList.add(this.get_rand_color());
        btn.addEventListener("click", next_intrebare, true);
    }
    if(!first_time_visit)
        setTimeout(function(){alert(`Bine ati revenit! \nAti accesat de ${nrAccesari} ori acest formular.`);}, 600);
}


function stop_propagate(event)
{
    event.stopPropagation();
}

function flatten_inherited_obj(obj)
{
    for(var key in obj)
        obj[key]=obj[key];
    return obj;
}


function Init()
{    
    let startTime = Object.create(Timp);
    document.getElementById("submit").style.display = "none";
    localStorage.setItem("startTime",JSON.stringify(flatten_inherited_obj((startTime))));
    nrAccesari = 0;
    let intrebare1 = { 0: false, 1:false, 2:false, 3:false, 4:false, 5:false,display: "block", disabled: false} ;
    let intrebare2 = {0:"", display: "none", disabled:false};
    let intrebare3 = {0: false, 1:false, 2:false, 3:false, 4:false, 5:false, display: "none", disabled:false}; 
    localStorage.setItem("s_intrebare1",JSON.stringify(intrebare1));
    localStorage.setItem("s_intrebare2",JSON.stringify(intrebare2));
    localStorage.setItem("s_intrebare3",JSON.stringify(intrebare3));
    current_intrebare = 0;    
    localStorage.setItem("s_nraccesari",nrAccesari.toString());
    localStorage.setItem("s_current",current_intrebare.toString());
    localStorage.setItem("s_submit", "none");
}


function Load()
{
    if(first_time_visit)
        return;
    intrebare1 = JSON.parse(localStorage.getItem("s_intrebare1"));
    intrebare2 = JSON.parse(localStorage.getItem("s_intrebare2"));
    intrebare3 = JSON.parse(localStorage.getItem("s_intrebare3"));
    start = JSON.parse(localStorage.getItem("startTime"));
    nrAccesari = parseInt(localStorage.getItem("s_nraccesari"));
    document.getElementById("submit").style.display = localStorage.getItem("s_submit");
    let intrebari = [];
    intrebari.push(intrebare1);
    intrebari.push(intrebare2);
    intrebari.push(intrebare3);
    for(var i=0;i<intrebari.length;i++)
    {
        var myInputs = document.getElementsByName("intrebare"+(i+1));
        for(var j=0;j<myInputs.length;j++)
        {
            if(myInputs[j].tagName == "INPUT")
            {
                myInputs[j].checked = intrebari[i][j];
            }
            else if(myInputs[j].tagName == "TEXTAREA")
                myInputs[j].value = intrebari[i][j];
        }
    }
    for(var i=0;i<myFieldSets.length;i++)
        myFieldSets[i].style.display = intrebari[i]["display"];
    for(var i=0;i<myFieldSets.length;i++)
    myFieldSets[i].disabled = intrebari[i]["disabled"];

    
}
function Save()
{
    var nr_intrebari = myFieldSets.length;
    var intrebari = [intrebare1,intrebare2,intrebare3];
    for(var i=0;i<intrebari.length;i++)
    {    
        var myInputs = document.getElementsByName("intrebare"+(i+1));
            for(var j=0;j<myInputs.length;j++)
            {
                if(myInputs[j].tagName == "INPUT")
                {
                    intrebari[i][j] = myInputs[j].checked;
                                 
                }
                else if(myInputs[j].tagName == "TEXTAREA")
                    intrebari[i][j] = myInputs[j].value;
                    
            }
    }
    for(var i=0;i<myFieldSets.length;i++)
        intrebari[i]["display"]= myFieldSets[i].style.display;
    for(var i=0;i<myFieldSets.length;i++)
        intrebari[i]["disabled"]= myFieldSets[i].disabled;
         localStorage.setItem("s_intrebare1",JSON.stringify(intrebari[0]));
    localStorage.setItem("s_intrebare2",JSON.stringify(intrebari[1]));
    localStorage.setItem("s_intrebare3",JSON.stringify(intrebari[2]));
    localStorage.setItem("s_current",current_intrebare.toString());
    localStorage.setItem("s_submit",document.getElementById("submit").style.display);
    nrAccesari++;
    localStorage.setItem("s_nraccesari",nrAccesari.toString());
}
function Reset()
{
    Init();
    Load();
}

function next_intrebare(event)
{
    event.stopPropagation();
    if(current_intrebare == 0)
    {
        var rez;
        var val = myFieldSets[current_intrebare].firstElementChild;
        while(val != null)
        {
            if(val.getAttribute("name") == "intrebare1" && val.checked)
                rez = val.value;
            val = val.nextElementSibling;
        }
        if(rez == "A")
            {
                alert("E foarte bine! Poti sa dai submit."); 
                document.getElementById("submit").style.display = "block";
                myFieldSets[current_intrebare].disabled = true;
            }
        else if(rez == null)
            alert("Nu ai bifat nimic!");
        else
        {
            alert("Ai nevoie de ajutor! Continuam interogarea mai jos.");
            myFieldSets[current_intrebare].disabled = true;
            current_intrebare++;
            myFieldSets[current_intrebare].style.display = "block";
        }
    }
    else if(current_intrebare == 1)
    {
        var rez;
        var val = myFieldSets[current_intrebare].firstElementChild;
        while(val != null)
        {
            if(val.getAttribute("name") == "intrebare2" && val.tagName == "TEXTAREA")
                rez = val.value;
            val = val.nextElementSibling;
        }
        if(!rez)
            alert("Nu ai completat nimic!");
        else if(rez.toString().toLowerCase().includes("cyl") || rez.toString().toLowerCase().includes("sph"))
        {
            alert("Ai introdus o prescriere corecta! Urmeaza sa iti oferim sfaturi personalizate.");
            myFieldSets[current_intrebare].disabled = true;
            current_intrebare++;
            myFieldSets[current_intrebare].style.display = "block";
        }
        else
        {
            alert("Asigura-te ca ai scris o prescriere in formatul corect!");
        }
    }
    else if(current_intrebare == 2)
    {
        var rez = [];
        var val = myFieldSets[current_intrebare].firstElementChild;
        while(val != null)
        {
            if(val.getAttribute("name") == "intrebare3" && val.tagName == "INPUT" && val.checked)
                rez.push(val.value);
            val = val.nextElementSibling;
        }
        if(rez.length == 0)
            alert("Nicio alegere!");
        else if(rez.length == 1)
        {
            alert("Ati ales optiunea (" + (rez[0].charCodeAt(0)-"A".charCodeAt(0) + 1) + ").");
            document.getElementById("submit").style.display = "block";
                myFieldSets[current_intrebare].disabled = true;
        }
        else{
            var s = "Ati ales optiunile";
            for(var i=0;i<rez.length;i++)
                s = s.concat(" (", rez[i].charCodeAt(0)-"A".charCodeAt(0) + 1 , ")" );
            alert(s);
            document.getElementById("submit").style.display = "block";
                myFieldSets[current_intrebare].disabled = true;
        }
    }
}


var newWin;

function helper(ev)
{
        if(ev.clientX < window.innerWidth / (window.innerWidth / 200) )
            {alert("Helper mai la dreapta!");return;}
        else if(ev.clientX > window.innerWidth - (window.innerWidth * 0.34))
        {
         
            alert("Helper mai la stanga!") ;return;
        }
    if(ev.button == 0)
        alert("Aveti ochi stang dominant!");
    else if(ev.button == 1)
        alert("Aveti al treilea ochi :)");
    else
        alert("Aveti ochi drept dominant!");
    var helperTextIntrebari = "Va redirectionez catre o sursa de informatii. Aveti 30 de secunde sa rasfoiti!";
    alert(helperTextIntrebari);
    newWin = window.open("pagina2.html","","width:900,height:600");
    setTimeout(function(){newWin.close();},30000);
}




var culori = " red,            yellow,    greenyellow";
culori = culori.split(",");
for(var i=0;i<culori.length;i++)
    culori[i] = culori[i].trim();


function get_rand_color()
{
    return culori[Math.floor(Math.random() * culori.length)];
}


window.onbeforeunload = function (e) {
    window.onunload = function () {
            Save();
    }
    return undefined;
};


function scade(interval1, interval2)
{
    if(interval1.ore < interval2.ore)
    {
        var aux = Object.create(interval1);
        interval1 = Object.create(interval2);
        interval2 = Object.create(aux);
    }
    if(interval1.minute < interval2.minute && interval1.ore == interval2.ore)
    {
        var aux = Object.create(interval1);
        interval1 = Object.create(interval2);
        interval2 = Object.create(aux);
    }
    if(interval1.secunde < interval2.secunde && interval1.ore == interval2.ore && interval1.minute == interval2.minute)
    {
        var aux = Object.create(interval1);
        interval1 = Object.create(interval2);
        interval2 = Object.create(aux);
    }
    if(interval1.secunde < interval2.secunde)
    {
        interval1.minute -= 1;
        interval1.secunde += 60;
        interval1.secunde -= interval2.secunde;
    }
    else
        interval1.secunde -= interval2.secunde;
    if(interval1.minute < interval2.minute)
    {
        interval1.ore -= 1;
        interval1.minute += 60;
        interval1.minute -= interval2.minute;
    }
    else
        interval1.minute -= interval2.minute;
    interval1.ore -= interval2.ore;
    return interval1;
}

function submit(e)
{
    var end = Object.create(Timp);
    var dif = scade(start,end);
    // var dif = scade(end,start);
    alert(`Ai apasat pe  ${e.target} \nAi accesat prima data formularul curent in urmă cu ${dif.ore} ore, ${dif.minute} minute si ${dif.secunde} secunde`);
    alert("Formularul se va inchide. Rezultatele au fost salvate. O zi buna!");
    setTimeout(Reset,3000);
}