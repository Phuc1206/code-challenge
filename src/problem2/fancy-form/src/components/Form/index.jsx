import { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import CustomDropdown from '../CustomDropdown';
// import clsx from 'clsx'
function Form() {
	const [currencies, setCurrencies] = useState([]);
	const [prices, setPrices] = useState([]);
	const [price, setPrice] = useState(0);
	const [toPrice, setToPrice] = useState(0);
	const [currency, setCurrency] = useState('');
	const [toCurrency, setToCurrency] = useState('');
	useEffect(() => {
		async function fetchApi() {
			const url = 'https://interview.switcheo.com/prices.json';
			try {
				const response = await fetch(url);
				const data = await response.json();

				setCurrencies(data.map((value) => value.currency));
				setPrices(data);
			} catch (error) {
				console.error(error.message);
			}
		}
		fetchApi();
		return () => {};
	}, []);
	const handleCurrencyChange = (value) => {
		setCurrency(value);
		updateToPrice(price, value, toCurrency);
	};
	const handleToCurrencyChange = (value) => {
		setToCurrency(value);
		updateToPrice(price, currency, value);
	};
	const handlePriceChange = (e) => {
		const value = parseFloat(e.target.value) || 0;
		setPrice(value);
		updateToPrice(value, currency, toCurrency);
	};
	const updateToPrice = (amount, fromCurrency, toCurrency) => {
		const fromPrice =
			prices.find((p) => p.currency === fromCurrency)?.price || 1;
		const toPrice = prices.find((p) => p.currency === toCurrency)?.price || 1;

		const convertedPrice = (amount * fromPrice) / toPrice;
		setToPrice(convertedPrice.toFixed(6));
	};
	const handleSwap = () => {
		setCurrency((prevCurrency) => {
			setToCurrency(prevCurrency);
			return toCurrency;
		});
		setPrice((prevPrice) => {
			setToPrice(prevPrice);
			return toPrice;
		});
	};
	const classes = {
		wrapper: styles.wrapper,
		container: styles.container,
		formRow: styles.formRow,
		formGroup: styles.formGroup,
		inputGroup: styles.inputGroup,
	};
	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.formRow}>
					<div className={classes.formGroup}>
						<label>currency</label>
						<div className={classes.inputGroup}>
							<input
								type='number'
								value={price}
								onChange={handlePriceChange}
							></input>
							<CustomDropdown
								currencies={currencies}
								onValueChange={handleCurrencyChange}
								selectedCurrency={currency}
							/>
						</div>
					</div>
					<button onClick={handleSwap}>swap</button>
					<div className={classes.formGroup}>
						<label>to currency</label>
						<div className={classes.inputGroup}>
							<input
								type='number'
								value={toPrice}
								onChange={(e) => setToPrice(e.target.value)}
								readOnly
							></input>
							<CustomDropdown
								currencies={currencies}
								onValueChange={handleToCurrencyChange}
								selectedCurrency={toCurrency}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Form;
