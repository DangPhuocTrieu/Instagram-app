const user = {
    checkEmailType: data => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)
    },
    checkPhoneNumberType: data => {
        return /^[0-9\-\+]{9,15}$/.test(data)
    }
}

export default user