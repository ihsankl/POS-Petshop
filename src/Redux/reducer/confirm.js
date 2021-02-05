const initialState = {
    title:'',
    msg:'',
    visible:false,
    onConfirm: ()=> {},
}

const confirm = (state = initialState, action) => {
    switch (action.type) {
        case 'CONFIRM_FULFILLED':
            return {
                title: action.payload.title,
                msg: action.payload.msg,
                visible: action.payload.visible,
                onConfirm: action.payload.onConfirm,
            }

        default:
            return state
    }
}

export default confirm