import React, { useEffect, useRef } from "react";
import { useState } from "react";
/*import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";*/
import "../Input.css"
import "./InputTel.css"

import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';


function InputTel({ labelText, inputName = "", inputChange=undefined}){
/*    const inputRef = useRef(null);
    const itiRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            itiRef.current = intlTelInput(inputRef.current, {
            initialCountry: "auto",
            geoIpLookup: (callback) => {
                fetch("https://ipapi.co/json")
                .then((res) => res.json())
                .then((data) => callback(data.country_code))
                .catch(() => callback("us"));
            },
            utilsScript:
                "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
            });
        }

        return () => {
            if (itiRef.current) {
            itiRef.current.destroy();
            }
        };
    }, []);


    const handleChange = () => {
        if (itiRef.current) {
            const rawValue = inputRef.current.value;
            const countryData = itiRef.current.getSelectedCountryData();
            const code = countryData.dialCode;
            const fullNumber = '+'+code+rawValue;

            console.log(itiRef.current.isValidNumber());

            if (inputChange) {
                inputChange(fullNumber);
            }
        }
    };

    return(
        <p className="input-form">
            <label htmlFor="phone">{labelText}</label>
            <input 
                type="tel" 
                name={inputName} 
                autoComplete="true" 
                //onChange={inputChange} 
                onInput={handleChange}
                //placeholder="xxx-xx-xx-xx" 
                //maxLength="16" 
                id = "phone" 
                ref={inputRef}
            />
        </p>
    );*/

  const [phone, setPhone] = useState('');

    return (
        // <PhoneInput
        //     country={'ru'}
        //     value={phone}
        //     onChange={setPhone}
        //     inputProps={{
        //         name: 'phone',
        //         required: true,
        //         autoFocus: true
        //     }}
        // />
        <div>
            <label htmlFor="phone">Teléfono</label>
            <PhoneInput
                country={'es'}
                enableSearch
                searchPlaceholder="País o código"
                // localization={{ ru: 'Россия', us: 'США', ua: 'Украина' }}
                // buttonStyle={{ zIndex: 1000 }}
                // dropdownStyle={{ zIndex: 1000 }}
                value={phone}
                onChange={setPhone}
                inputProps={{
                    name: 'phone',
                    id: 'phone',
                    placeholder: '',
                    //required: true,
                    //autoFocus: true
                }}
            />
        </div>
    );

}

export default InputTel;