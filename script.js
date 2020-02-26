window.onload = function() {
    document.getElementById("searchbutton").addEventListener("click", function() {
        let searchText = document.getElementById("search").value;
        let searchTextEncoded = encodeURI(searchText);
        document.getElementById("result").innerHTML = "";
        let script = document.createElement("script");
        script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + searchTextEncoded + "&jsoncallback=mediaInfo";
        document.head.appendChild(script);

    });
}

function presentImages(data) {
    let result = document.getElementById("result");
    let position = ["one", "two", "three"];
    for (let i = 0; i < data.items.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.className = ("one two three");
        result.appendChild(newDiv);
        let image = document.createElement("img");
        image.src = data.items[i].media.m;
        newDiv.appendChild(image);

        // Modal button and adding attributes

        let modalButton = document.createElement('a');
        modalButton.innerHTML = 'Click for Details';

        // modalButton.setAttribute('type', 'button');
        modalButton.setAttribute('class', 'modalButton');
        modalButton.setAttribute('data-toggle', 'modal');
        modalButton.setAttribute('href', '#newModal');
        modalButton.setAttribute('data-src', data.items[i].media.m);
        modalButton.setAttribute('data-title', data.items[i].title);
        modalButton.setAttribute('data-description', data.items[i].description);
        newDiv.appendChild(modalButton);

    };


}

function modalB() {
    let modalButtons = document.getElementsByClassName("modalButton");
    for (let i = 0; i < modalButtons.length; i++) {
        modalButtons[i].addEventListener("click", function() {
            let src = this.getAttribute('data-src');
            document.getElementById("modalImg").setAttribute("src", src);
            document.getElementById("modal-title").innerHTML = this.getAttribute('data-title');
            document.getElementById("modal-description").innerHTML = this.getAttribute('data-description');

            //console.log(this.getAttribute('data-title'));

        });

    }
}

let myflickrdata = [];

function myList(t, d, m, l, dt) {
    this.title = t;
    this.description = d;
    this.media = m;
    this.link = l;
    this.date_taken = dt;
}

//Function for the data from Flickr API \\ 

function mediaInfo(data) {
    //console.log(data);
    let result = document.getElementById("result");
    result.innerHTML = "";
    let getImg = data.items;
    for (let i = 0; i < getImg.length; i++) {
        let listData = new myList(
            getImg[i].title,
            getImg[i].description,
            getImg[i].media,
            getImg[i].link,
            getImg[i].date_taken);
        myflickrdata.push(listData);
        //console.log(listData);
    }

    for (let i = 0; i < myflickrdata.length; i++) {

        let newDiv = document.createElement("div");
        newDiv.className = ("one two three");
        result.appendChild(newDiv);
        let image = document.createElement("img");
        image.src = myflickrdata[i].media.m;
        newDiv.appendChild(image);

        // Modal button and adding attributes

        let modalButton = document.createElement('a');
        modalButton.innerHTML = 'Click for Details';

        // modalButton.setAttribute('type', 'button');
        modalButton.setAttribute('class', 'modalButton');
        modalButton.setAttribute('data-toggle', 'modal');
        modalButton.setAttribute('href', '#newModal');
        modalButton.setAttribute('data-src', myflickrdata[i].media.m);
        modalButton.setAttribute('data-title', myflickrdata[i].title);
        modalButton.setAttribute('data-description', myflickrdata[i].description);
        newDiv.appendChild(modalButton);

    }

    modalB();
}