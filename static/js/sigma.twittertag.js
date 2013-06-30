sigma.classes.TwitterTag = function(sig) {
    
    sigma.classes.Cascade.call(this);

    var isActivated = false;
    var self = this;
    var popUp;
 
    this.attributesToString = function(attr) {
        return '<ul>' +
        $.map(attr, 
            function(attr,val){
                return '<li>' + val + ': ' + attr + '</li>';
            }).join('') +
        '</ul>';
    
    }
 
 
    this.showNodeInfo = function(event) {
        popUp && popUp.remove();
 
        var node;
        sigInst.iterNodes(function(n){
            node = n;
        },[event.content[0]]);
 
        popUp = $(
            '<div class="node-info-popup"></div>'
            ).append(
            // The GEXF parser stores all the attributes in an array named
            // 'attributes'. And since sigma.js does not recognize the key
            // 'attributes' (unlike the keys 'label', 'color', 'size' etc),
            // it stores it in the node 'attr' object :
            attributesToString( node['attr'] )
            ).attr(
            'id',
            'node-info'+sigInst.getID()
            ).css({
            'display': 'inline-block',
            'border-radius': 3,
            'padding': 5,
            'background': '#fff',
            'color': '#000',
            'box-shadow': '0 0 4px #666',
            'position': 'absolute',
            'left': node.displayX,
            'top': node.displayY+15
        });
 
        $('ul',popUp).css('margin','0 0 0 20px');
 
        $('#sigma').append(popUp);
    }
 
 
    this.hideNodeInfo = function(event) {
        console.log('yep');
        popUp && popUp.remove();
        popUp = false;
    };
    
    this.activated = function(v) {
        if(v==undefined){
            return isActivated;
        }else{
            isActivated = v;
            return this;
        }
    };
    
    
};


sigma.publicPrototype.activateTwitterTag = function() {
    if(!this.twittertag) {
        var sigmaInstance = this;
        var tt = new sigma.classes.TwitterTag(sigmaInstance._core);
        sigmaInstance.twittertag = tt;

        tt.refresh = function refresh() {
            sigmaInstance.draw(2,2,2);
        };
    }
 
    if(!this.twittertag.activated()){
        this.twittertag.activated(true);
        
        //this._core.bind('graphscaled', this.twittertag.handler);
        this._core.bind('overnodes',this.twittertag.showNodeInfo);
        this._core.bind('outnodes',this.twittertag.hideNodeInfo);
    }

    return this;
};

sigma.publicPrototype.desactivateTwitterTag = function() {
    if(this.twittertag && this.twitter.activated()){
        this.twittertag.activated(false);
        this._core.unbind('graphscaled', this.twittertag.handler);
        document.getElementById(
            'sigma_mouse_'+this.getID()
            ).removeEventListener('mousemove',this.twittertag.refresh,true);
    }

    return this;
};
