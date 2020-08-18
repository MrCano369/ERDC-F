var colaMsg = {
    actual: null,
    ultimo: null,
    add: function(msg){
        let nuevo = { msg, next: null };
        if( this.actual ){
            this.ultimo.next = nuevo;
            this.ultimo = nuevo;
        }else{
            this.actual = nuevo;
            this.ultimo = nuevo;
            this.show();
        }
    },
    show: function(){
        msgBox.innerHTML = this.actual.msg;
        var msg2 = msgBox.innerText;
        msgBox.innerHTML = '';
    
        let writeL = (n = 0) => {
            if (n < msg2.length){
                msgBox.innerHTML += msg2.charAt(n);
                //asis.src = `public/img/ikaros${ n % 3 % 2 }.png`;
                setTimeout( () => writeL(n+1), 50);
            }else{
                //asis.src = 'public/img/ikaros0.png';
                msgBox.innerHTML = this.actual.msg;
                this.actual = this.actual.next;
                if( this.actual ) setTimeout(() => this.show(), 1000+msg2.length*30);
                return;
            }
        }
        writeL();
    }
};
function toFurigana(str){
    return str.replace('(', '<f><h>').replace(',', '</h>').replace(')', '</f>');
}
function showMenu(){
    if(menu.style.transform != 'translateY(0px)'){
        menu.style.transform = 'translateY(0px)';
        nada.style.display = 'block';
    } 
    else{
        menu.style.transform = 'translateY(-500px)';
        nada.style.display = 'none';
    } 
    
    //document.body.style.overflowY = 'hidden';
}
function quitarMenu(){
    menu.style.transform = 'translateY(-500px)';
    nada.style.display = 'none';
    //document.body.style.overflowY = 'auto';
}