import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.109:3333'
});

export default api;

/**
 * IOS com emulador: localhost
 * IOS fisico: ip da máquina
 * Android com emulador:
 * ADB reverse: 
 *  No terminal: 
 *    adb reverse tcp: 3333 tcp:3333
 *    Isso diz roteia a porta 3333 do pc para a porta 3333 da maquina virtual do android
 *    Deposi de fazer isso é só utilizar localhost no baseURL
 * Emulador do android studio: 10.0.2.2
 * Emuldaor Genymotion: 10.0.3.2
 * 
 * Android dipositivo: IP da Máquina
 */