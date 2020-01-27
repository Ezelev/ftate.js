document.addEventListener('DOMContentLoaded', function() {

    var gallery = new Obzen({
        controlsContainer: "ctrls",
        itemsContainer: "items",
        //theme: "default",
    });

    console.log(gallery);

    var gallery2 = new Obzen({
        controlsContainer: "ctrls2",
        itemsContainer: "items2",
        theme: "green"
    });

    console.log(gallery2);

});
