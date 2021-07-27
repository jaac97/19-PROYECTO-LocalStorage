// variables
const formulario = document.querySelector('#formulario'),
    listaTeeets = document.querySelector('#lista-tweets')
let tweets = [];

// eventos
const eventListener = () => {
    formulario.addEventListener('submit', agregarTwwet);
    document.addEventListener('DOMContentLoaded', mostrarTweets());
 
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
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    const tweetObj = {
        id: Date.now(),
        texto: mensaje.value
    }

    tweets = [...tweets, tweetObj];
    mensaje.value = "";
    // console.log(tweets);

    guardarLocalStorage(tweets); 

}


const mostrarTweets = () => {
    limpiarTwets(listaTeeets);

    const ul = document.createElement('ul');

    if (localStorage.getItem('tweets') !== null) {
        tweets = JSON.parse(localStorage.getItem('tweets'));

        // console.log(tweets);

        tweets.forEach(tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = "X";
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            const mensaje = document.createElement('li');
            mensaje.textContent = tweet.texto;
            mensaje.appendChild(btnEliminar);
            ul.appendChild(mensaje);

        });
    }
    listaTeeets.appendChild(ul);
}

const limpiarTwets = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

const guardarLocalStorage = (dato) => {

    localStorage.setItem('tweets', JSON.stringify(dato));
    mostrarTweets();
}


const borrarTweet = (id) =>{
    tweets = JSON.parse(localStorage.getItem('tweets'));
 
     tweets =  tweets.filter( tweet => tweet.id !== id);
    // tweets =tweets2;
    localStorage.setItem('tweets', JSON.stringify(tweets));
    mostrarTweets();


}
eventListener();