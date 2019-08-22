var obzen = (function() {
    'use strict';
    
    var controlsContainer;
    var itemsContainer;
    var allItems;
    var filterOptions = ["all"];

    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    
    function arrayUnique(incomingArray) { 
        var unique = incomingArray.filter( onlyUnique );
        return unique;
    }

    function getFilterValue(element) {
        return element.getAttribute('data-ftate-group');
    }

    function getLinkedElements(filterVal) {
        if(filterVal == "all") {
            showAll(itemsContainer);
        } else {
            showAll(itemsContainer);
            var elementsToFilter = document.querySelectorAll('[data-ftate-value="'+ filterVal + '"]');
            elementsToFilter = Array.from(elementsToFilter);
            allItems = Array.from(allItems);
            var difference = allItems.filter(x => !elementsToFilter.includes(x));
            for (var i = 0; i < difference.length; i++) {
                console.log(difference[i]);
                difference[i].style.display = 'none';
            }
        }
    }

    var showAll = function (target) {
        var parent = document.getElementsByClassName(target)[0];
        allItems = parent.querySelectorAll('[data-ftate-value]');
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].style.display = 'inline-block';
        }
    }

    var handleClick = function () {
        var filterControlWrapper = document.getElementById(controlsContainer);
        var controlBtns = filterControlWrapper.getElementsByTagName("button");
        console.log(controlBtns);
        for (var i = 0; i < controlBtns.length; i++) {
            controlBtns[i].addEventListener('click', function() {
                var filterValue = getFilterValue(this);
                getLinkedElements(filterValue);
            });
        }
    }

    var renderControls = function (controlsContainer) {
        var filterVal;
        for (var i = 0; i < allItems.length; i++) {
            filterVal = allItems[i].getAttribute('data-ftate-value');
            filterOptions.push(filterVal);
            
        }
        filterOptions = arrayUnique(filterOptions);

        var ul = document.createElement('ul');
        var control = document.getElementById(controlsContainer);
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
        
        controlsContainer = parameters.controlsContainer;
        itemsContainer = parameters.itemsContainer;

        showAll(itemsContainer);
        renderControls(controlsContainer);
        handleClick();
    }

    return {
        init
    };

}());
