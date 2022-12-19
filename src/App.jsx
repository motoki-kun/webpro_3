import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import house from '../data/持家比率.json';
import charm from '../data/魅力度.json';
import university from '../data/大学数.json';

const dataObject = {
  "charm": charm,
  "house": house,
  "university": university,
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.setSubscript(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="shiba">
                <option value="charm">魅力度ランキング</option>
                <option value="house">持家比率ランキング</option>
                <option value="university">大学数ランキング</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


function Main() {

  const [subscript, setSubscript] = useState("charm");

  const [data, setData] = useState(charm);
  useEffect(() => {
    setData(dataObject[subscript]);
  })
  let bar = "";
  let y_label = "";
  let content_label = "";
  data.map(
    (item, index) => {
      y_label += "|" + item.prefecture;
      if (index == data.length - 1) {
        content_label += item[subscript]
        bar += item[subscript];
      } else {
        content_label += item[subscript] + "|";
        bar += item[subscript] + ",";
      }
    }

  )
  console.log(content_label);
  console.log(`${bar}`)
  console.log(`${y_label}`)
  return (
    <main>
      <div className="hero is-info">
        <div className="hero-body">
          <h1 className="title">日本大学文理学部情報科学科 Webプログラミングの演習課題</h1>
          <h2 className="subtitle">四国の様々なランキング</h2>
        </div>
      </div>
      <div class="container">
        <section className="section">
          <Form setSubscript={setSubscript} />
        </section>
        <div className="has-text-centered">
          <figure className="image is-inline-block">
            <img src={`https://image-charts.com/chart?cht=bvs&chxt=x,y&chd=t:${bar}&chs=400x400&chxl=0:${y_label}&chl=${content_label}`} ></img>
          </figure>
        </div>
      </div >
      
        <footer className="footer has-background-grey-light">
          <div className="content has-text-centere">
            <p>学籍番号：5420073</p>
            <p>氏名：島倉幹</p>
            <p>参考にしたウェブサイト：https://uub.jp/</p>
          </div>
        </footer>
      
    </main >
  );

}

export default Main;
