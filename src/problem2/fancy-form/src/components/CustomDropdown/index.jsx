import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';
function CustomDropdown({ currencies, onValueChange, selectedCurrency }) {
	const [selected, setSelected] = useState(null);
	useEffect(() => {
		if (selectedCurrency) {
			setSelected(selectedCurrency);
		} else if (currencies.length > 0) {
			setSelected(currencies[0]);
		}
	}, [selectedCurrency, currencies]);
	const handleChangeSelected = (value) => {
		console.log(value);
		onValueChange(value);
		setSelected(value);
	};
	if (!selected) {
		return <div className={styles.dropdown}>Loading...</div>;
	}
	return (
		<div className={styles.dropdown}>
			<div className={styles.selected}>
				<img
					src={`https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${selected}.svg`}
					alt={selected}
					width='20'
					height='20'
				/>
				{selected}
			</div>
			<ul className={styles.list}>
				{currencies.map((value, index) => (
					<li key={index} onClick={() => handleChangeSelected(value)}>
						<img
							src={`https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${value}.svg`}
							alt={value}
							width='20'
							height='20'
						/>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
}
CustomDropdown.propTypes = {
	currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
	onValueChange: PropTypes.func,
	selectedCurrency: PropTypes.string,
};

export default CustomDropdown;
