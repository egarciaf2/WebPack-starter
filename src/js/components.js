import '../css/components.css'; //Asi se importan los estilos
// import webPackLogo from '../assets/img/webpack-logo.png'


export const saludar = (nombre) => {
    console.log('Creando H1');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${nombre}`;

    document.body.append( h1 );

//     const img = document.createElement('img');
//     img.src = webPackLogo;

//     document.body.append( img );
}
