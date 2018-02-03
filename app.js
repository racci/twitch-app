function init(filter){
	var request = new Request('https://api.twitch.tv/kraken/search/streams?q='+filter+'&', {
		method: 'GET', 
		headers: new Headers({
			'Client-ID': '8vvrsoq4d0knl8z7wa9zik706uma105',
            'Content-Type': 'application/json'
		})
	});

    fetch(request).then(function(response) {
        // Convert to JSON
        return response.json();
    }).then(function(res) {

        var len = res.streams.length;                         
        var container = document.getElementById("container");

        document.getElementById('totalResult').innerHTML = len;

        for(var i=0; i<len; i++) {
            var logo = res.streams[i].channel.logo;
            var display_name = res.streams[i].channel.display_name;
            var game = res.streams[i].game;
            var viewers = res.streams[i].viewers;

            // Create each list item box
            createListItem(container, logo, display_name, game, viewers);
        } 
    });
}	

function createListItem(container, logo, display_name, game, viewers){
    return container.innerHTML +=  '<div class="parentBox"> '+
                                        '<div class="leftbox"> <img src="'+logo+'" class="img"> </div> '+
                                        '<div class="rightbox"> '+
                                            '<h3> '+display_name+' </h3>'+
                                            '<small> <div> '+game+' - '+viewers+' viewers </small> </div>'+    
                                        '</div>'+
                                    '</div>';
}

function search(){
    document.getElementById('container').innerHTML = null;
    document.getElementById('totalResult').innerHTML = null;

    var filter = document.getElementById('name').value;

    init(filter);
}


