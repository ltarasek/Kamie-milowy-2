"use strict";

const URL_MOVIE = "https://us-central1-itfighters-movies.cloudfunctions.net/api/movie";


window.onload = function () {
    getMovie();
    addForm();
}


// *
// *
// *

var array = [];

function getMovie() {

    fetch(URL_MOVIE)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                return Promise.reject(resp)
            }
        })
        .then(resp => {
            array = resp;
            showMovies(array);
        })
        .catch(error => {
            if (error.status == 404) {
                console.log("Not found");
            }
        });

};


function showMovies(tab) {
    for (let i = 0; i < tab.length; i++) {
        var { title, year, rate, imgSrc } = { ...tab[i] };
        $('#movieCatalog').append(`<article><span id="titleMovie">${title}</span><br />ROK: <span class="otherInfo">${year}</span><br />OCENA: <span class="otherInfo">${rate}</span><br /><img src="${imgSrc}" alt="obrazek"></article>`);
    }
};


function addForm() {
    $('#addMovie > form').append(`<input id="title" placeholder="Tytuł" /><br />`);
    $('#addMovie > form').append(`<input id="year" placeholder="Rok produkcji" /><br />`);
    $('#addMovie > form').append(`<input id="rate" placeholder="Ocena" /><br />`);
    $('#addMovie > form').append(`<input type="file" accept="image/png, image/jpeg" id="imgSrc" placeholder="Adres obrazka"  /><br />`);
    $('#addMovie > form').append(`<button id="add" type="button" onclick="addMovieToDataBase();">ADD</button><br />`);
}

function addMovieToDataBase() {

    var movieTitle = $('#title').val();
    console.log(movieTitle);

    var movieYear = $('#year').val();
    console.log(movieYear);

    var movieRate = $('#rate').val();
    console.log(movieRate);

    var movieImgSrc = $('#imgSrc').val();
    if (movieImgSrc == '') {
        movieImgSrc = "./defaultImage"
    };

    var newPerson = {
        title: movieTitle,
        year: movieYear,
        rate: movieRate,
        imgSrc: movieImgSrc
    }

    fetch(URL_MOVIE,         {
        method: 'post',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(newPerson),
    });

};