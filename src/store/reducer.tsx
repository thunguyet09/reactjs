import { SET_FULLNAME_INPUT, ADD_STUDENT, SET_HOMETOWN_INPUT, SET_DAYOFBIRTH_INPUT, 
         UPDATE_STUDENT, SET_FIELD_INPUT, DELETE_STUDENT, SET_IMAGE_INPUT } from "./constant";
import avatar1 from '../assets/image/22.png'
import avatar2 from '../assets/image/an-nguy.webp'
export type State = {
    fullname: string;
    hometown: string;
    image: any;
    field: string;
    dateOfBirth: Date;
    student: { image: any, fullname: string, hometown: string, field: string, dateOfBirth: Date }[];
  }
  
  export type Action = { type: typeof SET_FULLNAME_INPUT; fullname: string} 
                    | { type: typeof SET_IMAGE_INPUT; image: any} 
                    |  { type: typeof SET_HOMETOWN_INPUT; hometown: string}
                    | { type: typeof SET_FIELD_INPUT; field: string}
                    |  { type: typeof SET_DAYOFBIRTH_INPUT, dateOfBirth: Date}
                    | { type: typeof ADD_STUDENT; payload: any} 
                    | { type: typeof UPDATE_STUDENT; payload: any} 
                    | { type: typeof DELETE_STUDENT; index: number} 
  
  const initState: State = {
    fullname: '',
    hometown: '',
    field: '',
    image: '',
    dateOfBirth: new Date(),
    student: [
        {
            image: avatar1,
            fullname:'Ha Nhi',
            hometown: 'Ha Giang',
            field: 'Thương mại điện tử',
            dateOfBirth: new Date(2003, 9, 13)
        },

        {
            image: avatar2,
            fullname:'Minh Ha',
            hometown: 'Dong Thap',
            field: 'Digital marketing',
            dateOfBirth: new Date(1995, 6, 26)
        },

        {
            image: avatar1,
            fullname:'Dan Chi',
            hometown: 'Hue',
            field: 'Thiết kế đồ họa',
            dateOfBirth: new Date(2000, 4, 7)
        }
    ],
  };

const reducer = (state: State, action: Action) => {
    switch(action.type){
        case SET_IMAGE_INPUT:
            return {
                ...state,
                image: action.image
            }
       case SET_FULLNAME_INPUT:
            return {
                ...state,
                fullname: action.fullname
            }
        case SET_HOMETOWN_INPUT:
            return {
                ...state,
                hometown: action.hometown
            }
        case SET_DAYOFBIRTH_INPUT:
            return {
                ...state,
                dateOfBirth: action.dateOfBirth
            }
        case SET_FIELD_INPUT:
            return {
                ...state,
                field: action.field
            }
        case ADD_STUDENT:
            return {
                ...state,
                student:  [...state.student, action.payload]
            }
        case UPDATE_STUDENT:
            const updatedStudents = [...state.student];
            const { image, index, fullname, hometown, field, dateOfBirth } = action.payload;
            updatedStudents[action.payload.index] = {
                ...updatedStudents[index],
                image,
                fullname,
                hometown,
                field,
                dateOfBirth,
            };

            return {
                ...state,
                student: updatedStudents,
            }
        case DELETE_STUDENT: 
            const students = [...state.student]
            students.splice(action.index,1)
            return {
                ...state,
                student: students
            }
       default: 
            return state
    }
}

export {initState}
export default reducer

