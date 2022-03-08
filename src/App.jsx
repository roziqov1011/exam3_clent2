import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/img/logo2.png';
import mb from './assets/img/mb.png';
import aks from './assets/img/aks.png';
import hs from './assets/img/hs.png';
import ishonch from './assets/img/ishonch.png';
const PORT =  'https://exam-3-server-3p5sy.ondigitalocean.app';


function App() {
const [companies, setCompanies] = useState([]);
const [companiesId, setCompaniesId] = useState(1);
const [complexId, setComplexId] = useState(1);
const [complex, setComplex] = useState([]);
const [houses, setHouses] = useState([]);
const [banks, setBanks] = useState([]);
const [calc, setCalc] = useState([]);
const [calcId, setCalcId] = useState([1,1]);

useEffect(()=>{
fetch(`${PORT}/companies`)
.then(res=> res.json())
.then(data => setCompanies(data))
},[]);

useEffect(()=>{
fetch(`${PORT}/complex?companieId=${companiesId}`)
.then(res=> res.json())
.then(data => setComplex(data))
},[companiesId]);

useEffect(()=>{
fetch(`${PORT}/houses?complexId=${complexId}`)
.then(res=> res.json())
.then(data => setHouses(data))
},[complexId]);

useEffect(()=>{
fetch(`${PORT}/banks`)
.then(res=> res.json())
.then(data => setBanks(data))
},[]);

useEffect(()=>{
fetch(`${PORT}/calc/?calc=${calcId}`)
.then(res => res.json())
.then(data => setCalc(data))
},[calcId])





const handleFuc = (e)=>{
e.preventDefault()
const elements = e.target.elements
let housId = elements.houses.value.split('.')[0]
let bankId = elements.banks.value.split('.')[0]
setCalcId([housId ,bankId])
document.querySelector('.calc-inner').style.display = 'flex';
const ism = elements.ism.value;
const tel = elements.tel.value;
const compan = elements.companie.value.split('.')[1];
const compl = elements.complex.value.split('.')[1];
const hous = elements.houses.value.split('.')[2];
const bank = elements.banks.value.split('.')[1];
const bankTy = elements.banks.value.split('.')[2];
const kredidt = elements.houses.value.split('.')[3];


  fetch(`${PORT}/homeorder`,{
    method: "post",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({ism,tel,compan,compl, hous, bank, bankTy, kredidt})
  })
  .then(res => res.json())
  .then(data => console.log(data))


  fetch(`${PORT}/creditorder`,{
    method: "post",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({ism,tel,compan,compl, hous, bank, bankTy, kredidt})
  })
  .then(res => res.json())
  .then(data => console.log(data))
};
const handleCompanie = (e)=>{
const valueOptin = e.target.value.split('.')
setCompaniesId(valueOptin[0]);
if(valueOptin[0] == 1){
document.querySelector('.mb').style.display = 'block';
document.querySelector('.aks').style.display = 'none';
document.querySelector('.hs').style.display = 'none';
document.querySelector('.ishonch').style.display = 'none';

}
if(valueOptin[0] == 3){
document.querySelector('.mb').style.display = 'none';
document.querySelector('.aks').style.display = 'block';
document.querySelector('.hs').style.display = 'none';
document.querySelector('.ishonch').style.display = 'none';

}
if(valueOptin[0] == 2){
document.querySelector('.mb').style.display = 'none';
document.querySelector('.aks').style.display = 'none';
document.querySelector('.hs').style.display = 'block';
document.querySelector('.ishonch').style.display = 'none';

}
if(valueOptin[0] == 4){
  document.querySelector('.mb').style.display = 'none';
  document.querySelector('.aks').style.display = 'none';
  document.querySelector('.hs').style.display = 'none';
  document.querySelector('.ishonch').style.display = 'block';
  }
document.querySelector('#complex').disabled = false
document.querySelector('#comName').textContent = e.target.value.split('.')[1]



};



const handleComplex = (e)=>{
setComplexId(e.target.value.split('.')[0]);
document.querySelector('#houses').disabled = false
document.querySelector('#complexName').textContent = e.target.value.split('.')[1]
};
const handleHouses = (e)=>{
document.querySelector('#banks').disabled = false
document.querySelector('#houseName').textContent = e.target.value.split('.')[1]
};
const handleBanks = (e)=>{
document.querySelector('#btn').disabled = false
document.querySelector('#bankName').textContent = e.target.value.split('.')[1] + ' ' +e.target.value.split('.')[2] + ` yilga`;
};
return (
<>
  <div className='hero'>
    <header className='header'>
      <img className='logo' src={logo} alt="" />
      <h1 className='logo-title'>MILLIY IMORAT</h1>
    </header>
    <div className="inner-hero">
      <form className='form' action="" onSubmit={handleFuc}>
        <select name='companie' onChange={handleCompanie}>
          <option className='option' value="companie">companie</option>
          {
          companies && companies.map((e,i) =>(
          <option className='option' value={e.companie_id+'.'+e.companie_name} key={i} id={i}>{e.companie_name}</option>
          ))
          }
        </select>
        <select id='complex' disabled name='complex' onChange={handleComplex}>
          <option className='option' value="complex">complex</option>
          {
          complex && complex.map((e,i) =>(
          <option className='option' value={e.branch_id+'.'+e.branch_name} key={i} id={i}>{e.branch_name}</option>
          ))
          }
        </select>
        <select id='houses' disabled name='houses' onChange={handleHouses}>
          <option className='option' value="houses">houses</option>
          {
          houses && houses.map((e,i) =>(
          <option className='option' value={e.house_id +'.'+ e.house_adress+'.'+e.house_room + '.' + e.house_price} key={i} id={i}> {e.house_room } hona{' '}
            { e.house_price} so'm</option>
          ))
          }
        </select>
        <select id='banks' disabled name='banks' onChange={handleBanks}>
          <option className='option' value="banks">banks</option>
          {
          banks && banks.map((e,i) =>(
          <option className='option' value={e.bank_id +'.'+ e.bank_name+`.`+e.bank_type} key={i} id={i}> {e.bank_name }  
            {' ' + e.bank_type} yilga {e.bank_foiz} %</option>
          ))
          }
        </select>
        <input className='input' type="text" name='ism' placeholder='Ismingiz ... ' required/>
        <input className='input' type="number" name='tel' placeholder='Tel ... ' required defaultValue='99890'/>
        <button id='btn' disabled type='submit'>Save</button>
      </form>

      <div className='info'>
        <div className="info-inner">
          <img className='mb' src={mb} alt="" />
          <img className='aks' src={aks} alt="" />
          <img className='hs' src={hs} alt="" />
          <img className='ishonch' src={ishonch} alt="" />
        </div>
        <h3 id='comName'></h3>
        <p id='complexName'></p>
        <p id='houseName'></p>
        <p id='bankName'></p>
      </div>

      <div className="calc">
        {calc && calc.map((e,i)=>(
          <div className='calc-inner' key={i}>
            <p> <mark>{ e.uy_narhi } so'm</mark>  umumiy narx </p>
            <p> <mark>{ e.qolgan_summa } so'm</mark> {e.bank_foiz} % tolangandan keyin </p>
            <p><mark>{e.muxlat } </mark>  oy muhlat   | | <mark>( {e.muxlat / 12} )</mark> yil </p>
            <p><mark>{e.har_oy } so'm</mark> har oy davomida</p>
          </div>
        ))}
      </div>
    </div>

  </div>

</>
);
}

export default App;