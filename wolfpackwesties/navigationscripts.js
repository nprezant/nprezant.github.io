	function hideshow(show) {
    	var a = document.getElementsByClassName('content-items');
    	var b = document.getElementsByClassName('nav-el');
    	for (var i = a.length - 1; i >= 0; i--) {
    		if ( a[i].classList.contains('hide') != 1)
    			a[i].classList.add('hide');
    		if ( b[i].classList.contains('nav-current') == 1)
    			b[i].classList.remove('nav-current');
    	}
    	document.getElementById(show).classList.remove('hide');
    	document.getElementById('nav-'+show).classList.add('nav-current');
    }