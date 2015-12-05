var animalList = allAnimals.results.collection1
var tree = {}
// buildTree ();

var events = new EventEmitter();
events.on('foo', function() {
  randomAnimalGenerator();
  _render(  );
});

function _render(  ) {
  //console.log( tree )
    React.render(
     <Container data={JSON.stringify(tree)} now={Date.now()}/>,
     document.getElementById('content')
    );  
}



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
//dynamincally builds a "tree" (obj) with the taxonomic categories
//only used the main ones(doesn't account for Subclasses and Infraclasses, ect)

//all animals, vertavrates, mammals, carnivores
//console.log(animalList[22])//wolf
//console.log(animalList[3])//badger

//both felines
//console.log(animalList[7])//lion
//console.log(animalList[7])//tiger

function compare (item) {
  var tags = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species' ];
  var animalTags = tags.map(function(tag){
    if ( typeof item[tag] === "undefined" ) {
      return undefined;
    }
    return item[ tag ].text;
  });

  var K = (tree[animalTags[0]]),
     P = (K[animalTags[1]]),
     C = (P[animalTags[2]]),
     O = (C[animalTags[3]]),
     F = (O[animalTags[4]]),
     G = (F[animalTags[5]]); 

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
            

    //check O

}//compare

function randomAnimalGenerator  () {
    var randomIndex = Math.floor( Math.random()*animalList.length );
    var randomAnimal = animalList[ randomIndex ] ;
    // remove from animalList so we don't get dupes!
    animalList.splice( randomIndex, 1 );
   // console.log(randomAnimal.AnimalName);
    compare(randomAnimal)
}//grabs a random animal
//removes it from the data obj
//runs the compare function to find it's appropriate place in the tree


/////
var Container = React.createClass({
  getInitialState: function() {
    return {
      // data: this.props.data,
      visible: true,
      clicked: {},
      animalsAreThere: false,
      foo: Date.now()
    }
  },
  //foo = the tree after the render tree function  
  handleClick: function () {
    // this.props.events.emit('foo');
    randomAnimalGenerator();
     this.setState({
      animalsAreThere: true 
    });

    //console.log(tree)
    this.setState({
      foo: Math.random()
    });
  },
  toggle: function(event){
  //     this.setState({visible: !this.state.visible});
  // }
    
    // if (this.state.visible === true) {
    //   return (<span className="glyphicon glyphicon-triangle-bottom"></span>)
    // }
    // else {
    //   return(<span className="glyphicon glyphicon-triangle-left"></span>)
    // } 
   //call the function walk that takes the props(the state obj) and a div w animalia in it
  },
  setVisibility: function (event) {
     
    this.setState({visible: !this.state.visible}, function(){
      console.log(this.state.visible)

    });
    this.state.clicked[event.target.id]=this.state.visible;


  },

  renderTree: function( data ) {
    // console.log('here!', this.state, this.state.data.Animalia)
    return this._walk( data, (<div><div>Animalia</div><div>Animalia</div></div>) );
  },//returns divs with obj keys
  _walk: function( node, ptr ) {
    if ( typeof node === "undefined" ) {
      return ptr;
    }
    var keys = Object.keys( node );
    if ( keys.length !== 0 ) {
      return keys.map(function( key, i ){//took ou tthe i next to key            
        if ( !isNaN(parseInt( key ) ) ) {
          if (key === "0"){
            console.log(key, ptr.props.children.props.children)
          }
          if (typeof node[ key ][ 0 ] === "undefined" ) {
            return null;
          }
          var key = node[ 0 ].map(function (i, idx) {
            console.log(key[0],idx)
           // console.log(key, node[ key ], node)
            return (
             <div id={"key"+i.AnimalName} className= "animal border">
              {i.AnimalName}
             </div>
            );
          });
          //var key = (<div>{indents}</div>)
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

        if (this.state.clicked[key] === true){
          className = "glyphicon glyphicon-triangle-left";

        }
        else if (typeof this.state.clicked[key] === "undefined" || this.state.clicked[key] === false ){
          className = "glyphicon glyphicon-triangle-bottom";
        }
        

        var length = keys.length;


        if (typeof key !== "string"){//if its an animal obj//it's 100% width 
          var style = {width: "100%"};
          var animalsAreThere = true
          // if (keys.length > 1){
          //   var length = keys.length-1;
          // }
        }//else if 

        else if (keys.length <= 3){//if there are two three cat it's 50 or 25%
          if (this.state.animalsAreThere === true)
          var length = keys.length - 1;
          var style = {width: ""+(100/(length))+"%"};
        }
        else {//if it's more they are bigger and go to multiple lines
          var style = {width: ""+(100/((length)/3))+"%"};
          console.log(keys.length, style)
        }

       
        // console.log(key, ptr.props.children.props)
        return <div id= {"ptr" +key} style={style} className= "test block border">
          <div className="title" onClick={this.setVisibility}>
            { (key !== "undefined") ? key : "" }
            <span className = {className} id={key}></span>
          </div>
          {this._walk( node[ key ], ptr )}
        </div>;
      }.bind(this))
    }
    else {
        return ptr;
    }
  },
  render: function() {
    // console.log( this.state.foo );
    // console.log('here')
    return (
          <div class="container-fluid">
            <button onClick={this.handleClick}>guess</button>
              <div class="row">
                <div data-foo={this.state.foo}>
                  <div>{this.renderTree( tree )}</div>
                </div>
            </div>
          </div>);
  }
});



buildTree();