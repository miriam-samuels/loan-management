import React from 'react'
import Select from 'react-select';

import './index.scss'
import * as Reactstrap from 'reactstrap';
export function Input(props) {
   return (
      <div>
         <label className='label' htmlFor={props.name}>{props.label}</label>
         <Reactstrap.Input {...props} className='input' />
         {/* <input className='input'  {...props} /> */}
      </div>
   )
}


export const SelectField = (props) => {
   const styles = {
      cursor: "text",
      control: (provided) => ({
         ...provided,
         height: "50px",
         width: "100%",
         padding: "0 10px",
         fontWeight: 300,
         fontSize: "14px",
         boxShadow: "none",
         backgroundColor: "transparent",
         border: "1px solid gray",
         borderRadius: "4px",
         "&:hover": {
            borderColor: "none",
         },
         color: "#9e9e9e",
      }),
      option: (provided, state) => ({
         ...provided,
         fontWeight: state.isSelected ? "normal" : "300",
         backgroundColor: "rgba(255, 255, 255, 0.135)",
         color: "black",
         fontSize: "14px",
         "&:hover": {
            backgroundColor: "#666666",
            color: "#000",
         },
      }),
      singleValue: (provided) => ({
         ...provided,
         fontWeight: "300",
         color: "#ccc",
         fontSize: "13px",
      }),
      multiValue: (provided) => ({
         ...provided,
         backgroundColor: "hsl(0,0%,85%)",
      }),
      placeholder: (provided) => ({
         ...provided,
         backgroundColor: "transparent",
         // opacity: 0.35,
         fontWeight: "300",
         color: "#9ca3af",
         width: "100%",
         fontSize: "13px",
         display: "flex",
         justifyContent: "flex-start",
      }),
      valueContainer: (provided) => ({
         ...provided,
         justifyContent: "flex-start",
      }),
      indicatorSeparator: (provided) => ({
         ...provided,
         display: "none",
      }),
      menu: (provided) => ({
         ...provided,
         marginTop: "10px",
         borderRadius: "5px",
         // boxShadow: "0px 4px 20px 0px #0000001A",
      }),
      indicatorContainer: (provided) => ({
         ...provided,
         color: "var(--color-main-secondary)",
      }),
      menuPortal: (provided, state) => ({
         ...provided,
         zIndex: "20",
         position: "fixed",
         borderRadius: "5px",
         boxShadow: "0px 4px 20px 0px #0000001A",
      }),
      menuList: (provided, state) => ({
         ...provided,
         backgroundColor: "rgba(255, 255, 255, 0.135)",
         borderWidth: "0px",
         borderRadius: "5px",
         borderColor: "#333",
         paddingRight: "15px",
         "::-webkit-scrollbar": {
            width: "9px",
         },
         "::-webkit-scrollbar-track": {
            background: "transparent",
         },
         "::-webkit-scrollbar-thumb": {
            background: "#878787",
            borderRadius: "6px",
         },
         "::-webkit-scrollbar-thumb:hover": {
            background: "#555",
         },
      }),
   }
   return (
      <div>
         <label className='label' htmlFor={props.name}>{props.label}</label>
         <Select
            {...props}
            styles={styles}
         />
      </div>

   );
};