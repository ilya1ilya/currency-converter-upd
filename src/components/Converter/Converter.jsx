import { useEffect, useState } from 'react';
import './Converter.css';

function Converter() {

    let [currencyNames, setCurrencyNames] = useState([]);
    let [firstSelectValue, setFirstSelectValue] = useState('AUD');
    let [secondSelectValue, setSecondSelectValue] = useState('AUD');
    let [amount, setAmount] = useState(1);
    let [rate, setRate] = useState('');

    //get currency names to populate the option values of 2 selects
    useEffect(() => {
        fetch('https://api.frankfurter.app/currencies')
            .then(data => data.json())
            .then(data => {
                let names = Object.keys(data);
                setCurrencyNames(names);
            })
    }, []);

    //update the rate if any value changes
    useEffect(() => {
        if(firstSelectValue === secondSelectValue) {
            let firstCurrencyAmount = amount;
            setRate(firstCurrencyAmount);
            return;
        }
        if(amount === '') {
            alert('Please, change the amount');
            return;
        }

        fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${firstSelectValue}&to=${secondSelectValue}`)
            .then(value => value.json())
            .then(value => {
                setRate(value.rates[secondSelectValue]);
            });

    }, [firstSelectValue, secondSelectValue, amount]);

    
    return (
        <div className='container'>
            <h1>Currency converter</h1>
            <div className='box'>
                <div className='left-box'>
                    <select name="currency" className='currency' onChange={(event => setFirstSelectValue(event.target.value))}>
                        {
                            currencyNames.map(currencyName => {
                                return (
                                    <option key={currencyName} value={currencyName}>{currencyName}</option>
                                )
                            })
                        }
                    </select>
                    <input type="number" id='input' min={1} value={amount} onChange={(event) => setAmount(event.target.value)}/>
                </div>
                <div className='right-box'>
                    <select name="currency" className='currency' onChange={(event => setSecondSelectValue(event.target.value))}>
                        {
                            currencyNames.map(currencyName => {
                                return (
                                    <option key={currencyName} value={currencyName}>{currencyName}</option>
                                )
                            })
                        }
                    </select>
                    <input type="number" value={rate} id='result' disabled/>
                </div>
            </div>
        </div>
    )
}

export default Converter;