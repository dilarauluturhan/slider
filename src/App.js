import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data.js';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  /*
   index veya people değiştiğinde çalışan bir etkileşimli fonksiyondur
   -lastIndex değişkeni, people dizisinin son indeksini tutar.
   -Eğer index değişkeni, negatif bir sayı olursa lastIndex'e eşitlenir
   -Eğer index değişkeni, son indeksin üzerine çıkarsa başlangıç indeksine (0) eşitlenir
   Bu işlemler sayesinde index değişkeninin değeri people dizisinin indeksleriyle uyumlu olarak tutulmuş olur 
   Bu da dizi elemanlarının dairesel olarak gezinmesini sağlar
  */
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  /*
  Bu fonksiyon, index state'indeki değişiklikleri takip eder ve 
  setInterval fonksiyonu kullanarak belirli aralıklarla index değerini artırır.
  Bu kodlarda Slider'ın otomatik olarak ilerlemesi için kullandım
  Belli aralkla ilerlemesi için 5 saniyelik süre belirledim
  return ifadesi, component unmount(bağlantıyı kestiğinde) olduğunda 
  zamanlayıcının temizlenmesi için clearInterval fonksiyonunu çağırır.
  böylece zamanlayıcının gereksiz yere çalışmasını önler
  */
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className='section'>
      <div className='title'>
        <h2>Reviews</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center'>
        {/*people dizisi .map() metoduyla ekrana yazdırılır ve her bir kişi için bir slide oluşturulur*/}
        {
          people.map((person, personIndex) => {
            const { id, image, name, title, quote } = person;
            
            // position değişkeni slider'ın mevcut konumunu belirtir
            let position = 'nextSlide';
            /*
            activeSlide, mevcut slaytı belirtir
            lastSlide ve nextSlide, slider'ın ileri veya geri gideceği slaytları belirtir
            Eğer bu "person"ın index değeri, "index" değişkenine eşitse o zaman bu "person" için "activeSlide" sınıfı atanır
            Eğer bu "person"ın index değeri, "index" değişkeninin bir altındaysa veya "index" değişkeni 0'a eşitse ve bu "person" dizinin son elemanıysa
            o zaman bu "person" için "lastSlide" sınıfı atanır
            */
            if (personIndex === index) {
              position = 'activeSlide';
            }
            if (personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            ) {
              position = 'lastSlide';
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className='person-img' />
                <h4>{name}</h4>
                <p className='title'>{title}</p>
                <p className='text'>{quote}</p>
                <FaQuoteRight className='icon' />
              </article>
            );
          })
        }
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  )
}

export default App;