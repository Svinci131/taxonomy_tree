var animalList = allAnimals.results.collection1
var tree = {}
// buildTree ();

//updates foo and renders 
var events = new EventEmitter();
events.on('foo', function() {
  randomAnimalGenerator();
  _render(  );
});

// <Container data={JSON.stringify(tree)} now={Date.now()}/>,
function _render(  ) {
  //console.log( tree )
    React.render(

     <Container data={JSON.stringify(tree)} now={Date.now()}/>,
     document.getElementById('content')
    );  
}

//goes through the data file, gets the key values from every animal 
//then uses them to build a tree object with every Kingdom, Phylum, Class Genus and Species
//ex. Animalia {chordata{mammalia{carivora}}}
function buildTree () {
  for ( var i = 0; i < animalList.length; ++i ) {
    addTo( animalList[i]);
  }


  function addTo( item ) {
    var tags = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species' ];
    var animalTags = tags.map(function(tag){
      if ( typeof item[tag] === "undefined" ) {
        return undefined;
      }
      return item[ tag ].text;
    });
    //console.log( animalTags );
    var prev = null;
    var pointer = tree;

    animalTags.forEach(function(tag, idx){
      // if ( idx > 1 ) return true;
      if ( typeof pointer[ prev ] === "undefined" ) {
        if ( typeof pointer[ tag ] === "undefined" ) {
          pointer[ tag ] = {};  
        }
        
        pointer = pointer[ tag ];
      }
      else {
        // tree[ prev ] = {};
        pointer[ tag ] = {};
        pointer = pointer[ tag ]

      }
      prev = tag;

    })
  }
  console.log( tree )
  _render( tree, events ); 
}

