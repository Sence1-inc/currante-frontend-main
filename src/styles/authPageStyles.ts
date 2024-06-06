const authPageStyles = {
  form: {
    heading: {
      padding: "0 16px",
      fontSize: "24px",
      fontWeight: "700",
      textAlign: "center",
      color: "#0e2f71",
      fontFamily: "Poppins",
    },
    formInput: {
      borderRadius: "4px",
      marginTop: "35px",
      width: "100%",
      border: "1px solid #c4c4c4",
      color: "#0e2f71",
      fontFamily: "Poppins",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "none",
          top: 0,
        },
        "&:hover fieldset": {
          border: "1px solid #0e2f71",
        },
        "&.Mui-focused fieldset": {
          border: "1px solid #0e2f71",
        },
      },
      "& fieldset legend": {
        display: "none",
      },
    },
    formInputLabel: {
      top: "-20px",
      left: "-15px",
      padding: "0",
      fontWeight: "600",
      fontSize: "20px",
      fontFamily: "Poppins",
      color: "#0e2f71",
    },
    formInputProp: {
      fontFamily: "Poppins",
      color: "#000000",
      "&::placeholder": {
        fontFamily: "Poppins",
        color: "#c4c4c4",
      },
    },
    formButton: {
      borderRadius: "4",
      backgroundColor: "#f58a47",
      padding: "10px 20px",
      width: "100%",
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: "600",
      "&:hover": { backgroundColor: "#d07339" },
      textTransform: "inherit",
    },
    formLink: {
      cursor: "pointer",
      fontSize: "14px",
      fontFamily: "Poppins",
      color: "#c4c4c4",
      fontWeight: "500",
      fontStyle: "normal",
      textAlign: "right",
    },
    formSignUpLink: {
      cursor: "pointer",
      fontSize: "14px",
      fontFamily: "Poppins",
      color: "#f58a47",
      fontWeight: "500",
      fontStyle: "normal",
      textAlign: "center",
    },
    formSimpleText: {
      fontSize: "16px",
      fontFamily: "Poppins",
      color: "#c4c4c4",
      fontWeight: "500",
      fontStyle: "normal",
      textAlign: "center",
    },
    formHighlightText: {
      fontSize: "16px",
      fontFamily: "Poppins",
      color: "#f58a47",
      fontWeight: "500",
      fontStyle: "normal",
      textAlign: "center",
    },
  },
  container: {
    mainContainer: {
      marginBlock: "40px",
      maxWidth: "360px",
      width: "100%",
      margin: "60px auto",
    },
    innerContainer: {
      display: "flex",
      flexDirection: "column",
      rowGap: "30px",
      padding: "40px 0",
    },
    buttonsContainer: {
      display: "flex",
      // flexDirection: 'column',
      gap: "15px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "24px",
      paddingTop: "10px",
      paddingBottom: "10px",
      gap: "10px",
    },
    modalContainer: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "49%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "275px",
      minHeight: "auto",
      height: "auto",
      bgcolor: "#e8e7ef",
      borderRadius: "28px",
      boxShadow: 24,
    },
  },
  modal: {
    heading: {
      fontSize: 16,
      fontWeight: 600,
      color: "#1A1B21",
      textAlign: "center",
      fontFamily: "Poppins",
      marginBottom: "10px",
    },
    text: {
      fontSize: 14,
      color: "#45464F",
      textAlign: "left",
      fontFamily: "Poppins",
    },
  },
  icon: {
    buttonIconWhite: {
      color: "#ffffff",
      width: "14px",
      height: "12px",
      marginRight: "3px",
    },
    buttonIconBlue: {
      color: "#0e2F71",
      width: 20,
      height: 20,
      marginBottom: "5px",
    },
    buttonIconDisabled: {
      color: "#a1b5de",
    },
  },
  card: {
    cardStatusText: {
      textAlign: "right",
      fontSize: 12,
      fontWeight: "lighter",
      marginBottom: 1,
      color: "#f58a47",
      "@media (max-width:768px)": {
        fontSize: 8,
      },
    },
    cardContentBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 1,
    },
    cardImageBox: {
      width: "70px",
      minWidth: "70px",
      textAlign: "center",
    },
    cardDetailsBox: {
      width: "240px",
      "@media (max-width:768px)": {
        width: "250px",
      },
    },
    cardIdBox: {
      minWidth: "50px",
      "@media (max-width:768px)": {
        minWidth: "34px",
      },
    },
    cardHeading: {
      fontSize: 20,
      fontWeight: 600,
      color: "#f58a47",
      fontFamily: "Poppins",
      marginBottom: 0.5,
      "@media (max-width:768px)": {
        fontSize: 16,
      },
    },
    cardSubHeading: {
      fontSize: 14,
      fontWeight: 600,
      color: "#0e2F71",
      fontFamily: "Poppins",
      marginBottom: 1,
      "@media (max-width:768px)": {
        fontSize: 12,
      },
    },
    cardText: {
      fontSize: 12,
      fontFamily: "Poppins",
      fontWeight: "regular",
      color: "#0e2F71",
      "@media (max-width:768px)": {
        fontSize: 8,
      },
    },
    cardTextLight: {
      fontSize: 12,
      fontFamily: "Poppins",
      fontWeight: "light",
      color: "#45464F",
      "@media (max-width:768px)": {
        fontSize: 8,
      },
    },
  },
  textField: {
    textBox: {
      "& > :not(style)": { m: 1, width: "25ch" },
    },
  },
};

export default authPageStyles;
