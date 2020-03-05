
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Obzen = factory();
	}
})(this, function () {

	'use strict';

	var Obzen = function (options) {
		var self = this;
		// public args
		self.publicArgs = {
			controlsContainer: options.controlsContainer,
			itemsContainer: options.itemsContainer
		}
		// public methods
		self.getControlsContaner = function(){
			console.log(_controlsContainer);
		}
		self.getitemsContainer = function(){
			console.log(_controlsContainer);
		}
		self.destroy = function() {
			console.log("destroying obzen instance");
			self.destroy();
		}
		// self.publicMethods = {
		//
		// 	getControlsContaner: function(){
		// 		console.log(_controlsContainer);
		// 	},
		// 	getitemsContainer: function(){
		// 		console.log(_controlsContainer);
		// 	},
		// 	destroy: function() {
		// 		console.log("destroying obzen instance");
		// 	}
		//
		// }
		// ---- private args ----- //
		var _privateArgs = {}
		var _controlsContainer;
		var _sortingControlsContainer;
		var _itemsContainer;
		var _animate;
		var _allItems;
		var _theme;
		var _filterOptions = ["all"];
		// private methods //
		var _onlyUnique = function(value, index, self) {
			return self.indexOf(value) === index;
		}

		var _arrayUnique = function(incomingArray) {
			var unique = incomingArray.filter( _onlyUnique );
			return unique;
		}

		var _getFilterValue = function(element) {
			return element.getAttribute('data-ftate-group');
		}

		var _getLinkedElements = function (filterVal) {
			if(filterVal == "all") {
				_showAll(_itemsContainer);
			} else {
				_showAll(_itemsContainer);
				var elementsToFilter = document.querySelectorAll('[data-ftate-value="'+ filterVal + '"]');
				elementsToFilter = Array.from(elementsToFilter);
				_allItems = Array.from(_allItems);
				var difference = _allItems.filter(x => !elementsToFilter.includes(x));
				for (var i = 0; i < difference.length; i++) {
					console.log(difference[i]);
					// difference[i].style.display = 'none';
					// difference[i].classList.add("obzen-hidden-visual");
					difference[i].classList.add("obzen-hidden");
				}
			}
		}

		var _showAll = function (target) {
			var parent = document.getElementsByClassName(target)[0];
			_allItems = parent.querySelectorAll('[data-ftate-value]');
			for (var i = 0; i < _allItems.length; i++) {
				//_allItems[i].style.display = 'inline-block';
				// _allItems[i].classList.remove("obzen-hidden-visual");
				_allItems[i].classList.remove("obzen-hidden");

			}
		}

		var _handleClick = function () {
			var filterControlWrapper = document.getElementById(_controlsContainer);
			var controlBtns = filterControlWrapper.getElementsByTagName("button");
			console.log(controlBtns);
			for (var i = 0; i < controlBtns.length; i++) {
				controlBtns[i].addEventListener('click', function() {
					var filterValue = _getFilterValue(this);
					_getLinkedElements(filterValue);
				});
			}
		}

		var _sortElements = function (sortValue) {
				var parentNode = document.getElementsByClassName("items")[0];
				var elementsToSort = document.querySelectorAll('[data-ftate-value="'+ sortValue + '"]');

				var divs = document.querySelectorAll('div');

				[].forEach.call(elementsToSort, function(el) {
				    parentNode.prepend(el);
				});
		}

		var _handleSortClick = function () {
			var sortControlWrapper = document.getElementById(_sortingControlsContainer);
			var controlBtns = sortControlWrapper.getElementsByTagName("button");
			console.log(controlBtns);
			for (var i = 0; i < controlBtns.length; i++) {
				controlBtns[i].addEventListener('click', function() {
						var sortValue = _getFilterValue(this);
						_sortElements(sortValue);
				});
			}
		}

		var _renderControls = function (_controlsContainer) {
			var filterVal;
			for (var i = 0; i < _allItems.length; i++) {
				filterVal = _allItems[i].getAttribute('data-ftate-value');
				_filterOptions.push(filterVal);

			}
			_filterOptions = _arrayUnique(_filterOptions);

			var ul = document.createElement('ul');
			var control = document.getElementById(_controlsContainer);
			// add control class
			control.classList.add("obzen-ctrls");
			//
			// TODO implement style _themes
			// TODO make css rules for _themes
			if(_theme) {
					control.classList.add("obzen-ctrls-" + _theme);
			} else {
					control.classList.add("obzen-ctrls");
			}

			//
			control.appendChild(ul);
			for (var i=0; i<_filterOptions.length; i++){

				var li = document.createElement('li');
				var btn = document.createElement('button');
				btn.setAttribute('data-ftate-group', _filterOptions[i]);
				btn.innerHTML = _filterOptions[i];
				li.appendChild(btn);
				ul.appendChild(li);
			}
		}

		var _renderSortControls = function (_sortingControlsContainer) {
			var filterVal;
			for (var i = 0; i < _allItems.length; i++) {
				filterVal = _allItems[i].getAttribute('data-ftate-value');
				_filterOptions.push(filterVal);

			}
			_filterOptions = _arrayUnique(_filterOptions);

			var ul = document.createElement('ul');
			var control = document.getElementById(_sortingControlsContainer);
			// add control class
			control.classList.add("obzen-ctrls");
			//
			// TODO implement style _themes
			// TODO make css rules for _themes
			if(_theme) {
					control.classList.add("obzen-ctrls-" + _theme);
			} else {
					control.classList.add("obzen-ctrls");
			}

			//
			control.appendChild(ul);
			for (var i=0; i<_filterOptions.length; i++){

				var li = document.createElement('li');
				var btn = document.createElement('button');
				btn.setAttribute('data-ftate-group', _filterOptions[i]);
				btn.innerHTML = _filterOptions[i];
				li.appendChild(btn);
				ul.appendChild(li);
			}
		}

		var _toggleAnimate = function (enable) {
			if( _animate === true) {
				var elementList = document.querySelectorAll(".items div");
				for (var i = 0; i < elementList.length; ++i) {
					elementList[i].classList.add("obzen-animate");
				}
			}
		}

		var init = function (parameters) {

			_controlsContainer = parameters.controlsContainer;
			_sortingControlsContainer = parameters.sortingContainer;
			_itemsContainer = parameters.itemsContainer;
			//
			if(typeof parameters.animate === "boolean") {
				_animate = parameters.animate;
			} else {
				console.log("Obzen warning: parameter 'animate' must be of type 'boolean'.");
			}

			if(typeof parameters.theme != "undefined"){
				 _theme = parameters.theme;
			}
			_showAll(_itemsContainer);
			_renderControls(_controlsContainer);
			_renderSortControls(_sortingControlsContainer);
			_toggleAnimate();
			_handleClick();
			_handleSortClick();
		}

		init(options);
	// ---------------------------------------------------- //
	}


	return Obzen;

});
