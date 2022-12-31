const venom = require('venom-bot');

// Función que maneja el estado
let enClase;

// Función de respuesta automática
const autoAnswer = async (client, msg) => {
    await client.reply(
        msg.from,
        `\n_Perdona, ${msg.notifyName} ahora estoy en clase. Leeré tu mensaje apenas termine._\n\nSi quieres reservar una clase, puedes hacerlo aquí 👇🏽 https://calendly.com/giampieroferminicastillo/clase-privada-1h`,
        msg.id
    )
        .then(() => {
            console.log(`${msg.notifyName} <= autoAnswer ✔`); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
}

//-----------------------------------//
// *** FUNCIÓN PRINCIPAL START() *** //

async function start(client) {

    // Inicia bot
    console.log("Función start() INICIADA");

    // Establece estado
    await client.onAnyMessage(async (msg) => {
        if (msg.from === "79111960478@c.us"
            &&
            msg.body === "onLibre") {
            enClase = false;
            await client.setProfileStatus('Disponible... o no 👨🏽‍💻');
        }
        if (msg.from === "79111960478@c.us"
            &&
            msg.body === "onClase") {
            enClase = true;
            await client.setProfileStatus('I\'m in class ⛔');
        }
    })

    // Mensaje automático
    client.onMessage(async (msg) => {
        if (enClase) {
            await autoAnswer(client, msg)
        }
    })
}
//------------------------------------//

// Inicializa SESIÓN
venom.create({ session: 'session-name' })
    .then((client) => start(client))
    .catch((erro) => { console.log(erro) });