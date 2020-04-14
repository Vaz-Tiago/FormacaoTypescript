import React from 'react';

// Desestruturação das propriedades
// export default function Header(props){
// Para acessar todo o conteudo que foi inserido no componente,
// basta acessa a tag children
export default function Header({ title, children }){
  return(
    <header>
      {/* <h1>{props.title}</h1> */}
      <h1>{title}</h1>
      {children}
    </header>
  );
}