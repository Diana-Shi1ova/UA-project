import { useEffect, useState } from 'react';
import './SuggestionsInput.css';
// import { div } from 'three/src/nodes/TSL.js';
import Input from '../Input/Input';
import Button from '../Button/Button';
import axios from 'axios';
import { FaRegTimesCircle } from "react-icons/fa";
import Parameter from '../Parameter/Parameter';

/*export default function SuggestionsInput({ suggestions = [], onTagsChange }) {
    suggestions = ["3D", "анимация", "геймдев", "вектор", "модель"];
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Фильтруем подсказки
    const filtered = suggestions.filter(
      (tag) => tag.toLowerCase().includes(value.toLowerCase()) && !tags.includes(tag)
    );
    setFilteredSuggestions(filtered);
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      setInputValue('');
      setFilteredSuggestions([]);
      onTagsChange?.(newTags); // Callback
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange?.(newTags); // Callback
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  return (
    <div className="tag-input">
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Добавьте тэг..."
            aria-label="Добавить тэг"
        />
      <div className="tags">
        {tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>&times;</button>
          </span>
        ))}
      </div>

      

      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => addTag(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}*/


function SuggestionsInput() {
    const [suggestions, setSuggestions] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [tags, setTags] = useState([]);
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    useEffect(() => {
        axios.get('/api/tags')
        .then(response => {
            /*setSuggestions(response.data);
            console.log(suggestions);*/
			const namesOnly = response.data.map(tag => tag.name);
            setSuggestions(namesOnly);
			console.log('Suggestions:', namesOnly);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    useEffect(() => {
		console.log('Data updated:', suggestions);
	}, [suggestions]);


    const addTagBut = (e) => {
        e.preventDefault();
		addTag(inputValue.trim());
    }

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			e.preventDefault();
			addTag(inputValue.trim());
		}
	};

	const addTag = (tag) => {
		if (!tags.includes(tag) && tag!=="") {
			const newTags = [...tags, tag];
			setTags(newTags);
			setInputValue('');
			setFilteredSuggestions([]);
			//onTagsChange?.(newTags); // Callback
		}
	};

	const addTagEnter = (e, tag) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			if (!tags.includes(tag)) {
				const newTags = [...tags, tag];
				setTags(newTags);
				setInputValue('');
				setFilteredSuggestions([]);
				//onTagsChange?.(newTags); // Callback
			}
		}
	};

	const removeTag = (tagToRemove) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		setTags(newTags);
		//onTagsChange?.(newTags); // Callback
	};

    const onChange = (e) => {
		const value = e.target.value;
		setInputValue(value);

    	// Filtrado
		const filtered = suggestions.filter(
			(tag) => tag.toLowerCase().startsWith(value.toLowerCase()) && !tags.includes(tag)
		);
		setFilteredSuggestions(filtered);
    }

    return(
        <>
            <Input inputName="tags" labelText="Etiquetas" inputTipo="text" inputValue={inputValue} inputChange={onChange}></Input>
            <Button buttonName="Añadir" buttonFunction={addTagBut}></Button>
            <div className='tags'>
				{tags.map((tag) => (
					<Parameter key={tag} text={tag} remove={() => removeTag(tag)}></Parameter>
				))}
			</div>
			{filteredSuggestions.length > 0 && (
				<ul className="suggestions">
				{filteredSuggestions.map((suggestion) => (
					<li key={suggestion} onClick={() => addTag(suggestion)} tabIndex="0" onKeyDown={(e) => addTagEnter(e, suggestion)}>
						{suggestion}
					</li>
				))}
				</ul>
			)}
        </>
    );
}

export default SuggestionsInput;