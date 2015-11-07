var ref = new Firebase('https://blsimgsorter.firebaseio.com/'),
    imgRef = ref.child('imgs');
var tags = [];
var searchResults = {};
var imgs = [];

/////////////////////

$(".tags").on ('click', '.tag', function() { //when a tag is clicked it runs search and renders the imgaes
	if ($(this).hasClass( "button-primary" ) === true) {
		$(this).removeClass('button-primary')
		$(this).addClass('clicked_off')
	}
	else {
		$(this).addClass('clicked button-primary')
	}
	

	Search ()
	//makes it go slower so I comented out

	// $("#fileList").empty();
	// for (prop in searchResults) {
	// 	$("#fileList").append("<div class='photo'style='inline'><img src="+searchResults[prop].file+" class=thumbnail> <p>"+prop+"</div>")
	// }	
});//tags.on


function Search () { //pushes firebase img obj with any of the current tags into new obj (searchresults)
	$(".clicked").each (function(i) {
		if (tags.length === 0) {
			tags.push("x")
		}
		tags.push (this.id);
		$(this).removeClass("clicked")
	});

	$(".clicked_off").each (function(i) {
		var index = tags.indexOf(this.id);
		tags.splice(index, 1);
		$(this).removeClass("clicked_off")
	});
	console.log(tags)
	imgRef.on("value", function(snapshot) {
	var data = snapshot.val();
	
		Object.keys(data).forEach (function(img){
			var iO = data[img]
			var hasTags = {};
			var currentTags  = [];
			var allTags = [];
			Object.keys(data[img]).forEach (function(key){
			 	//console.log(iO[key].tag, iO )
			  // imgRef.child(""+iO.name).update({number:null})
			  for ( var i = 1; i < tags.length; ++i ) {
			  	
			 	if (iO[key].tag === tags[i]) {
			 		
			 		currentTags.push(iO[key].tag)
			 		//console.log(iO.name, test)
			 		searchResults[iO.name] = {
			 			file: iO.file,
			 			name: iO.name,
			 			number: currentTags.length 
			 		}
			 		//TEST>LENGTH= NUMBER
			 		}//if

			  }//for

			});//obj.keysdata[img]
			if (typeof searchResults[iO.name] === "undefined") {
				searchResults[iO.name] = {
			 			file: iO.file,
			 			name: iO.name,
			 			number: 0 
			 		}
			}

			
			var number = searchResults[iO.name].number
				//console.log(number, iO.name )
			imgRef.child(""+iO.name).update({number:number})
			
			
		});//obj,key img

	});//img.on
	
	imgRef.orderByChild("number").startAt(1).on("child_added", function(snapshot) {
  	
	  	renderThumnail (snapshot.key(), snapshot.val().file, snapshot.val().number)
	  	console.log(snapshot.key() + " has " + snapshot.val().number + " many tags");
	});
	
	//console.log(searchResults)
}

//on load tags
ref.on("value", function(snapshot) {//when a value changes  
    var data = snapshot.val();
	Object.keys(data).forEach (function(key){
		
		var existing = document.getElementById(data[key].tag)
		//check each key in fire base 
		// if the element is isn't there create a tag for it
		
			if (existing === null){
		 		$(".tags").append("<button id="+data[key].tag+" class='tag'>"+data[key].tag+"</button>");
			}
		
		
	});
});





/////////////UPLOADING NEW IMAGES 
$('input').change(function() {    
    var fr = new FileReader;
    fr.onload = function(e) {
		var img = new Image;
		var link = ($('input[type=file]').val())
		var name = getName(link)

		img.onload = function() {
		  var imgObj = imgRef.child(""+name)	
		  imgObj.set ({file: fr.result,name:name});
		  	
		  $("#fileList").append("<a>'"+name+"'</a><img src='"+e.target.result+"' width='30' height='30' />");
		  }//onload

		$('#tagInput').keypress(function (e) {
	        if (e.keyCode === 13) {
	          var tag = $('#tagInput').val().toLowerCase();
		  		tag = getName (tag)
		  		console.log(tag)
		  	if (document.getElementById(tag) === null){
			$(".tags").append ("<button id="+tag+" class='tag'>"+tag+"</button>")
		}

		ref.push({tag: tag})
		imgRef.child(""+name).push ({tag:tag})
	        $('#tagInput').val('');
		 }//keycode 13
		});//keypress

	
    img.src = fr.result;
	};//fr.onload
	fr.readAsDataURL(this.files[0]);
    //console.log(fr.readAsBinaryString(this.files[0]);)
    
});//input.change 


function getName (str) {
	var start = str.lastIndexOf("\\")
	var end = str.length
	var title = str.slice(start+=1).replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")
		title=title.replace(/ /g,"_")

	return title
}

function renderThumnail (name, src, num) {
	$("#fileList").append("<div class='photo'style='inline'><img src="+src+" class=thumbnail> <ul><li>"+name+"</li><li>num</li></li> ")
}
