(function () {
	
	var Engine = {};
	
	Engine._scope = {};
	
	Engine.addProp = function (scopeName, prop) {
		
		var binder = new Classeur();
		
		Object.defineProperty(Engine._scope[scopeName], prop, {
			set: function (newVal) {
				
			},
			get: function () {
				return value;
			},
			enumerable:true
		});
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
