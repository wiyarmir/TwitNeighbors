TwitterNeighbours = {};
TwitterNeighbours.getFriends_vars = {};
TwitterNeighbours.getFriends_vars.cursor = -1;
TwitterNeighbours.getFriends_vars.usersProgress = 0;
TwitterNeighbours.shouldSleep = false;
function init(){
    function getRandomColor(a, b) {
        var r = Math.random();
        return 'rgb('+
        ((a.r+(b.r-a.r)*r)|0).toString() +
        ','+
        ((a.g+(b.g-a.g)*r)|0).toString() +
        ','+
        ((a.b+(b.b-a.b)*r)|0).toString() +
        ')';
    };

    var colorFrom = {
        r: 32,
        g: 79,
        b: 25
    };

    var colorTo = {
        r: 180,
        g: 255,
        b: 158
    };
    
    function supports_html5_storage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
    
    if(supports_html5_storage()){
        window.localStorage['consumerKey']
        window.localStorage['consumerSecret']
    }
    
    sigInst = sigma.init($('#sigma')[0])
    //.configProperties({
    //    drawHoverNodes: true
    //}).drawingProperties({
    //    labelThreshold: 10000,
    //    defaultEdgeType: 'curve'
    //}).mouseProperties({
    //    mouseEnabled: true
    //})
    //.graphProperties({
    //    scalingMode: 'outside'
    //})
    ;
    
    TwitterNeighbours.sigInst = sigInst;
    

    /*$.getJSON('testdata/datasource.php',
    {
        myrequest:"value"
    },
    function(data){
        $.each(data.nodes,function(i,v){
            v.x = .001 + Math.random();
            v.y = .001 + Math.random();
            v.size = 5;
            sigInst.addNode(v.id, v);
        });
        $.each(data.edges,function(i,v){
            sigInst.addEdge(i,v.source,v.target);
        });
    })/*
                
    //var newParent = document.getElementById('mouselayer-sigma-1');
    var mouseLayer = document.getElementById('sigma_mouse_1');

    //newParent.appendChild(mouseLayer);

    /*
    mouseLayer.addEventListener('mouseover', function() {
        sigInst.activateFishEye();
    }, true);
    mouseLayer.addEventListener('mouseout', function() { 
        sigInst.desactivateFishEye().draw(2,2,2);
    }, true);
     */

    /**
     * Resize every instances on window resizing, and
     * some divs :
     */
    function resize(event){
        for(var key in sigma.instances) {
            sigma.instances[key].resize();
        }
    };

    window.onresize = resize;
    sigInst.activateTwitterTag();
    resize();
}
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init, false);
} else {
    window.onload = init;
}

TwitterNeighbours.isFA2Running = false;
$('#forceatlas2')[0].addEventListener('click', 
    function(){
        if(TwitterNeighbours.isFA2Running)
        {
            TwitterNeighbours.isFA2Running = false;
            TwitterNeighbours.sigInst.stopForceAtlas2();
            $('#forceatlas2')[0].value = 'Start Layout';
        } 
        else    
        {
            TwitterNeighbours.isFA2Running = true;
            TwitterNeighbours.sigInst.startForceAtlas2();
            $('#forceatlas2')[0].value = 'Stop Layout';
        }
    }, 
    false);
   
    
$('#loadMore')[0].addEventListener('click', 
    function(){
        getAllFriends('wiyarmir');
    },
    false);
    
function putNodes(data){
    if(data){
        TwitterNeighbours.getFriends_vars.cursor = data.nextcursor;
        $.each(data.users,function(i,v){
            v.x = .001 + Math.random();
            v.y = .001 + Math.random();
            v.size = 5;
            v.label = v.screen_name
            TwitterNeighbours.sigInst.addNode(v.id, v);
        });
    }
    TwitterNeighbours.sigInst.draw();
}
    
function putEdges(data){
    $.each(data.edges,function(i,v){
        sigInst.addEdge(i,v.source,v.target);
    });
}
    
function getAllFriends(from){
    $('#pbContainer').show();
    TwitterNeighbours.getFriends_vars.screen_name = from;
    getUserInfo(from);
}

function getFriendsWorker(){
    if(TwitterNeighbours.getFriends_vars.cursor != 0){
        if(TwitterNeighbours.shouldSleep){
            return;
        }
        console.log("cursor:" + TwitterNeighbours.getFriends_vars.cursor);
        from = TwitterNeighbours.getFriends_vars.screen_name;
        $.ajax({
            url: 'testdata/twconnection.php',
            dataType: 'json',
            async: true,
            data: {
                'method':'friendslist',
                'screen_name':from,
                'cursor':TwitterNeighbours.getFriends_vars.cursor
            },
            statusCode: {
                206: manageRateLimit
            },
            success: function(data) {
                if(data.users){
                    updateProgressbar(data.users.length);
                    putNodes(data);
                    setTimeout(getFriendsWorker,0);
                }else if(data.error && data.sleep){
                    TwitterNeighbours.resetTime = parseInt(data.reset);
                    TwitterNeighbours.shouldSleep = true;
                }
            }
        });
    /*
        $.getJSON('testdata/twconnection.php',
        {
            'method':'friendslist',
            'screen_name':from,
            'cursor':TwitterNeighbours.getFriends_vars.cursor
        }
        ,putNodes);
        */
    }
}

function getUserInfo(from){
    $.getJSON('testdata/twconnection.php',
    {
        'method':'userinfo',
        'screen_name':from
    },
    function(data){
        TwitterNeighbours.getFriends_vars.user_followers = data.followers;
        TwitterNeighbours.getFriends_vars.user_friends = data.friends;
        $('#infoText').html('<ul><li>User followers: '+data.followers+"</li><li>User friends: "+data.friends+"</li></ul>"); 
        $('#progressbar').css('width', '1%').addClass('bar-success');   
        setTimeout(getFriendsWorker,0);
    });
}

function updateProgressbar(num){
    TwitterNeighbours.getFriends_vars.usersProgress += num;
    percent = TwitterNeighbours.getFriends_vars.usersProgress / TwitterNeighbours.getFriends_vars.user_followers;
    percent = Math.round(percent *100);
    console.log('done: '+ percent+'%');
    $('#progressbar').css('width', percent+'%');
}

function manageRateLimit(){
    remaining =  TwitterNeighbours.resetTime - (new Date().getTime()/1000);
    
    if ( remaining > 0 ){
        $('#rateAlert').slideDown();
        updateCountDown(remaining);
        TwitterNeighbours.counterInterval=setInterval(manageRateLimit, 1000);
    }else{ //clean and continue
        $('#rateAlert').slideUp();
        TwitterNeighbours.shouldSleep = false;
        clearInterval(TwitterNeighbours.counterInterval);
        setTimeout(getFriendsWorker,0);
    }
}

function updateCountDown(time){
    seconds = Math.round(time % 60);
    minutes = Math.round(time/60);
    $('#timeLeft').text(minutes+":"+seconds);
}