window.onload = function()
{
    let nr = create_section_tablou_figuri();
    if(nr != 0)
    {
        var mySections = document.getElementsByTagName("section");
        var target_section;
        for(var x in mySections)
            if(x.id == "section_tablou_figuri")
                target_section = x;
        
            }
}

function check_finish(count_score_obj,maxindex,updateScore)
{
    if(count_score_obj.score == maxindex && count_score_obj.ok == false)
    {
        clearInterval(updateScore);
        count_score_obj.ok = true;
        alert("Felciitari! Ai atins punctaj maxim.");
    }
}



function creare_figura(indexFisier, indexFigura)
{
    var imgnou = document.createElement("img");
    imgnou.style.width = "100%";
    imgnou.style.height = "auto";
    var text = "";
    switch(indexFisier)
    {
        case 1:
            imgnou.src = "fig1.jpg";
            text = "Fig." + indexFigura + " " + "- astigmatism si complexitatea optica";
            break;
        case 2:
            imgnou.src = "fig2.jpg";
            text = "Fig." + indexFigura + " " + "- cortexul vizual si ochii";
            break;
        case 3:
            imgnou.src = "fig3.jfif";
            text = "Fig." + indexFigura + " " + "- ochi";
            break;
        case 4:
            imgnou.src = "fig4.jpg";
            text = "Fig." + indexFigura + " " + "- contrast si miopie";
            break;
        case 5:
            imgnou.src = "fig5.jpg";
            text = "Fig." + indexFigura + " " + "- defocus hiperopic - cauza miopiei progresive";
            break;
        case 6:
            imgnou.src = "fig6.jpg";
            text = "Fig." + indexFigura + " " + "vedere in distanta si vedere in apropiere";
            break;
        case 7:
            imgnou.src = "fig7.png";
            text = "Fig." + indexFigura + " " + "- acomodarea lentilei oculare";
            break;
        case 8:
            imgnou.src = "fig8.jpg";
            text = "Fig." + indexFigura + " " + "- surse de lumina";
            break;
        case 9:
            imgnou.src = "fig9.jfif";
            text = "Fig." + indexFigura + " " + "- prescriere optica medicala";
            break;        
        case 10:
            imgnou.src = "fig10.gif";
            text = "Fig." + indexFigura + " " + "- biologie ochi uman";
            break;
        case 11:
            imgnou.src = "fig11.jpg";
            text = "Fig." + indexFigura + " " + "- ochelari";
            break;
        case 12:
            imgnou.src = "fig12.jpg";
            text = "Fig." + indexFigura + " " + "- corectie cu dioptrii";
            break;
        case 13:
            imgnou.src = "fig13.jpg";
            text = "Fig." + indexFigura + " " + "- procesare vizuala";
            break;
        default:
            return "EROARE";
    }
    var figtextnou = document.createElement("figcaption");
    figtextnou.onmouseover = event_highlight_text;
    figtextnou.onmouseout = event_unhighlight_text;
    var textnode = document.createTextNode(text);
    figtextnou.appendChild(textnode);
    var fig = document.createElement("figure");
    fig.appendChild(imgnou);
    fig.appendChild(figtextnou);
    return fig;
}
function event_highlight_text()
{
    this.style.color = "red";
    this.style.fontWeight = 90;
}
function event_unhighlight_text()
{
    this.style.color = "green";
    this.style.fontWeight = 1;
}

function get_unique_random_index(myArray, maxindex)
{
    let indexFisier = Math.floor(Math.random() * maxindex) + 1;
    if(myArray.indexOf(indexFisier) == -1)
            {
                myArray.push(indexFisier);
                return indexFisier;
            }
    else                                                       // nu e unic
        return get_unique_random_index(myArray,maxindex);
}
function create_section_tablou_figuri()
{
    let mySection = document.getElementById("section_tablou_figuri");
    let indexFig = 1;
    let maxindex = parseInt(prompt("Cate figuri explicative crezi ca poti intelege cu ochii tai?", "0-13"));
    let loadingFig = document.getElementById("loadingfig");
    mySection.removeChild(loadingFig);
    let myArray = [];
    if(maxindex < 0 || isNaN(maxindex))
        maxindex = 0;
    else if(maxindex > 13)
        maxindex = 13;
    if(maxindex != 0)
    {
        let p = document.createElement("p");
        p.style.fontFamily = "Arial";
        p.style.fontSize = "1.5em";
        p.innerHTML += "Pentru o comprehensiune ridicată te rugăm să dai mouse-over peste figcaption!";
        mySection.appendChild(p); 
    }
    while(indexFig <= maxindex)
    {
        var indexFis = get_unique_random_index(myArray,maxindex);
        var fig = creare_figura(indexFis,indexFig);
        mySection.appendChild(fig);
        indexFig++;
    }
    if(maxindex != 0)
    {
        var myScoreDiv = document.getElementById("div_score");
        var count_score_obj = new Object();
        count_score_obj.score = 0;
        count_score_obj.ok = false;
        let p_score = document.createElement("p");
        p_score.className = "score";
        var updateScore = setInterval(update_score,500,maxindex,p_score,count_score_obj); 
        mySection.appendChild(p_score);
        setInterval(check_finish,500,count_score_obj,maxindex,updateScore);
    }
    return indexFig;
}
function update_score(maxindex,p_score,count_score_obj)
{
count_score_obj.score = 0;
var col = document.getElementsByTagName("figcaption");
for(var i=0;i<col.length;i++)
{
    if(col[i].style.color == "green")
        count_score_obj.score += 1;
}
p_score = document.querySelector(".score");
p_score.innerHTML = "Scorul tau: " + count_score_obj.score + " din " + maxindex;
}

