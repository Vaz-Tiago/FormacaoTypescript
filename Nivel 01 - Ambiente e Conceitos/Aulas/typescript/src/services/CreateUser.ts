// Para criar um usuário é necessário: 
// name - string opcional - Definido valor padrão vazio
// email e password - string obrigatorio - Definido tipo diretamente

// export default function createUser(name = '', email: string, password: string){
//   const user = {
//     name,
//     email,
//     password
//   }
//   return user;
// }


// Isso funciona bem mas não há uma identificação de cada parametro, para que isso
// aconteça é necessário receber todos os parametros como um objeto:
// Para isso separamos cada parametro em uma variável
// Prática conheciada como interface:

interface TechObjetc {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: string; // O ? diz que é um parametro opcional
  email: string;
  password: string;
  // techs: Array<string> Definindo array de um tipo só
  techs: Array<string | TechObjetc> //Definindo tipo misto
}

// Isso define que o objeto é do tipo CreateUserData
export default function createUser({name = '', email, password}: CreateUserData){
  const user = {
    name,
    email,
    password
  }
  return user;
}

