// @Todo : reference and talk about this possibility :
// https://johnresig.com/blog/simple-javascript-inheritance/
// Resig says that what he likes in his implementation of inheritance is that the super class' constructor is not automatically called.  It is the same with the `extend` function.  Furthermore, a compagnon function `promote` will provide a solution against `method shadowing`.  `method shadowing` is when a subclass has a property (attributes or methods) whose name shadows another property on the superclass.  This means the subclass looses access to the superclass property with the same name.  In Java, this would not happen, and so this is where JS takes it reputation of being a very unstable language.  But in reality, it comes back to the history of Javascript, where its creators wished to attract the huge Java community to their browser environments.  But it only shared part of the name `Java` and some syntax, but its a whole new beast.  It is not compiled like Java, it is interpreted.  Also, `method shadowing` would sort of be called `polymorphism` in Java, but it really isn't.  And the inheritance mechanism is via a `prototype chain`.  So inheriting from various classes or interfaces at the same time is just not the way inheritance was thought as, in JS.  And for the big finally, I'm one of these `Java-background` coders...

// @Todo: same with this => https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance => look for text `My answer seems like less code and it works for me:`

console.code = (code) =>
  console.log(`%c ${code}`, "font-weight: bold;color:green;");

console.info2 = (info) => console.info(`%c${info}`, "color:yellow");

function extend(subclass, superclass) {
  "use strict";

  function o() {
    this.constructor = subclass;
  }
  o.prototype = superclass.prototype;
  return (subclass.prototype = new o());
}

console.info2(
  "Imagine you want to code a 2D spaceship that can be dragged by the user mouse..."
);

console.code("var draggableShip = new DraggableShip()");

console.info2("So, `DraggableShip` could be defined as follows");

console.code("class Ship extends Draggable");

console.info2(
  "Then, imagine that, because you chose to work with a library `CreateJS` to ease the process of working with the HTML canvas element, your `Ship` class must also inherit from createjs.Container"
);

console.info2(
  "But unfortunately, in JS, the `extends` syntax does not allow for multiple/simultaneous inheritance.  So the following cannot be done:"
);

console.code("class Ship extends [Draggable, Container]");

console.info2(
  "So let me introduce how inheritance works in Javascript.  Meet our new best friend, the `extend`  function:"
);

console.code(`
function extend(subclass, superclass) {
    "use strict";

    function o() {
        this.constructor = subclass;
    }

    o.prototype = superclass.prototype;
    return (subclass.prototype = new o());
    }
`);

console.info2(
  "To make matters worse, when `'use strict';` is used in the `extend` function, it is not allowed to do `subclass.prototype = new o()` ==> `error in console : `Uncaught TypeError: Cannot assign to read only property 'prototype' of function 'class Draggable'` "
);

console.info2(
  "So at this point, either the 'use strict'; directive has to be removed, or the `Draggable` class must converted into a constructor function.  Why? Because we can keep this directive in this case because no errors were thrown when tried ;)"
);

console.info2(
  "However, this would seem to be a dilema for the coder whose background is Java, or some other Object Orient Programming language.  It is rather confusing for them that Javascript should differ so much to Java in so many respects.  "
);

console.info2(
  "The lesson here is that Javascript is not an OOP language.  It is a functional scripting language. Inheritance works via prototypal chaining, or the prototype chain mechanism."
);

console.info2(
  "And, as one of their worse nightmares, it is dynamic, which means that you can add properties at runtime to any object's prototype, and all instances (new or old) will be provided those properties."
);

console.info2(
  "In fact, listen to this : the `class` directive is JUST syntaxic sugar to satisfy coders with OOP backgrounds.  In the background (pun intended), creating a new object from a class or from its equivalent function constructor, both yield the same exact result.  Watch this: "
);

console.code(`
    function Draggable() {
        console.log("Hi from Draggable");
    }
    const draggable = new Draggable();
    console.log(draggable)
  `);
function Draggable() {
  console.log("Hi from Draggable");
}
const draggable = new Draggable();
console.log(draggable);

/**
 * Draggable
 */

function Draggable() {
  console.log("Hi from Draggable");
}
Draggable.prototype.dragMe = function () {
  console.log("dragging...");
};

/**
 * DraggableContainer
 */
var DraggableContainer = extend(Draggable, createjs.Container);
// At this point, DraggableContainer === Draggable.prototype

try {
  console.code("new Draggable()['dragMe']()");
  new Draggable()["dragMe"]();
} catch (error) {
  console.error(error);
}
// Hi from Draggable
// Uncaught TypeError: (intermediate value).dragMe is not a function
console.info2(
  "This error can be fixed by adding to the Draggable.prototype AFTER the line `extend(Draggable, createjs.Container);`, and NOT prior !!"
);

// So let's add it again
Draggable.prototype.dragMe = function () {
  console.log("dragging...");
};
// And let's try again
console.code("new Draggable()['dragMe']()");
var draggableContainer = new Draggable();
// Hi from Draggable

draggableContainer.dragMe();
// dragging...

console.info2(
  "Ok, let's make sure that an instance of `Draggable` does have access to the `createjs.Container.prototype.addChild` method for example."
);
console.code("draggableContainer.addChild");
console.log(draggableContainer.addChild);
// ƒ (child) {
//     if (child == null) { return child; }
//     var l = arguments.length;
//     if (l > 1) {
//         for (var i=0; i<l; i++) { this.addChild(arguments[i]); }
//         return arguments[l-1];
//     }
// 		// Note:…
console.info2(
  "Indeed it does, we just printed to source code the addChild method."
);
console.info2("So we've got our first inheritance");

function Ship() {
  this.name = "Falcon";
  console.log(`hello from ${this.name} constructor function`);
}
Ship.prototype.takeOff = function () {
  console.log(`${this.name} is taking off...`);
};

new Ship()["takeOff"]();
// VM37202:3 hello from Falcon constructor function
// VM37202:5 Falcon is taking off...

Ship.prototype.takeOff = () => console.log(`${this.name} is taking off...`);
new Ship()["takeOff"]();
// VM37202:3 hello from Falcon constructor function
// VM37202:5  is taking off... <= notice the name is missing (this is because of the arrow function since the version where `Ship.prototype.takeOff` is a normal function, the `this.name` resolves to `Falcon`)

/**
 *
 * DraggableShip
 *
 */

var DraggableShip = extend(Ship, Draggable);

Ship.prototype.takeOff = function () {
  console.log(`${this.name} is taking off...`);
};

new Ship()["takeOff"]();

var ship = new Ship();
// VM37500:3 hello from Falcon constructor function
console.log(ship);

// So, `Ship` inherits from `Container` through `Draggable`
// Indeed, the instance `ship` had access to a method from `createjs.Container`, `createjs.Container.prototype.addChild`
ship.addChild;
// ƒ (child) {
// 		if (child == null) { return child; }
// 		var l = arguments.length;
// 		if (l > 1) {
// 			for (var i=0; i<l; i++) { this.addChild(arguments[i]); }
// 			return arguments[l-1];
// 		}
// 		// Note:…

// Also, `Ship` inherits from `Draggable` since `Draggable.prototype.dragMe` is accessible to the instance `ship` of `Ship`.
ship.dragMe();

ship.takeOff();
// VM38564:1 Uncaught TypeError: ship.takeOff is not a function
