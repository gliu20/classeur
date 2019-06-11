(function () {
	
	const BIND_ATTR = "data-cl-bind";
	
	var Engine = {};
	
	Engine.scope = {};
	Engine._bindings = {};
	
	Engine.init = function () {
		var bindableEles = document.querySelectorAll("["+BIND_ATTR+"]");
		
		// group elements by binding attribute value
		for (var item of bindableEles) {
			// create ele struct in Engine._bindings as follows:
			// {
			// 		"bindAttrValue": [
			//			element,
			//			element2,
			//			element3
			// 			// etc...
			// 		]
			// } 
			Engine._bindings[item[BIND_ATTR]] = 
				Engine._bindings[item[BIND_ATTR]] || (function () {
					var classeur = new Classeur ();
					
					Object.defineProperty(Engine.scope,item[BIND_ATTR], {
						set: classeur.setVal,
						get: classeur.getVal,
						enumerable:true
					});
					
					return classeur;
			})();
			
			// add element to classeur
			Engine._bindings[item[BIND_ATTR]].addEle(item);
		}
	}
	
})();

class Classeur {
	constructor (eles) {
		this._eles = eles || [];
		this._value;
	}
	
	addEle (ele) {
		this._eles.push(ele)
	}
	
	getVal () {
		return this._value;
	}
	
	/**
	 * updates all necessary elements when value is changed
	 */
	setVal (newVal) {
		this._value = newVal;
		
		for (let item of this._eles) {
			// detect if element is an input
			// TODO maybe refactor this into function for detecting if
			// an element is an input
			if (item.value !== undefined) {
				item.value = newVal;
			}
			else {
				// TODO is it necessary to include 'unsafe' option for those
				// who wish to use .innerHTML?
				item.innerText = newVal;
			}
		}
	}
}
