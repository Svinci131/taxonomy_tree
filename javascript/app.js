var animalList = allAnimals.results.collection1
var tree = {}
buildTree () 

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
  //I should probably rename these
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
  
  //console.log(typeof Object.keys(obj)[1])
  function getChildTag (obj, L) {
    for (var i = 1; i <= 5; ++i) {
      if (typeof L[animalTags[i]] !== "undefined") {
        return tags[i];
      }
    }
  }

  function getChildObj (L) {
    for (var i = 1; i <= 5; ++i) {
      if (typeof L[animalTags[i]] !== "undefined") {
        //console.log(L[animalTags[i]], F)
        var childObj = L[animalTags[i]]

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
      var child = getChildObj (parent)
      firstChild[length]  = item;
      var  childTag = getChildTag (item, parent)
      //console.log(item[childTag].text, item.Family.text)

      for (var x = 0; x < length; x++){
        if ( typeof firstChild[x] !== "undefined"){
          //var catChildTag = 
          
          var catchildTag = getChildTag (item, parent)

          if (item[childTag].text === firstChild[x][childTag].text){//move matches from o to f 
            //console.log(getChildTag (item, label), getChildTag (cat[x],label))
            temp = firstChild[x]; 
            holder.push(temp);
            

            child[0] = holder;
            //console.log(child[0], F[0])
            delete firstChild[x];
            delete firstChild[length];    
          }//if match
        }//if O[0][x] isnt undefined
      }//for loop
    holder.push (item);
    secondCheck (child)
  }

  //console.log(item)
  function secondCheck (parent) {

    var firstO = parent[0];
    var child = getChildObj (parent);


    ///console.log(item.AnimalName, parent)
    if (typeof firstO !== "undefined" && typeof child !== "undefined") {  
      var holder = [];
      var temp = null;
      var length = firstO.length;
      var  childTag = getChildTag (item, parent)
      //console.log()
      //F[0][length]  = item;
      //console.log(item, childTag)
      for (var x = 0; x < length; x++){
        if ( typeof firstO[x] !== "undefined"){
          //console.log(holder)

          if (item[childTag].text === firstO[x][childTag].text && item.AnimalName !== firstO[x].AnimalName && holder.length !== 0 ){//move matches from o to f 
              console.log( childTag, item[childTag].text , firstO[x][childTag].text, x)
              console.log(item.AnimalName, JSON.parse(JSON.stringify(firstO[x])));
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
    var status = 0;
    if (typeof firstKey !== "undefined") {
      status = 1; 
      }
    else {
      status = 2; 
    }
    return status;
  }


  if (setStatus (F) === 1) {
    firstCheck (F)
  }

  else {
    if (setStatus (O) === 1) {
      firstCheck (O)
    }
      //
    else {
      
      if (setStatus (C) === 1) {
        firstCheck (C)
        }
        else {
        
          if (typeof P[0] !== "undefined") {  

            var holder = [];
            var temp = null;
            for (var x = 0; x < P[0].length; x++){
              
              if ( typeof P[0][x] !== "undefined"){
                //console.log(it)
                if (item.Class.text === P[0][x].Class.text){
                  
                    temp = P[0][x]; 
                    holder.push(temp);  
                    delete P[0][x];       
                }
              }
            }
          holder.push (item);
          C[0] = holder;
          } 
          else {

            if (typeof K[0] !== "undefined") {
              for (var x = 0; x < K[0].length; x++){
                if (item.Phylum.text === K[0][x].Phylum.text){
                  var holder = [K[0][x]]; 
                  holder.push (item);
              
                  P[0] = holder;
                  delete K[0][x];   
                  //console.log(P[0])
                  //console.log(K[0])

                }
              }

            } 
            else {
            //var holder = K[0];      
            K[0] = array;
            array.push (item); 
            //console.log (array, item);
            //console.log(K[0])
            } 
            
          }
        }

    }
  }
    //check O

}//walks through the tree obj, if there's are animals in an the same kindgom that are also in the same phylum
//it checks the class, order, family ect until there are no more relatives then it adds the new animal and its relative into the most specefic category
//showing kids how/where species diverge 


function randomAnimalGenerator  () {
    var randomIndex = Math.floor( Math.random()*animalList.length );
    var randomAnimal = animalList[ randomIndex ] ;
    // remove from animalList so we don't get dupes!
    animalList.splice( randomIndex, 1 );
    console.log(randomAnimal);
    compare(randomAnimal)
}//grabs a random animal
//removes it from the data obj
//runs the compare function to find it's appropriate place in the tree


/////
var Container = React.createClass({
  getInitialState: function() {
    return {
      data: tree,
      foo: null
    }
  },
  //foo = the tree after the render tree function
  //handleClick:
  handleClick: function() {
    //

    console.log(this.state.data);
    if ( this.state.data ) {
      this.setState({
        foo: this.renderTree()
      });   
    }    
   },
   componentShouldUpdate: function(){
     console.log(this.state.data);
    if ( this.state.data ) {
      this.setState({
        foo: this.renderTree()
      });   
    }
   },
   //call the function walk that takes the props(the state obj) and a div w animalia in it
  renderTree: function() {
    console.log('here!', this.state, this.state.data.Animalia)
    return this._walk( this.state.data, (<div><div>Animalia</div><div>Animalia</div></div>) );
  },//returns divs with obj keys
  _walk: function( node, ptr ) {
    var keys = Object.keys( node );
    //takes each key of the node the animalia prop of tree in "data" stateobj
    if ( keys.length !== 0 ) {
      if ( keys.length === 0 && keys[ 0 ] === "undefined" ) {
        return (ptr);
      }
      return keys.map(function( key, i ){
        var props = {
          children: (<div>
            {key}
          </div>),
          key: key,
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
    console.log( this.state.foo );

    return (<div>
      <button onClick={this.handleClick} >guess</button>
        <div>{this.state.foo}</div>
      </div>);
  }
});

// <div>{this.state.foo}</div>

console.log('###', tree)
React.render(
  <Container data={tree} />,
  document.getElementById('content')
);

////////////////////////
