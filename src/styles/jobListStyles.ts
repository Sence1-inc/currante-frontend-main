const jobListStyles = {
  button: {
    primary: {
      backgroundColor: '#0e2f71',
      color: '#ffffff',
      fontSize: 12,
      fontweight: 'normal',
      fontFamily: 'Poppins',
      "@media (max-width:768px)": { 
        fontSize: 8
      }, 
      "&:hover": { 
        backgroundColor: '#0A204C',
      },
      "&:disabled": {
        backgroundColor: '#a1b5de',
        color: '#ffffff',
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#0E2F71',
      fontSize: 12,
      fontweight: 'normal',
      fontFamily: 'Poppins',
      "@media (max-width:768px)": { 
        fontSize: 8
      }, 
      "&:hover": { 
        backgroundColor: '#cccccc',
      },
    },
    simple: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 1,
      fontSize: 12, 
      fontFamily: 'Poppins', 
      fontWeight: 'regular',
      textTransform: 'capitalize',
      color: '#0e2F71', 
      "@media (max-width:768px)": { 
        fontSize: 8
      },
      "&:disabled": {
        color: '#a1b5de'
      }
    }
  },
  container: {
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#faf8ff',
      border: '1px solid #c5c6d0',
      borderRadius: 4,
      paddingTop: 1,
      paddingLeft: 2,
      paddingRight: 2,
      paddingBottom: 2,
      maxWidth: '360px',
      margin: '0 auto',
      "@media (max-width:768px)": { 
        maxWidth: '300px',
      }, 
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 2,
    },
    buttonContainer: {
      display: 'flex', 
      justifyContent: 'flex-end', 
      padding: '24px', 
      paddingTop: '10px', 
      paddingBottom: '10px', 
      gap: '10px' 
    },
    modalContainer: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '49%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '275px',
      minHeight: 'auto',
      height: 'auto',
      bgcolor: '#e8e7ef',
      borderRadius: '28px',
      boxShadow: 24,
    }
  },
  modal: {
    heading: {
      fontSize: 16,
      fontWeight: 600,
      color: '#1A1B21',
      textAlign: 'center',
      fontFamily: 'Poppins',
      marginBottom: '10px'
    },
    text: {
      fontSize: 14,
      color: '#45464F',
      textAlign: 'left',
      fontFamily: 'Poppins',
    }
  },
  icon: {
    buttonIconWhite: {
      color: '#ffffff', 
      width: '14px', 
      height: '12px', 
      marginRight: '3px' 
    },
    buttonIconBlue: {
      color: '#0e2F71', 
      width: 20, 
      height: 20, 
      marginBottom: '5px' 
    },
    buttonIconDisabled: {
      color: '#a1b5de', 
    }
  },
  card: {
    cardStatusText: {
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 'lighter',
      marginBottom: 1,
      color: '#f58a47',
      "@media (max-width:768px)": { 
        fontSize: 8
      }, 
    },
    cardContentBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 1
    },
    cardImageBox: {
      width: '70px', 
      minWidth: '70px', 
      textAlign: 'center'
    },
    cardDetailsBox: {
      width: '240px',
      "@media (max-width:768px)": { 
        width: '250px'
      },  
    },
    cardIdBox: {
      minWidth: '50px',
      "@media (max-width:768px)": { 
        minWidth: '34px',
      }, 
    },
    cardHeading: {
      fontSize: 20,
      fontWeight: 600,
      color: '#f58a47',
      fontFamily: 'Poppins',
      marginBottom: 0.5,
      "@media (max-width:768px)": { 
        fontSize: 16
      }, 
    },
    cardSubHeading: {
      fontSize: 14,
      fontWeight: 600,
      color: '#0e2F71',
      fontFamily: 'Poppins',
      marginBottom: 1,
      "@media (max-width:768px)": { 
        fontSize: 12
      }, 
    },
    cardText: {
      fontSize: 12, 
      fontFamily: 'Poppins', 
      fontWeight: 'regular', 
      color: '#0e2F71', 
      "@media (max-width:768px)": { 
        fontSize: 8
      }, 
    },
    cardTextLight: {
      fontSize: 12, 
      fontFamily: 'Poppins', 
      fontWeight: 'light', 
      color: '#45464F',
      "@media (max-width:768px)": { 
        fontSize: 8
      }, 
    }
  },
  textField: {
    textBox: {
      '& > :not(style)': { m: 1, width: '25ch' },
    }
  }
}

export default jobListStyles