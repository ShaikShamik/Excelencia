function checknum()
{
    var num=document.getElementById("nos").value;
    if(num<2 || num>5)
    {
        alert("Please Enter Number between 2 to 5");
    }
    else
    {
        document.getElementById("check").setAttribute("disabled", true);
        var maindiv=document.getElementById("dynamic");
        for(let i=1;i<=num;i++)
        {
            let inputfield=document.createElement("input");
            inputfield.id="string"+i;
            inputfield.placeholder="Enter string "+i;
            maindiv.appendChild(inputfield)
        }

    }
}

function getPositionsAndCount(char,str,count,position,pos){
    if(!(count[str].has(char))){
        count[str].set(char, 0);
        position[str].set(char, new Array());
    }
    let oldCnt = count[str].get(char);
    count[str].set(char, oldCnt+1);
    position[str].get(char).push(pos+1);
}

function compareString(stringList){
    const checkByVowel = document.getElementById("vowel").checked;
    const vowels = ['a','e','i','o','u'];
    const count = { };
    const position = { };

    stringList.forEach(str => {
        count[str] = new Map();
        position[str] = new Map();
        for(let pos=0;pos<str.length;pos++){
            const char = str[pos].toLowerCase();
            if(checkByVowel){
                if(vowels.includes(char)){
                    getPositionsAndCount(char,str,count,position,pos)
                }
            }
            else{
                if(!(vowels.includes(char))){
                    getPositionsAndCount(char,str,count,position,pos)
                }
            }
        }
    });
    printoutput(count, position,stringList)
}

function printoutput(count,pos,stringList)
{
    const outputContainer = document.querySelector(`.output`);
    outputContainer.innerHTML = ``;
    let index = 1;
    stringList.forEach(str => {
        outputContainer.innerHTML += 
        `<div class = \string${index}\>
            <p id="string_name" class="string-title">${str}</p>
        <div/>` 
        count[str].forEach( (value,key,map) => {
           const stringOutput = document.querySelector(`.string${index}`);
           stringOutput.innerHTML +=
           `<p class="char"> ${key} => count: ${value}, position: ${pos[str].get(key)}\</p>`
        })
        index = index+1;
    });
    
}

function checkStrings()
{   
    let num = document.getElementById("nos").value;
    let stringList = [];
    for(i=1;i<=num;i++)
    {  
        const pattern = /^[a-zA-z]+$/;
        const inputString = document.getElementById(`string${i}`).value;
        if(inputString){
            if(inputString.match(pattern)){
                stringList.push(document.getElementById(`string${i}`).value);
            }
            else{
                alert("Input Strings should contain only Alphabet, please change the input")
                return
            }
        }
        else{
            alert("Input should not be empty, please enter input in all fields")
            return
        }
    }
    compareString(stringList);
}