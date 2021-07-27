// variables
const formulario = document.querySelector('#formulario'),
    listaTeeets = document.querySelector('#lista-tweets')
let tweets = [];

// eventos
const eventListener = () => {
    formulario.addEventListener('submit', agregarTwwet);
    mostrarTweets();
}


// funciones
const agregarTwwet = e => {
    e.preventDefault();
    const textArea = document.querySelector('#tweet');
    if (textArea.value.length > 0) {
        guardarTweets(textArea);

    } else {
        mostrarError('Tweet vacio');
        return; //Evita que se ejecuten más lineas de codigo
    }
}



const mostrarError = mensaje => {
    const parrafo = document.createElement('p');
    parrafo.textContent = mensaje;
    parrafo.classList.add('error');
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(parrafo)

    setTimeout(() => {
        parrafo.remove();
    }, 2000)

}

const guardarTweets = (mensaje) => {
    if (localStorage.getItem('tweets') !== null) {
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }

    const tweetObj = {
        id: Date.now(),
        texto: mensaje
    }
    tweets = [...tweets, mensaje.value];
    mensaje.value = "";
    console.log(tweets);

    guardarLocalStorage(tweets);

    // mostrarTweets(tweets)


}
const mostrarTweets = () => {
    limpiarTwets(listaTeeets);

    if (localStorage.getItem('tweets') !== null) {
        tweets = JSON.parse(localStorage.getItem('tweets'))
        tweets.forEach(tweet => {
            const mensaje = document.createElement('p');
            mensaje.textContent = tweet;
            listaTeeets.appendChild(mensaje);
        });
    }
}

const limpiarTwets = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

const guardarLocalStorage = (dato) => {
    localStorage.setItem('tweets', JSON.stringify(dato));
    mostrarTweets()
}

eventListener();