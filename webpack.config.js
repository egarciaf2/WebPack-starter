/**
 * INSTALACIONES
 * npm i --save-dev html-loader html-webpack-plugin     Instala los plugins necesarios para añadir html al dist
 * npm install --save-dev css-loader style-loader       Instala plugins necesarios para importar css a dist
 * npm install --save-dev mini-css-extract-plugin       Instala el plugin que permite importar archivos css globales
 * npm i --save-dev webpack-dev-server                  Instala un servidor web para desarrollo y refresco en tiempo real
 * npm install file-loader --save-dev                   Instala file-loader para manejar archivos en la importacion
 * npm install copy-webpack-plugin --save-dev           Copia archivos individuales o directorios completos, que ya existen, en el directorio de compilación
 * npm install --save-dev css-minimizer-webpack-plugin terser-webpack-plugin        Minimiza los archivos css al pasar a prod
 */


const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

    mode: 'development',
    output: {
        clean: true, //Elimina el dist antiguo y crea el nuevo
    },
    module: {
        rules: [
            { /**En las reglas se especifica que añada los archivos html al dist
                a travez de una exprecion regular */
                test: /\.html$/i,
                use: [{
                    loader: 'html-loader',
                    options: {
                        sources: false,
                        minimize: false, // Minimiza el codigo html
                    },
                }]
            },
            //Importa los archivos css al dist
            {
                test: /\.css$/i,
                exclude: /styles.css$/i,
                use: ["style-loader", "css-loader"],
            },
            //Importa el archivos css seleccionado al dist de forma global
            {
                test: /styles.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            //Importa los archivos, en este caso imagenes
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            title: 'WebPack Emilio'
        }),
        
        new MiniCssExtractPlugin({
            /**
             * [name] Asigna un nombre al azar al archivo
             * [fullhash] Asigna un codigo como nombre, con la finalidad de que en cada compilacion
             * se genere el archivo con un nombre difernete y la maquina del cliente no conserve el cache
             */
            // filename: '[name][fullhash].css',
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets/" }
            ],
          }),


    ]

}