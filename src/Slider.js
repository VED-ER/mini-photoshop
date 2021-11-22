const Slider = ({ min, max, value, handleChange }) => {
	return (
		<input
			type="range"
			className="slider"
			min={min}
			max={max}
			value={value}
			onChange={(e) => handleChange(e)}
		/>
	)
}

export default Slider