//takes an animal obj from our data file 
//traverses the tree and adds a new animal in the appropriate place
function compare (item) {
  //get every the key value for each item  
  var tags = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species' ];
  var animalTags = tags.map(function(tag){
    if ( typeof item[tag] === "undefined" ) {
      return undefined;
    }
    return item[ tag ].text;
  });

  // define the level in the tree object of each item's key value
  var K = (tree[animalTags[0]]),
     P = (K[animalTags[1]]),
     C = (P[animalTags[2]]),
     O = (C[animalTags[3]]),
     F = (O[animalTags[4]]),
     G = (F[animalTags[5]]); 

  //define pointer
  var pointer = null;
  var obj = ['K', 'P', 'C','O', 'F', 'G'].reduce(function(_obj, currentLetter, idx){
    if ( pointer === null ) {
      _obj[ currentLetter ] = tree[ animalTags[ idx ] ];
      //console.log(animalTags[ idx ])
    }
    else {
      _obj[ currentLetter ] = pointer[ animalTags[ idx ] ];
      //console.log(animalTags[ idx ])
    }

    pointer = _obj[ currentLetter ];

    return _obj;
  }, {});

  var holder = [];
  var array = [];
  var holderx = null;

  function getParentTag (obj, par) {
    for (var i = 1; i <= 5; ++i) {
      //console.log( par)
      if (typeof par[animalTags[i]] !== "undefined") {
        var j = i -1
        return tags[j];
      }
    }
  }
  function getChildTag (obj, par) {
    for (var i = 1; i <= 5; ++i) {
      //console.log( par)
      if (typeof par[animalTags[i]] !== "undefined") {
        //console.log("childTag", L[animalTags[i]])
        return tags[i];
      }
    }
  }
  function getChildObj (L) {
    for (var i = 1; i <= 5; ++i) {
      if (typeof L[animalTags[i]] !== "undefined") {
        //console.log(L[animalTags[i]], F)
        var childObj = L[animalTags[i]]
        //console.log("childObj", L[animalTags[i]])
        return childObj

      }
    }
  }
  function firstCheck (parent, status) {
    var firstChild = parent[0];
    //console.log(firstChild)
    var holder = [];
    var temp = null;
    var length = firstChild.length;
    var child = getChildObj (parent)//if is phylum this is class(looks like {carninvoraect})
    firstChild[length]  = item;//add itembj to p array
    var  childTag = getChildTag (item, parent)

  
      for (var x = 0; x < length; x++) {
          if ( typeof firstChild[x] !== "undefined"){
            //console.log(firstChild)
              var catchildTag = getChildTag (item, parent)//next group the class
              
              if (item[childTag].text === firstChild[x][childTag].text){//move matches from o to f 
                //console.log(childTag ,item.AnimalName)
                temp = firstChild[x]; 
                holder.push(temp);
                child[0] = holder;
                //console.log(firstChild[x])
                if (item.AnimalName === firstChild[x].AnimalName) {
                  //console.log(item.AnimalName, firstChild[x].AnimalName)
                }
                delete firstChild[x];
                //console.log(firstChild)
                delete firstChild[length];  
        
              }//if match
          }//if O[0][x] isnt undefined
      }//for loop


      holder.push(item)
   
   //  if (firstChild[length] === item && holder[0] !== item) {
    //  console.log(holder, holder.length, firstChild[length])
    //  delete firstChild[length]; 

    secondCheck (child)

  }
  // //first check is seeing if the classes are the name if theyr the same 
  
  function secondCheck (parent) {
    var firstO = parent[0];
    var child = getChildObj (parent);
    //console.log(parent[0], item.AnimalName, child)
    if (typeof firstO !== "undefined" && typeof child !== "undefined" ) { 
      //console.log("secondcheck", item.AnimalName, firstO[0].AnimalName)
        var holder = [];
        var temp = null;
        var length = firstO.length;
        var  childTag = getChildTag (item, parent)
        var  parTag = getParentTag (item, parent)
        //firstCheck()
        var holder2 = [];

        for (var x = 0; x < length; x++){
          if ( typeof firstO[x] !== "undefined"){
            //console.log("parent", parent, "firstO", firstO,"nexttag", childTag, "childObj", child)
            if (item[childTag].text === firstO[x][childTag].text && item.AnimalName !== firstO[x].AnimalName) {
              if (holder.length === 0){
                //console.log("HERE",firstO[x].AnimalName, item.AnimalName, childTag)
                holder.push(item);
                delete firstO[length-1];
                // delete firstO[length];
              }
              else{
                //console.log( "AND here", temp, item, childTag)
              }

            }
            if (item[childTag].text === firstO[x][childTag].text && item.AnimalName !== firstO[x].AnimalName && holder.length !== 0 ){//move matches from o to f 
                //console.log( childTag, item[childTag].text , firstO[x][childTag].text, x)
                //console.log(item.AnimalName, JSON.parse(JSON.stringify(firstO[x])));
                temp = firstO[x]; 
                
                holder.push(temp);

                child[0]= holder;
                
                delete firstO[x];
              
              //delete F[0][length];
            }//if match
          }//if O[0][x] isnt undefined
            
        }//for loop           
    }//if F[0] isnt undefined
  }//second check
  //setStatus (O);
  function setStatus (obj) {
    var group = obj; 
    var firstKey = group[0];
    //console.log( '####', firstKey, obj )
    var status = 0;
    if (typeof firstKey !== "undefined") {
      status = 1; 
      }
    else {
      status = 2; 
    }
    return status;
  }

  // console.log( 'F is ', F, setStatus( F ) )
  if (setStatus (F) === 1) {
    firstCheck (F)
  }
  else if (setStatus (O) === 1) {
    firstCheck (O)
  }
  else if (setStatus (C) === 1) {
    firstCheck (C)
  }
  else if (setStatus (P) === 1) {
    firstCheck (P)
    //firstCheck (C, 2)
  } 
  else if (setStatus (K) === 1) {
    firstCheck (K)
    } 
  else {    
    K[0] = [item];
  } 
}//compare

//grabs a random animal
//removes it from the data obj
function randomAnimalGenerator  () {
    var randomIndex = Math.floor( Math.random()*animalList.length );
    var randomAnimal = animalList[ randomIndex ] ;
    // remove from animalList so we don't get dupes!
    animalList.splice( randomIndex, 1 );
   // console.log(randomAnimal.AnimalName);
    return randomAnimal
}

