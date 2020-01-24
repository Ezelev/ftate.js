
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
		self.publicMethods = {

			getControlsContaner: function(){
				console.log(_controlsContainer);
			},
			getitemsContainer: function(){
				console.log(_controlsContainer);
			},

		}
		// ---- private args ----- //
		var _privateArgs = {}
		var _controlsContainer;
		var _itemsContainer;
		var allItems;
		var theme;
		var filterOptions = ["all"];
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
				showAll(_itemsContainer);
			} else {
				showAll(_itemsContainer);
				var elementsToFilter = document.querySelectorAll('[data-ftate-value="'+ filterVal + '"]');
				elementsToFilter = Array.from(elementsToFilter);
				allItems = Array.from(allItems);
				var difference = allItems.filter(x => !elementsToFilter.includes(x));
				for (var i = 0; i < difference.length; i++) {
					console.log(difference[i]);
					// difference[i].style.display = 'none';
					// difference[i].classList.add("obzen-hidden-visual");
					difference[i].classList.add("obzen-hidden");
				}
			}
		}

		var showAll = function (target) {
			var parent = document.getElementsByClassName(target)[0];
			allItems = parent.querySelectorAll('[data-ftate-value]');
			for (var i = 0; i < allItems.length; i++) {
				//allItems[i].style.display = 'inline-block';
				// allItems[i].classList.remove("obzen-hidden-visual");
				allItems[i].classList.remove("obzen-hidden");

			}
		}

		var handleClick = function () {
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

		var renderControls = function (_controlsContainer) {
			var filterVal;
			for (var i = 0; i < allItems.length; i++) {
				filterVal = allItems[i].getAttribute('data-ftate-value');
				filterOptions.push(filterVal);

			}
			filterOptions = _arrayUnique(filterOptions);

			var ul = document.createElement('ul');
			var control = document.getElementById(_controlsContainer);
			// TODO implement style themes
			// TODO make css rules for themes
			control.classList.add("obzen-ctrls-" + theme);
			//
			control.appendChild(ul);
			for (var i=0; i<filterOptions.length; i++){

				var li = document.createElement('li');
				var btn = document.createElement('button');
				btn.setAttribute('data-ftate-group', filterOptions[i]);
				btn.innerHTML = filterOptions[i];
				li.appendChild(btn);
				ul.appendChild(li);
			}
		}

		var init = function (parameters) {

			_controlsContainer = parameters.controlsContainer;
			_itemsContainer = parameters.itemsContainer;
			theme = parameters.theme;

			showAll(_itemsContainer);
			renderControls(_controlsContainer);
			handleClick();
		}

		init(options);
	// ---------------------------------------------------- //
	}


	return Obzen;

});
