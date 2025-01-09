import { styled } from "@mui/material"
import { useRef, useState } from "react";
import OTPInput from "react-otp-input";

export default function InputField({updatePin, className}) {
    const [pin, setPin] = useState('');
    const handleChange = (pin)=>{
        setPin(pin);
        updatePin(pin)
    }

    return (
        <OTPInput
            value={pin}
            onChange={handleChange}
            numInputs={4}
            renderInput={(props) => {
                delete props?.style;
                delete props?.type;
                delete props?.className;
                return <CustomInput className={className} type="number" {...props} />
            }}
        />
    )
}

const CustomInput = styled('input')({
    all: 'unset',
    borderBottom: '1px solid var(--color-secondary)',
    background: 'none',
    fontSize: '20px',
    padding: '5px',
    margin: '0 10px 20px',
    color: 'var(--color-primary)',
    width: '1.7rem',
    textAlign: "center",
    '-webkit-appearance': 'none',

    '-webkit-text-security': 'disc',
    '-moz-webkit-text-security': 'disc',
    '-moz-text-security': 'disc',

    '&:focus': {
        borderBottom: '1px solid #ff0'
    }
    ,
    '::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',

    },
    '&.error':{
        borderBottom: '1px solid #f00'

    }


})