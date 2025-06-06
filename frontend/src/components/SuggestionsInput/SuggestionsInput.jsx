import { useState, useEffect } from 'react';
import './SuggestionsInput.css';
// import { div } from 'three/src/nodes/TSL.js';
import Input from '../Input/Input';
import Button from '../Button/Button';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import Parameter from '../Parameter/Parameter';
import ButtonX from '../ButtonX/ButtonX';
import { useRef } from 'react';


function SuggestionsInput({suggestions=[], existingValues=[], labelText, inputName, ariaLabel, search=true, returnValues, reset=false}) {
	const [inputValue, setInputValue] = useState('');
	const [tags, setTags] = useState([]);
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const listRef = useRef(null);
	const prevResetRef = useRef(reset);

	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (!initialized && existingValues && existingValues.length > 0) {
			setTags(existingValues);
			setInitialized(true);
		}
	}, [existingValues, initialized]);

	/*useEffect(() => {
		if (existingValues) {
			console.log('existing', existingValues)
			setTags(existingValues);
		}
	}, [])*/

	/*useEffect(() => {
		if (existingValues && existingValues.length > 0) {
			console.log('existing', existingValues);
			setTags(existingValues);
		}
	}, [existingValues]);*/

	useEffect(() => {
		/*const listEl = document.querySelector('.suggestions-list');

		if (listEl) {
			if (filteredSuggestions.length === 0) {
				listEl.classList.add('suggestions-hidden');
			} else {
				listEl.classList.remove('suggestions-hidden');
			}
		}*/
		if (listRef.current) {
			if (filteredSuggestions.length === 0) {
				listRef.current.classList.add('suggestions-hidden');
			} else {
				listRef.current.classList.remove('suggestions-hidden');
			}
		}
	}, [filteredSuggestions]);

	useEffect(() => {
		//if (reset && !prevResetRef.current) {// solo si cambia false a true
		if (reset) {
			if (listRef.current) {
				listRef.current.classList.add('suggestions-hidden');
			}
			setInputValue('');
			setTags([]);
		}
		//prevResetRef.current = reset;
	}, [reset])

	useEffect(() => {
		returnValues(tags);
	}, [tags])

    const addTagBut = (e) => {
        e.preventDefault();
		addTag(inputValue.trim());
    }

	const handleEnter = (e) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			e.preventDefault();
			addTag(inputValue.trim());
		}
	};

	const addTag = (tag) => {
		if (!tags.includes(tag.toLowerCase()) && tag!=="") {
			const match = suggestions.find(
				(suggestion) => suggestion.toLowerCase() === tag.toLowerCase()
			);
			if (match) {
				tag = match;
			}
			const newTags = [...tags, tag];
			setTags(newTags);
			setInputValue('');
			setFilteredSuggestions([]);
			// document.querySelector('.suggestions-list').classList.add('suggestions-hidden');
			//onTagsChange?.(newTags); // Callback
		}
	};

	const addTagEnter = (e, suggestion) => {
		if (e.key === 'Enter') {
			addTag(suggestion.trim());
		}
	};

	const removeTag = (tagToRemove) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		setTags(newTags);
		//onTagsChange?.(newTags); // Callback
	};

    const onChange = (e) => {
		// document.querySelector('.suggestions-list').classList.remove('suggestions-hidden');

		const value = e.target.value;
		setInputValue(value);

    	// Filtrado
		const filtered = suggestions.filter(
			(tag) => tag.toLowerCase().startsWith(value.toLowerCase()) && !tags.includes(tag)
		);
		setFilteredSuggestions(filtered);
    }

	const hide = () => {
		// document.querySelector('.suggestions-list').classList.add('suggestions-hidden');
		if (listRef.current) {
			listRef.current.classList.add('suggestions-hidden');
		}
	}

    return(
        <>
			<div className='input-suggestions'>
				<div className='input-button'>
					<Input inputName={inputName} labelText={labelText} inputTipo="text" inputValue={inputValue} inputChange={onChange} inputKeyDown={handleEnter}></Input>
					<Button buttonFunction={addTagBut} buttonClass='option-plus' icon='FaPlus' ariaLabel={ariaLabel}></Button>
				</div>
				<div ref={listRef} className='suggestions-list suggestions-hidden'>
					<ButtonX buttonClass="hide-list" buttonFunction={hide} ariaLabel="Esconder sugerencias" icon="FaTimes"></ButtonX>
					{/* <button type='button' className='hide-list' onClick={hide} aria-label="Esconder sugerencias"><FaTimes /></button> */}
					{filteredSuggestions.length > 0 && (
						<ul className="suggestions">
							{filteredSuggestions.map((suggestion, index) => (
								<li key={`${suggestion}-${index}`} onClick={() => addTag(suggestion)} tabIndex="0" onKeyDown={(e) => addTagEnter(e, suggestion)}>
									{suggestion}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
			<ul className='tags'>
				{tags.map((tag, index) => (
					<li key={`${tag}-${index}`}>
						<Parameter text={tag} remove={() => removeTag(tag)}></Parameter>
					</li>
				))}
			</ul>
        </>
    );
}

export default SuggestionsInput;