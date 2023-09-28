export const styleForInputFields = {
    '& .MuiInputLabel-root': {
        color: 'white !important',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset':{
        borderColor:'gray !important',
        },
        '&:hover fieldset': {
        borderColor: 'white !important',
        },
        '&.Mui-focused fieldset': {
        borderColor: 'white !important',
        },
        '& .MuiIconButton-root': { 
        color: 'white !important', 
        },
    },
    '& .MuiFormHelperText-root': {
      color: 'white !important',
    },
    label: {
        fontSize: '1rem',
    }
};

export const styleButton = {
	backgroundColor: '#45CFDD',
	color: '#292929',
	fontSize: "14px",
	fontWeight: "bold",
	padding: "7px 20px",
	'&:hover': {
	backgroundColor: '#B42B51',
	color: '#e0e0e0'
	}
}

export const styleSelect = {
    '.MuiSelect-icon': {
        color: 'white !important', 
    },
    '&:before': {
        borderColor: 'gray !important',
    },
    '&:after': {
        borderColor: 'white !important',
    },
}

export const styleMenuItem = {
    '&:hover': {
      color:"white",
      fontWeight: 600
    },
    '&.Mui-selected': {
      color:"cyan",
      fontWeight: 600
    }
}

export const menuProps = {
    PaperProps: {
       style: {
         maxHeight: '300px',
         backgroundColor: '#001C30',
       },
    },
}