function generateCustomerId(){
    const length=12;
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let customerId='';
    for(let i=0;i<length;i++){
        const randomIndex=Math.floor(Math.random()*characters.length);
        customerId+=characters.charAt(randomIndex);
    }
    return customerId;
    
}
function outputRandom(){
    const output=document.getElementById('output');
    
    output.textContent='Your customer id is '+generateCustomerId();
    
}
