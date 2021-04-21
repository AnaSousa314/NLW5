// SPA
// SSR
// SSG

import {useEffect} from "react"
export default function Home(props) {
//console.log(props.episodes)
  // SPA  
 /*  useEffect(()=>{
     fetch('http://localhost:3333/episodes')
     .then(response =>
       response.json()
     )
     .then(data => console.log(data))  
  },[]) */


  return (
    <div>
    <h1>Index</h1>
    <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}


//SSR
// é executado toda a vez que alguem acessar a home da aplicação
/* export async function getServerSideProps(){
  const response = await fetch('http://localhost:3333/episodes')
  
  const data = await response.json();

    return {
      props:{
        episodes: data,
      }
    }
} */ 


//SSG
// Assim que alguem acesa essa pagina eu gero uma versão estática dela, ela é servida para os próximos que acessa-la. Ele só faz a chamada API uma vez, ou de acordo com o tempo que você coloca no revalidate

export async function getStaticProps(){
  const response = await fetch('http://localhost:3333/episodes')
  
  const data = await response.json();

    return {
      props:{
        episodes: data,
      },
      revalidate: 60 * 60 * 8,//a cada 8 horas a pagina sera recarregada
    }
}