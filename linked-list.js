//tertiary operators for extra headaches, sorry
//code can definitely improved upon, but it works fine as is.
class linkedList{
    constructor(list){
        this.list = typeof(list) == 'object'?list:node(list);
    }
    //shows full list in object form
    show(){
        return this.list;
    }
    //adds object to the end of the list
    append(value){
        //finds the end of the list
        function appendFinder(list, value){
            return list.next?appendFinder(list.next, value):list.next = node(value);
        }
        return appendFinder(this.list, value);
    }
    //adds objects to the start of the list
    prepend(value){
        this.list = node(value, this.list);
    }
    //returns size
    size(){
        let curSize = 1;
        sizeFinder(this.list);
        function sizeFinder(list){
            if(list.next){
                sizeFinder(list.next);
                curSize++;
            }
        }
        return curSize;
    }
    //returns first element
    head(){
        return this.list;
    }
    //returns last element
    tail(){
        function tailFinder(list){
            return list.next?tailFinder(list.next):list;
        }
        return tailFinder(this.list);
    }
    //this works fine, will output the LAST element if index is not found, could put a warning for
    //overflowing index using size() but this works just fine
    at(index){
        //-1 or else the index will start at 1, for some reason
        let currIndex = -1;
        function atFinder(list, index){
            currIndex++;
            return list.next&&currIndex<index?atFinder(list.next, index):list;
        }
        return atFinder(this.list, index);
    }
    //removes last node
    pop(){
        //i have no idea how this works, but it does, so uh
        //the -2 is because size() returns the size of the list and not the last index thats required
        //by at to return the second to the last item
        return this.at(this.size() - 2).next = null;
    }
    //looks at list one by one and see if its the value, its a linear search
    contains(value, find){
        let found = false;
        let x = null;
        let index = 0;
        function containFinder(list){
            list.value == value?found = true:found = false;
            list.value == value?x = index:0;
            if(list.next && !found){
                index++;
                containFinder(list.next);
            }
        }
        containFinder(this.list);
        return find!=null?x: found;
    }
    //got lazy on this one so i just used the contains() function, they are identical in function
    find(value){
        return this.contains(value, true);
    }
    //this could be done more elegantly but for now it looks fine.
    toString(){
        function stringFinder(list){
            console.log(list.next == null?'('+list.value+') -> null':'('+list.value+') -> '+'('+list.next.value+')');
            list.next?stringFinder(list.next):'null';
        }
        return stringFinder(this.list);
    }
    //somehow works
    insertAt(index, value){
        if(index){
            return this.at(index - 1).next = node(value, this.at(index));           
        }else{
            this.list = node(value, this.list);
        }
            
        
    }
    //this works...somehow, uses pop() logic to find and remove index
    removeAt(index){
        if(index){
            return this.at(index == 0?0:index - 1).next = this.at(index).next;
        }else{
            this.list = this.list.next;
        }
        
    }
};
//factory for nodes
function node(value, next){
    return{
        //fixes headaches for later
        value: value == null?null:value,
        next: next == null?null:next
    }
}


/*
//example of list for testing purposes
let testList = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };

let listItem = new linkedList(testList);
*/