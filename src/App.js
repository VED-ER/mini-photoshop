import { useState } from "react"
import "./App.css"
import Sidebaritem from "./Sidebaritem"
import Slider from "./Slider"
import * as htmlToImage from "html-to-image"
import { saveAs } from "file-saver"
import Image from "./wolfgang-pic.jpg"
const DEFAULT_OPTIONS = [
	{
		name: "Brightness",
		property: "brightness",
		value: 100,
		range: {
			min: 0,
			max: 200,
		},
		unit: "%",
	},
	{
		name: "Contrast",
		property: "contrast",
		value: 100,
		range: {
			min: 0,
			max: 200,
		},
		unit: "%",
	},
	{
		name: "Saturation",
		property: "saturate",
		value: 100,
		range: {
			min: 0,
			max: 200,
		},
		unit: "%",
	},
	{
		name: "Grayscale",
		property: "grayscale",
		value: 0,
		range: {
			min: 0,
			max: 100,
		},
		unit: "%",
	},
	{
		name: "Sepia",
		property: "sepia",
		value: 0,
		range: {
			min: 0,
			max: 100,
		},
		unit: "%",
	},
	{
		name: "Hue rotate",
		property: "hue-rotate",
		value: 0,
		range: {
			min: 0,
			max: 360,
		},
		unit: "deg",
	},
	{
		name: "Blur",
		property: "blur",
		value: 0,
		range: {
			min: 0,
			max: 20,
		},
		unit: "px",
	},
	{
		name: "Invert",
		property: "invert",
		value: 0,
		range: {
			min: 0,
			max: 100,
		},
		unit: "%",
	},
	{
		name: "Opacity",
		property: "opacity",
		value: 100,
		range: {
			min: 0,
			max: 100,
		},
		unit: "%",
	},
]

function App() {
	const [options, setOptions] = useState(DEFAULT_OPTIONS)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const selectedOption = options[selectedIndex]
	const [selectedImage, setSelectedImage] = useState(Image)

	function handleSliderChange({ target }) {
		setOptions((prevOptions) => {
			return prevOptions.map((option, index) => {
				if (index !== selectedIndex) return option
				return { ...option, value: target.value }
			})
		})
	}

	function getImageStyle() {
		const filters = options.map((option) => {
			return `${option.property}(${option.value}${option.unit})`
		})
		return { filter: filters.join(" ") }
	}

	function handleResetAll() {
		setOptions(DEFAULT_OPTIONS)
	}

	function handleDownload() {
		htmlToImage.toBlob(document.querySelector(".main-img")).then(function (blob) {
			window.saveAs(blob, "edited-photo.png")
		})
	}

	function imageChange(e) {
		if (e.target.files && e.target.files.length > 0) {
			setOptions(DEFAULT_OPTIONS)
			const simg = e.target.files[0]
			setSelectedImage(URL.createObjectURL(simg))
		}
	}

	return (
		<div className="container">
			<div className="sidebar">
				{options.map((option, index) => {
					return (
						<Sidebaritem
							key={index}
							name={option.name}
							active={selectedIndex === index}
							index={index}
							handleClick={() => setSelectedIndex(index)}
						/>
					)
				})}
				<button className="sidebar-item" onClick={handleResetAll}>
					Reset All
				</button>
				<button className="sidebar-item" onClick={handleDownload}>
					Download
				</button>
				<input type="file" accept="image/*" className="sidebar-item" onChange={imageChange} />
			</div>
			<div
				className="main-img"
				style={{ ...getImageStyle(), backgroundImage: `url(` + selectedImage + `) ` }}
			></div>
			<Slider
				min={selectedOption.range.min}
				max={selectedOption.range.max}
				value={selectedOption.value}
				handleChange={handleSliderChange}
			/>
			<div></div>
		</div>
	)
}

export default App
