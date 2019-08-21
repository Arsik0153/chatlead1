import React, {useState} from 'react';
import style from './cardOrGallaryElement.module.sass';
import {staticMedia} from "../../../api/baseURL";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {updateTrigger} from "../../../actions/actionCreator";
import {defaultValuesForNewMessages} from "../../../constants/defaultValues";
import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import MiniImagesForSlider from './miniImagesForSlider/miniImagesForSlider';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";



// class CardOrGalleryElement extends React.Component {
//     // const [changedSlide, changeSlide] = useState(0);
//
//     constructor(props) {
//         super(props);
//
//         const {value} = this.props;
//
//
//         this.state = {
//             changedSlide: 0,
//             changedData: value[0]
//         }
//     }
//
//
//
//     // console.log(value[changedSlide].title, value[changedSlide].text);
//
//
//     updateTrigger = (e, typeInput) => {
//         const {index, changedTrigger} = this.props;
//
//         const messagesCopy = changedTrigger.messages.concat();
//
//
//         const updationData = {
//             type: 'text'
//         };
//         if(typeInput === 'text' || typeInput === 'title') {
//             Object.assign(messagesCopy[index].card[this.state.changedSlide], {
//                 [typeInput]: e.target.value
//             });
//         }else {
//             Object.assign(updationData, {
//                 file: e.target.files[0],
//                 type: 'photo'
//             })
//         }
//
//         const triggerData = {
//             ...changedTrigger,
//             index: index,
//             messages: messagesCopy,
//             changedSlide: this.state.changedSlide,
//             botId: this.props.match.params.botId
//         };
//
//         if(typeInput === 'text' || typeInput === 'title') {
//             this.props.updateTrigger(triggerData);
//         }else {
//             this.props.updateTrigger(triggerData, updationData);
//         }
//
//     };
//
//     newSlideOrNextSlide = () => {
//         const {index, changedTrigger, value} = this.props;
//         const messagesCopy = changedTrigger.messages.concat();
//
//
//         if(messagesCopy[index].card.length === this.state.changedSlide + 1) {
//             messagesCopy[index].card.push({photo: '', title: '', text: ''});
//             const triggerData = {
//                 ...changedTrigger,
//                 index: index,
//                 messages: messagesCopy,
//                 changedSlide: this.state.changedSlide,
//                 botId: this.props.match.params.botId
//             };
//             this.props.updateTrigger(triggerData);
//             this.setState({
//                 changedSlide: this.state.changedSlide + 1,
//                 changedData: value[this.state.changedSlide]
//             })
//         }else {
//             this.setState({
//                 changedSlide: this.state.changedSlide + 1,
//                 changedData: value[this.state.changedSlide]
//             })
//         }
//     };
//
//     render() {
//
//         const {index, pictureForLabel, value} = this.props;
//
//         console.log(value, this.state.changedData);
//         return (
//             <div className={style.mainContainer}>
//                 <div className={style.pictureContainer}>
//                     <div onClick={this.newSlideOrNextSlide}>+</div>
//                     <input
//                         type={'file'}
//                         accept={'image/*'}
//                         name={index}
//                         id={index}
//                         onChange={updateTrigger}
//                         className={style.inputFile}
//                     />
//                     <label htmlFor={index}>
//                         <div className={style.pictureContainer}>
//                             <h2>
//                                 {
//                                     value[this.state.changedSlide].photo.length > 0 ?
//                                         <img src={staticMedia + value[this.state.changedSlide].photo} alt={value} />
//                                         : pictureForLabel.img
//                                 }
//                             </h2>
//                             <p>{value.length === 0 && pictureForLabel.label}</p>
//                         </div>
//                     </label>
//                     <div onClick={() => this.state.changedSlide !== 0 && this.setState({
//                         changedSlide: this.state.changedSlide - 1,
//                         changedData: value[this.state.changedSlide]
//                     })}>-</div>
//                 </div>
//                 <input
//                     type={'text'}
//                     defaultValue={this.state.changedData.title}
//                     placeholder={'Введите титульное слово'}
//                     onBlur={(e) => updateTrigger(e, 'title')}
//                 />
//                 <input
//                     type={'text'}
//                     defaultValue={this.state.changedData.text}
//                     placeholder={'Введите текст'}
//                     onBlur={(e) => updateTrigger(e, 'text')}
//                 />
//             </div>
//         )
//     }
// };


