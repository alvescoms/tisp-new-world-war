import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const sweetAlert = withReactContent(Swal)

const showSuccess = (options, callback = () => {}) => {

    sweetAlert.fire({
        icon: 'success',
        confirmButtonColor: '#1041a7',
        ...options
    }).then(response => {

        if (response) {

            callback()

        }

    })

}

const showTurkeyValidation = options => {

    const audio = new Audio('/sounds/turkey-dadona.mp3');
    audio.play();

    sweetAlert.fire({
        imageUrl: 'https://image.flaticon.com/icons/png/512/1206/1206306.png',
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonColor: '#1041a7',
        ...options
    })

}

export {
    showTurkeyValidation,
    showSuccess
};