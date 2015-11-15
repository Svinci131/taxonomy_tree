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
  function firstCheck (parent) {
    var firstChild = parent[0];
    //console.log(firstChild)
    var holder = [];
    var temp = null;
    var length = firstChild.length;
    var child = getChildObj (parent)//if is phylum this is class(looks like {carninvoraect})
    firstChild[length]  = item;//add itembj to p array
    // console.log(length, firstChild)
    var  childTag = getChildTag (item, parent)
    //var isThere = null;

    for (var x = 0; x < length; x++) {
    if ( typeof firstChild[x] !== "undefined"){
        //console.log(firstChild[x])//animals in parent(chordoata)
        var catchildTag = getChildTag (item, parent)//next group the class
        
        if (item[childTag].text === firstChild[x][childTag].text && item.AnimalName !== firstChild[x].AnimalName ){//move matches from o to f 
          //console.log(childTag)//if they share the next label(class)
          
          temp = firstChild[x]; //each animal that shares class

          holder.push(temp);
          //holder.push(item);//ADDED TODAY
          //console.log(temp)
          child[0] = holder;
          //console.log(firstChild[x])
          delete firstChild[x];
          delete firstChild[length];  
  
        }//if match
      }//if O[0][x] isnt undefined
    }//for loop

  if (holder[((holder.length)-1)] === item) {
    console.log("match", item.AnimalName)
  }
  else {
    holder.push(item)
  }
  
  //console.log(holder, child)
  secondCheck (child)

  //  //thirdCheck (child)
  //  //console.log("firstchild", firstChild, "parent",parent,"child", child)//class
  }
  // //first check is seeing if the classes are the name if theyr the same 
  
  function secondCheck (parent) {
    var firstO = parent[0];
    var child = getChildObj (parent);
    //console.log("secondcheck", firstO, child)
    if (typeof firstO !== "undefined" && typeof child !== "undefined") {  
      var holder = [];
      var temp = null;
      var length = firstO.length;
      var  childTag = getChildTag (item, parent)
      var  parTag = getParentTag (item, parent)
      //firstCheck()
      console.log(holder)
      for (var x = 0; x < length; x++){
        if ( typeof firstO[x] !== "undefined"){
          //console.log("firstO[x]", firstO[x])

          // if (item[childTag].text === firstO[x][childTag].text && item.AnimalName !== firstO[x].AnimalName && holder.length !== 0 ){
          //   //console.log( childTag, item[childTag].text , firstO[x][childTag].text, x)
          //     //console.log(item.AnimalName, JSON.parse(JSON.stringify(firstO[x])));
          //     temp = firstO[x]; 
          //     console.log(temp)
          //     holder.push(temp);

          //     child[0]= holder;
              
              
            
          //   //delete F[0][length];
          // }//if match
          
          //console.log("parent", parent, "firstO", firstO,"nexttag", childTag, "childObj", child)
          if (item[childTag].text === firstO[x][childTag].text && item.AnimalName !== firstO[x].AnimalName && holder.length !== 0 ){//move matches from o to f 
              //console.log( childTag, item[childTag].text , firstO[x][childTag].text, x)
              //console.log(item.AnimalName, JSON.parse(JSON.stringify(firstO[x])));
              temp = firstO[x]; 
              console.log(temp)
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
    else {
      //console.log( 'O is ', O, setStatus( O ) )
      if (setStatus (O) === 1) {
        firstCheck (O)
      }
      //
      else {
        //console.log( 'C is ', C, setStatus( C ) )
        if (setStatus (C) === 1) {
          firstCheck (C)
          }
        else {
          if (setStatus (P) === 1) {
            console.log(P[0])
            firstCheck (P)
            firstCheck (C)
          } 
          else {

            if (setStatus (K) === 1) {
              firstCheck (K)
            } 
            else {    
            K[0] = [item];
            } 
            
          }
        }


    }
  }
    //check O

}//compare

function randomAnimalGenerator  () {
    var randomIndex = Math.floor( Math.random()*animalList.length );
    var randomAnimal = animalList[ randomIndex ] ;
    // remove from animalList so we don't get dupes!
    animalList.splice( randomIndex, 1 );
    console.log(randomAnimal.AnimalName);
    compare(randomAnimal)
}//grabs a random animal
//removes it from the data obj
//runs the compare function to find it's appropriate place in the tree


/////
var Container = React.createClass({
  getInitialState: function() {
    return {
      // data: this.props.data,
      foo: Date.now()
    }
  },
  //foo = the tree after the render tree function  
  handleClick: function () {
    // this.props.events.emit('foo');
    randomAnimalGenerator();
    console.log(tree)
    this.setState({
      foo: Math.random()
    });
    // console.log(this.props.data)
    
    //setState(data, callback) 
  },
   componentDidUpdate: function() {
    // alert("componentDidUpdate")
   },
   //call the function walk that takes the props(the state obj) and a div w animalia in it
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
      //if it has more than one key 
      if ( keys.length === 0 && keys[ 0 ] === "undefined" ) {
        return (ptr);
      }
      //for each key grab each 

      return keys.map(function( key, i ){//took ou tthe i next to key            
       if ( !isNaN(parseInt( key ) ) ) {

          if (typeof node[ key ][ 0 ] === "undefined" ) {
            return ptr;
          }//if theres nothing there ignore
          //console.info( key, node[ key ], node )
          //console.log(node[ key ])//array of obj

          node[ key ].forEach (function (a){
            //console.log(a)
          })//doesn't work really

         
          var key = node[ key ].map(function (i, idx) {
            return (
             <div className= "border x">
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
          children: (<div>
            {key}

          </div>),
          // key: key,
          className: 'border'
        }
        if ( typeof key === "undefined" || key === "undefined" ) {
          // console.log('######################');
          // console.log( key, i, ptr )
          // console.log('#######################')
        }
        //console.log( props, ptr, key );
        var foo = (<div {...props} />);
        ptr.props.children[ ptr.props.children.length ] = foo;
        ptr = foo; 

        return <div className="border">
          { (key !== "undefined") ? key : "" }
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
    return (<div data-foo={this.state.foo}>
       <button onClick={this.handleClick}>guess</button>
        <div>{this.renderTree( tree )}</div>
      </div>);
  }
});



buildTree();