const CardOrGalleryElement = (props) => {
    const {type, index, pictureForLabel, value, changedTrigger} = props;
    const [changedSlide, changeSlide] = useState(0);


    const updateTrigger = (e, typeInput) => {
        const messagesCopy = changedTrigger.messages.concat();


        const updationData = {
            type: 'text'
        };
        if(typeInput === 'text' || typeInput === 'title') {
            Object.assign(messagesCopy[index][type][changedSlide], {
                [typeInput]: e.target.value
            });
        }else {
            Object.assign(updationData, {
                file: e.target.files[0],
                type: 'photo'
            })
        }

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            changedSlide,
            messages: messagesCopy,
            botId: props.match.params.botId
        };


        if(typeInput === 'text' || typeInput === 'title') {
            props.updateTrigger(triggerData);
        }else {
            props.updateTrigger(triggerData, updationData);
        }

    };

    const newSlideOrNextSlide = () => {
        const messagesCopy = changedTrigger.messages.concat();


        if(messagesCopy[index][type].length === changedSlide + 1) {
            messagesCopy[index][type].push({photo: '', title: '', text: '', keyboard: []});
            const triggerData = {
                ...changedTrigger,
                index: index,
                messages: messagesCopy,
                changedSlide: changedSlide,
                botId: props.match.params.botId
            };
            props.updateTrigger(triggerData);
            changeSlide(changedSlide + 1);
        }else {
            changeSlide(changedSlide + 1);
        }
    };


    return (
        <div className={style.mainContainer}>
            <div className={style.hoverBar}>
                <HoverBarForMessage
                    {...props}
                    styleForBar={{top: '0', left: '320px'}}
                />
            </div>
            <div className={style.contentContainer}>
                <div className={style.controlsLeft} onClick={newSlideOrNextSlide}>+</div>
                <div className={style.pictureContainer}>
                    <input
                        type={'file'}
                        accept={'image/*'}
                        name={index}
                        id={index}
                        onChange={updateTrigger}
                        className={style.inputFile}
                    />
                    <label htmlFor={index}>
                        <div className={style.cardPictureContainer}>
                            {
                                value[changedSlide].photo.length > 0 ?
                                    <img src={staticMedia + value[changedSlide].photo} alt={value} /> :
                                    <h2 className={style.labelPictureContainer}>
                                        {pictureForLabel.img}
                                        <p>Картинка</p>
                                    </h2>
                            }
                            <p>{value.length === 0 && pictureForLabel.label}</p>
                        </div>
                    </label>
                </div>
                <div className={style.inputContainer}>
                    <input
                        type={'text'}
                        defaultValue={value[changedSlide].title}
                        placeholder={'Введите титульное слово'}
                        onBlur={(e) => updateTrigger(e, 'title')}
                    />
                    <textarea
                        defaultValue={value[changedSlide].text}
                        placeholder={'Введите текст'}
                        onBlur={(e) => updateTrigger(e, 'text')}
                    />
                </div>
                <MiniImagesForSlider
                    value={value}
                    changeSlide={changeSlide}
                    changedSlide={changedSlide}
                />

                <div
                    onClick={() => changedSlide !== 0 && changeSlide(changedSlide - 1)}
                    className={style.controlsRight}
                >
                    -
                </div>
            </div>
            <ButtonsContainer
                {...props}
                changedSlideOrElement={changedSlide}
            />
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)( CardOrGalleryElement ));