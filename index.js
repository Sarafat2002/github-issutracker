
document.getElementById('signin-btn').addEventListener('click',function(){
    //get the user name admin
    const inputUserName = document.getElementById('input-username');
    const userName = inputUserName.value;
    console.log(userName);

    //get the password admin123

    const inputPassword = document.getElementById('input-password');
    const passWord = inputPassword.value;
    console.log(passWord);

    if(userName === "admin" && passWord === "admin123" ){
        alert ('sign is succes');

        window.location.assign("./card.html");

    }else{
        alert ('login failed')
        return;
    }
})