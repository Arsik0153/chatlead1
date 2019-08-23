const InputControler = () => {
    document.querySelector(".for-fb").display = "block";
    document.querySelector(".for-telegram").display = "none";
    document.querySelector(".for-whatsapp").display = "none";
    document.querySelector(".for-vk").display = "none";
    document.querySelector('input[type=radio][name=radio]').onchange = function() {
        if (this.value == 'fb') {
            document.querySelector(".for-fb").display = "block";
            document.querySelector(".for-telegram").display = "none";
            document.querySelector(".for-whatsapp").display = "none";
            document.querySelector(".for-vk").display = "none";
        }
        else if (this.value == 'telegram') {
            document.querySelector(".for-fb").display = "none";
            document.querySelector(".for-telegram").display = "block";
            document.querySelector(".for-whatsapp").display = "none";
            document.querySelector(".for-vk").display = "none";
        }
        else if (this.value == 'whatsapp') {
            document.querySelector(".for-fb").display = "none";
            document.querySelector(".for-telegram").display = "none";
            document.querySelector(".for-whatsapp").display = "block";
            document.querySelector(".for-vk").display = "none";
        }
        else if (this.value == 'vk') {
            document.querySelector(".for-fb").display = "none";
            document.querySelector(".for-telegram").display = "none";
            document.querySelector(".for-whatsapp").display = "none";
            document.querySelector(".for-vk").display = "block";
        }
    }
}