///// renders the tree and handles all the UI updates
var Container = React.createClass({
  getInitialState: function() {
    return {
      // data: this.props.data,
      visible: true,
      clicked: {},
      open:null,
      foo: Date.now(),
      animal: null,
      animalsAreThere: false,
      currentGuess: null,
      rightGuesses: 0,
      wrongGuesses: 0,
      displayState: {
        display: 'none'
      }
      
    }
  }, 
  componentDidMount: function (){
    console.log ("test")
    this.handleClick()
  },
  //foo = the tree after the render tree function  
  handleClick: function () {
    var animal = randomAnimalGenerator();

    if (this.state.currentGuess !== null){
      this.score(this.state.currentGuess, this.state.animal)
    }

    this.setState({
      animal: animal
    });
    this.setState({
      animalsAreThere: true 
    });

    this.setState({
      foo: Math.random()
    });

    
  },  
  setVisibility: function (id, event) { 
    this.setState({visible: !this.state.visible}, function(){
    });
    console.log("setvibility",event.target.id)

    if (typeof this.state.clicked[event.target.id] === "undefined"){
      this.state.clicked[event.target.id]=true;
    }
    else {
      this.state.clicked[event.target.id]=!this.state.clicked[event.target.id];
    }
    
  },
  guess:function (id){
    if (event.target.className !== "glyphicon glyphicon-triangle-bottom" && event.target.className !== "glyphicon glyphicon-triangle-left") {
      if (this.state.animalsAreThere === true){
        
        var newAnimal = this.state.animal
        //console.log("FOO")

        this.setState({currentGuess: id}, function() {
          this.handleClick()
        });
      }
    }  
    //
    compare(newAnimal)
  },
  score: function (id, newAnimal){

        //console.log ("HERE",id)
        var oldScore_right = this.state.rightGuesses
        var oldScore_wrong = this.state.wrongGuesses

        var parentEls = $("#key"+newAnimal.AnimalName).parents()
          .map(function() {
            if ($(this).attr("class") === "cat-wrapper"){
              var parentID = $(this).attr("id")
              parentID = parentID.substring(3, parentID.length)
              if (parentID[0] !== "["){
                console.log(parentID)

                return parentID;
              }
            }
            
          
        }).get()//

        //console.log(this.state.clicked)
        console.log( parentEls )

        parentEls.forEach (function(i){
          console.log(this, i)
          this.state.clicked[i] = true;
        }.bind(this))
        
        
        console.log(this.state.clicked)
        //you have to click it open first?

        var animalHolder = document.getElementById("ptr"+id).childNodes[1].childNodes[0].childNodes[0]
        //console.log("HERE", this.state.animal.AnimalName, animalHolder.childNodes[0],animalHolder.childNodes[1])

        NodeList.prototype.forEach = Array.prototype.forEach
        var children = animalHolder.childNodes
        var wrongHolder = []
        var rightHolder = []
        
        children.forEach (function (item){
          if (item.id === "key"+newAnimal.AnimalName) {
            rightHolder.push(1)
          }
        });

        if (rightHolder.length === 0){
          wrongHolder.push (1)
        }

        var newScore_right = (rightHolder +++ oldScore_right)
        var newScore_wrong = (wrongHolder +++ oldScore_wrong)

        this.setState({
          rightGuesses: newScore_right
        });

        this.setState({
          wrongGuesses: newScore_wrong
        });

        if (newScore_wrong > 3) {
          // console.log(newScore_wrong)
          //location.reload()
        }
  },
  drawCard: function (){
    if (this.state.animal !== null){
      var className = this.state.animal.Image.src
      var style = {backgroundImage: 'url(' + className + ')'}
      return (
          <div className="thumbnail_card">
            <div style={style} className="thumbnail_photo">
            </div>
            <div className="thumbnail_title">
                <h4>{this.state.animal.AnimalName}</h4>
                <p className="thumbnail_title italic">{this.state.animal.Species}</p>
            </div>
          </div>)
     
    }
  },
  renderTree: function( data ) {
    // console.log('here!', this.state, this.state.data.Animalia)
    return this._walk( data, (<div className="test"><div>Animalia</div></div>) );
  },//returns divs with obj keys
  _walk: function( node, ptr ) {
    if ( typeof node === "undefined" ) {
      return ptr;
    }
    var level = 0; 

    var keys = Object.keys( node );
    if ( keys.length !== 0 ) {

      return keys.map(function( key, i ){           
        
        if ( !isNaN(parseInt( key ) ) ) {

          if (typeof node[ key ][ 0 ] === "undefined") {

             var _ar = [];
             if ( node[ key ].length > 0 ) {
               for( var _item in node[ key ] ) {

                _ar.push( node[ key ][ _item ] );
              }
             }
             if (_ar.length === 0){
              return null
             }
          }
          
          var newAnimal = this.state.animal;
          var key = node[ 0 ].map(function (i, idx) {

            if (newAnimal === i.AnimalName) {
              var animalStatus = "animal invisible"
            }
            else {
              var animalStatus = "animal"
            }

              var className = i.Image.src
              var style = {backgroundImage: 'url(' + className + ')'} 
              // 
            return (
             <div id={"key"+i.AnimalName} className= {animalStatus} style={style}>
                <strong className="hoverText">{i.AnimalName}</strong>
             
             </div>
            );
          });
        }//if isnan

      else {
        var key = key;
      }
        var props = {
          children: (
            <div id={"props" + key}>
             {key} 
            </div>),
          key: key,
          className: 'border foo'
        }
        
        var foo = (<div {...props} />)
        ptr.props.children[ ptr.props.children.length ] = foo;
        ptr = foo; 
        
        var className = "cat-title"
        var vis = {};
       
        if (this.state.clicked[key] === false){ //
          vis.display = "none";
          arrow = "glyphicon glyphicon-triangle-left";
        }

        else if (typeof this.state.clicked[key] === "undefined" ){ //initially everything is closed 
          vis.display = "none";
          if (typeof key !== "string") {
              console.log(key)
              arrow = "invisible";
              className = "cat-title-blank"
          }

          else {
            arrow = "glyphicon glyphicon-triangle-left";
          }
          
        } 

        else if ( this.state.clicked[key] === true ){
          arrow = "glyphicon glyphicon-triangle-bottom";
           
        
        }


        return <div id= {"ptr" +key} className= "cat-wrapper">
            <div id= {"title" +key} className={className} onClick={this.guess.bind(this, key)}>
              { (key !== "undefined") ? key : "" }
              <span className = {arrow} id={key} onClick={this.setVisibility.bind(this, "ptr" +key)}></span>
            </div>
            <div style={vis}>
            {this._walk( node[ key ], ptr )}
            </div>
            </div>;
        }.bind(this));
      
    }
    else {
        return ptr;
    }
  },
  hideOnLose:function() {
    if (this.state.wrongGuesses > 3) {
      return (<div className="youLose">
               <div className="youLose_content"> 
                <h2>Game Over</h2>
                <h3> Final Score:</h3>
                <div>Wrong:{this.state.wrongGuesses}</div>
                <div>Right:{this.state.rightGuesses}</div>
                <button className="black_button" onClick={function () {location.reload();}}>Play Again</button>
               </div>
              </div>)
    }
  },
  howTo: function () {
    $(".container").css ('overflow', "initial")
    this.setState({
      displayState: {
        display: 'block'
      }

    });
  },
  closeModal:function () {
    $(".container").css ('overflow', "auto")
    this.setState({
      displayState: {
        display: 'none'
      }

    });
    
  },
  render: function() {
    return (      
          <div className="container">
            {this.hideOnLose()}
              <div id="tree" className="left_col tree_wrapper">
                <div className="left_col_text">
                  <h1>Taxonomy!!!</h1>
                  <button onClick={this.howTo} className="black_button">How to Play</button>
                  <div className="modal" style={this.state.displayState}>
                  
                    <div onClick={this.closeModal} className="modal_close glyphicon glyphicon-remove"></div>
                    <div>
                    <h1 className="modal_title">How to Play:</h1>
                    <div className="modal_content">
                      
                        <p>The goal of "Taxonomy: The Game" is to build the tree of life by guessing if the animals on the board are more closely related to each other than the others. You get three incorrect guesses before you lose. 
                         </p>
                          <div className="modal_row">
                            <h4 className="modal_title">Step One:</h4>
                            <div className="inline-block modal_row_img">
                              <img className="inline-block" src="imgs/animal_demo01.jpg" width="28%" height="auto" />
                              <img className="inline-block" src="imgs/animal_demo02.jpg" width="28%" height="auto" />
                            </div>
                            <p className="inline-block-p">
                            Each turn you will get an animal card. The first card will have no relatives on the board, since there are no other animals yet, so we can put it in Animalia.
                            </p>
                          </div>

                          
                          <div className="modal_row">
                          <h4 className="modal_title">Step Two:</h4>
                          <div className="inline-block modal_row_img">
                            <img className="inline-block" src="imgs/animal_demo03.jpg" width="28%" height="auto" />
                          </div>
                          <p className="inline-block-p">If you any animals are more closely related you click on the closest category they belong in. For example, The leopard and the guinea pig are Animals, but they're also both vertebrates and mammals, so we'll open "Chordata" and click on "Mammalia".
                            </p>

                          </div>
                      
                          
                          <div className="modal_row">
                            <h4 className="modal_title">Step Three:</h4>
                            <div className="inline-block modal_row_img">
                              <img className="inline-block" src="imgs/animal_demo04.jpg" width="28%" height="auto" />
                            </div>
                            <p className="inline-block-p">
                              Each round it'll get more complex. All three animals are mammals, but the wolf and leopard are carnivores, so we'll click on "Carnivora" and move them into that category. 
                            </p>
                          </div>
                           
                          <div className="modal_row">
                            <h4 className="modal_title">Step Four:</h4>
                            <div className="inline-block modal_row_img">
                              <img className="inline-block" src="imgs/animal_demo041.jpg" width="28%" height="auto" />
                              <img className="inline-block" src="imgs/animal_demo05.jpg" width="28%" height="auto" />
                            </div>
                            <p className="inline-block-p">
                             The Orca and the Guinea pig are both in the class "Mammalia", but not the order "Carnivora", so I would click "Mammalia" and add the Orca there. The Great White shark is not in the "Mammalia" or "Carnivora", but it is in the Phylum "Chordata", so you would click on that.
                            </p>
                          </div>
                          <div className="modal_row">
                           <strong>If you guess incorrectly the tree will move the animals into the right category and take away a point.</strong>
                           <strong>*Game works on mobile, try playing on the go</strong>
                          </div>
                      
                      </div>
                    </div>
                    

                  </div>
                  <div className="mobile">
                      <div className="score">Wrong:{this.state.wrongGuesses}</div>
                      <div className="score">Right:{this.state.rightGuesses}</div>
                    </div>
                  <p>Species are classified by their Kindom, Phyum, Class, Order, Family, and Genus. Try guess if any of the species on the tree belong in a closer group with any of the others. Click here to see a practice round.</p>
                </div>
                <div className="mobile">
                    {this.drawCard()}
                </div>
                <div id="state.foo" className="tree"  data-foo={this.state.foo}>
                  <div id="renderTree">{this.renderTree( tree )}</div>
                </div>
              </div>
              <div className="right_col sidebar" >
                <div>{this.drawCard()}</div>
                <strong className="score">Score:</strong>
                <div className="score">Wrong:{this.state.wrongGuesses}</div>
                <div className="score">Right:{this.state.rightGuesses}</div>
              </div>
       
        </div>
          );
  }
});

// var maxWidth  = $('#outer').width();
// var maxHeight = $('#state.foo').height();

// $(window).resize(function(evt) {
//     var $window = $(window);
//     var width = $window.width();
//     var height = $window.height();
//     var scale;

//     // early exit
//     if(width >= maxWidth && height >= maxHeight) {
//         $('#outer').css({'-webkit-transform': ''});
//         $('#wrap').css({ width: '', height: '' });
//         return;
//     }

//     scale = Math.min(width/maxWidth, height/maxHeight);

//     $('#outer').css({'-webkit-transform': 'scale(' + scale + ')'});
//     $('#wrap').css({ width: maxWidth * scale, height: maxHeight * scale });
// });




buildTree();