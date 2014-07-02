$(document).ready(function(){
    var textUpdates = ['<span class="upd_t">fell in love with skateboarding','<span class="upd_t">started learning Rails</span>', '<span class="upd_t">started learning AngularJS</span>', '<span class="upd_t">signed up for HackTheNorth</span>', '<span class="upd_t">got a job a startup called Fora</span>', '<span class="upd_t">realized it\'s helmet not helment</span>'];
    
    var email = "oluwole.obayomi@gmail.com";
    var facebook = "facebook";
    var twitter = "Twitter";
    
    
    
    $('.m_cont').animate({'top':'0px','opacity':'toggle'},1000);
    //icon events
    $('.fa.fa-paper-plane-o').bind('mouseover',function(event){
        typer(email, $('#email_t a'));
        $(this).unbind(event); //trigger event only once
    });
    
   $('.fa.fa-facebook').bind('mouseover',function(event){
        typer(facebook, $('#fb_t a'));
        $(this).unbind(event);
   });
    
    $('.fa.fa-twitter').bind('mouseover',function(event){
        typer(twitter, $('#tw_t a'));
        $(this).unbind(event);
    });
    
    
    function animateInfo()
    {
        var el = $('.p_inf ul li'); //target elements
        var count = 0;
        var animInterval = setInterval(function(){
            if( count < el.siblings().length )
            {
                el.eq(count).animate({'opacity':'toggle', 'left':'0px'},500);
                count++;
            }
            else
            {
                clearInterval(animInterval);
            }
        },800);
        loop();
    }
    
    function textSwitch()
    {
        var el = $('#upd');
        var randInt = Math.floor(Math.random() * textUpdates.length);
        el.html("Recently "+textUpdates[randInt]);
        $('.upd_t').fadeIn('slow');
    }
    
    function typer(text,element)
    {
        var charArray = text.split("");
        var count = 0;
        var length = charArray.length;
        
        var interval = setInterval(
            function(){
                if(count < length)
                {
                    element.append(charArray[count]);
                    count++;
                }
                
                else
                {
                    clearInterval(interval);
                }
            },67
        );
    }
    function loop()
    {
        setInterval(function(){
            textSwitch();
        },10000);
    }
    
    animateInfo();
});