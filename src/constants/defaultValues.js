export const defaultValuesForNewMessages = {
    text: '',
    photo: '',
    audio: '',
    video: '',
    file: '',
    card: [{photo: '', title: '', text: ''}],
    gallery: [{photo: '', title: '', text: ''}],
    list: [{photo: '', title: '', text: '', keyboard: {}}, {photo: '', title: '', text: '', keyboard: {}}],
    timer: '',
    form: ""
};

export const buttonsTypes = {
    text_buttons: 'text_buttons',
    url_buttons: 'url_buttons',
    fast_buttons: 'fast_buttons'
}