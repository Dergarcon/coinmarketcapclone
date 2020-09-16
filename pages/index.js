import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Coingecko from 'coingecko-api'

const coingeckoClient = new Coingecko()

export default function Home(props) {
  const {data} = props.res
  console.log('data: ', data)
  return (
    <div className={styles.container}>
      <Head>
        <title>CMC Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Coinmarketcap Clone</h1>

      <table>
        <thead>
          <tr>
          <th>Symbol</th>
          <th>Market cap</th>                                  
          <th>Change (24h)</th>                                  
          <th>Price</th>            
          <th>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => 
            <tr key={coin.id}>
              <td>{coin.symbol.toUpperCase()}</td>              
              <td>{coin.market_cap}</td>
              <td>{coin.market_cap_change_percentage_24h}</td>            
              <td>{coin.current_price}</td>       
              <td>{coin.price_change_percentage_24h}</td>       
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// get data from coingecko
export async function getServerSideProps(){
  const params = {
    order: Coingecko.ORDER.MARKET_CAP_DESCENDING
  }
  const res = await coingeckoClient.coins.markets({params})
  return {props: {res}}
}